import { SportType } from "@prisma/client";

export const SPORTS = {
  RUGBY: "RUGBY",
  FUTBOL: "FUTBOL",
  BASQUET: "BASQUET",
  TENIS: "TENIS",
} as const;

export const SPORT_LABELS: Record<SportType, string> = {
  RUGBY: "Rugby",
  FUTBOL: "Fútbol",
  BASQUET: "Básquet",
  TENIS: "Tenis",
};

export const SPORT_ICONS: Record<SportType, string> = {
  RUGBY: "🏉",
  FUTBOL: "⚽",
  BASQUET: "🏀",
  TENIS: "🎾",
};

export const SPORT_COLORS: Record<SportType, string> = {
  RUGBY: "#8B4513",
  FUTBOL: "#00A86B",
  BASQUET: "#FF6B35",
  TENIS: "#FFD700",
};

export const SPORT_POSITIONS: Record<SportType, string[]> = {
  RUGBY: [
    "1 - Pilar Izquierdo",
    "2 - Hooker",
    "3 - Pilar Derecho",
    "4 - Segunda Línea",
    "5 - Segunda Línea",
    "6 - Ala",
    "7 - Ala Abierto",
    "8 - Octavo",
    "9 - Medio Scrum",
    "10 - Apertura",
    "11 - Wing Izquierdo",
    "12 - Primer Centro",
    "13 - Segundo Centro",
    "14 - Wing Derecho",
    "15 - Fullback",
  ],
  FUTBOL: [
    "Arquero",
    "Lateral Derecho",
    "Lateral Izquierdo",
    "Defensor Central",
    "Líbero",
    "Mediocampista Defensivo",
    "Mediocampista Central",
    "Mediocampista Ofensivo",
    "Extremo Derecho",
    "Extremo Izquierdo",
    "Delantero Centro",
    "Segundo Delantero",
  ],
  BASQUET: [
    "Base (Point Guard)",
    "Escolta (Shooting Guard)",
    "Alero (Small Forward)",
    "Ala-Pívot (Power Forward)",
    "Pívot (Center)",
  ],
  TENIS: ["Individual", "Dobles"],
};

export const SPORT_METRICS: Record<SportType, string[]> = {
  RUGBY: [
    "Fuerza Máxima",
    "Potencia Explosiva",
    "Resistencia Anaeróbica",
    "Velocidad Sprint",
    "Agilidad",
    "Tackle Power",
  ],
  FUTBOL: [
    "Velocidad Sprint",
    "Resistencia Aeróbica",
    "Agilidad",
    "Potencia de Salto",
    "Cambios de Dirección",
    "VO2 Max",
  ],
  BASQUET: [
    "Salto Vertical",
    "Velocidad",
    "Agilidad Lateral",
    "Resistencia Anaeróbica",
    "Potencia Explosiva",
    "Coordinación",
  ],
  TENIS: [
    "Velocidad de Reacción",
    "Resistencia Aeróbica",
    "Potencia de Golpe",
    "Agilidad Multidireccional",
    "Flexibilidad",
    "Resistencia Mental",
  ],
};

export const SPORT_TRAINING_FOCUS: Record<SportType, string[]> = {
  RUGBY: [
    "Fuerza de Contacto",
    "Potencia de Empuje",
    "Resistencia al Impacto",
    "Velocidad en Espacios Cortos",
    "Trabajo de Scrum",
  ],
  FUTBOL: [
    "Resistencia Cardiovascular",
    "Velocidad de Sprint",
    "Técnica de Pase",
    "Control de Balón",
    "Tiro a Portería",
  ],
  BASQUET: [
    "Salto y Rebote",
    "Velocidad de Desplazamiento",
    "Tiro en Suspensión",
    "Defensa Lateral",
    "Coordinación Mano-Ojo",
  ],
  TENIS: [
    "Servicio",
    "Golpe de Derecha",
    "Golpe de Revés",
    "Volea",
    "Desplazamiento en Cancha",
    "Resistencia de Partido",
  ],
};

export const SPORT_DESCRIPTIONS: Record<SportType, string> = {
  RUGBY:
    "Deporte de contacto que requiere fuerza, potencia y resistencia anaeróbica. Enfoque en trabajo de scrum, tackles y sprints cortos.",
  FUTBOL:
    "Deporte de resistencia con sprints intermitentes. Requiere excelente capacidad cardiovascular, velocidad y técnica con el balón.",
  BASQUET:
    "Deporte de alta intensidad con saltos constantes y cambios de dirección. Enfoque en potencia explosiva y agilidad.",
  TENIS:
    "Deporte individual que demanda resistencia, velocidad de reacción y potencia de golpe. Requiere excelente condición física y mental.",
};

export const getSportLabel = (sport: SportType): string => {
  return SPORT_LABELS[sport];
};

export const getSportIcon = (sport: SportType): string => {
  return SPORT_ICONS[sport];
};

export const getSportColor = (sport: SportType): string => {
  return SPORT_COLORS[sport];
};

export const getSportPositions = (sport: SportType): string[] => {
  return SPORT_POSITIONS[sport];
};

export const getSportMetrics = (sport: SportType): string[] => {
  return SPORT_METRICS[sport];
};

export const getSportTrainingFocus = (sport: SportType): string[] => {
  return SPORT_TRAINING_FOCUS[sport];
};

export const getSportDescription = (sport: SportType): string => {
  return SPORT_DESCRIPTIONS[sport];
};

export const SPORT_OPTIONS = Object.entries(SPORT_LABELS).map(
  ([value, label]) => ({
    value,
    label,
    icon: SPORT_ICONS[value as SportType],
  }),
);
