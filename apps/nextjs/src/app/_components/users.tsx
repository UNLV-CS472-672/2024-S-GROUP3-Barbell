'use client'

import type { RouterOutputs } from '@/utils/trpc/api'
import { useState } from 'react'
import { api } from '@/utils/trpc/api'


export function UsersPage() {
  const users = api.user.all?.useSuspenseQuery()
  const user = api.user.byId?.useQuery({ id: 1 })
  const friend = api.friend.byId?.useQuery({ id: 1 })

  // console.log(friend)
  // console.log(users)
  // console.log(user)

  return (
    <div className="flex w-full flex-col gap-4">
      Hi Mom!
    </div>
  )
}




