import axios from "axios";
import { API_ROUTES } from "@/constants/routes";

export const accountClient = {
  async getAll() {
    const { data } = await axios.get(API_ROUTES.ACCOUNTS);
    return data;
  },

  async getAllWithCounts() {
    const { data } = await axios.get(`${API_ROUTES.ACCOUNTS}?withCounts=true`);
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

function buildUserParams(accountId?: string, search?: string, isActive?: boolean): string {
  const params = new URLSearchParams();
  if (accountId) params.set("accountId", accountId);
  if (search) params.set("search", search);
  if (isActive !== undefined) params.set("isActive", String(isActive));
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export const userClient = {
  async getAll(accountId?: string, search?: string, isActive?: boolean) {
    const queryString = buildUserParams(accountId, search, isActive);
    const { data } = await axios.get(`${API_ROUTES.USERS}${queryString}`);
    return data;
  },

  async getGlobal(search?: string, isActive?: boolean) {
    const params = new URLSearchParams();
    params.set("global", "true");
    if (search) params.set("search", search);
    if (isActive !== undefined) params.set("isActive", String(isActive));
    const { data } = await axios.get(`${API_ROUTES.USERS}?${params.toString()}`);
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