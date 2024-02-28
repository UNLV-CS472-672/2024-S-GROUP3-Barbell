// import { PrismaClient } from "@prisma/client"

// import invariant from "tiny-invariant"

// import { env } from "./env.mjs"
// import { singleton } from "./singleton.server"

// Hard-code a unique key, so we can look up the client when this module gets re-imported
// const prisma = singleton("prisma", getPrismaClient)

// async function getPrismaClient() {
//   const databaseUrl = new URL(env.DATABASE_URL)

//   const isLocalHost = databaseUrl.hostname === "localhost"

//   const PRIMARY_REGION = isLocalHost ? null : process.env.PRIMARY_REGION
//   const FLY_REGION = isLocalHost ? null : process.env.FLY_REGION

//   const isReadReplicaRegion = !PRIMARY_REGION || PRIMARY_REGION === FLY_REGION

//   if (!isLocalHost) {
//     if (databaseUrl.host.endsWith(".internal")) {
//       databaseUrl.host = `${FLY_REGION}.${databaseUrl.host}`
//     }

//     if (!isReadReplicaRegion) {
//       // 5433 is the read-replica port
//       databaseUrl.port = "5433"
//     }
//   }

//   console.log(`🔌 setting up prisma client to ${databaseUrl.host}`)
//   // NOTE: during development if you change anything in this function, remember
//   // that this only runs once per server restart and won't automatically be
//   // re-run per request like everything else is. So if you need to change
//   // something in this file, you'll need to manually restart the server.
//   const client = new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development" &&
//       (process.env.LOG === undefined || process.env.LOG === "true")
//         ? ["query", "error", "warn"]
//         : ["error"],
//     errorFormat: "pretty",
//     datasourceUrl: env.DATABASE_URL,
//   })

//   // connect eagerly
//   return await client.$connect()
// }

// export { prisma }

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Read this bad boi: https://pris.ly/d/help/next-js-best-practices

import { PrismaClient } from "@prisma/client"

import { env } from "./env.mjs"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" &&
      (process.env.LOG === undefined || process.env.LOG === "true")
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: "pretty",
    datasourceUrl: env.DATABASE_URL,
  })

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
