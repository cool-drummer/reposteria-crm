# Sistema de Administración de Repostería

Sistema de gestión de inventario para negocios de repostería, construido con React, PHP y MySQL.

## Características

- Gestión de productos (crear, leer, actualizar, eliminar, archivar)
- Control de inventario
- Gestión de categorías
- Control de ingredientes
- Sistema de usuarios con roles
- Interfaz moderna y responsiva

## Requisitos Previos

- Docker
- Docker Compose

## Estructura del Proyecto

```
.
├── frontend/           # Aplicación React
├── backend/           # API PHP
│   ├── public/       # Punto de entrada de la API
│   ├── database/     # Scripts SQL
│   └── src/          # Código fuente PHP
├── docker-compose.yml # Configuración de Docker
└── .env              # Variables de entorno (crear desde env.template)
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```

2. Configura las variables de entorno:
   ```bash
   cp env.template .env
   # Edita el archivo .env con tus configuraciones
   ```

3. Inicia los contenedores:
   ```bash
   docker compose up -d
   ```

## Acceso

Por defecto, los servicios estarán disponibles en:

- Frontend (React): http://localhost:${FRONTEND_PORT} (default: 3000)
- Backend (PHP): http://localhost:${BACKEND_PORT} (default: 8000)
- phpMyAdmin: http://localhost:${PMA_PORT} (default: 8080)
- MySQL: localhost:${DB_PORT} (default: 3306)
- Redis: localhost:${REDIS_PORT} (default: 6379)

Los puertos se pueden configurar en el archivo `.env`.

## Variables de Entorno

El archivo `env.template` contiene todas las variables necesarias:

### Puertos
- `FRONTEND_PORT`: Puerto para la aplicación React (default: 3000)
- `BACKEND_PORT`: Puerto para la API PHP (default: 8000)
- `DB_PORT`: Puerto para MySQL (default: 3306)
- `PMA_PORT`: Puerto para phpMyAdmin (default: 8080)
- `REDIS_PORT`: Puerto para Redis (default: 6379)
- `MAIL_PORT`: Puerto para el servidor SMTP (default: 587)

### URLs de Servicios
- `FRONTEND_URL`: URL completa del frontend
- `BACKEND_URL`: URL completa del backend
- `PMA_URL`: URL completa de phpMyAdmin
- `DB_URL`: URL completa de la base de datos

### Credenciales por Defecto

#### Base de Datos
- Usuario: ${DB_USER}
- Contraseña: ${DB_PASSWORD}
- Base de datos: ${DB_NAME}

#### Administrador
- Email: ${ADMIN_EMAIL}
- Contraseña: Definida en las variables de entorno

## Desarrollo

- El código del frontend se encuentra en `./frontend/src/`
- El código del backend se encuentra en `./backend/src/`
- Los cambios en los archivos se reflejan automáticamente gracias a los volúmenes de Docker

## Comandos Útiles

```bash
# Iniciar contenedores
docker compose up -d

# Detener contenedores
docker compose down

# Ver logs
docker compose logs -f

# Acceder a la shell del contenedor
docker compose exec frontend sh    # Para el frontend
docker compose exec backend bash   # Para el backend
docker compose exec db mysql -u root -p    # Para MySQL
docker compose exec redis redis-cli # Para Redis
```

## Seguridad

- Cambia todas las contraseñas por defecto en el archivo `.env`
- Configura correctamente los permisos de usuarios
- Mantén actualizadas todas las dependencias
- Implementa HTTPS en producción
- No compartas tu archivo `.env` con las credenciales reales

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 