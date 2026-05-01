import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { CreateMetricDefinitionDto } from "@/types/metric-definition.types";

interface MetricSearchParams {
  accountId: string;
}

interface UpdateMetricData {
  label?: string;
  unit?: string;
  redZoneLimit?: number | null;
  greenZoneLimit?: number | null;
}

export const metricService = {
  async findAll(params: MetricSearchParams) {
    const { data } = await clientAxios.get(API_ROUTES.METRIC_DEFINITIONS, {
      params,
    });
    return data;
  },

  async create(dto: CreateMetricDefinitionDto) {
    const { data } = await clientAxios.post(API_ROUTES.METRIC_DEFINITIONS, dto);
    return data;
  },

  async update(id: string, dto: UpdateMetricData) {
    const { data } = await clientAxios.patch(
      `${API_ROUTES.METRIC_DEFINITIONS}/${id}`,
      dto,
    );
    return data;
  },

  async remove(id: string) {
    const { data } = await clientAxios.delete(
      `${API_ROUTES.METRIC_DEFINITIONS}/${id}`,
    );
    return data;
  },
};
