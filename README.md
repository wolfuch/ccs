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
- **Playwright 1.40+** - Testing E2E automatizado

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
├── tests/              # Tests automatizados E2E
│   └── login.spec.ts       # Test de autenticación
└── assets/             # Recursos estáticos
    ├── icons/             # Logos e iconos
    └── uploads/           # Imágenes de fondo
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 20+ 
- Yarn o npm
- Docker (para deployment)
- Playwright (para testing)

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

## 🧪 Testing Automatizado E2E con Playwright

### Descripción General

El proyecto incluye tests automatizados E2E (End-to-End) implementados con **Playwright** que validan los flujos principales de autenticación de la aplicación. Los tests se encuentran en la carpeta `src/tests/` con el archivo principal `login.spec.ts`.

### Variables de Entorno para Testing

#### Configuración del Archivo `.env`

El archivo `.env` en la raíz del proyecto contiene las variables necesarias para ejecutar los tests:

```dotenv
# URL base de la aplicación a testear
BASE_URL=https://devlogin.rednegocios.cl/

# Credenciales de usuario de prueba (debe ser un usuario válido en el ambiente de testing)
USER_NAME=61704000-K@ccs.cl

# Contraseña del usuario de prueba
USER_PASS='Rnccs2026@#'
```

#### Descripción de Variables

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `BASE_URL` | URL raíz de la aplicación que se va a testear. Debe apuntar al ambiente correcto (desarrollo, staging, producción) | `https://devlogin.rednegocios.cl/` |
| `USER_NAME` | Email o identificador del usuario de prueba. Debe corresponder a un usuario válido en la base de datos del ambiente | `61704000-K@ccs.cl` |
| `USER_PASS` | Contraseña del usuario de prueba en texto plano. **Nota:** Solo para ambientes de desarrollo/staging | `Rnccs2026@#` |

### Carga de Variables de Entorno

El archivo `login.spec.ts` carga las variables de entorno automáticamente al inicio:

```typescript
import dotenv from 'dotenv'
dotenv.config();
```

Esta línea lee el archivo `.env` de la raíz del proyecto y carga todas las variables en `process.env`, haciéndolas disponibles para todos los tests:

```typescript
process.env.BASE_URL    // URL de la aplicación
process.env.USER_NAME   // Credenciales del usuario
process.env.USER_PASS   // Contraseña del usuario
```

### Casos de Test Implementados

#### 1. **Login Correct Credentials** ✅
**Objetivo:** Validar que un usuario puede autenticarse exitosamente con credenciales válidas.

**Proceso:**
1. Navega a `BASE_URL` (la URL definida en variables de entorno)
2. Completa el campo de email con `USER_NAME` desde variables de entorno
3. Completa el campo de contraseña con `USER_PASS` desde variables de entorno
4. Hace clic en el botón "Ingresar"
5. Espera a que la página cargue completamente
6. Verifica que el "Menú de perfil" sea visible (indicando login exitoso)

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación
- `USER_NAME` - Email del usuario válido
- `USER_PASS` - Contraseña del usuario válido

**Resultado Esperado:** El usuario es redirigido a la página principal después del login exitoso.

#### 2. **Login Invalid User** ❌
**Objetivo:** Validar que el sistema rechaza emails inválidos con un mensaje de error apropiado.

**Proceso:**
1. Navega a `BASE_URL`
2. Ingresa un email inválido: `badUser`
3. Verifica que aparezca el mensaje de error: "Ingrese un email válido"

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación

**Resultado Esperado:** El sistema muestra un error de validación sin permitir el envío del formulario.

**Nota:** Este test NO utiliza variables de `USER_NAME` o `USER_PASS` porque está probando un caso de error de validación de entrada.

#### 3. **Login Incorrect Password** 🔒
**Objetivo:** Validar que el sistema rechaza credenciales incorrectas (contraseña inválida) con un mensaje de error del servidor.

**Proceso:**
1. Navega a `BASE_URL`
2. Completa el email con `USER_NAME` válido desde variables de entorno
3. Completa la contraseña con un valor inválido: `badPass`
4. Hace clic en el botón "Ingresar"
5. Espera la respuesta del servidor
6. Verifica que aparezca el error: "Parámetros no válidos"
7. Cierra el diálogo de error haciendo clic en "Entendido"

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación
- `USER_NAME` - Email válido (probando con contraseña incorrecta)

**Resultado Esperado:** El servidor rechaza la autenticación y muestra un mensaje de error modal que el usuario puede cerrar.

### Ejecución de Tests

#### Prerequisitos
```bash
# Asegurate de tener las dependencias instaladas
yarn install

# Playwright se instala automáticamente
npx playwright install
```

#### Comandos para Ejecutar Tests

```bash
# Ejecutar todos los tests en modo headless (sin interfaz gráfica)
yarn test

# Ejecutar tests con interfaz gráfica visible (modo headed)
yarn test --headed

# Ejecutar un test específico
yarn test login.spec.ts

# Ejecutar tests con modo debug (paso a paso)
yarn test --debug

# Ejecutar tests en modo watch (se reejecutan al modificar archivos)
yarn test --watch

# Generar reporte HTML de los resultados
yarn test --reporter=html

# Ver reporte HTML generado
yarn show-report
```

### Mejores Prácticas y Consideraciones

#### 📋 Configuración de Credenciales

1. **Ambiente de Testing vs Producción**
   - Las credenciales en `.env` deben apuntar a un usuario de prueba válido
   - **Nunca usar credenciales reales de usuarios en producción**
   - Para ambientes diferentes (dev, staging, prod), ajustar `BASE_URL` en el `.env`

2. **Seguridad**
   - El archivo `.env` contiene credenciales sensibles
   - **NUNCA hacer commit del `.env` a control de versiones**
   - Añadir `.env` al `.gitignore`
   - En CI/CD (Azure DevOps), usar variables secretas del pipeline

#### 🔐 Variables de Entorno en Azure DevOps

Para CI/CD en Azure DevOps, las variables se definen en el pipeline y NO en el `.env`:

```yaml
# Ejemplo de variables en pipeline de Azure DevOps
variables:
  BASE_URL: 'https://staging.rednegocios.cl/'
  USER_NAME: 'testuser@ccs.cl'
  USER_PASS: '$(TestUserPassword)'  # Variable secreta
```

Durante la ejecución del test, estas variables se cargan automáticamente en el entorno antes de que `dotenv` intente leer el `.env`.

#### ⏱️ Timeouts y Waits

Los tests utilizan:
- `page.waitForLoadState()` - Espera a que la página cargue completamente
- `expect()` con timeouts implícitos para verificaciones
- Para tests lentos, ajustar timeout en `playwright.config.js`:

```typescript
use: {
  timeout: 30000,  // 30 segundos por acción
  navigationTimeout: 30000,
}
```

#### 📊 Debugging

Si un test falla:

1. **Ejecutar con modo debug:**
   ```bash
   yarn test --debug
   ```

2. **Capturar screenshots:**
   ```typescript
   await page.screenshot({ path: 'debug-screenshot.png' });
   ```

3. **Ver traces de Playwright:**
   ```bash
   npx playwright show-trace trace.zip
   ```

4. **Revisar logs:**
   - Los mensajes de error aparecen en la consola durante ejecución
   - Buscar discrepancias entre variables de entorno esperadas vs reales

### Troubleshooting Común

| Problema | Causa | Solución |
|----------|-------|----------|
| `process.env.BASE_URL is undefined` | El `.env` no existe o no se carga | Crear `.env` en raíz con `BASE_URL=...` |
| Test timeout en login | La aplicación es lenta o URL inaccesible | Verificar `BASE_URL` en `.env`, aumentar timeout |
| "Parámetros no válidos" en test login correcto | Credenciales expiradas o inválidas | Actualizar `USER_NAME` y `USER_PASS` con usuario válido |
| Tests pasan localmente pero fallan en CI/CD | Variables de entorno no se cargan en pipeline | Configurar variables secretas en Azure DevOps |

### Próximos Pasos

Para ampliar la cobertura de tests, considera añadir:

- ✅ Tests para cambio de contraseña (`FormChangePass.jsx`)
- ✅ Tests para recuperación de contraseña (`FormResetPass.jsx`)  
- ✅ Tests para selección de múltiples sistemas (`SystemOptions.jsx`)
- ✅ Tests de validaciones en tiempo real (email inválido, contraseña débil)
- ✅ Tests de manejo de errores API (timeouts, errores 500, etc.)
- ✅ Tests visuales para validar UI consistency

---

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