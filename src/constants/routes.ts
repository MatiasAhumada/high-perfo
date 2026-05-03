export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ATHLETES: "/atletas",
  EXERCISES: "/ejercicios",
  TESTS: "/tests",
  ROUTINES: "/rutinas",
  TOOLS: "/herramientas",
  ACCOUNTS: "/cuentas",
  PLANS: "/planes",
  METRICS: "/metricas",
  SETTINGS: "/ajustes",
  COACHES: "/coaches",
} as const;

export const PUBLIC_ROUTES = ["/login"];

export const ROLE_ROUTES = {
  SUPER_ADMIN: [
    "/",
    "/atletas",
    "/ejercicios",
    "/tests",
    "/rutinas",
    "/herramientas",
    "/cuentas",
    "/planes",
    "/metricas",
  ],
  ORG_ADMIN: ["/", "/coaches", "/atletas", "/ajustes"],
  COACH: ["/", "/atletas", "/rutinas", "/herramientas"],
};

export const SIDEBAR_ITEMS_SUPER_ADMIN_COACH = [
  {
    key: "athletes",
    label: "Atletas",
    path: "/atletas",
    icon: "DirectionsRunIcon",
  },
  {
    key: "exercises",
    label: "Ejercicios",
    path: "/ejercicios",
    icon: "FitnessIcon",
  },
  {
    key: "tests",
    label: "Tests",
    path: "/tests",
    icon: "TestIcon",
  },
  {
    key: "routines",
    label: "Rutinas",
    path: "/rutinas",
    icon: "RoutineIcon",
  },
  {
    key: "tools",
    label: "Herramientas",
    path: "/herramientas",
    icon: "ToolboxIcon",
  },
] as const;

export const SIDEBAR_ITEMS_SUPER_ADMIN_ADMIN = [
  {
    key: "accounts",
    label: "Cuentas",
    path: "/cuentas",
    icon: "AccountIcon",
  },
  {
    key: "plans",
    label: "Planes",
    path: "/planes",
    icon: "PlanIcon",
  },
  {
    key: "metrics",
    label: "Métricas",
    path: "/metricas",
    icon: "MetricIcon",
  },
] as const;

export const SIDEBAR_ITEMS = [
  {
    key: "athletes",
    label: "Atletas",
    path: "/atletas",
    icon: "DirectionsRunIcon",
  },
  { key: "routines", label: "Rutinas", path: "/rutinas", icon: "FitnessIcon" },
  {
    key: "tools",
    label: "Herramientas",
    path: "/herramientas",
    icon: "ToolboxIcon",
  },
] as const;

export const SIDEBAR_ITEMS_ADMIN = [
  {
    key: "coaches",
    label: "Entrenadores",
    path: "/coaches",
    icon: "UserGroupIcon",
  },
  {
    key: "athletes",
    label: "Atletas",
    path: "/atletas",
    icon: "DirectionsRunIcon",
  },
  { key: "settings", label: "Ajustes", path: "/ajustes", icon: "SettingsIcon" },
] as const;

export const SIDEBAR_ITEMS_SUPER_ADMIN = [
  {
    key: "coaches",
    label: "Entrenadores",
    path: "/coaches",
    icon: "UserGroupIcon",
  },
  {
    key: "athletes",
    label: "Atletas",
    path: "/atletas",
    icon: "DirectionsRunIcon",
  },
  { key: "routines", label: "Rutinas", path: "/rutinas", icon: "FitnessIcon" },
  {
    key: "tools",
    label: "Herramientas",
    path: "/herramientas",
    icon: "ToolboxIcon",
  },
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
