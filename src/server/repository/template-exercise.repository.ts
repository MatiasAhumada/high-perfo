import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const TEMPLATE_EXERCISE_SELECT = {
  id: true,
  templateId: true,
  name: true,
  order: true,
  sets: true,
  reps: true,
  intensityPercent: true,
  createdAt: true,
} satisfies Prisma.TemplateExerciseSelect;

export const templateExerciseRepository = {
  async findByTemplateId(templateId: string) {
    return prisma.templateExercise.findMany({
      where: { templateId },
      select: TEMPLATE_EXERCISE_SELECT,
      orderBy: { order: "asc" },
    });
  },

  async createBulk(items: Prisma.TemplateExerciseCreateManyInput[]) {
    return prisma.templateExercise.createMany({
      data: items,
    });
  },

  async update(id: string, data: Prisma.TemplateExerciseUpdateInput) {
    return prisma.templateExercise.update({
      where: { id },
      data,
      select: TEMPLATE_EXERCISE_SELECT,
    });
  },

  async deleteByTemplateId(templateId: string) {
    return prisma.templateExercise.deleteMany({
      where: { templateId },
    });
  },

  async delete(id: string) {
    return prisma.templateExercise.delete({
      where: { id },
      select: TEMPLATE_EXERCISE_SELECT,
    });
  },
};
