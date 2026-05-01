# Estructura de Roles y Accesos - High Perfo

## 🎭 Roles del Sistema

### 1. SUPER_ADMIN
**Descripción**: Administrador global con acceso total al sistema. Puede actuar como coach.

**Acceso a rutas**:
- ✅ `/coaches` - Gestión de entrenadores
- ✅ `/atletas` - Gestión de atletas
- ✅ `/rutinas` - Creación y asignación de rutinas
- ✅ `/herramientas` - Herramientas de análisis
- ✅ `/ajustes` - Configuración del sistema

**Landing page**: `/atletas`

**Características**:
- Puede ver y gestionar todos los coaches del sistema
- Tiene acceso completo a funcionalidades de coach
- Puede configurar ajustes globales

---

### 2. ORG_ADMIN
**Descripción**: Administrador de organización/club. Gestiona coaches y configuración de su organización.

**Acceso a rutas**:
- ✅ `/coaches` - Gestión de entrenadores de su organización
- ✅ `/atletas` - Vista de atletas de su organización
- ✅ `/ajustes` - Configuración de paleta de colores y branding

**Landing page**: `/coaches`

**Características**:
- Gestiona coaches de su organización
- Configura paleta de colores que heredan todos los coaches de su org
- Ve estadísticas de su organización
- **NO tiene acceso** a `/rutinas` ni `/herramientas`

---

### 3. COACH (con organización)
**Descripción**: Entrenador que pertenece a una organización. Usa la paleta de colores de su org.

**Acceso a rutas**:
- ✅ `/atletas` - Gestión de sus atletas
- ✅ `/rutinas` - Creación y asignación de rutinas
- ✅ `/herramientas` - Herramientas de análisis biomecánico

**Landing page**: `/atletas`

**Características**:
- Trabaja con atletas asignados por su ORG_ADMIN
- Usa la paleta de colores configurada por su organización
- **NO tiene acceso** a `/ajustes` (usa config de la org)
- **NO tiene acceso** a `/coaches`

---

### 4. COACH (independiente)
**Descripción**: Entrenador independiente sin organización. Plan individual.

**Acceso a rutas**:
- ✅ `/atletas` - Gestión de sus atletas (límite según plan)
- ✅ `/rutinas` - Creación y asignación de rutinas
- ✅ `/herramientas` - Herramientas de análisis biomecánico

**Landing page**: `/atletas`

**Características**:
- Gestiona sus propios atletas (límite de 5 en plan individual)
- Usa paleta de colores por defecto del sistema
- **NO tiene acceso** a `/ajustes` (usa config por defecto)
- **NO tiene acceso** a `/coaches`

---

## 🛡️ Protección de Rutas (proxy.ts)

El archivo `src/proxy.ts` maneja:

1. **Redirect a login**: Si no hay sesión activa
2. **Redirect desde login**: Si ya estás logueado, te envía a tu landing page
3. **Control de acceso por rol**: Verifica que tengas permiso para acceder a cada ruta
4. **Redirect a landing**: Si intentás acceder a una ruta no permitida

## 🎨 Paleta de Colores

### Organización con ORG_ADMIN
- El ORG_ADMIN configura la paleta en `/ajustes`
- Todos los COACH de esa organización heredan la paleta
- Se guarda en la tabla `DesignConfig` asociada al `accountId`

### Coach Independiente
- Usa la paleta por defecto del sistema (Noche Profunda)
- No puede modificarla (no tiene acceso a `/ajustes`)

## 📊 Sidebar Items por Rol

### SUPER_ADMIN
```
- Entrenadores (/coaches)
- Atletas (/atletas)
- Rutinas (/rutinas)
- Herramientas (/herramientas)
- Ajustes (/ajustes)
```

### ORG_ADMIN
```
- Entrenadores (/coaches)
- Atletas (/atletas)
- Ajustes (/ajustes)
```

### COACH (con org o independiente)
```
- Atletas (/atletas)
- Rutinas (/rutinas)
- Herramientas (/herramientas)
```

## 🔐 Usuarios de Prueba (Seed)

Ejecutar: `pnpm reset`

```
📧 USUARIOS CREADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 Contraseña universal: Test1234!

✅ superadmin@highperfo.com      | SUPER_ADMIN  | Super Admin
✅ admin@lincerugby.com          | ORG_ADMIN    | Carlos Ruiz (Lince Rugby Club)
✅ coach1@lincerugby.com         | COACH        | Martín Herrera (Lince Rugby Club)
✅ coach2@lincerugby.com         | COACH        | Pablo Domínguez (Lince Rugby Club)
✅ admin@performancelab.com      | ORG_ADMIN    | Laura Méndez (Performance Lab)
✅ coach1@performancelab.com     | COACH        | Andrés Vidal (Performance Lab)
✅ coach@independiente.com       | COACH        | Roberto Morales (Independiente)
```

## 🚀 Flujo de Navegación

### Login exitoso:
1. **SUPER_ADMIN** → `/atletas`
2. **ORG_ADMIN** → `/coaches`
3. **COACH** → `/atletas`

### Intento de acceso no autorizado:
- Redirect automático a la landing page del rol
