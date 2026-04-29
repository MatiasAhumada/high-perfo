<div align="center">

# 🏋️ HIGH-PERFO

### Motor Operativo de Prescripción de Carga y Análisis Biomecánico

**Inteligencia Deportiva de Alto Nivel para Instituciones de Élite**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Demo](#) • [📖 Documentación](#características) • [🎯 Roadmap](#roadmap)

</div>

---

## 🎯 ¿Qué es High-Perfo?

**High-Perfo** es una plataforma SaaS de gestión deportiva profesional diseñada para **clubes de élite, preparadores físicos y centros de alto rendimiento**. Permite prescribir cargas de entrenamiento, realizar análisis biomecánicos avanzados y tomar decisiones basadas en datos objetivos.

### 🏆 Casos de Uso

- **Clubes Deportivos Profesionales**: Gestión integral de planteles con múltiples entrenadores
- **Preparadores Físicos Independientes**: Seguimiento personalizado de atletas
- **Centros de Alto Rendimiento**: Análisis biomecánico y prescripción de carga científica
- **Instituciones Deportivas**: Multi-tenant con roles y permisos granulares

---

## ✨ Características Principales

### 🔐 Sistema Multi-Tenant con Roles

```
SUPER_ADMIN → Gestión global de la plataforma
    ↓
ORG_ADMIN → Administración de clubes/organizaciones
    ↓
COACH → Gestión de atletas y rutinas
```

- **Aislamiento de datos** por organización
- **Planes flexibles**: Individual, Club Pro, Elite
- **Permisos granulares** por rol

### 📊 Análisis Biomecánico Avanzado

- **Evaluaciones Neuromusculares**: SJ, CMJ, DJ, RSI
- **Perfil Fuerza-Velocidad**: F0, V0, Pmax
- **Análisis de Asimetría**: Detección de desbalances
- **Potencia y Cinética**: Peak Power, Mean Power
- **Gráficos Interactivos**: Recharts con visualización profesional

### 💪 Prescripción de Carga Inteligente

- **Constructor de Rutinas**: Drag & drop con ejercicios personalizables
- **Plantillas Reutilizables**: Biblioteca de rutinas predefinidas
- **Herramientas Modulares**: Pliometría, movilidad, tejido blando, GPS
- **Envío Automático**: Email con rutinas en PDF/Excel
- **Seguimiento de Progreso**: Estados (Activo, Completado, Archivado)

### 📈 Dashboard de KPIs

- **Métricas en Tiempo Real**: Ventas, coaches activos, total atletas
- **Tendencias Visuales**: Indicadores de crecimiento
- **Exportación de Datos**: KPIs descargables
- **Gestión de Entrenadores**: Tabla con búsqueda y filtros

### 🎨 Personalización Visual

- **Design System Configurable**: Colores, fuentes, bordes por organización
- **Paleta "Noche Profunda"**: Diseño oscuro profesional
- **Animaciones Fluidas**: Framer Motion en toda la UI
- **Responsive Design**: Mobile-first approach

---

## 🚀 Stack Tecnológico

<table>
<tr>
<td width="50%">

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Radix UI
- **Animaciones**: Framer Motion
- **Iconos**: Hugeicons React
- **Gráficos**: Recharts
- **Validación**: Zod + React Hook Form

</td>
<td width="50%">

### Backend
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma 7
- **Autenticación**: NextAuth (Auth.js)
- **API**: Next.js API Routes (REST)
- **Validación**: Zod Schemas
- **Email**: Nodemailer
- **HTTP Client**: Axios
- **Notificaciones**: Sonner

</td>
</tr>
</table>

---

## 🏗️ Arquitectura

### Repository Pattern + Service Layer

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Cliente)                    │
├─────────────────────────────────────────────────────────┤
│  Components → /services (API Client) → Axios            │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP
┌────────────────────────▼────────────────────────────────┐
│                  BACKEND (Next.js API)                   │
├─────────────────────────────────────────────────────────┤
│  /app/api (Controllers)                                  │
│      ↓                                                   │
│  /server/services (Business Logic)                       │
│      ↓                                                   │
│  /server/repository (Data Access)                        │
│      ↓                                                   │
│  Prisma → PostgreSQL                                     │
└─────────────────────────────────────────────────────────┘
```

### Estructura de Carpetas

```
src/
├── app/
│   ├── (home)/              # Route group - Dashboard protegido
│   │   ├── page.tsx         # Dashboard principal (/)
│   │   ├── atletas/         # Gestión de atletas (/atletas)
│   │   ├── rutinas/         # Constructor de rutinas (/rutinas)
│   │   ├── herramientas/    # Caja de herramientas (/herramientas)
│   │   └── ajustes/         # Configuración (/ajustes)
│   ├── login/               # Página de login
│   └── api/                 # API Routes (REST)
│       ├── accounts/        # CRUD de cuentas
│       ├── athletes/        # CRUD de atletas
│       ├── assessments/     # Evaluaciones
│       ├── routines/        # Rutinas
│       └── auth/            # NextAuth
├── components/
│   ├── common/              # Componentes reutilizables
│   │   ├── DataTable.tsx    # Tabla genérica con búsqueda
│   │   ├── GenericModal.tsx # Modal reutilizable
│   │   ├── MetricCard.tsx   # Tarjeta de métrica
│   │   └── ProtectedRoute.tsx # HOC de autenticación
│   ├── layout/              # Layout components
│   ├── forms/               # Formularios
│   ├── charts/              # Gráficos (Recharts)
│   └── modules/             # Módulos específicos
├── server/
│   ├── services/            # Lógica de negocio
│   │   ├── athlete.service.ts
│   │   ├── assessment.service.ts
│   │   └── routine.service.ts
│   └── repository/          # Acceso a datos (Prisma)
│       ├── athlete.repository.ts
│       ├── assessment.repository.ts
│       └── routine.repository.ts
├── services/                # API Client (Frontend)
│   ├── athlete.service.ts
│   ├── assessment.service.ts
│   └── routine.service.ts
├── types/                   # TypeScript types (extendidos de Prisma)
├── constants/               # Constantes centralizadas
├── utils/                   # Utilidades
│   └── handlers/            # Error handlers
└── lib/                     # Configuración de librerías
```

---

## 🚦 Inicio Rápido

### Prerrequisitos

- Node.js 20+
- PostgreSQL 14+
- pnpm 10+

### 1️⃣ Clonar e Instalar

```bash
git clone https://github.com/tu-usuario/high-perfo.git
cd high-perfo
pnpm install
```

### 2️⃣ Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/highperfo"
JWT_SECRET="tu-secret-super-seguro"
NODE_ENV="development"
NEXT_PUBLIC_API_URL=""
```

### 3️⃣ Configurar Base de Datos

```bash
# Generar cliente Prisma
pnpm prisma generate

# Ejecutar migraciones
pnpm prisma migrate dev

# Seedear datos de prueba
pnpm prisma db seed
```

### 4️⃣ Iniciar Desarrollo

```bash
pnpm dev
```

Visita **http://localhost:3012**

### 🔑 Credenciales de Prueba

Ver archivo [`CREDENTIALS.md`](./CREDENTIALS.md) para usuarios de prueba.

**Contraseña universal**: `Test1234!`

```
superadmin@highperfo.com     → SUPER_ADMIN
admin@lincerugby.com         → ORG_ADMIN (Lince Rugby Club)
coach1@lincerugby.com        → COACH (Lince Rugby Club)
admin@performancelab.com     → ORG_ADMIN (Performance Lab)
coach@independiente.com      → COACH (Plan Individual)
```

---

## 📦 Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor desarrollo (puerto 3012)
pnpm build            # Build de producción
pnpm start            # Servidor producción (puerto 3012)

# Base de Datos
pnpm migrate          # Crear y aplicar migración
pnpm migrate:deploy   # Aplicar migraciones en producción
pnpm reset            # Resetear base de datos (incluye seed)
pnpm studio           # Abrir Prisma Studio

# Código
pnpm lint             # Ejecutar ESLint
pnpm format           # Formatear con Prettier
```

---

## 🎨 Design System

### Paleta "Noche Profunda"

```css
--surface: #101417                    /* Fondo principal */
--surface-container: #1d2023          /* Contenedores */
--on-surface: #e0e2e6                 /* Texto principal */
--on-tertiary-container: #f8171a      /* Acento rojo */
--outline-variant: #46464c            /* Bordes */
```

### Tipografía

- **Display/Data**: Space Grotesk (Bold, 700)
- **Body**: Manrope (Regular, 400-600)

### Componentes Clave

- **DataTable**: Tabla con búsqueda, paginación y animaciones
- **GenericModal**: Modal con múltiples tamaños y variantes
- **MetricCard**: Tarjeta de métrica con tendencias
- **StatusBadge**: Badge de estado (Activo, Inactivo, Alerta)
- **ProtectedRoute**: HOC para protección de rutas

---

## 🔒 Seguridad y Buenas Prácticas

### ✅ Implementado

- **NextAuth JWT**: Sesiones seguras con tokens firmados
- **Bcrypt**: Hashing de contraseñas con salt
- **Zod Validation**: Validación en cliente y servidor
- **CSRF Protection**: Incluido en NextAuth
- **SQL Injection**: Prevenido por Prisma
- **XSS Protection**: React escapa automáticamente
- **Repository Pattern**: Abstracción de acceso a datos
- **Error Handling**: Centralizado con ApiError y clientErrorHandler
- **TypeScript Strict**: Sin `any`, tipos explícitos
- **SOLID Principles**: En toda la arquitectura

### 🚫 Reglas de Código (Ver AGENTS.md)

- ❌ No usar `any` ni `typeof` (excepto en Zod)
- ❌ No comparaciones explícitas (`=== null`, `=== undefined`)
- ❌ No valores hardcodeados
- ❌ No comentarios en el código
- ✅ Nombres descriptivos y semánticos
- ✅ Funciones pequeñas con una sola responsabilidad
- ✅ Constantes centralizadas
- ✅ REST compliant

---

## 🚀 Deploy

### GitHub Actions (Automático)

El proyecto se despliega automáticamente al hacer push a `main`.

**Secrets requeridos en GitHub:**
```
VPS_HOST=tu-servidor.com
VPS_USER=root
VPS_PASSWORD=tu-password
```

Ver [`DEPLOY.md`](./DEPLOY.md) para instrucciones completas.

### Manual

```bash
# En el servidor VPS
cd high-perfo
git pull origin main
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm build
pm2 restart high-perfo
```

---

## 📊 Modelo de Datos

### Entidades Principales

```
Plan (Individual, Club Pro, Elite)
  ↓
Account (Organizaciones/Clubes)
  ↓
User (SUPER_ADMIN, ORG_ADMIN, COACH)
  ↓
Athlete (Deportistas)
  ↓
Assessment (Evaluaciones)
  ↓
MetricResult (Resultados de métricas)

RoutineTemplate (Plantillas de rutinas)
  ↓
AssignedRoutine (Rutinas asignadas a atletas)
  ↓
ToolExecution (Herramientas aplicadas)
```

Ver [`prisma/schema.prisma`](./prisma/schema.prisma) para el esquema completo.

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completado)
- [x] Autenticación multi-tenant
- [x] CRUD de atletas
- [x] Evaluaciones neuromusculares
- [x] Constructor de rutinas
- [x] Dashboard de KPIs
- [x] Personalización visual

### 🚧 Fase 2 - En Desarrollo
- [ ] Integración con dispositivos GPS
- [ ] Análisis de video biomecánico
- [ ] Reportes PDF avanzados
- [ ] Notificaciones push
- [ ] App móvil (React Native)

### 🔮 Fase 3 - Futuro
- [ ] Machine Learning para predicción de lesiones
- [ ] Integración con wearables (Garmin, Polar)
- [ ] API pública para integraciones
- [ ] Marketplace de plantillas de rutinas

---

## 🤝 Contribución

Este proyecto sigue estándares estrictos de calidad. Lee [`AGENTS.md`](./AGENTS.md) antes de contribuir.

### Flujo de Trabajo

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: agregar nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo, punto y coma faltante, etc.
refactor: refactorización de código
test: agregar tests
chore: actualizar dependencias
```

---

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE) para más detalles.

---

## 👥 Equipo

Desarrollado con ❤️ por profesionales del deporte y la tecnología.

---

## 📞 Soporte

- 📧 Email: soporte@highperfo.com
- 📖 Docs: [Documentación completa](#)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/high-perfo/issues)

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

[⬆ Volver arriba](#-high-perfo)

</div>
