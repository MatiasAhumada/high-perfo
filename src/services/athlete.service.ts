import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { CreateAthleteDto, UpdateAthleteDto } from "@/types/athlete.types";

interface AthleteSearchParams {
  accountId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const athleteService = {
  async findAll(params: AthleteSearchParams) {
    const { data } = await clientAxios.get(API_ROUTES.ATHLETES, { params });
    return data;
  },

  async findById(id: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ATHLETES}/${id}`);
    return data;
  },

  async create(dto: CreateAthleteDto) {
    const { data } = await clientAxios.post(API_ROUTES.ATHLETES, dto);
    return data;
  },

  async update(id: string, dto: UpdateAthleteDto) {
    const { data } = await clientAxios.patch(`${API_ROUTES.ATHLETES}/${id}`, dto);
    return data;
  },

  async remove(id: string) {
    const { data } = await clientAxios.delete(`${API_ROUTES.ATHLETES}/${id}`);
    return data;
  },
};
