# Red Negocios - Frontend de Autenticación

Sistema de login y gestión de contraseñas para la plataforma Red Negocios CCS, desarrollado en React con Vite.

## 📋 Descripción

Aplicación web SPA (Single Page Application) que proporciona un sistema completo de autenticación para Red Negocios, incluyendo login, cambio de contraseña y recuperación de cuenta. La aplicación gestiona múltiples sistemas y redirige a los usuarios según sus permisos.

## 🚀 Características Principales

### Funcionalidades de Autenticación
- **Login de usuarios** con validación de email y contraseña
- **Cambio de contraseña** con validaciones robustas
- **Recuperación de contraseña** vía email
- **Selección de sistemas** para usuarios con múltiples accesos
- **Redirección automática** a sistemas correspondientes (Mandante/Proveedor)

### Validaciones Implementadas
- ✅ **Validación de email** en tiempo real con expresiones regulares
- ✅ **Validación de contraseñas** con criterios de seguridad:
  - Mínimo 8 caracteres
  - Al menos una minúscula
  - Al menos una mayúscula  
  - Al menos un carácter especial
- ✅ **Confirmación de contraseñas** con verificación de coincidencia
- ✅ **Campos requeridos** con mensajes de error específicos
- ✅ **Validación visual** con iconos de estado (✓/✗)

### UX/UI Features
- 🔒 **Mostrar/ocultar contraseña** en todos los campos
- 🎨 **Diseño responsive** adaptable a dispositivos móviles
- ⚡ **Feedback visual inmediato** en validaciones
- 🔄 **Estados de carga** con spinners
- 📱 **Diálogos modales** para notificaciones
- 🎯 **Navegación intuitiva** entre formularios

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3.1** - Biblioteca principal
- **Vite 6.3.5** - Build tool y dev server
- **React Router DOM 6.24.1** - Enrutamiento SPA
- **Sass 1.77.6** - Preprocesador CSS

### UI Components
- **PrimeReact 10.8.0** - Componentes UI (Dialog, ProgressSpinner)
- **PrimeIcons 7.0.0** - Iconografía
- **React Icons 5.2.1** - Iconos adicionales

### Development Tools
- **ESLint 9.28.0** - Linting de código
- **Vite Plugin React 4.3.1** - Integración React-Vite

### Deployment
- **Docker** - Containerización
- **Nginx** - Servidor web estático
- **GitHub Actions** - CI/CD automatizado

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── FormLogin.jsx        # Formulario de login
│   ├── FormChangePass.jsx   # Formulario cambio contraseña
│   ├── FormResetPass.jsx    # Formulario recuperar contraseña
│   └── ItemFooter.jsx       # Footer de la aplicación
├── pages/               # Páginas/Vistas principales
│   ├── Login.jsx           # Página de login
│   ├── ChangePassword.jsx  # Página cambio contraseña
│   ├── ResetPassword.jsx   # Página recuperar contraseña
│   └── SystemOptions.jsx   # Selección de sistemas
├── services/            # Servicios API
│   ├── authService.js      # Autenticación y login
│   ├── changepassService.js # Cambio de contraseña
│   └── resetpassService.js # Recuperación de contraseña
├── scss/               # Estilos organizados
│   ├── core/              # Variables y estilos globales
│   │   ├── _vars.sass        # Variables de color y fuentes
│   │   └── _global.sass      # Estilos base
│   └── modules/           # Módulos de estilos
│       ├── form.sass         # Estilos de formularios
│       ├── button.sass       # Estilos de botones
│       ├── section.sass      # Secciones y layout
│       └── footer.sass       # Footer
└── assets/             # Recursos estáticos
    ├── icons/             # Logos e iconos
    └── uploads/           # Imágenes de fondo
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 20+ 
- Yarn o npm
- Docker (para deployment)

### Instalación Local
```bash
# Clonar repositorio
git clone [repository-url]
cd red-negocios-fe-login

# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con las URLs de API correspondientes

# Ejecutar en desarrollo
yarn dev

# Build para producción
yarn build

# Preview del build
yarn preview
```

### Variables de Entorno
```env
VITE_API_WEBAPI=https://desaapi.rednegocios.cl
VITE_MANDANTE_URL=https://desaapi.rednegocios.cl
DOCKER_PORT=80
```

## 🐳 Deployment con Docker

```bash
# Build y ejecutar contenedor
docker compose up --build -d

# Detener servicios
docker compose down
```

### Pipeline CI/CD
El proyecto incluye automatización con GitHub Actions que:
1. Se activa en push a `main`
2. Conecta vía SSH al servidor
3. Actualiza código y reconstruye contenedores
4. Despliega automáticamente

## 🔌 APIs y Servicios

### Endpoints Utilizados
- `POST /api/v1/auth` - Autenticación de usuarios
- `POST /api/v1/auth/recovery` - Cambio de contraseña
- `GET /api/v1/auth/recoveryRequest/{email}` - Solicitud recuperación
- `GET /api/v1/auth/renew` - Renovación de token
- `POST /api/v1/RegistraIngreso` - Registro acceso sistema

### Flujo de Autenticación
1. **Login** → Validación credenciales
2. **Múltiples sistemas** → Selección usuario
3. **Sistema único** → Redirección directa
4. **Registro ingreso** → Log de acceso
5. **Renovación token** → Token actualizado
6. **Redirección externa** → Sistema correspondiente

## 🔄 Flujos de Usuario

### 1. Login Estándar
Login → Validación → Sistema único → Redirección

### 2. Login Multi-sistema
Login → Validación → Selección sistema → Redirección

### 3. Cambio Contraseña
Formulario → Validaciones → Confirmación → Éxito

### 4. Recuperación Contraseña  
Email → Validación → Solicitud → Confirmación email

## 🎥 QA - Videos de Demostración

### Fecha de grabación: 23 Julio 2025

- **[Video 1](https://www.loom.com/share/2911274f65e3451dafcecb6d48dc762b)**
- **[Video 2](https://www.loom.com/share/25a296a6c7204faab8ceac98e1305ac6)**
- **[Video 3](https://www.loom.com/share/d65170ecb94a465b957b8612e0d759be)**

### Fecha de grabación: 28 Julio 2025
Correcciones en flujo de recuperar contraseña y diseño de ojos en password

- **[Video 1](https://www.loom.com/share/185506263a8f406cbd0f9d85d07933b5?sid=c7bbcd2e-8033-4fde-b455-0e253330e0f5)**
- **[Video 2](https://www.loom.com/share/cecfe2db5da5443bb3a1e918dcf2ef15?sid=fb930a62-b844-4f5a-8172-015105fe40cf)**

## 📄 Licencia

Proyecto privado © 2024 Red Negocios CCS - Todos los derechos reservados.

---
**Desarrollado con ❤️ para Red Negocios CCS**
