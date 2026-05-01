import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      accountId: string;
    };
  }

  interface User {
    role: Role;
    accountId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    accountId: string;
  }
}
