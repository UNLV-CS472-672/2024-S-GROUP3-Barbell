import { BodyPart, Category, SetType } from '@prisma/client'
import { z } from 'zod'

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export const UpdateUserSchema = z.object({
  id: z.number().int(),
  notificationsBanners: z.boolean().optional(),
})

export const ExerciseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  note: z.string().optional(),
  bodyPart: z.nativeEnum(BodyPart),
  category: z.nativeEnum(Category),
  sets: z.array(
    z.object({
      id: z.string(),
      type: z.nativeEnum(SetType),
      reps: z.number().int().optional(),
      weight: z.number().optional(),
      exerciseId: z.number().int(),
    }),
  ),
})

export const SetSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(SetType),
  reps: z.number().int().optional(),
  weight: z.number().optional(),
  exerciseId: z.number().int(),
})