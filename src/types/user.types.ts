import { User } from "@prisma/client";

export type UserResponse = Pick<
  User,
  "id" | "email" | "name" | "role" | "accountId" | "createdAt" | "updatedAt"
>;

export type CreateUserDto = Pick<
  User,
  "email" | "name" | "password" | "accountId" | "role"
>;

export type UpdateUserDto = Partial<
  Pick<User, "email" | "name" | "role" | "password">
>;

export type UserListItem = Pick<User, "id" | "name" | "email" | "role"> & {
  assignedAthletesCount: number;
  specialty: string;
  status: UserStatus;
};

export type UserStatus = "ACTIVE" | "INACTIVE";
