export interface ToolMock {
  id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  category: string;
}

export const toolsMock: ToolMock[] = [
  {
    id: "soft-tissue",
    name: "Tejido Blando",
    description:
      "Protocolos de liberación miofascial, automasaje y trabajo de tejido blando para recuperación y preparación",
    icon: "HealingIcon",
    active: true,
    category: "Recuperación",
  },
  {
    id: "plyometry",
    name: "Pliometría",
    description:
      "Secuencias de entrenamiento pliométrico con progresión de impacto y control de volumen",
    icon: "ArrowUpIcon",
    active: true,
    category: "Potencia",
  },
  {
    id: "mobility",
    name: "Movilidad",
    description:
      "Rutinas de movilidad articular y flexibilidad dinámica para optimizar el rango de movimiento",
    icon: "AccessiblityIcon",
    active: true,
    category: "Prevención",
  },
  {
    id: "climate",
    name: "Clima",
    description:
      "Ajuste de cargas por condiciones ambientales: temperatura, humedad y altitud",
    icon: "WeatherIcon",
    active: false,
    category: "Ambiental",
  },
  {
    id: "gps",
    name: "GPS y Distancias",
    description:
      "Integración de datos GPS para monitorización de carga externa, distancias y velocidad en campo",
    icon: "LocationIcon",
    active: false,
    category: "Monitorización",
  },
  {
    id: "asymmetry-test",
    name: "Test de Asimetría",
    description:
      "Protocolos de evaluación bilateral para detectar desequilibrios y riesgos de lesión",
    icon: "BalanceIcon",
    active: true,
    category: "Evaluación",
  },
];
