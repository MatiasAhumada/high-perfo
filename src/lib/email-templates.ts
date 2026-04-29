interface RoutineEmailExercise {
  name: string
  sets: number
  reps: number
  intensityPercent?: number
}

interface RoutineEmailToolExecution {
  toolKey: string
  completed: boolean
}

interface RoutineEmailData {
  routineName: string
  athleteName: string
  coachName: string
  startDate: string
  endDate?: string
  exercises: RoutineEmailExercise[]
  toolExecutions?: RoutineEmailToolExecution[]
}

const EMAIL_COLORS = {
  background: "#101417",
  cardBackground: "#1d2023",
  text: "#e0e2e6",
  accent: "#ef233c",
  mutedText: "#8b8f94",
  border: "#2a2d31",
  success: "#22c55e",
} as const

function buildExerciseRows(exercises: RoutineEmailExercise[]): string {
  return exercises
    .map(
      (exercise) => `
      <tr style="border-bottom: 1px solid ${EMAIL_COLORS.border};">
        <td style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 14px;">${exercise.name}</td>
        <td style="padding: 10px 16px; color: ${EMAIL_COLORS.mutedText}; font-size: 14px; text-align: center;">${exercise.sets}</td>
        <td style="padding: 10px 16px; color: ${EMAIL_COLORS.mutedText}; font-size: 14px; text-align: center;">${exercise.reps}</td>
        <td style="padding: 10px 16px; color: ${EMAIL_COLORS.mutedText}; font-size: 14px; text-align: center;">${exercise.intensityPercent ? `${exercise.intensityPercent}%` : "—"}</td>
      </tr>`,
    )
    .join("")
}

function buildToolExecutionRows(toolExecutions: RoutineEmailToolExecution[]): string {
  return toolExecutions
    .map(
      (tool) => `
      <tr style="border-bottom: 1px solid ${EMAIL_COLORS.border};">
        <td style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 14px;">${tool.toolKey}</td>
        <td style="padding: 10px 16px; text-align: center;">
          <span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; color: ${tool.completed ? EMAIL_COLORS.success : EMAIL_COLORS.accent}; background: ${tool.completed ? "rgba(34,197,94,0.15)" : "rgba(239,35,60,0.15)"};">
            ${tool.completed ? "Completado" : "Pendiente"}
          </span>
        </td>
      </tr>`,
    )
    .join("")
}

function buildToolExecutionsSection(toolExecutions: RoutineEmailToolExecution[]): string {
  if (!toolExecutions.length) return ""

  return `
    <div style="margin-top: 24px;">
      <h3 style="color: ${EMAIL_COLORS.text}; font-size: 16px; margin: 0 0 12px 0;">Herramientas</h3>
      <table style="width: 100%; border-collapse: collapse; background: ${EMAIL_COLORS.cardBackground}; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="border-bottom: 2px solid ${EMAIL_COLORS.accent};">
            <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: left;">Herramienta</th>
            <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: center;">Estado</th>
          </tr>
        </thead>
        <tbody>
          ${buildToolExecutionRows(toolExecutions)}
        </tbody>
      </table>
    </div>`
}

export function buildRoutineEmailHtml(data: RoutineEmailData): string {
  const dateRange = data.endDate ? `${data.startDate} — ${data.endDate}` : data.startDate

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rutina de entrenamiento</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${EMAIL_COLORS.background}; font-family: 'Manrope', 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: ${EMAIL_COLORS.background};">
    <tr>
      <td style="padding: 32px 16px;" align="center">
        <table role="presentation" style="width: 100%; max-width: 560px; border-collapse: collapse;">
          <tr>
            <td style="padding: 32px 24px; background-color: ${EMAIL_COLORS.cardBackground}; border-radius: 12px; border: 1px solid ${EMAIL_COLORS.border};">

              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: ${EMAIL_COLORS.accent}; letter-spacing: -0.02em;">${data.routineName}</h1>
                <p style="margin: 0; font-size: 14px; color: ${EMAIL_COLORS.mutedText};">${dateRange}</p>
              </div>

              <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="flex: 1; padding: 12px 16px; background: ${EMAIL_COLORS.background}; border-radius: 8px; border: 1px solid ${EMAIL_COLORS.border};">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${EMAIL_COLORS.mutedText};">Atleta</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${EMAIL_COLORS.text};">${data.athleteName}</p>
                </div>
                <div style="flex: 1; padding: 12px 16px; background: ${EMAIL_COLORS.background}; border-radius: 8px; border: 1px solid ${EMAIL_COLORS.border};">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${EMAIL_COLORS.mutedText};">Entrenador</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${EMAIL_COLORS.text};">${data.coachName}</p>
                </div>
              </div>

              <div>
                <h3 style="color: ${EMAIL_COLORS.text}; font-size: 16px; margin: 0 0 12px 0;">Ejercicios</h3>
                <table style="width: 100%; border-collapse: collapse; background: ${EMAIL_COLORS.background}; border-radius: 8px; overflow: hidden;">
                  <thead>
                    <tr style="border-bottom: 2px solid ${EMAIL_COLORS.accent};">
                      <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: left;">Nombre</th>
                      <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: center;">Series</th>
                      <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: center;">Reps</th>
                      <th style="padding: 10px 16px; color: ${EMAIL_COLORS.text}; font-size: 13px; text-align: center;">Intensidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${buildExerciseRows(data.exercises)}
                  </tbody>
                </table>
              </div>

              ${data.toolExecutions ? buildToolExecutionsSection(data.toolExecutions) : ""}

            </td>
          </tr>

          <tr>
            <td style="padding: 24px 0 0 0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: ${EMAIL_COLORS.mutedText};">High-Perfo — Plataforma de rendimiento deportivo</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
