import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const DESIGN_CONFIG_SELECT = {
  id: true,
  accountId: true,
  primaryColor: true,
  surfaceColor: true,
  surfaceVariant: true,
  textColor: true,
  fontFamilyHead: true,
  fontFamilyBody: true,
  borderRadius: true,
  updatedAt: true,
} satisfies Prisma.DesignConfigSelect

export const designConfigRepository = {
  async findByAccountId(accountId: string) {
    return prisma.designConfig.findUnique({
      where: { accountId },
      select: DESIGN_CONFIG_SELECT,
    })
  },

  async create(data: Prisma.DesignConfigCreateInput) {
    return prisma.designConfig.create({
      data,
      select: DESIGN_CONFIG_SELECT,
    })
  },

  async update(accountId: string, data: Prisma.DesignConfigUpdateInput) {
    return prisma.designConfig.update({
      where: { accountId },
      data,
      select: DESIGN_CONFIG_SELECT,
    })
  },
}
