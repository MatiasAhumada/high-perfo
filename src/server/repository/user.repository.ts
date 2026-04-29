import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "@/types/user.types";

const USER_SELECT_BASE = {
  id: true,
  email: true,
  name: true,
  role: true,
  accountId: true,
  createdAt: true,
  updatedAt: true,
};

export const userRepository = {
  async create(dto: CreateUserDto) {
    return prisma.user.create({
      data: dto,
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async update(id: string, dto: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data: dto,
    });
  },

  async delete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  },

  async updateActiveStatus(id: string, isActive: boolean) {
    return prisma.user.update({
      where: { id },
      data: { isActive },
    });
  },

  async findAll(accountId: string, search?: string, isActive?: boolean) {
    const where: Record<string, unknown> = {
      accountId,
    };

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },

  async findAllGlobal(search?: string, isActive?: boolean) {
    const where: Record<string, unknown> = {};

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        account: {
          select: {
            id: true,
            name: true,
            isOrganization: true,
          },
        },
      },
    });
  },

  async countByAccount(accountId: string) {
    return prisma.user.count({
      where: { accountId },
    });
  },
};