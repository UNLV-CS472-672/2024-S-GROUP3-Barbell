'use client'

import type { RouterOutputs } from '@/utils/api'
import { useState } from 'react'
import { api } from '@/utils/api'


export function UsersPage() {
  const users = api.user.all?.useSuspenseQuery()
  const user = api.user.byId?.useQuery({ id: 1 })
  console.log(users)
  console.log(user)

  return (
    <div className="flex w-full flex-col gap-4">
      {users?.map((user) => (
        <div key={user.toString()}>
          <h1>{user.toString()}</h1>
        </div>
      ))}
    </div>
  )
}




