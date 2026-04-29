# Deploy Configuration

## Puerto de Desarrollo y Producción

La aplicación está configurada para correr en el puerto **3012**:

- **Desarrollo**: `pnpm dev` → http://localhost:3012
- **Producción**: `pnpm start` → http://localhost:3012

## GitHub Actions - Deploy Automático

El proyecto está configurado para hacer deploy automático al VPS cuando se hace push a la rama `main`.

### Secrets Requeridos en GitHub

Debes configurar los siguientes secrets en tu repositorio de GitHub:
`Settings → Secrets and variables → Actions → New repository secret`

```
VPS_HOST=tu-servidor.com
VPS_USER=root
VPS_PASSWORD=tu-password-seguro
```

### Flujo de Deploy

1. Push a rama `main`
2. GitHub Actions se activa automáticamente
3. Se conecta al VPS vía SSH
4. Ejecuta los siguientes comandos:
   ```bash
   cd high-perfo/
   git fetch origin main
   git reset --hard origin/main
   git clean -fd -e .next
   pnpm install
   pnpm prisma generate
   pnpm prisma migrate deploy
   pnpm build
   pm2 restart high-perfo
   ```

### Configuración del VPS

#### 1. Clonar el repositorio en el VPS

```bash
cd /root
git clone https://github.com/tu-usuario/high-perfo.git
cd high-perfo
```

#### 2. Configurar variables de entorno

```bash
cp .env.example .env
nano .env
```

Configurar:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/highperfo"
JWT_SECRET="tu-secret-super-seguro-cambiar-en-produccion"
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://tu-dominio.com"
```

#### 3. Instalar dependencias y configurar base de datos

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm build
```

#### 4. Iniciar con PM2

```bash
pm2 start ecosystem.config.json
pm2 save
pm2 startup
```

### Comandos PM2 Útiles

```bash
# Ver logs
pm2 logs high-perfo

# Ver estado
pm2 status

# Reiniciar
pm2 restart high-perfo

# Detener
pm2 stop high-perfo

# Eliminar
pm2 delete high-perfo
```

### Nginx Configuration (Opcional)

Si usas Nginx como reverse proxy:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3012;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Troubleshooting

#### El deploy falla

1. Verificar que los secrets estén configurados correctamente
2. Verificar que el usuario tenga permisos SSH
3. Revisar logs en GitHub Actions

#### La aplicación no inicia

1. Verificar logs: `pm2 logs high-perfo`
2. Verificar que el puerto 3012 esté disponible: `lsof -i :3012`
3. Verificar variables de entorno en `.env`
4. Verificar que la base de datos esté corriendo

#### Error de base de datos

1. Verificar conexión: `psql -U user -d highperfo`
2. Ejecutar migraciones: `pnpm prisma migrate deploy`
3. Verificar que DATABASE_URL sea correcta

## Monitoreo

### Ver logs en tiempo real
```bash
pm2 logs high-perfo --lines 100
```

### Ver métricas
```bash
pm2 monit
```

### Ver información detallada
```bash
pm2 show high-perfo
```
