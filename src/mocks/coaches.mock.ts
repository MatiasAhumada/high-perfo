export interface CoachMock {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  active: boolean;
  assignedAthletes: number;
  maxAthletes: number;
}

export const coachesMock: CoachMock[] = [
  {
    id: "coach-001",
    firstName: "Alejandro",
    lastName: "Gutiérrez",
    email: "a.gutierrez@highperfo.com",
    specialty: "Fuerza y Potencia",
    active: true,
    assignedAthletes: 8,
    maxAthletes: 12,
  },
  {
    id: "coach-002",
    firstName: "María",
    lastName: "López",
    email: "m.lopez@highperfo.com",
    specialty: "Rehabilitación",
    active: true,
    assignedAthletes: 5,
    maxAthletes: 10,
  },
  {
    id: "coach-003",
    firstName: "Diego",
    lastName: "Herrera",
    email: "d.herrera@highperfo.com",
    specialty: "Velocidad y Agilidad",
    active: true,
    assignedAthletes: 6,
    maxAthletes: 12,
  },
  {
    id: "coach-004",
    firstName: "Carolina",
    lastName: "Méndez",
    email: "c.mendez@highperfo.com",
    specialty: "Pliometría",
    active: false,
    assignedAthletes: 0,
    maxAthletes: 8,
  },
  {
    id: "coach-005",
    firstName: "Fernando",
    lastName: "Ríos",
    email: "f.rios@highperfo.com",
    specialty: "VBT y Tecnología",
    active: true,
    assignedAthletes: 3,
    maxAthletes: 10,
  },
];
