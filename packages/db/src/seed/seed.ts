import { prisma } from '..'

/* json */
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
 * resetdb seed data
 * Procedure:
 * 1. Delete all the existing data before?
 * @thienguen
 */
const resetdb = async () => {
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

    await prisma.post.deleteMany()
    logger('delete', 'post')

    await prisma.user.deleteMany()
    logger('delete', 'user')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * loaddb data
 * Procedure:
 * 1. Add data to the database
 * @thienguen
 */
const loaddb = async () => {
  try {
    /// < SEED PROCEDURE > ///
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

/* main */
resetdb().catch((e) => console.error(e))
loaddb().catch((e) => console.error(e))
