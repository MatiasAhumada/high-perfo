import { prisma } from "@/lib/prisma"
import { CreateUserDto, UpdateUserDto } from "@/types/user.types"

export const userRepository = {
  async create(dto: CreateUserDto) {
    return prisma.user.create({
      data: dto,
    })
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  async update(id: string, dto: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data: dto,
    })
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    })
  },

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
  },

  async findAll(accountId: string, search?: string) {
    const where: Record<string, unknown> = {
      accountId,
      deletedAt: null,
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }
    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  },
}
