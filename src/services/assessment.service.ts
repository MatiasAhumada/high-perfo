import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { CreateAssessmentDto } from "@/types/assessment.types";

interface AssessmentByAthleteParams {
  page?: number;
  pageSize?: number;
}

interface UpdateAssessmentData {
  date?: string;
  type?: string;
  bodyWeight?: number;
  results?: { key: string; rawValue: number; calculatedValue?: number }[];
}

export const assessmentService = {
  async findByAthlete(athleteId: string, params: AssessmentByAthleteParams) {
    const { data } = await clientAxios.get(
      `${API_ROUTES.ATHLETES}/${athleteId}/assessments`,
      { params },
    );
    return data;
  },

  async findById(id: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ASSESSMENTS}/${id}`);
    return data;
  },

  async create(athleteId: string, dto: CreateAssessmentDto) {
    const { data } = await clientAxios.post(
      `${API_ROUTES.ATHLETES}/${athleteId}/assessments`,
      dto,
    );
    return data;
  },

  async update(id: string, dto: UpdateAssessmentData) {
    const { data } = await clientAxios.patch(
      `${API_ROUTES.ASSESSMENTS}/${id}`,
      dto,
    );
    return data;
  },

  async remove(id: string) {
    const { data } = await clientAxios.delete(
      `${API_ROUTES.ASSESSMENTS}/${id}`,
    );
    return data;
  },
};
