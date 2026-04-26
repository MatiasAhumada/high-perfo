export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ATHLETES: "/atletas",
  ROUTINES: "/rutinas",
  TOOLS: "/herramientas",
  SETTINGS: "/ajustes",
} as const;

export const SIDEBAR_ITEMS = [
  { key: "dashboard", label: "Dashboard", path: "/", icon: "DashboardIcon" },
  { key: "athletes", label: "Atletas", path: "/atletas", icon: "DirectionsRunIcon" },
  { key: "routines", label: "Rutinas", path: "/rutinas", icon: "FitnessIcon" },
  { key: "tools", label: "Herramientas", path: "/herramientas", icon: "ToolboxIcon" },
  { key: "settings", label: "Ajustes", path: "/ajustes", icon: "SettingsIcon" },
] as const;

export const SIDEBAR_ITEMS_ADMIN = [
  { key: "dashboard", label: "Dashboard", path: "/", icon: "DashboardIcon" },
  { key: "usuarios", label: "Usuarios", path: "/usuarios", icon: "UserGroupIcon" },
  { key: "settings", label: "Ajustes", path: "/ajustes", icon: "SettingsIcon" },
] as const;

export const ROUTE_LABELS: Record<string, string> = {
  "": "Inicio",
  login: "Iniciar Sesión",
  atletas: "Atletas",
  rutinas: "Rutinas",
  herramientas: "Herramientas",
  ajustes: "Ajustes",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SESSION: "/api/session",
    REGISTER: "/api/auth/register",
    PASSWORD: "/api/auth/password",
  },
  PLANS: "/api/plans",
  ACCOUNTS: "/api/accounts",
  USERS: "/api/users",
  ATHLETES: "/api/athletes",
  ASSESSMENTS: "/api/assessments",
  METRIC_DEFINITIONS: "/api/metric-definitions",
  ROUTINE_TEMPLATES: "/api/routine-templates",
  ROUTINES: "/api/routines",
  TOOLS: "/api/tools",
  STATS: "/api/stats",
  DESIGN: "/api/design",
} as const;
