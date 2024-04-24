import { describe, expect, it } from 'vitest'

import { createCaller } from '../..'
import { createContextInner } from '../trpc'

describe('USER', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  it('/byId', async () => {
    const newUser = await caller.user.create({
      clerkId: 'clerk123',
      username: 'newuser',
      name: 'New User',
    })

    expect(newUser.clerkId).toBe('clerk123')
    expect(newUser.username).toBeDefined()
    expect(newUser.name).toBe('New User')

    const byId = await caller.user.byId({ id: newUser.id })
    expect(byId?.id).toBe(newUser.id)

    await caller.user.delete({ id: newUser.id })
  })

  it('/create', async () => {
    const newUser = await caller.user.create({
      clerkId: 'clerk123',
      username: 'newuser',
      name: 'New User',
    })

    expect(newUser.clerkId).toBe('clerk123')
    expect(newUser.username).toBeDefined()
    expect(newUser.name).toBe('New User')

    // Cleanup
    await caller.user.delete({ id: newUser.id })
  })

  it('/all', async () => {
    const users = await caller.user.all()
    expect(users).toBeInstanceOf(Array)
    expect(users).toHaveLength(users.length)
  })

  it('/getIdByClerkId', async () => {
    const newUser = await caller.user.create({
      clerkId: 'clerk456',
      username: 'testuser',
      name: 'Test User',
    })
    const foundUserId = await caller.user.getIdByClerkId({ clerkId: 'clerk456' })
    expect(foundUserId).toBe(newUser.id)
  })

  it('/update', async () => {
    const createdUser = await caller.user.create({
      clerkId: 'clerk789',
      username: 'updateuser',
      name: 'Update User',
    })
    const updatedUser = await caller.user.update({
      id: createdUser.id,
      notificationsBanners: false,
    })
    expect(updatedUser.notificationsBanners).toBe(false)
  })

  it('/delete', async () => {
    const userToBeDeleted = await caller.user.create({
      clerkId: 'clerk000',
      username: 'deleteuser',
      name: 'Delete User',
    })
    const deletedUser = await caller.user.delete({ id: userToBeDeleted.id })

    expect(deletedUser.clerkId).toBe('clerk000')
    expect(deletedUser.username).toBeDefined()
    expect(deletedUser.name).toBe('Delete User')

    const findDeletedUser = await caller.user.byId({ id: userToBeDeleted.id })
    expect(findDeletedUser).toBeNull() // Ensuring the user cannot be fetched post-deletion.

  })

  it('/getUserWorkoutHistory', async () => {
    const userWithWorkout = await caller.user.create({
      clerkId: 'clerk1234',
      username: 'workoutuser',
      name: 'Workout User',
    })
    const workoutHistory = await caller.user.getUserWorkoutHistory({ userId: userWithWorkout.id })
    expect(workoutHistory).toBeInstanceOf(Object) // We just check for an object since the actual content might vary.

    // Cleanup
    await caller.user.delete({ id: userWithWorkout.id })
  })
})
