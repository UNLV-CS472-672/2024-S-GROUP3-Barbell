import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(req: NextRequest) {
  if (req) {
    console.log('Yahallo')
  }
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}
