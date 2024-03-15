import { prisma } from '..'
import users from '../mock-data/user.json'




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
  }
}

/**
 * Load seed data
 * Procedure:
 * 1. Delete all the existing data before?
 * 2. Add data to the collection (seed data, for testing purposes)
 * @thienguen
 */
const load = async () => {
  try {
    /// < DELETE PROCEDURE > ///

    await prisma.notification.deleteMany()
    logger('delete', 'notification')

    await prisma.award.deleteMany()
    logger('delete', 'award')

    await prisma.set.deleteMany()
    logger('delete', 'set')

    await prisma.exercise.deleteMany()
    logger('delete', 'exercise')

    await prisma.workout.deleteMany()
    logger('delete', 'workout')

    await prisma.log.deleteMany()
    logger('delete', 'log')

    await prisma.friend.deleteMany()
    logger('delete', 'friend')

    /* Keep this data since it doens't related to our app */
    /* so use it for testing our db is alive and well */
    // await prisma.post.deleteMany()
    logger('delete', 'post')

    await prisma.user.deleteMany()
    logger('delete', 'user')









    /// < SEED PROCEDURE > ///

    // Add data to the collection
    await prisma.post.create({
      data: {
        title: 'Hello World',
        content: 'This is the first post',
      },
    })
    logger('add', 'post')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load().catch((e) => console.error(e))
