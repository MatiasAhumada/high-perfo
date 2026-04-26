export interface StatItemMock {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  trend: "up" | "down" | "stable";
  trendValue: string;
  trendDescription: string;
}

export const statsMock: StatItemMock[] = [
  {
    id: "stat-001",
    label: "Ventas de Licencias",
    value: "24,500",
    numericValue: 24500,
    trend: "up",
    trendValue: "+12.5%",
    trendDescription: "vs. mes anterior",
  },
  {
    id: "stat-002",
    label: "Entrenadores Activos",
    value: "142",
    numericValue: 142,
    trend: "up",
    trendValue: "+3",
    trendDescription: "nuevos esta semana",
  },
  {
    id: "stat-003",
    label: "Total Atletas",
    value: "3,890",
    numericValue: 3890,
    trend: "stable",
    trendValue: "Estable",
    trendDescription: "capacidad al 85%",
  },
];
