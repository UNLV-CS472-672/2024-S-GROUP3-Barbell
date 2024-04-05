import { Prisma } from '@prisma/client'

import { prisma } from '..'
import award from '../mock-data/award.json'
import chat from '../mock-data/chat.json'
import exercise from '../mock-data/exercise.json'
import friend from '../mock-data/friend.json'
import workoutLog from '../mock-data/workoutLog.json'
import message from '../mock-data/message.json'
import notification from '../mock-data/notification.json'
import post from '../mock-data/post.json'
import set from '../mock-data/set.json'
import spotify from '../mock-data/spotify.json'
import users from '../mock-data/user.json'
import workout from '../mock-data/workout.json'

/**
 * @param type logging type
 * @param collection collection name
 */
const logger = (type: string, collection: string) => {
  switch (type) {
    case 'delete':
      console.log(`Deleted records in ${collection} collection`)
      break
    case 'add':
      console.log(`Added ${collection} data`)
      break
    case 'divider':
      console.log('----------------------------------')
      break
  }
}

/**
 * loaddb seed data
 * Procedure:
 * 1. Delete all the existing data before?
 * 2. Add the seed data
 * @thienguen
 */
const loaddb = async () => {
  try {
    /// < DELETE PROCEDURE > ///

    await prisma.notification.deleteMany()
    logger('delete', 'notification')

    await prisma.award.deleteMany()
    logger('delete', 'award')

    await prisma.set.deleteMany()
    logger('delete', 'set')

    await prisma.set.deleteMany()
    logger('delete', 'set')

    await prisma.exercise.deleteMany()
    logger('delete', 'exercise')

    await prisma.workoutLog.deleteMany()
    logger('delete', 'workoutLog')

    await prisma.workout.deleteMany()
    logger('delete', 'workout')

    // await prisma.log.deleteMany()
    // logger('delete', 'log')

    await prisma.friend.deleteMany()
    logger('delete', 'friend')

    await prisma.post.deleteMany()
    logger('delete', 'post')

    await prisma.spotifyData.deleteMany()
    logger('delete', 'spotify')

    await prisma.message.deleteMany()
    logger('delete', 'message')

    await prisma.chat.deleteMany()
    logger('delete', 'chat')

    await prisma.user.deleteMany()
    logger('delete', 'user')

    await prisma.award.deleteMany()
    logger('delete', 'award')

    await prisma.friend.deleteMany()
    logger('delete', 'friend')

    /// < DIVIDER > ///
    logger('divider', '')
    logger('divider', '')
    logger('divider', '')
    /// < DIVIDER > ///

    /// < SEED PROCEDURE > ///

    /*  */
    await prisma.user.createMany({
      data: users as Prisma.UserCreateManyInput[],
    })
    logger('add', 'user')

    /*  */
    await prisma.spotifyData.createMany({
      data: spotify as Prisma.SpotifyDataCreateManyInput[],
    })
    logger('add', 'spotify')

    /*  */
    await prisma.post.createMany({ data: post })
    logger('add', 'post')

    /*  */
    await prisma.notification.createMany({
      data: notification as Prisma.NotificationCreateManyInput[],
    })
    logger('add', 'notification')

    /*  */
    await prisma.workout.createMany({
      data: workout as Prisma.WorkoutCreateManyInput[],
    })
    logger('add', 'workout')

    /*  */
    await prisma.exercise.createMany({
      data: exercise as Prisma.ExerciseCreateManyInput[],
    })
    logger('add', 'exercise')

    /*  */
    await prisma.chat.createMany({
      data: chat as Prisma.ChatCreateManyInput[],
    })
    logger('add', 'chat')

    /*  */
    await prisma.message.createMany({
      data: message as Prisma.MessageCreateManyInput[],
    })
    logger('add', 'message')

    /*  */
    await prisma.award.createMany({
      data: award as Prisma.AwardCreateManyInput[],
    })
    logger('add', 'award')

    /*  */
    await prisma.friend.createMany({
      data: friend as Prisma.FriendCreateManyInput[],
    })
    logger('add', 'friend')

    /*  */
    await prisma.workoutLog.createMany({
      data: workoutLog as Prisma.WorkoutLogCreateManyInput[],
    })
    logger('add', 'log')

    /*  */
    await prisma.set.createMany({
      data: set as Prisma.SetCreateManyInput[],
    })
    logger('add', 'set')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

/* main */
loaddb().catch((e) => console.error(e))
