export interface AthleteMock {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  sport: string;
  birthDate: string;
  avatar?: string;
  active: boolean;
  latestAssessment?: string;
}

export const athletesMock: AthleteMock[] = [
  {
    id: "ath-001",
    firstName: "Mateo",
    lastName: "Rodríguez",
    position: "Delantero",
    sport: "Fútbol",
    birthDate: "1998-03-15",
    active: true,
    latestAssessment: "2026-04-18",
  },
  {
    id: "ath-002",
    firstName: "Valentina",
    lastName: "Soto",
    position: "Central",
    sport: "Voleibol",
    birthDate: "2000-07-22",
    active: true,
    latestAssessment: "2026-04-15",
  },
  {
    id: "ath-003",
    firstName: "Santiago",
    lastName: "Mora",
    position: "Base",
    sport: "Básquetbol",
    birthDate: "1999-11-08",
    active: true,
    latestAssessment: "2026-04-12",
  },
  {
    id: "ath-004",
    firstName: "Isabella",
    lastName: "Reyes",
    position: "Medio Campo",
    sport: "Fútbol",
    birthDate: "2001-01-30",
    active: false,
    latestAssessment: "2026-03-28",
  },
  {
    id: "ath-005",
    firstName: "Tomás",
    lastName: "Vargas",
    position: "Puntero",
    sport: "Handball",
    birthDate: "1997-09-14",
    active: true,
    latestAssessment: "2026-04-20",
  },
  {
    id: "ath-006",
    firstName: "Camila",
    lastName: "Fernández",
    position: "Libero",
    sport: "Voleibol",
    birthDate: "2002-05-19",
    active: true,
    latestAssessment: "2026-04-10",
  },
  {
    id: "ath-007",
    firstName: "Lucas",
    lastName: "Paredes",
    position: "Defensor",
    sport: "Fútbol",
    birthDate: "1998-12-03",
    active: false,
    latestAssessment: "2026-02-15",
  },
  {
    id: "ath-008",
    firstName: "Sofía",
    lastName: "Acosta",
    position: "Ala",
    sport: "Básquetbol",
    birthDate: "2000-08-25",
    active: true,
    latestAssessment: "2026-04-22",
  },
];
