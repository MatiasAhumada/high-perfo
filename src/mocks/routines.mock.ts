export interface TemplateExerciseMock {
  id: string;
  exerciseName: string;
  sets: number;
  reps: number;
  percent1RM: number;
  advancedSettings: boolean;
}

export interface RoutineTemplateMock {
  id: string;
  name: string;
  description: string;
  exercises: TemplateExerciseMock[];
  toolboxItems: string[];
  createdAt: string;
}

export const routinesMock: RoutineTemplateMock[] = [
  {
    id: "rt-001",
    name: "Sistema Búlgaro - Fuerza Máxima",
    description: "Protocolo de fuerza máxima basado en el sistema búlgaro con cargas elevadas y volumen reducido",
    exercises: [
      { id: "ex-001", exerciseName: "Sentadilla Frontal", sets: 5, reps: 3, percent1RM: 90, advancedSettings: false },
      { id: "ex-002", exerciseName: "Press Militar", sets: 4, reps: 4, percent1RM: 85, advancedSettings: false },
      { id: "ex-003", exerciseName: "Peso Muerto Rumano", sets: 4, reps: 3, percent1RM: 88, advancedSettings: true },
      { id: "ex-004", exerciseName: "Clean Pull", sets: 3, reps: 5, percent1RM: 80, advancedSettings: false },
    ],
    toolboxItems: ["soft-tissue", "mobility"],
    createdAt: "2026-03-15",
  },
  {
    id: "rt-002",
    name: "Potencia Explosiva - VBT",
    description: "Rutina de potencia basada en Velocity Based Training con rangos de velocidad óptimos",
    exercises: [
      { id: "ex-005", exerciseName: "Sentadilla con Salto", sets: 4, reps: 5, percent1RM: 55, advancedSettings: false },
      { id: "ex-006", exerciseName: "Press Banco con Pause", sets: 3, reps: 3, percent1RM: 70, advancedSettings: true },
      { id: "ex-007", exerciseName: "Thruster", sets: 4, reps: 6, percent1RM: 50, advancedSettings: false },
    ],
    toolboxItems: ["plyometry", "soft-tissue"],
    createdAt: "2026-04-01",
  },
  {
    id: "rt-003",
    name: "Regeneración Activa",
    description: "Protocolo de recuperación activa con ejercicios de baja intensidad y movilidad",
    exercises: [
      { id: "ex-008", exerciseName: "Sentadilla Goblet", sets: 3, reps: 10, percent1RM: 30, advancedSettings: false },
      { id: "ex-009", exerciseName: "Hip Thrust con Banda", sets: 3, reps: 12, percent1RM: 40, advancedSettings: false },
      { id: "ex-010", exerciseName: "Face Pull", sets: 3, reps: 15, percent1RM: 25, advancedSettings: false },
      { id: "ex-011", exerciseName: "Pallof Press", sets: 3, reps: 10, percent1RM: 20, advancedSettings: false },
    ],
    toolboxItems: ["mobility", "soft-tissue", "asymmetry-test"],
    createdAt: "2026-04-10",
  },
];
