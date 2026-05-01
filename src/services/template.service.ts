import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { CreateRoutineTemplateDto } from "@/types/routine-template.types";

interface TemplateSearchParams {
  accountId: string;
  search?: string;
}

interface UpdateTemplateData {
  name?: string;
  description?: string;
  exercises?: {
    name: string;
    order: number;
    sets: number;
    reps: number;
    intensityPercent?: number;
  }[];
}

export const templateService = {
  async findAll(params: TemplateSearchParams) {
    const { data } = await clientAxios.get(API_ROUTES.ROUTINE_TEMPLATES, {
      params,
    });
    return data;
  },

  async findById(id: string) {
    const { data } = await clientAxios.get(
      `${API_ROUTES.ROUTINE_TEMPLATES}/${id}`,
    );
    return data;
  },

  async create(dto: CreateRoutineTemplateDto) {
    const { data } = await clientAxios.post(API_ROUTES.ROUTINE_TEMPLATES, dto);
    return data;
  },

  async update(id: string, dto: UpdateTemplateData) {
    const { data } = await clientAxios.patch(
      `${API_ROUTES.ROUTINE_TEMPLATES}/${id}`,
      dto,
    );
    return data;
  },

  async remove(id: string) {
    const { data } = await clientAxios.delete(
      `${API_ROUTES.ROUTINE_TEMPLATES}/${id}`,
    );
    return data;
  },
};
