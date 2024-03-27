import { expect, test } from '@jest/globals'
import { ChatType, Message, Notification } from '@prisma/client'
import { prisma } from '@acme/db'


test('NOTIF /getDMsFromChatId', async () => {
  const expectedOutput: any[] = [{
    "id": 20,
    "createdAt": new Date("2022-04-19T15:49:09.197Z"),
    "updatedAt": new Date("2022-04-19T15:49:09.197Z"),
    "content": "Hey sam, just wanted to say im a fan, you have taught me a lot.",
    "read": true,
    "chatId": 6,
    "senderId": 8,
  }]

  const input = {
    id: 6,
  }

  const chat = await prisma.chat.findFirst({
    where: {
      type: ChatType.DIRECT,
      id: input.id,
    },
    select: {
      id: true,
      users: true,
    },
  })

  if (chat == undefined) {
    return []
  }

  const actualOutput = await prisma.message.findMany({
    where: {
      chatId: chat.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  expect(actualOutput).toStrictEqual(expectedOutput)
})


test('NOTIF /getMessagePreviewsFromUserId', async () => {
  const expectedOutput = {
    "id": 20,
    "createdAt": new Date("2022-04-19T15:49:09.197Z"),
    "updatedAt": new Date("2022-04-19T15:49:09.197Z"),
    "content": "Hey sam, just wanted to say im a fan, you have taught me a lot.",
    "read": true,
    "chatId": 6,
    "senderId": 8,
  }

  const input = {
    id: 1,
  }

  const userChats = await prisma.user.findFirst({
    where: {
      id: input.id,
    },
    select: {
      chats: true,
    }
  })

  const directChatIds: number[] = []
  userChats?.chats.forEach((chat) => {
    if(chat.type === ChatType.DIRECT){
      directChatIds.push(chat.id)
    }
  })

  if(directChatIds.length == 0){
    return []
  }

  const finalMessageForEachDMChat = await prisma.chat.findMany({
    where: {
      id: {
        in: directChatIds,
      },
    },
    select: {
      users: true,
      id: true,
      readByUserIds: true,
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        select: {
          content: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const actualOutput = finalMessageForEachDMChat;

  expect(actualOutput).toStrictEqual(expectedOutput)
})


test('NOTIF /getMiscNotifsFromUserId', async () => {
  const expectedOutput: Notification[] = [
  {
    "id": 3,
    "createdAt": new Date("2024-03-14T10:15:00Z"),
    "content": "wants to be your friend.",
    "type": "NUDGE",
    "read": false,
    "receiverId": 4,
    "senderId": 2,
  },
  {
    "id": 4,
    "createdAt": new Date("2024-03-13T10:15:00Z"),
    "content": "Hi everyone! Let's do cardio today.",
    "type": "FRIEND_REQUEST",
    "read": false,
    "receiverId": 4,
    "senderId": 3,
  },
  {
    "id": 5,
    "createdAt": new Date("2024-03-12T09:10:00Z"),
    "content": "Hi! We should bench today.",
    "type": "FRIEND_REQUEST",
    "read": false,
    "receiverId": 4,
    "senderId": 5,
  },
  {
    "id": 6,
    "createdAt": new Date("2024-03-11T10:15:00Z"),
    "content": "nudged you!",
    "type": "NUDGE",
    "read": false,
    "receiverId": 4,
    "senderId": 6,
  },
  {
    "id": 7,
    "createdAt": new Date("2024-03-10T10:15:00Z"),
    "content": "liked your workout plan.",
    "type": "NUDGE",
    "read": false,
    "receiverId": 4,
    "senderId": 7,
  },
  {
    "id": 8,
    "createdAt": new Date ("2024-03-09T10:15:00Z"),
    "content": "Legs today, anyone?",
    "type": "FRIEND_REQUEST",
    "read": false,
    "receiverId": 4,
    "senderId": 8,
  },
  {
    "id": 9,
    "createdAt": new Date("2024-03-08T10:15:00Z"),
    "content": "wants to be your friend.",
    "type": "NUDGE",
    "read": false,
    "receiverId": 4,
    "senderId": 9,
  },
  {
    "id": 10,
    "createdAt": new Date("2024-03-07T10:15:00Z"),
    "content": "Welcome to Barbell.",
    "type": "LIKE",
    "read": false,
    "receiverId": 4,
    "senderId": null,
  }
]

  const input = {
    id: 4
  }

  const actualOutput = await prisma.notification.findMany({
    where: {
          receiverId: input.id,
        },
    })
  
  expect(actualOutput).toStrictEqual(expectedOutput)
})
