import axios from "axios";
import { API_ROUTES } from "@/constants/routes";

export const accountClient = {
  async getAll() {
    const { data } = await axios.get(API_ROUTES.ACCOUNTS);
    return data;
  },

  async createWithUser(payload: {
    accountName: string;
    isOrganization: boolean;
    maxCoaches: number;
    maxAthletes: number;
    userEmail: string;
    userName: string;
    userPassword: string;
    userRole: "ORG_ADMIN" | "COACH";
  }) {
    const { data } = await axios.post(API_ROUTES.ACCOUNTS, payload);
    return data;
  },
};

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

  async create(payload: {
    email: string;
    name: string;
    password: string;
    role?: "ORG_ADMIN" | "COACH";
  }, accountId: string) {
    const { data } = await axios.post(`${API_ROUTES.USERS}?accountId=${accountId}`, payload);
    return data;
  },
};