// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createContextInner } from "../../context";
import { PrismaClient, Prisma } from "@acme/db";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";

export type MockCtxType = {
  auth: SignedInAuthObject | SignedOutAuthObject;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};

export const mockCtx = await createContextInner({
  auth: {
    actor: undefined,
    sessionClaims: {
      exp: 0,
      iat: 0,
      iss: "",
      nbf: 0,
      sid: "",
      sub: "",
      __raw: "",
    },
    sessionId: "",
    session: undefined,
    userId: "user_2WF5lyB5nEesWnuDsU4WacA7hRV", // Must fill with legitimate userId to pass tRPC checks; Replace with a legit userId from the app when needed
    user: undefined,
    orgId: undefined,
    orgRole: undefined,
    orgSlug: undefined,
    organization: undefined,
    getToken: async () => null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    debug: () => {},
  },
});
