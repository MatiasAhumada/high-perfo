export interface MetricResultMock {
  key: string;
  rawValue: number;
  calculatedValue: number;
  unit: string;
}

export interface SessionDataMock {
  date: string;
  label: string;
  sj: number;
  cmj: number;
  dj: number;
}

export interface ForceVelocityPointMock {
  velocity: number;
  force: number;
  theoreticalForce: number;
}

export interface AsymmetryDataMock {
  side: string;
  value: number;
}

export interface AssessmentMock {
  id: string;
  athleteId: string;
  date: string;
  type: string;
  bodyWeight: number;
  metrics: MetricResultMock[];
  sessionHistory: SessionDataMock[];
  forceVelocityData: ForceVelocityPointMock[];
  asymmetryData: AsymmetryDataMock[];
  asiIndex: number;
}

export const assessmentsMock: AssessmentMock[] = [
  {
    id: "ass-001",
    athleteId: "ath-001",
    date: "2026-04-18",
    type: "Neuromuscular",
    bodyWeight: 82,
    metrics: [
      { key: "SJ", rawValue: 34.2, calculatedValue: 34.2, unit: "cm" },
      { key: "CMJ", rawValue: 38.5, calculatedValue: 38.5, unit: "cm" },
      { key: "DJ", rawValue: 31.8, calculatedValue: 31.8, unit: "cm" },
      { key: "F0", rawValue: 2850, calculatedValue: 2850, unit: "N" },
      { key: "V0", rawValue: 4.2, calculatedValue: 4.2, unit: "m/s" },
      { key: "ASI", rawValue: 8.3, calculatedValue: 8.3, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-01", label: "S1", sj: 32.1, cmj: 36.0, dj: 29.5 },
      { date: "2026-03-08", label: "S2", sj: 33.0, cmj: 37.2, dj: 30.1 },
      { date: "2026-03-15", label: "S3", sj: 32.8, cmj: 36.8, dj: 30.5 },
      { date: "2026-03-22", label: "S4", sj: 33.5, cmj: 37.5, dj: 30.9 },
      { date: "2026-04-01", label: "S5", sj: 33.8, cmj: 38.0, dj: 31.2 },
      { date: "2026-04-08", label: "S6", sj: 34.0, cmj: 38.2, dj: 31.5 },
      { date: "2026-04-18", label: "S7", sj: 34.2, cmj: 38.5, dj: 31.8 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 2850, theoreticalForce: 3100 },
      { velocity: 0.5, force: 2520, theoreticalForce: 2730 },
      { velocity: 1.0, force: 2210, theoreticalForce: 2360 },
      { velocity: 1.5, force: 1850, theoreticalForce: 1990 },
      { velocity: 2.0, force: 1480, theoreticalForce: 1620 },
      { velocity: 2.5, force: 1100, theoreticalForce: 1250 },
      { velocity: 3.0, force: 720, theoreticalForce: 880 },
      { velocity: 3.5, force: 380, theoreticalForce: 510 },
      { velocity: 4.0, force: 120, theoreticalForce: 140 },
      { velocity: 4.2, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 48.5 },
      { side: "Derecho", value: 52.8 },
    ],
    asiIndex: 8.3,
  },
  {
    id: "ass-002",
    athleteId: "ath-002",
    date: "2026-04-15",
    type: "Neuromuscular",
    bodyWeight: 68,
    metrics: [
      { key: "SJ", rawValue: 28.5, calculatedValue: 28.5, unit: "cm" },
      { key: "CMJ", rawValue: 32.1, calculatedValue: 32.1, unit: "cm" },
      { key: "DJ", rawValue: 26.3, calculatedValue: 26.3, unit: "cm" },
      { key: "F0", rawValue: 2100, calculatedValue: 2100, unit: "N" },
      { key: "V0", rawValue: 3.8, calculatedValue: 3.8, unit: "m/s" },
      { key: "ASI", rawValue: 18.2, calculatedValue: 18.2, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-01", label: "S1", sj: 27.0, cmj: 30.5, dj: 24.8 },
      { date: "2026-03-08", label: "S2", sj: 27.5, cmj: 31.0, dj: 25.2 },
      { date: "2026-03-15", label: "S3", sj: 27.8, cmj: 31.3, dj: 25.5 },
      { date: "2026-03-22", label: "S4", sj: 28.0, cmj: 31.5, dj: 25.8 },
      { date: "2026-04-01", label: "S5", sj: 28.2, cmj: 31.8, dj: 26.0 },
      { date: "2026-04-08", label: "S6", sj: 28.3, cmj: 31.9, dj: 26.1 },
      { date: "2026-04-15", label: "S7", sj: 28.5, cmj: 32.1, dj: 26.3 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 2100, theoreticalForce: 2400 },
      { velocity: 0.5, force: 1850, theoreticalForce: 2100 },
      { velocity: 1.0, force: 1580, theoreticalForce: 1800 },
      { velocity: 1.5, force: 1300, theoreticalForce: 1500 },
      { velocity: 2.0, force: 1020, theoreticalForce: 1200 },
      { velocity: 2.5, force: 740, theoreticalForce: 900 },
      { velocity: 3.0, force: 480, theoreticalForce: 600 },
      { velocity: 3.5, force: 240, theoreticalForce: 300 },
      { velocity: 3.8, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 40.9 },
      { side: "Derecho", value: 59.1 },
    ],
    asiIndex: 18.2,
  },
  {
    id: "ass-003",
    athleteId: "ath-003",
    date: "2026-04-12",
    type: "Neuromuscular",
    bodyWeight: 95,
    metrics: [
      { key: "SJ", rawValue: 29.8, calculatedValue: 29.8, unit: "cm" },
      { key: "CMJ", rawValue: 33.6, calculatedValue: 33.6, unit: "cm" },
      { key: "DJ", rawValue: 27.4, calculatedValue: 27.4, unit: "cm" },
      { key: "F0", rawValue: 3200, calculatedValue: 3200, unit: "N" },
      { key: "V0", rawValue: 3.5, calculatedValue: 3.5, unit: "m/s" },
      { key: "ASI", rawValue: 5.1, calculatedValue: 5.1, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-01", label: "S1", sj: 28.0, cmj: 31.5, dj: 25.5 },
      { date: "2026-03-08", label: "S2", sj: 28.5, cmj: 32.0, dj: 26.0 },
      { date: "2026-03-15", label: "S3", sj: 28.8, cmj: 32.5, dj: 26.5 },
      { date: "2026-03-22", label: "S4", sj: 29.0, cmj: 32.8, dj: 26.8 },
      { date: "2026-04-01", label: "S5", sj: 29.3, cmj: 33.0, dj: 27.0 },
      { date: "2026-04-08", label: "S6", sj: 29.5, cmj: 33.3, dj: 27.2 },
      { date: "2026-04-12", label: "S7", sj: 29.8, cmj: 33.6, dj: 27.4 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 3200, theoreticalForce: 3500 },
      { velocity: 0.5, force: 2780, theoreticalForce: 3050 },
      { velocity: 1.0, force: 2380, theoreticalForce: 2600 },
      { velocity: 1.5, force: 1960, theoreticalForce: 2150 },
      { velocity: 2.0, force: 1550, theoreticalForce: 1700 },
      { velocity: 2.5, force: 1130, theoreticalForce: 1250 },
      { velocity: 3.0, force: 700, theoreticalForce: 800 },
      { velocity: 3.5, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 49.7 },
      { side: "Derecho", value: 50.3 },
    ],
    asiIndex: 5.1,
  },
  {
    id: "ass-004",
    athleteId: "ath-004",
    date: "2026-03-28",
    type: "Neuromuscular",
    bodyWeight: 58,
    metrics: [
      { key: "SJ", rawValue: 22.4, calculatedValue: 22.4, unit: "cm" },
      { key: "CMJ", rawValue: 25.8, calculatedValue: 25.8, unit: "cm" },
      { key: "DJ", rawValue: 20.1, calculatedValue: 20.1, unit: "cm" },
      { key: "F0", rawValue: 1650, calculatedValue: 1650, unit: "N" },
      { key: "V0", rawValue: 3.2, calculatedValue: 3.2, unit: "m/s" },
      { key: "ASI", rawValue: 11.7, calculatedValue: 11.7, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-02-01", label: "S1", sj: 21.0, cmj: 24.2, dj: 18.8 },
      { date: "2026-02-10", label: "S2", sj: 21.4, cmj: 24.6, dj: 19.2 },
      { date: "2026-02-18", label: "S3", sj: 21.8, cmj: 25.0, dj: 19.5 },
      { date: "2026-02-28", label: "S4", sj: 22.0, cmj: 25.3, dj: 19.8 },
      { date: "2026-03-10", label: "S5", sj: 22.1, cmj: 25.5, dj: 19.9 },
      { date: "2026-03-20", label: "S6", sj: 22.3, cmj: 25.6, dj: 20.0 },
      { date: "2026-03-28", label: "S7", sj: 22.4, cmj: 25.8, dj: 20.1 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 1650, theoreticalForce: 1900 },
      { velocity: 0.5, force: 1420, theoreticalForce: 1630 },
      { velocity: 1.0, force: 1200, theoreticalForce: 1360 },
      { velocity: 1.5, force: 980, theoreticalForce: 1090 },
      { velocity: 2.0, force: 760, theoreticalForce: 820 },
      { velocity: 2.5, force: 530, theoreticalForce: 550 },
      { velocity: 3.0, force: 300, theoreticalForce: 280 },
      { velocity: 3.2, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 46.2 },
      { side: "Derecho", value: 53.8 },
    ],
    asiIndex: 11.7,
  },
  {
    id: "ass-005",
    athleteId: "ath-005",
    date: "2026-04-20",
    type: "Neuromuscular",
    bodyWeight: 90,
    metrics: [
      { key: "SJ", rawValue: 31.5, calculatedValue: 31.5, unit: "cm" },
      { key: "CMJ", rawValue: 36.2, calculatedValue: 36.2, unit: "cm" },
      { key: "DJ", rawValue: 29.0, calculatedValue: 29.0, unit: "cm" },
      { key: "F0", rawValue: 2950, calculatedValue: 2950, unit: "N" },
      { key: "V0", rawValue: 4.0, calculatedValue: 4.0, unit: "m/s" },
      { key: "ASI", rawValue: 6.8, calculatedValue: 6.8, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-05", label: "S1", sj: 29.5, cmj: 34.0, dj: 27.0 },
      { date: "2026-03-12", label: "S2", sj: 30.0, cmj: 34.5, dj: 27.5 },
      { date: "2026-03-19", label: "S3", sj: 30.3, cmj: 35.0, dj: 28.0 },
      { date: "2026-03-26", label: "S4", sj: 30.6, cmj: 35.3, dj: 28.2 },
      { date: "2026-04-02", label: "S5", sj: 30.9, cmj: 35.6, dj: 28.5 },
      { date: "2026-04-10", label: "S6", sj: 31.2, cmj: 35.9, dj: 28.8 },
      { date: "2026-04-20", label: "S7", sj: 31.5, cmj: 36.2, dj: 29.0 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 2950, theoreticalForce: 3200 },
      { velocity: 0.5, force: 2600, theoreticalForce: 2820 },
      { velocity: 1.0, force: 2250, theoreticalForce: 2440 },
      { velocity: 1.5, force: 1880, theoreticalForce: 2060 },
      { velocity: 2.0, force: 1500, theoreticalForce: 1680 },
      { velocity: 2.5, force: 1120, theoreticalForce: 1300 },
      { velocity: 3.0, force: 740, theoreticalForce: 920 },
      { velocity: 3.5, force: 380, theoreticalForce: 540 },
      { velocity: 4.0, force: 100, theoreticalForce: 160 },
      { velocity: 4.0, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 49.9 },
      { side: "Derecho", value: 50.1 },
    ],
    asiIndex: 6.8,
  },
  {
    id: "ass-006",
    athleteId: "ath-006",
    date: "2026-04-10",
    type: "Neuromuscular",
    bodyWeight: 62,
    metrics: [
      { key: "SJ", rawValue: 25.3, calculatedValue: 25.3, unit: "cm" },
      { key: "CMJ", rawValue: 29.0, calculatedValue: 29.0, unit: "cm" },
      { key: "DJ", rawValue: 23.5, calculatedValue: 23.5, unit: "cm" },
      { key: "F0", rawValue: 1800, calculatedValue: 1800, unit: "N" },
      { key: "V0", rawValue: 3.6, calculatedValue: 3.6, unit: "m/s" },
      { key: "ASI", rawValue: 16.4, calculatedValue: 16.4, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-02", label: "S1", sj: 24.0, cmj: 27.5, dj: 22.0 },
      { date: "2026-03-09", label: "S2", sj: 24.3, cmj: 27.8, dj: 22.3 },
      { date: "2026-03-16", label: "S3", sj: 24.5, cmj: 28.2, dj: 22.6 },
      { date: "2026-03-23", label: "S4", sj: 24.7, cmj: 28.5, dj: 22.9 },
      { date: "2026-04-01", label: "S5", sj: 24.9, cmj: 28.7, dj: 23.1 },
      { date: "2026-04-08", label: "S6", sj: 25.1, cmj: 28.9, dj: 23.3 },
      { date: "2026-04-10", label: "S7", sj: 25.3, cmj: 29.0, dj: 23.5 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 1800, theoreticalForce: 2100 },
      { velocity: 0.5, force: 1560, theoreticalForce: 1810 },
      { velocity: 1.0, force: 1320, theoreticalForce: 1520 },
      { velocity: 1.5, force: 1080, theoreticalForce: 1230 },
      { velocity: 2.0, force: 840, theoreticalForce: 940 },
      { velocity: 2.5, force: 600, theoreticalForce: 650 },
      { velocity: 3.0, force: 360, theoreticalForce: 360 },
      { velocity: 3.6, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 41.8 },
      { side: "Derecho", value: 58.2 },
    ],
    asiIndex: 16.4,
  },
  {
    id: "ass-007",
    athleteId: "ath-007",
    date: "2026-02-15",
    type: "Antropometría",
    bodyWeight: 78,
    metrics: [
      { key: "SJ", rawValue: 27.0, calculatedValue: 27.0, unit: "cm" },
      { key: "CMJ", rawValue: 30.5, calculatedValue: 30.5, unit: "cm" },
      { key: "DJ", rawValue: 24.2, calculatedValue: 24.2, unit: "cm" },
      { key: "F0", rawValue: 2300, calculatedValue: 2300, unit: "N" },
      { key: "V0", rawValue: 3.4, calculatedValue: 3.4, unit: "m/s" },
      { key: "ASI", rawValue: 12.5, calculatedValue: 12.5, unit: "%" },
    ],
    sessionHistory: [
      { date: "2025-12-01", label: "S1", sj: 28.5, cmj: 32.0, dj: 25.8 },
      { date: "2025-12-15", label: "S2", sj: 28.0, cmj: 31.5, dj: 25.2 },
      { date: "2026-01-05", label: "S3", sj: 27.5, cmj: 31.0, dj: 24.8 },
      { date: "2026-01-20", label: "S4", sj: 27.2, cmj: 30.8, dj: 24.5 },
      { date: "2026-02-01", label: "S5", sj: 27.1, cmj: 30.6, dj: 24.3 },
      { date: "2026-02-10", label: "S6", sj: 27.0, cmj: 30.5, dj: 24.2 },
      { date: "2026-02-15", label: "S7", sj: 27.0, cmj: 30.5, dj: 24.2 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 2300, theoreticalForce: 2600 },
      { velocity: 0.5, force: 2000, theoreticalForce: 2250 },
      { velocity: 1.0, force: 1700, theoreticalForce: 1900 },
      { velocity: 1.5, force: 1380, theoreticalForce: 1550 },
      { velocity: 2.0, force: 1060, theoreticalForce: 1200 },
      { velocity: 2.5, force: 740, theoreticalForce: 850 },
      { velocity: 3.0, force: 420, theoreticalForce: 500 },
      { velocity: 3.4, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 43.8 },
      { side: "Derecho", value: 56.2 },
    ],
    asiIndex: 12.5,
  },
  {
    id: "ass-008",
    athleteId: "ath-008",
    date: "2026-04-22",
    type: "VBT",
    bodyWeight: 71,
    metrics: [
      { key: "SJ", rawValue: 30.1, calculatedValue: 30.1, unit: "cm" },
      { key: "CMJ", rawValue: 34.5, calculatedValue: 34.5, unit: "cm" },
      { key: "DJ", rawValue: 27.8, calculatedValue: 27.8, unit: "cm" },
      { key: "F0", rawValue: 2500, calculatedValue: 2500, unit: "N" },
      { key: "V0", rawValue: 3.9, calculatedValue: 3.9, unit: "m/s" },
      { key: "ASI", rawValue: 4.2, calculatedValue: 4.2, unit: "%" },
    ],
    sessionHistory: [
      { date: "2026-03-03", label: "S1", sj: 28.5, cmj: 32.8, dj: 26.0 },
      { date: "2026-03-10", label: "S2", sj: 28.9, cmj: 33.2, dj: 26.4 },
      { date: "2026-03-17", label: "S3", sj: 29.2, cmj: 33.5, dj: 26.8 },
      { date: "2026-03-24", label: "S4", sj: 29.5, cmj: 33.8, dj: 27.1 },
      { date: "2026-04-01", label: "S5", sj: 29.7, cmj: 34.0, dj: 27.4 },
      { date: "2026-04-10", label: "S6", sj: 29.9, cmj: 34.3, dj: 27.6 },
      { date: "2026-04-22", label: "S7", sj: 30.1, cmj: 34.5, dj: 27.8 },
    ],
    forceVelocityData: [
      { velocity: 0, force: 2500, theoreticalForce: 2800 },
      { velocity: 0.5, force: 2200, theoreticalForce: 2450 },
      { velocity: 1.0, force: 1890, theoreticalForce: 2100 },
      { velocity: 1.5, force: 1560, theoreticalForce: 1750 },
      { velocity: 2.0, force: 1230, theoreticalForce: 1400 },
      { velocity: 2.5, force: 900, theoreticalForce: 1050 },
      { velocity: 3.0, force: 570, theoreticalForce: 700 },
      { velocity: 3.5, force: 250, theoreticalForce: 350 },
      { velocity: 3.9, force: 0, theoreticalForce: 0 },
    ],
    asymmetryData: [
      { side: "Izquierdo", value: 49.0 },
      { side: "Derecho", value: 51.0 },
    ],
    asiIndex: 4.2,
  },
];
