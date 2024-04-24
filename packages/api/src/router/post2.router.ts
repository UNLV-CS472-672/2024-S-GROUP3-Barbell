/* istanbul ignore file -- @preserve */
/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { EventEmitter } from 'events'
import type { Post2 as Post } from '@prisma/client'

import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { prisma } from '@acme/db'

import { createTRPCRouter, publicProcedure } from '../trpc'

interface MyEvents {
  add: (data: Post) => void
  isTypingUpdate: () => void
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean
}

class MyEventEmitter extends EventEmitter {}

// In a real app, you'd probably use Redis or something
const ee = new MyEventEmitter()

// who is currently typing, key is `name`
const currentlyTyping: Record<string, { lastTyped: Date }> = Object.create(null)

// every 1s, clear old "isTyping"
const interval = setInterval(() => {
  let updated = false
  const now = Date.now()
  for (const [key, value] of Object.entries(currentlyTyping)) {
    if (now - value.lastTyped.getTime() > 3e3) {
      delete currentlyTyping[key]
      updated = true
    }
  }
  if (updated) {
    ee.emit('isTypingUpdate')
  }
}, 3e3)

process.on('SIGTERM', () => {
  clearInterval(interval)
})

export const post2Router = createTRPCRouter({
  /**
   *
   */
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // const { name } = ctx.user;
      const post = await prisma.post2.create({
        data: {
          ...input,
          source: 'GITHUB',
          name: 'T',
        },
      })
      ee.emit('add', post)
      delete currentlyTyping['T']
      ee.emit('isTypingUpdate')
      return post
    }),

  /**
   *
   */
  isTyping: publicProcedure.input(z.object({ typing: z.boolean() })).mutation(({ input, ctx }) => {
    // const { name } = ctx.user;
    if (!input.typing) {
      delete currentlyTyping['T']
    } else {
      currentlyTyping['T'] = {
        lastTyped: new Date(),
      }
    }
    ee.emit('isTypingUpdate')
  }),

  /**
   *
   */
  infinite: publicProcedure
    .input(
      z.object({
        cursor: z.date().nullish(),
        take: z.number().min(1).max(50).nullish(),
      }),
    )
    .query(async ({ input }) => {
      const take = input.take ?? 10
      const cursor = input.cursor

      const page = await prisma.post2.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        cursor: cursor ? { createdAt: cursor } : undefined,
        take: take + 1,
        skip: 0,
      })
      const items = page.reverse()
      let nextCursor: typeof cursor | null = null
      if (items.length > take) {
        const prev = items.shift()
        nextCursor = prev!.createdAt
      }
      return {
        items,
        nextCursor,
      }
    }),

  /**
   *
   */
  onAdd: publicProcedure.subscription(() => {
    return observable<Post>((emit) => {
      const onAdd = (data: Post) => {
        emit.next(data)
      }
      ee.on('add', onAdd)
      return () => {
        ee.off('add', onAdd)
      }
    })
  }),

  /**
   *
   */
  whoIsTyping: publicProcedure.subscription(() => {
    let prev: string[] | null = null
    return observable<string[]>((emit) => {
      const onIsTypingUpdate = () => {
        // console.log('currentlyTyping whoIstyping', currentlyTyping)
        const newData = Object.keys(currentlyTyping)

        if (!prev || prev.toString() !== newData.toString()) {
          emit.next(newData)
        }
        prev = newData
      }

      // tjos mpt get invoke?
      // console.log('onIsTypingUpdate in whoIsTyping');
      ee.on('isTypingUpdate', onIsTypingUpdate)
      return () => {
        // console.log('off onIsTypingUpdate in whoIsTyping');
        ee.off('isTypingUpdate', onIsTypingUpdate)
      }
    })
  }),
})
