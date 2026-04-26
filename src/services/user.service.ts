import axios from "axios";
import { API_ROUTES } from "@/constants/routes";

export const userClient = {
  async getAll(accountId?: string) {
    const params = accountId ? `?accountId=${accountId}` : "";
    const { data } = await axios.get(`${API_ROUTES.USERS}${params}`);
    return data;
  },

  async getGlobal() {
    const { data } = await axios.get(`${API_ROUTES.USERS}?global=true`);
    return data;
  },

  async create(
    payload: {
      email: string;
      name: string;
      password: string;
      role?: "ORG_ADMIN" | "COACH";
    },
    accountId: string
  ) {
    const { data } = await axios.post(`${API_ROUTES.USERS}?accountId=${accountId}`, payload);
    return data;
  },

  async createWithRole(
    payload: {
      email: string;
      name: string;
      password: string;
      role: "ORG_ADMIN" | "COACH";
    },
    accountId: string
  ) {
    const { data } = await axios.post(`${API_ROUTES.USERS}?accountId=${accountId}`, payload);
    return data;
  },

  async updateStatus(userId: string, isActive: boolean) {
    const { data } = await axios.patch(`${API_ROUTES.USERS}/${userId}`, { isActive });
    return data;
  },
};