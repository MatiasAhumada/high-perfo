import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

interface RoutineByAthleteParams {
  status?: string;
}

interface AssignRoutineData {
  templateId: string;
  startDate: string;
  endDate?: string;
}

interface UpdateRoutineStatusData {
  status: string;
}

export const routineService = {
  async findByAthlete(athleteId: string, params: RoutineByAthleteParams) {
    const { data } = await clientAxios.get(
      `${API_ROUTES.ATHLETES}/${athleteId}/routines`,
      { params },
    );
    return data;
  },

  async findById(id: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ROUTINES}/${id}`);
    return data;
  },

  async assign(athleteId: string, dto: AssignRoutineData) {
    const { data } = await clientAxios.post(
      `${API_ROUTES.ATHLETES}/${athleteId}/routines`,
      dto,
    );
    return data;
  },

  async updateStatus(id: string, dto: UpdateRoutineStatusData) {
    const { data } = await clientAxios.patch(
      `${API_ROUTES.ROUTINES}/${id}`,
      dto,
    );
    return data;
  },

  async send(id: string) {
    const { data } = await clientAxios.post(
      `${API_ROUTES.ROUTINES}/${id}/send`,
    );
    return data;
  },
};
