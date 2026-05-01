import { PrismaClient, AssessmentType, RoutineStatus, ToolKey, Role } from "@prisma/client"
import { hashSync } from "bcryptjs"

const prisma = new PrismaClient()

const SEED_PASSWORD = "Test1234!"
const HASHED_PASSWORD = hashSync(SEED_PASSWORD, 10)

const SEED_IDS = {
  PLAN_SOLO: "seed-plan-001",
  PLAN_CLUB: "seed-plan-002",
  PLAN_ELITE: "seed-plan-003",
  ACCOUNT_LINCE: "seed-account-001",
  ACCOUNT_PERFORMANCE: "seed-account-002",
  ACCOUNT_SOLO_COACH: "seed-account-003",
  USER_SUPER_ADMIN: "seed-user-super-admin",
  USER_LINCE_ADMIN: "seed-user-lince-admin",
  USER_LINCE_COACH_1: "seed-user-lince-coach1",
  USER_LINCE_COACH_2: "seed-user-lince-coach2",
  USER_PERF_ADMIN: "seed-user-perf-admin",
  USER_PERF_COACH_1: "seed-user-perf-coach1",
  USER_SOLO_COACH: "seed-user-solo-coach",
  DESIGN_LINCE: "seed-design-lince",
  DESIGN_PERF: "seed-design-perf",
  DESIGN_SOLO: "seed-design-solo",
} as const

const LINCE_ATHLETE_IDS = [
  "seed-athlete-lince-1",
  "seed-athlete-lince-2",
  "seed-athlete-lince-3",
  "seed-athlete-lince-4",
  "seed-athlete-lince-5",
  "seed-athlete-lince-6",
  "seed-athlete-lince-7",
  "seed-athlete-lince-8",
] as const

const PERF_ATHLETE_IDS = [
  "seed-athlete-perf-1",
  "seed-athlete-perf-2",
  "seed-athlete-perf-3",
  "seed-athlete-perf-4",
] as const

const SOLO_ATHLETE_IDS = [
  "seed-athlete-solo-1",
  "seed-athlete-solo-2",
  "seed-athlete-solo-3",
] as const

const LINCE_RUGBY_POSITIONS = ["1", "2", "3", "4", "6", "9", "10", "15"] as const

const LINCE_ATHLETES = [
  { id: LINCE_ATHLETE_IDS[0], firstName: "Mateo", lastName: "Rossi", puesto: LINCE_RUGBY_POSITIONS[0], birthDate: new Date("1998-03-12") },
  { id: LINCE_ATHLETE_IDS[1], firstName: "Santiago", lastName: "Pérez", puesto: LINCE_RUGBY_POSITIONS[1], birthDate: new Date("1996-07-25") },
  { id: LINCE_ATHLETE_IDS[2], firstName: "Tomás", lastName: "García", puesto: LINCE_RUGBY_POSITIONS[2], birthDate: new Date("1999-11-03") },
  { id: LINCE_ATHLETE_IDS[3], firstName: "Lucas", lastName: "Martínez", puesto: LINCE_RUGBY_POSITIONS[3], birthDate: new Date("1997-01-18") },
  { id: LINCE_ATHLETE_IDS[4], firstName: "Facundo", lastName: "López", puesto: LINCE_RUGBY_POSITIONS[4], birthDate: new Date("2000-05-30") },
  { id: LINCE_ATHLETE_IDS[5], firstName: "Nicolás", lastName: "Rodríguez", puesto: LINCE_RUGBY_POSITIONS[5], birthDate: new Date("1995-09-08") },
  { id: LINCE_ATHLETE_IDS[6], firstName: "Joaquín", lastName: "Fernández", puesto: LINCE_RUGBY_POSITIONS[6], birthDate: new Date("2001-02-14") },
  { id: LINCE_ATHLETE_IDS[7], firstName: "Valentín", lastName: "Gómez", puesto: LINCE_RUGBY_POSITIONS[7], birthDate: new Date("1998-06-22") },
] as const

const PERF_ATHLETES = [
  { id: PERF_ATHLETE_IDS[0], firstName: "Agustín", lastName: "Suárez", puesto: "10", birthDate: new Date("2002-04-10") },
  { id: PERF_ATHLETE_IDS[1], firstName: "Bruno", lastName: "Torres", puesto: "9", birthDate: new Date("2001-08-19") },
  { id: PERF_ATHLETE_IDS[2], firstName: "Camilo", lastName: "Ruiz", puesto: "6", birthDate: new Date("2003-12-05") },
  { id: PERF_ATHLETE_IDS[3], firstName: "Diego", lastName: "Mora", puesto: "15", birthDate: new Date("2000-01-28") },
] as const

const SOLO_ATHLETES = [
  { id: SOLO_ATHLETE_IDS[0], firstName: "Emiliano", lastName: "Castro", puesto: "8", birthDate: new Date("1999-06-15") },
  { id: SOLO_ATHLETE_IDS[1], firstName: "Franco", lastName: "Silva", puesto: "12", birthDate: new Date("2001-03-22") },
  { id: SOLO_ATHLETE_IDS[2], firstName: "Gonzalo", lastName: "Vargas", puesto: "7", birthDate: new Date("2000-09-10") },
] as const

const LINCE_METRIC_DEFINITIONS = [
  { id: "seed-metric-lince-sj", key: "SJ", label: "Squat Jump", unit: "cm", redZoneLimit: 25, greenZoneLimit: 35 },
  { id: "seed-metric-lince-cmj", key: "CMJ", label: "Countermovement Jump", unit: "cm", redZoneLimit: 30, greenZoneLimit: 40 },
  { id: "seed-metric-lince-dj", key: "DJ", label: "Drop Jump", unit: "cm", redZoneLimit: 28, greenZoneLimit: 38 },
  { id: "seed-metric-lince-rsi", key: "RSI", label: "Reactive Strength Index", unit: "ms/ms", redZoneLimit: 1.5, greenZoneLimit: 2.5 },
  { id: "seed-metric-lince-peak-power", key: "PEAK_POWER", label: "Pico de Potencia", unit: "W", redZoneLimit: 2500, greenZoneLimit: 4500 },
  { id: "seed-metric-lince-mean-power", key: "MEAN_POWER", label: "Potencia Media", unit: "W", redZoneLimit: 1800, greenZoneLimit: 3200 },
  { id: "seed-metric-lince-f0", key: "F0", label: "Fuerza Máxima Teórica", unit: "N", redZoneLimit: 600, greenZoneLimit: 1200 },
  { id: "seed-metric-lince-v0", key: "V0", label: "Velocidad Máxima Teórica", unit: "m/s", redZoneLimit: 6, greenZoneLimit: 9 },
] as const

const PERF_METRIC_DEFINITIONS = [
  { id: "seed-metric-perf-sj", key: "SJ", label: "Squat Jump", unit: "cm", redZoneLimit: 25, greenZoneLimit: 35 },
  { id: "seed-metric-perf-cmj", key: "CMJ", label: "Countermovement Jump", unit: "cm", redZoneLimit: 30, greenZoneLimit: 40 },
  { id: "seed-metric-perf-dj", key: "DJ", label: "Drop Jump", unit: "cm", redZoneLimit: 28, greenZoneLimit: 38 },
  { id: "seed-metric-perf-rsi", key: "RSI", label: "Reactive Strength Index", unit: "ms/ms", redZoneLimit: 1.5, greenZoneLimit: 2.5 },
] as const

const LINCE_TEMPLATES = [
  { id: "seed-template-lince-fuerza", name: "Fuerza Máxima Rugby", description: "Programa de fuerza máxima para forwards y backs", exercises: [
    { id: "seed-ex-fuerza-1", name: "Sentadilla Trasera", order: 0, sets: 4, reps: 5, intensityPercent: 85 },
    { id: "seed-ex-fuerza-2", name: "Press Banca", order: 1, sets: 4, reps: 5, intensityPercent: 82 },
    { id: "seed-ex-fuerza-3", name: "Peso Muerto Rumano", order: 2, sets: 3, reps: 6, intensityPercent: 78 },
    { id: "seed-ex-fuerza-4", name: "Press Militar", order: 3, sets: 3, reps: 8, intensityPercent: 72 },
    { id: "seed-ex-fuerza-5", name: "Remo con Barra", order: 4, sets: 3, reps: 8, intensityPercent: 70 },
  ] },
  { id: "seed-template-lince-potencia", name: "Potencia y Pliometría", description: "Programa de potencia explosiva para rugby", exercises: [
    { id: "seed-ex-potencia-1", name: "Clean Pull", order: 0, sets: 5, reps: 3, intensityPercent: 70 },
    { id: "seed-ex-potencia-2", name: "Saltos al Cajón", order: 1, sets: 4, reps: 5, intensityPercent: 0 },
    { id: "seed-ex-potencia-3", name: "Lanzamiento de Balón Medicinal", order: 2, sets: 3, reps: 6, intensityPercent: 0 },
    { id: "seed-ex-potencia-4", name: "Sprint Resistido", order: 3, sets: 6, reps: 2, intensityPercent: 0 },
  ] },
] as const

const PERF_TEMPLATES = [
  { id: "seed-template-perf-vel", name: "Fuerza-Velocidad", description: "Programa de perfil fuerza-velocidad", exercises: [
    { id: "seed-ex-vel-1", name: "Sentadilla Media", order: 0, sets: 4, reps: 4, intensityPercent: 88 },
    { id: "seed-ex-vel-2", name: "Thruster", order: 1, sets: 3, reps: 6, intensityPercent: 55 },
    { id: "seed-ex-vel-3", name: "Box Jump", order: 2, sets: 4, reps: 4, intensityPercent: 0 },
  ] },
] as const

const RUGBY_JUMP_VALUES = {
  FORWARD: { sj: [26, 28, 30, 32], cmj: [29, 31, 33, 35], dj: [27, 29, 31, 33] },
  BACK: { sj: [30, 32, 34, 36], cmj: [33, 35, 37, 39], dj: [31, 33, 35, 37] },
} as const

function getJumpValues(puesto: string, index: number) {
  const isBack = ["9", "10", "15"].includes(puesto)
  const group = isBack ? RUGBY_JUMP_VALUES.BACK : RUGBY_JUMP_VALUES.FORWARD
  const variation = index % group.sj.length
  return {
    sj: group.sj[variation],
    cmj: group.cmj[variation],
    dj: group.dj[variation],
  }
}

async function deleteExistingData() {
  const deleteOrder = [
    prisma.metricResult.deleteMany(),
    prisma.toolExecution.deleteMany(),
    prisma.assignedRoutine.deleteMany(),
    prisma.templateExercise.deleteMany(),
    prisma.routineTemplate.deleteMany(),
    prisma.metricDefinition.deleteMany(),
    prisma.designConfig.deleteMany(),
    prisma.assessment.deleteMany(),
    prisma.athlete.deleteMany(),
    prisma.user.deleteMany(),
    prisma.account.deleteMany(),
    prisma.plan.deleteMany(),
  ] as const

  for (const operation of deleteOrder) {
    await operation
  }
}

async function seedPlans() {
  const plans = [
    { id: SEED_IDS.PLAN_SOLO, name: "Coach Solitario", maxCoaches: 1, maxAthletes: 5, maxAssessments: 50, price: 29.99 },
    { id: SEED_IDS.PLAN_CLUB, name: "Plan Club Pro", maxCoaches: 5, maxAthletes: 50, maxAssessments: 500, price: 99.99 },
    { id: SEED_IDS.PLAN_ELITE, name: "Elite", maxCoaches: 15, maxAthletes: 200, maxAssessments: 5000, price: 249.99 },
  ] as const

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.id },
      update: { name: plan.name, maxCoaches: plan.maxCoaches, maxAthletes: plan.maxAthletes, maxAssessments: plan.maxAssessments, price: plan.price },
      create: { id: plan.id, name: plan.name, maxCoaches: plan.maxCoaches, maxAthletes: plan.maxAthletes, maxAssessments: plan.maxAssessments, price: plan.price },
    })
  }
}

async function seedAccounts() {
  await prisma.account.upsert({
    where: { id: SEED_IDS.ACCOUNT_LINCE },
    update: { name: "Lince Rugby Club", isOrganization: true, planId: SEED_IDS.PLAN_CLUB },
    create: { id: SEED_IDS.ACCOUNT_LINCE, name: "Lince Rugby Club", isOrganization: true, planId: SEED_IDS.PLAN_CLUB },
  })

  await prisma.account.upsert({
    where: { id: SEED_IDS.ACCOUNT_PERFORMANCE },
    update: { name: "Performance Lab", isOrganization: true, planId: SEED_IDS.PLAN_ELITE },
    create: { id: SEED_IDS.ACCOUNT_PERFORMANCE, name: "Performance Lab", isOrganization: true, planId: SEED_IDS.PLAN_ELITE },
  })

  await prisma.account.upsert({
    where: { id: SEED_IDS.ACCOUNT_SOLO_COACH },
    update: { name: "Coach Independiente", isOrganization: false, planId: SEED_IDS.PLAN_SOLO },
    create: { id: SEED_IDS.ACCOUNT_SOLO_COACH, name: "Coach Independiente", isOrganization: false, planId: SEED_IDS.PLAN_SOLO },
  })
}

async function seedUsers() {
  const users = [
    { id: SEED_IDS.USER_SUPER_ADMIN, email: "superadmin@highperfo.com", name: "Super Admin", role: Role.SUPER_ADMIN, accountId: SEED_IDS.ACCOUNT_LINCE },
    { id: SEED_IDS.USER_LINCE_ADMIN, email: "admin@lincerugby.com", name: "Carlos Ruiz", role: Role.ORG_ADMIN, accountId: SEED_IDS.ACCOUNT_LINCE },
    { id: SEED_IDS.USER_LINCE_COACH_1, email: "coach1@lincerugby.com", name: "Martín Herrera", role: Role.COACH, accountId: SEED_IDS.ACCOUNT_LINCE },
    { id: SEED_IDS.USER_LINCE_COACH_2, email: "coach2@lincerugby.com", name: "Pablo Domínguez", role: Role.COACH, accountId: SEED_IDS.ACCOUNT_LINCE },
    { id: SEED_IDS.USER_PERF_ADMIN, email: "admin@performancelab.com", name: "Laura Méndez", role: Role.ORG_ADMIN, accountId: SEED_IDS.ACCOUNT_PERFORMANCE },
    { id: SEED_IDS.USER_PERF_COACH_1, email: "coach1@performancelab.com", name: "Andrés Vidal", role: Role.COACH, accountId: SEED_IDS.ACCOUNT_PERFORMANCE },
    { id: SEED_IDS.USER_SOLO_COACH, email: "coach@independiente.com", name: "Roberto Morales", role: Role.COACH, accountId: SEED_IDS.ACCOUNT_SOLO_COACH },
  ] as const

  console.log('\n📧 USUARIOS CREADOS:')
  console.log('━'.repeat(80))
  console.log(`🔑 Contraseña universal: ${SEED_PASSWORD}\n`)

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.email, name: user.name, role: user.role, accountId: user.accountId, password: HASHED_PASSWORD },
      create: { id: user.id, email: user.email, name: user.name, role: user.role, accountId: user.accountId, password: HASHED_PASSWORD },
    })
    console.log(`✅ ${user.email.padEnd(30)} | ${user.role.padEnd(12)} | ${user.name}`)
  }
  console.log('━'.repeat(80) + '\n')
}

async function seedLinceAthletes() {
  for (const athlete of LINCE_ATHLETES) {
    await prisma.athlete.upsert({
      where: { id: athlete.id },
      update: { firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_LINCE },
      create: { id: athlete.id, firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_LINCE },
    })
  }
}

async function seedPerfAthletes() {
  for (const athlete of PERF_ATHLETES) {
    await prisma.athlete.upsert({
      where: { id: athlete.id },
      update: { firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_PERFORMANCE },
      create: { id: athlete.id, firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_PERFORMANCE },
    })
  }
}

async function seedSoloAthletes() {
  for (const athlete of SOLO_ATHLETES) {
    await prisma.athlete.upsert({
      where: { id: athlete.id },
      update: { firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_SOLO_COACH },
      create: { id: athlete.id, firstName: athlete.firstName, lastName: athlete.lastName, puesto: athlete.puesto, birthDate: athlete.birthDate, accountId: SEED_IDS.ACCOUNT_SOLO_COACH },
    })
  }
}

async function seedLinceAssessments() {
  const assessmentBaseDate = new Date("2025-01-15")

  for (let athleteIndex = 0; athleteIndex < LINCE_ATHLETES.length; athleteIndex++) {
    const athlete = LINCE_ATHLETES[athleteIndex]
    const coachId = athleteIndex < 4 ? SEED_IDS.USER_LINCE_COACH_1 : SEED_IDS.USER_LINCE_COACH_2

    for (let assessmentIndex = 0; assessmentIndex < 3; assessmentIndex++) {
      const assessmentId = `seed-assess-lince-${athleteIndex}-${assessmentIndex}`
      const assessmentDate = new Date(assessmentBaseDate)
      assessmentDate.setMonth(assessmentBaseDate.getMonth() + assessmentIndex * 2)

      const jumpValues = getJumpValues(athlete.puesto, assessmentIndex)

      await prisma.assessment.upsert({
        where: { id: assessmentId },
        update: {
          athleteId: athlete.id,
          coachId,
          date: assessmentDate,
          type: AssessmentType.NEUROMUSCULAR,
          bodyWeight: 85 + athleteIndex * 3 - assessmentIndex * 0.5,
        },
        create: {
          id: assessmentId,
          athleteId: athlete.id,
          coachId,
          date: assessmentDate,
          type: AssessmentType.NEUROMUSCULAR,
          bodyWeight: 85 + athleteIndex * 3 - assessmentIndex * 0.5,
          results: {
            create: [
              { id: `seed-result-lince-${athleteIndex}-${assessmentIndex}-sj`, key: "SJ", rawValue: jumpValues.sj, calculatedValue: jumpValues.sj * 0.95 },
              { id: `seed-result-lince-${athleteIndex}-${assessmentIndex}-cmj`, key: "CMJ", rawValue: jumpValues.cmj, calculatedValue: jumpValues.cmj * 0.92 },
              { id: `seed-result-lince-${athleteIndex}-${assessmentIndex}-dj`, key: "DJ", rawValue: jumpValues.dj, calculatedValue: jumpValues.dj * 0.88 },
              { id: `seed-result-lince-${athleteIndex}-${assessmentIndex}-rsi`, key: "RSI", rawValue: 1.8 + assessmentIndex * 0.2, calculatedValue: 1.8 + assessmentIndex * 0.2 },
            ],
          },
        },
      })
    }
  }
}

async function seedPerfAssessments() {
  const assessmentBaseDate = new Date("2025-02-01")

  for (let athleteIndex = 0; athleteIndex < PERF_ATHLETES.length; athleteIndex++) {
    const athlete = PERF_ATHLETES[athleteIndex]

    for (let assessmentIndex = 0; assessmentIndex < 2; assessmentIndex++) {
      const assessmentId = `seed-assess-perf-${athleteIndex}-${assessmentIndex}`
      const assessmentDate = new Date(assessmentBaseDate)
      assessmentDate.setMonth(assessmentBaseDate.getMonth() + assessmentIndex * 3)

      const sjBase = 28 + athleteIndex * 2 + assessmentIndex * 1.5
      const cmjBase = 32 + athleteIndex * 2 + assessmentIndex * 1.5
      const djBase = 30 + athleteIndex * 2 + assessmentIndex * 1.5

      await prisma.assessment.upsert({
        where: { id: assessmentId },
        update: {
          athleteId: athlete.id,
          coachId: SEED_IDS.USER_PERF_COACH_1,
          date: assessmentDate,
          type: AssessmentType.NEUROMUSCULAR,
          bodyWeight: 78 + athleteIndex * 5,
        },
        create: {
          id: assessmentId,
          athleteId: athlete.id,
          coachId: SEED_IDS.USER_PERF_COACH_1,
          date: assessmentDate,
          type: AssessmentType.NEUROMUSCULAR,
          bodyWeight: 78 + athleteIndex * 5,
          results: {
            create: [
              { id: `seed-result-perf-${athleteIndex}-${assessmentIndex}-sj`, key: "SJ", rawValue: sjBase, calculatedValue: sjBase * 0.95 },
              { id: `seed-result-perf-${athleteIndex}-${assessmentIndex}-cmj`, key: "CMJ", rawValue: cmjBase, calculatedValue: cmjBase * 0.92 },
              { id: `seed-result-perf-${athleteIndex}-${assessmentIndex}-dj`, key: "DJ", rawValue: djBase, calculatedValue: djBase * 0.88 },
              { id: `seed-result-perf-${athleteIndex}-${assessmentIndex}-rsi`, key: "RSI", rawValue: 2.0 + assessmentIndex * 0.15, calculatedValue: 2.0 + assessmentIndex * 0.15 },
            ],
          },
        },
      })
    }
  }
}

async function seedLinceRoutineTemplates() {
  for (const template of LINCE_TEMPLATES) {
    await prisma.routineTemplate.upsert({
      where: { id: template.id },
      update: { name: template.name, description: template.description, accountId: SEED_IDS.ACCOUNT_LINCE, creatorId: SEED_IDS.USER_LINCE_COACH_1 },
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
        accountId: SEED_IDS.ACCOUNT_LINCE,
        creatorId: SEED_IDS.USER_LINCE_COACH_1,
        exercises: {
          create: template.exercises.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
            order: exercise.order,
            sets: exercise.sets,
            reps: exercise.reps,
            intensityPercent: exercise.intensityPercent || 0,
          })),
        },
      },
    })
  }
}

async function seedPerfRoutineTemplates() {
  for (const template of PERF_TEMPLATES) {
    await prisma.routineTemplate.upsert({
      where: { id: template.id },
      update: { name: template.name, description: template.description, accountId: SEED_IDS.ACCOUNT_PERFORMANCE, creatorId: SEED_IDS.USER_PERF_COACH_1 },
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
        accountId: SEED_IDS.ACCOUNT_PERFORMANCE,
        creatorId: SEED_IDS.USER_PERF_COACH_1,
        exercises: {
          create: template.exercises.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
            order: exercise.order,
            sets: exercise.sets,
            reps: exercise.reps,
            intensityPercent: exercise.intensityPercent || 0,
          })),
        },
      },
    })
  }
}

async function seedLinceAssignedRoutines() {
  const assignedRoutinesData = [
    { id: "seed-assigned-lince-1", athleteId: LINCE_ATHLETE_IDS[0], coachId: SEED_IDS.USER_LINCE_COACH_1, templateId: LINCE_TEMPLATES[0].id, status: RoutineStatus.ACTIVE },
    { id: "seed-assigned-lince-2", athleteId: LINCE_ATHLETE_IDS[1], coachId: SEED_IDS.USER_LINCE_COACH_1, templateId: LINCE_TEMPLATES[0].id, status: RoutineStatus.ACTIVE },
    { id: "seed-assigned-lince-3", athleteId: LINCE_ATHLETE_IDS[2], coachId: SEED_IDS.USER_LINCE_COACH_1, templateId: LINCE_TEMPLATES[1].id, status: RoutineStatus.COMPLETED },
    { id: "seed-assigned-lince-4", athleteId: LINCE_ATHLETE_IDS[3], coachId: SEED_IDS.USER_LINCE_COACH_2, templateId: LINCE_TEMPLATES[0].id, status: RoutineStatus.ACTIVE },
    { id: "seed-assigned-lince-5", athleteId: LINCE_ATHLETE_IDS[4], coachId: SEED_IDS.USER_LINCE_COACH_2, templateId: LINCE_TEMPLATES[1].id, status: RoutineStatus.ACTIVE },
    { id: "seed-assigned-lince-6", athleteId: LINCE_ATHLETE_IDS[5], coachId: SEED_IDS.USER_LINCE_COACH_2, templateId: LINCE_TEMPLATES[1].id, status: RoutineStatus.ARCHIVED },
  ] as const

  for (const assigned of assignedRoutinesData) {
    await prisma.assignedRoutine.upsert({
      where: { id: assigned.id },
      update: {
        athleteId: assigned.athleteId,
        coachId: assigned.coachId,
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-06-01"),
        status: assigned.status,
      },
      create: {
        id: assigned.id,
        athleteId: assigned.athleteId,
        coachId: assigned.coachId,
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-06-01"),
        status: assigned.status,
      },
    })
  }
}

async function seedPerfAssignedRoutines() {
  const assignedRoutinesData = [
    { id: "seed-assigned-perf-1", athleteId: PERF_ATHLETE_IDS[0], coachId: SEED_IDS.USER_PERF_COACH_1, status: RoutineStatus.ACTIVE },
    { id: "seed-assigned-perf-2", athleteId: PERF_ATHLETE_IDS[1], coachId: SEED_IDS.USER_PERF_COACH_1, status: RoutineStatus.COMPLETED },
  ] as const

  for (const assigned of assignedRoutinesData) {
    await prisma.assignedRoutine.upsert({
      where: { id: assigned.id },
      update: {
        athleteId: assigned.athleteId,
        coachId: assigned.coachId,
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-07-01"),
        status: assigned.status,
      },
      create: {
        id: assigned.id,
        athleteId: assigned.athleteId,
        coachId: assigned.coachId,
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-07-01"),
        status: assigned.status,
      },
    })
  }
}

async function seedLinceToolExecutions() {
  const toolExecutions = [
    { id: "seed-tool-lince-1", assignedRoutineId: "seed-assigned-lince-1", toolKey: ToolKey.PLIOMETRIA, completed: false },
    { id: "seed-tool-lince-2", assignedRoutineId: "seed-assigned-lince-1", toolKey: ToolKey.MOVILIDAD, completed: true },
    { id: "seed-tool-lince-3", assignedRoutineId: "seed-assigned-lince-2", toolKey: ToolKey.TEJIDO_BLANDO, completed: false },
    { id: "seed-tool-lince-4", assignedRoutineId: "seed-assigned-lince-4", toolKey: ToolKey.PLIOMETRIA, completed: false },
    { id: "seed-tool-lince-5", assignedRoutineId: "seed-assigned-lince-5", toolKey: ToolKey.MOVILIDAD, completed: true },
    { id: "seed-tool-lince-6", assignedRoutineId: "seed-assigned-lince-5", toolKey: ToolKey.CLIMA, completed: false },
  ] as const

  for (const tool of toolExecutions) {
    await prisma.toolExecution.upsert({
      where: { id: tool.id },
      update: { assignedRoutineId: tool.assignedRoutineId, toolKey: tool.toolKey, completed: tool.completed },
      create: { id: tool.id, assignedRoutineId: tool.assignedRoutineId, toolKey: tool.toolKey, completed: tool.completed },
    })
  }
}

async function seedPerfToolExecutions() {
  const toolExecutions = [
    { id: "seed-tool-perf-1", assignedRoutineId: "seed-assigned-perf-1", toolKey: ToolKey.PLIOMETRIA, completed: false },
    { id: "seed-tool-perf-2", assignedRoutineId: "seed-assigned-perf-1", toolKey: ToolKey.ASIMETRIA, completed: true },
  ] as const

  for (const tool of toolExecutions) {
    await prisma.toolExecution.upsert({
      where: { id: tool.id },
      update: { assignedRoutineId: tool.assignedRoutineId, toolKey: tool.toolKey, completed: tool.completed },
      create: { id: tool.id, assignedRoutineId: tool.assignedRoutineId, toolKey: tool.toolKey, completed: tool.completed },
    })
  }
}

async function seedLinceMetricDefinitions() {
  for (const definition of LINCE_METRIC_DEFINITIONS) {
    await prisma.metricDefinition.upsert({
      where: { id: definition.id },
      update: { accountId: SEED_IDS.ACCOUNT_LINCE, key: definition.key, label: definition.label, unit: definition.unit, redZoneLimit: definition.redZoneLimit, greenZoneLimit: definition.greenZoneLimit },
      create: { id: definition.id, accountId: SEED_IDS.ACCOUNT_LINCE, key: definition.key, label: definition.label, unit: definition.unit, redZoneLimit: definition.redZoneLimit, greenZoneLimit: definition.greenZoneLimit },
    })
  }
}

async function seedPerfMetricDefinitions() {
  for (const definition of PERF_METRIC_DEFINITIONS) {
    await prisma.metricDefinition.upsert({
      where: { id: definition.id },
      update: { accountId: SEED_IDS.ACCOUNT_PERFORMANCE, key: definition.key, label: definition.label, unit: definition.unit, redZoneLimit: definition.redZoneLimit, greenZoneLimit: definition.greenZoneLimit },
      create: { id: definition.id, accountId: SEED_IDS.ACCOUNT_PERFORMANCE, key: definition.key, label: definition.label, unit: definition.unit, redZoneLimit: definition.redZoneLimit, greenZoneLimit: definition.greenZoneLimit },
    })
  }
}

async function seedDesignConfigs() {
  await prisma.designConfig.upsert({
    where: { id: SEED_IDS.DESIGN_LINCE },
    update: {
      accountId: SEED_IDS.ACCOUNT_LINCE,
      primaryColor: "#ef233c",
      surfaceColor: "#101417",
      surfaceVariant: "#1d2023",
      textColor: "#e0e2e6",
      fontFamilyHead: "Space Grotesk",
      fontFamilyBody: "Manrope",
      borderRadius: "0.25rem",
    },
    create: {
      id: SEED_IDS.DESIGN_LINCE,
      accountId: SEED_IDS.ACCOUNT_LINCE,
      primaryColor: "#ef233c",
      surfaceColor: "#101417",
      surfaceVariant: "#1d2023",
      textColor: "#e0e2e6",
      fontFamilyHead: "Space Grotesk",
      fontFamilyBody: "Manrope",
      borderRadius: "0.25rem",
    },
  })

  await prisma.designConfig.upsert({
    where: { id: SEED_IDS.DESIGN_PERF },
    update: {
      accountId: SEED_IDS.ACCOUNT_PERFORMANCE,
      primaryColor: "#4361ee",
      surfaceColor: "#0d1117",
      surfaceVariant: "#161b22",
      textColor: "#c9d1d9",
      fontFamilyHead: "Inter",
      fontFamilyBody: "Inter",
      borderRadius: "0.5rem",
    },
    create: {
      id: SEED_IDS.DESIGN_PERF,
      accountId: SEED_IDS.ACCOUNT_PERFORMANCE,
      primaryColor: "#4361ee",
      surfaceColor: "#0d1117",
      surfaceVariant: "#161b22",
      textColor: "#c9d1d9",
      fontFamilyHead: "Inter",
      fontFamilyBody: "Inter",
      borderRadius: "0.5rem",
    },
  })
}

async function main() {
  console.log("Deleting existing data...")
  await deleteExistingData()

  console.log("Seeding plans...")
  await seedPlans()

  console.log("Seeding accounts...")
  await seedAccounts()

  console.log("Seeding users...")
  await seedUsers()

  console.log("Seeding Lince athletes...")
  await seedLinceAthletes()

  console.log("Seeding Performance Lab athletes...")
  await seedPerfAthletes()

  console.log("Seeding Solo Coach athletes...")
  await seedSoloAthletes()

  console.log("Seeding Lince assessments...")
  await seedLinceAssessments()

  console.log("Seeding Performance Lab assessments...")
  await seedPerfAssessments()

  console.log("Seeding Lince routine templates...")
  await seedLinceRoutineTemplates()

  console.log("Seeding Performance Lab routine templates...")
  await seedPerfRoutineTemplates()

  console.log("Seeding Lince assigned routines...")
  await seedLinceAssignedRoutines()

  console.log("Seeding Performance Lab assigned routines...")
  await seedPerfAssignedRoutines()

  console.log("Seeding Lince tool executions...")
  await seedLinceToolExecutions()

  console.log("Seeding Performance Lab tool executions...")
  await seedPerfToolExecutions()

  console.log("Seeding Lince metric definitions...")
  await seedLinceMetricDefinitions()

  console.log("Seeding Performance Lab metric definitions...")
  await seedPerfMetricDefinitions()

  console.log("Seeding design configs...")
  await seedDesignConfigs()

  console.log("Seed completed successfully")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
