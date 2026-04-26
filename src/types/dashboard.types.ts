export type DashboardStats = {
  licensesSold: number
  licensesTrend: number
  activeCoaches: number
  coachesTrend: number
  totalAthletes: number
  athletesCapacityPercent: number
  athletesTrend: number
}

export type StatCardData = {
  label: string
  value: number
  unit?: string
  trend: "UP" | "DOWN" | "STABLE"
  trendPercent: number
  trendLabel: string
}

export type ForceVelocityDataPoint = {
  velocity: number
  force: number
  isTheoretical: boolean
}

export type AsymmetryData = {
  left: number
  right: number
  leftLabel: string
  rightLabel: string
  difference: number
  isAlert: boolean
}

export type SessionDataPoint = {
  session: string
  value: number
  isCurrent: boolean
}
