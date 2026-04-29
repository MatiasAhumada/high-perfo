export const UI_TEXTS = {
  BRAND_NAME: "High-Perfo",
  BRAND_TAGLINE: "Inteligencia Deportiva de Alto Nivel",
  APP_TITLE: "Performance Metrics Manager",

  NAV: {
    DASHBOARD: "Dashboard",
    ATHLETES: "Atletas",
    ROUTINES: "Rutinas",
    TOOLS: "Herramientas",
    SETTINGS: "Ajustes",
  },

  DASHBOARD: {
    STAT_LICENSES: "Ventas de Licencias",
    STAT_COACHES: "Entrenadores Activos",
    STAT_ATHLETES: "Total Atletas",
    COACH_TABLE_TITLE: "Gestión de Entrenadores",
    COACH_TABLE_SUBTITLE: "Administra los entrenadores de tu organización",
    COACH_NAME: "Nombre",
    COACH_STATUS: "Estado",
    COACH_ASSIGNED_ATHLETES: "Atletas Asignados",
    COACH_SPECIALTY: "Especialidad",
    COACH_ACTIONS: "Acciones",
    ADD_COACH: "Añadir Entrenador",
    EXPORT_KPIS: "Exportar KPIs",
    NEW_ANALYSIS: "Nuevo Análisis",
    TITLE: "Dashboard",
  },

  HEADER: {
    SEARCH_PLACEHOLDER: "Buscar atleta, rutina, métrica...",
    NEW_ANALYSIS: "Nuevo Análisis",
  },

  ATHLETES: {
    TITLE: "Atletas",
    SUBTITLE: "Gestión de deportistas",
    ADD_ATHLETE: "Nuevo Atleta",
    FIRST_NAME: "Nombre",
    LAST_NAME: "Apellido",
    POSITION: "Puesto",
    BIRTH_DATE: "Fecha de Nacimiento",
    SEARCH_PLACEHOLDER: "Buscar atleta...",
    EMPTY_MESSAGE: "No hay atletas registrados",
    MEDICAL_HISTORY: "Historial Médico",
    EDIT_PROFILE: "Editar Perfil",
    POWER_KINETICS: "Potencia y Cinética",
    ASYMMETRY_ANALYSIS: "Análisis de Asimetría",
    FORCE_VELOCITY_PROFILE: "Perfil Fuerza-Velocidad",
  },

  ROUTINES: {
    TITLE: "Constructor de Rutinas",
    SUBTITLE: "Diseña y envía rutinas de entrenamiento",
    TOOLBOX: "Herramientas Adicionales",
    ADD_EXERCISE: "Añadir Ejercicio",
    SEND_BY_EMAIL: "Enviar Rutina por Email",
    EXPORT_PDF: "PDF",
    EXPORT_EXCEL: "Excel",
    EXERCISE_NAME: "Nombre del Ejercicio",
    SETS: "Series",
    REPS: "Reps",
    INTENSITY: "%1RM",
    ADVANCED_SETTINGS: "Ajustes Avanzados",
    REMOVE_EXERCISE: "Eliminar",
    ROUTINE_NAME: "Nombre de la Rutina",
    ROUTINE_DESCRIPTION: "Descripción",
  },

  TOOLS: {
    TITLE: "Caja de Herramientas",
    SUBTITLE: "Micro-módulos acoplables para tus rutinas",
    ACTIVATED: "Activado",
    DEACTIVATED: "Desactivado",
  },

  SETTINGS: {
    TITLE: "Ajustes",
    PROFILE: "Perfil de Usuario",
    ACCOUNT: "Cuenta",
    VISUAL_CONFIG: "Configuración Visual",
    PRIMARY_COLOR: "Color Primario",
    SURFACE_COLOR: "Color de Superficie",
    TEXT_COLOR: "Color de Texto",
    FONT_HEAD: "Fuente Encabezados",
    FONT_BODY: "Fuente Cuerpo",
    BORDER_RADIUS: "Radio de Bordes",
  },

  COMMON: {
    TOTAL: "Total",
    RESULTS: "Resultados",
    NO_RESULTS: "Sin resultados",
    CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar?",
  },

  SEND_ROUTINE: {
    TITLE: "Enviar Rutina",
    SELECT_ATHLETES: "Seleccionar destinatarios",
    PREVIEW: "Vista Previa",
    CONFIRM_SEND: "Confirmar Envío",
    SENDING: "Enviando...",
    SUCCESS: "Rutina enviada exitosamente",
    NO_ATHLETES: "No hay atletas asignados",
  },

  STATUS: {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    ALERT: "Alerta",
    COMPLETED: "Completado",
    ARCHIVED: "Archivado",
  },

  TRENDS: {
    UP: "Al alza",
    DOWN: "A la baja",
    STABLE: "Estable",
  },

  ACTIONS: {
    SAVE: "Guardar",
    CANCEL: "Cancelar",
    DELETE: "Eliminar",
    EDIT: "Editar",
    CREATE: "Crear",
    CLOSE: "Cerrar",
    CONFIRM: "Confirmar",
    SEARCH: "Buscar",
    LOADING: "Cargando...",
    PROCESSING: "Procesando...",
  },

  FORM_ERRORS: {
    REQUIRED: "Este campo es obligatorio",
    INVALID_EMAIL: "Email inválido",
    MIN_LENGTH: "Mínimo {min} caracteres",
    MAX_LENGTH: "Máximo {max} caracteres",
    INVALID_NUMBER: "Debe ser un número válido",
    MIN_VALUE: "El valor mínimo es {min}",
    MAX_VALUE: "El valor máximo es {max}",
  },

  METRICS: {
    SJ: "Squat Jump",
    CMJ: "Countermovement Jump",
    DJ: "Drop Jump",
    ASI: "Índice de Asimetría",
    F0: "Fuerza Máxima Teórica",
    V0: "Velocidad Máxima Teórica",
    BODY_WEIGHT: "Peso Corporal",
  },

  ASSESSMENT: {
    TYPE: "Tipo de Evaluación",
    NEUROMUSCULAR: "Neuromuscular",
    ANTHROPOMETRY: "Antropometría",
    VBT: "VBT (Velocity Based Training)",
    BODY_WEIGHT: "Peso Corporal",
    DATE: "Fecha",
    COACH: "Entrenador",
  },
} as const
