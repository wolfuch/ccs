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
- **Playwright ^1.63.0** - Testing E2E automatizado (TypeScript + Page Object Model)

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
├── pom/                 # Tests automatizados E2E (Page Object Model)
│   ├── pages/             # Clases Page Object
│   │   ├── login.page.ts
│   │   ├── navbar_mandante_black.page.ts
│   │   ├── evaluacion_desempeno.page.ts
│   │   ├── mi_cartera.page.ts
│   │   ├── registro.page.ts
│   │   └── mandante_metricas.page.ts   # implementación parcial
│   └── tests/             # Casos de prueba (*.spec.ts)
│       ├── login.spec.ts
│       ├── evaluacion_desempeno.spec.ts
│       ├── registro_proveedor.spec.ts
│       └── mandante_metricas.spec.ts
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

El proyecto incluye tests automatizados E2E (End-to-End) implementados con **Playwright** y **TypeScript**, siguiendo el patrón **Page Object Model (POM)**. Los tests validan autenticación, navegación del portal Mandante, dashboard de métricas, evaluación de desempeño y alta de proveedores. Viven en `src/pom/` (`testDir` en `playwright.config.ts`); los navegadores activos son Chromium y WebKit (Firefox está comentado en la config):

```
src/pom/
├── pages/
│   ├── login.page.ts                    # Formulario de login
│   ├── navbar_mandante_black.page.ts     # Navegación del portal Mandante
│   ├── evaluacion_desempeno.page.ts      # Filtros y búsqueda de Evaluación de Desempeño
│   ├── mi_cartera.page.ts                # Tabs y búsqueda de Mi Cartera
│   ├── registro.page.ts                  # Formulario de registro de proveedor
│   └── mandante_metricas.page.ts         # Resumen Riesgo / Dashboard 360 (parcial)
└── tests/
    ├── login.spec.ts                      # Autenticación
    ├── evaluacion_desempeno.spec.ts        # Filtros y búsqueda de contratos
    ├── registro_proveedor.spec.ts          # Alta de proveedor (licitación / misceláneo)
    └── mandante_metricas.spec.ts           # Dashboard de métricas del Mandante
```

Documentación ampliada, lista para publicar en la wiki de Azure DevOps: [`docs/wiki/Pruebas-Automatizadas-E2E.md`](docs/wiki/Pruebas-Automatizadas-E2E.md).

### Variables de Entorno para Testing

#### Configuración del archivo `.env_playwright`

El archivo `.env_playwright` en la raíz del proyecto (no versionado) contiene las variables necesarias para ejecutar los tests. Usar [`.env_example`](.env_example) como plantilla:

```dotenv
BASE_URL=
USER_NAME=
USER_PASS=
```

#### Descripción de Variables

| Variable | Descripción |
|----------|-------------|
| `BASE_URL` | URL a la que accede cada test al inicio (login). Debe apuntar al ambiente de testing correcto |
| `USER_NAME` | Email del usuario de prueba. Debe ser un usuario válido en el ambiente |
| `USER_PASS` | Contraseña del usuario de prueba. **Nota:** solo para ambientes de desarrollo/staging |

### Carga de Variables de Entorno

Cada archivo `*.spec.ts` carga las variables de entorno explícitamente desde `.env_playwright` al inicio (ejemplo de `login.spec.ts`):

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
```

Esto deja disponibles las variables en `process.env` para todos los tests:

```typescript
process.env.BASE_URL    // URL de la aplicación
process.env.USER_NAME   // Credenciales del usuario
process.env.USER_PASS   // Contraseña del usuario
```

### Casos de Test Implementados

Detalle completo de los 4 archivos de prueba (locators, métodos y casos) en [`docs/wiki/Pruebas-Automatizadas-E2E.md`](docs/wiki/Pruebas-Automatizadas-E2E.md). Resumen:

| Archivo | Tags | Casos |
|---|---|---|
| `login.spec.ts` | `@smoke @login` | 4 (1 en `test.skip`; detallados abajo) |
| `evaluacion_desempeno.spec.ts` | `@smoke @evaluacion @botonesEvaluador` | 6 — búsqueda por RUT y por N° de contrato, selección de contrato y filtros de vencimiento / sin evaluaciones |
| `registro_proveedor.spec.ts` | `@smoke @proveedor @proveedores @licitacion @micelaneo` | 3 — alta de proveedor (Licitación / Misceláneo) |
| `mandante_metricas.spec.ts` | `@smoke @dashboard` | 2 — 1 activo (columnas de Resumen Riesgo) y 1 en `test.skip` (botón Dashboard 360, pendiente) |

#### `login.spec.ts` — todos los casos están etiquetados con `@smoke` y `@login`.

#### 1. **Login Correct Credentials** ✅
**Objetivo:** Validar que un usuario puede autenticarse exitosamente con credenciales válidas.

**Proceso:**
1. Navega a `BASE_URL` (la URL definida en variables de entorno)
2. Completa el campo de email con `USER_NAME` desde variables de entorno
3. Completa el campo de contraseña con `USER_PASS` desde variables de entorno
4. Hace clic en el botón "Ingresar"
5. Espera a que la página cargue completamente

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación
- `USER_NAME` - Email del usuario válido
- `USER_PASS` - Contraseña del usuario válido

**Resultado Esperado:** La URL final es `https://devmandante.rednegocios.cl/dashboard`.

#### 2. **Login Invalid User** ❌
**Objetivo:** Validar que el sistema rechaza emails inválidos con un mensaje de error apropiado.

**Proceso:**
1. Navega a `BASE_URL`
2. Ingresa usuario `UserTest` y contraseña `badPass` (valores fijos, no usa credenciales de variables de entorno)
3. Verifica que aparezca el mensaje de error: "Ingrese un email válido"

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación

**Resultado Esperado:** El sistema muestra un error de validación sin permitir el envío del formulario.

**Nota:** Este test NO utiliza `USER_NAME` ni `USER_PASS` porque está probando un caso de error de validación de entrada.

#### 3. **Login Incorrect Password** 🔒
**Objetivo:** Validar que el sistema rechaza credenciales incorrectas (contraseña inválida) con un mensaje de error del servidor.

**Proceso:**
1. Navega a `BASE_URL`
2. Completa el email con `USER_NAME` válido desde variables de entorno
3. Completa la contraseña con un valor inválido: `badPass`
4. Hace clic en el botón "Ingresar"
5. Verifica que aparezca el error: "Parámetros no válidos"
6. Cierra el diálogo de error haciendo clic en "Entendido"

**Variables de Entorno Utilizadas:**
- `BASE_URL` - Destino inicial de navegación
- `USER_NAME` - Email válido (probando con contraseña incorrecta)

**Resultado Esperado:** El servidor rechaza la autenticación y muestra un mensaje de error modal que el usuario puede cerrar.

#### 4. **Fail Test** *(deshabilitado con `test.skip`)*
**Objetivo:** Caso dejado fallando intencionalmente para validar la reportería. No se ejecuta en las corridas normales.

### Ejecución de Tests

#### Prerequisitos
```bash
# Asegurate de tener las dependencias instaladas
npm ci

# Instalar los navegadores de Playwright
npx playwright install
```

#### Comandos para Ejecutar Tests

```bash
# Ejecutar toda la suite (chromium y webkit)
npm run restroTest

# Ejecutar únicamente la suite de login
npm run loginTest

# Ejecutar todos los tests marcados con @smoke
npm run smoke

# Ver el último reporte HTML generado
npm run testReport

# Ejecutar por tag o por archivo (sin script dedicado)
npx playwright test --grep @evaluacion
npx playwright test mandante_metricas.spec.ts

# Ejecutar en un solo navegador
npx playwright test --project=chromium

# Ejecutar tests con interfaz gráfica visible (modo headed)
npx playwright test --headed

# Ejecutar tests con modo debug (paso a paso)
npx playwright test --debug
```

### Mejores Prácticas y Consideraciones

#### 📋 Configuración de Credenciales

1. **Ambiente de Testing vs Producción**
   - Las credenciales en `.env_playwright` deben apuntar a un usuario de prueba válido
   - **Nunca usar credenciales reales de usuarios en producción**
   - Para ambientes diferentes (dev, staging, prod), ajustar `BASE_URL` en `.env_playwright`

2. **Seguridad**
   - El archivo `.env_playwright` contiene credenciales sensibles
   - **NUNCA hacer commit de `.env_playwright` a control de versiones** (ya está en `.gitignore`)
   - En CI/CD, usar variables secretas del pipeline en lugar de un archivo local

#### 🔐 Variables de Entorno en CI/CD

El pipeline actual de este repositorio es **GitHub Actions** ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)), que se ejecuta en cada `push`/`pull request` a `main`/`master`, instala dependencias y navegadores, corre `npx playwright test` y publica `playwright-report/` como artefacto (30 días de retención). El workflow no define `BASE_URL`, `USER_NAME` ni `USER_PASS` (ni secrets); hoy esas variables no llegan a los tests en CI.

Si el proyecto se integra además con **Azure DevOps** (por ejemplo, para publicar esta documentación en la wiki o correr pipelines adicionales), las variables sensibles deben definirse como *variables secretas* del pipeline y no en un archivo `.env_playwright` versionado:

```yaml
# Ejemplo de variables en un pipeline de Azure DevOps
variables:
  BASE_URL: 'https://staging.rednegocios.cl/'
  USER_NAME: 'testuser@ccs.cl'
  USER_PASS: '$(TestUserPassword)'  # Variable secreta
```

#### ⏱️ Timeouts y Waits

Los tests utilizan:
- `page.waitForLoadState()` - Espera a que la página cargue completamente
- `expect()` con timeouts implícitos para verificaciones
- `trace: 'on-first-retry'` en `playwright.config.ts` - captura una traza navegable solo si una prueba falla y se reintenta

#### 📊 Debugging

Si un test falla:

1. **Ejecutar con modo debug:**
   ```bash
   npx playwright test --debug
   ```

2. **Ver traces de Playwright:**
   ```bash
   npx playwright show-trace trace.zip
   ```

3. **Revisar el reporte HTML:**
   ```bash
   npx playwright show-report
   ```

### Troubleshooting Común

| Problema | Causa | Solución |
|----------|-------|----------|
| `process.env.BASE_URL is undefined` | `.env_playwright` no existe o no se carga | Crear `.env_playwright` en raíz a partir de `.env_example` |
| Test timeout en login | La aplicación es lenta o URL inaccesible | Verificar `BASE_URL` en `.env_playwright`, aumentar timeout |
| "Parámetros no válidos" en test de login correcto | Credenciales expiradas o inválidas | Actualizar `USER_NAME` y `USER_PASS` con un usuario válido |
| Tests pasan localmente pero fallan en CI/CD | Variables de entorno no configuradas como secrets en el pipeline | Configurar variables secretas en GitHub Actions / Azure DevOps |

### Próximos Pasos

- 🚧 Completar `MandanteMetricasPage`: `segmentacionPiramide` comentado, bloque grabado sin migrar, y test "Botón Dashboard 360" en `test.skip` (`//TODO`)
- 🚧 Habilitar `goToRankingProveedores()` en `NavBar_Mandante_BlackPage` cuando el módulo de Ranking esté disponible para pruebas
- 🚧 Reactivar el proyecto firefox en `playwright.config.ts` (comentado porque falla) y pasar `BASE_URL`/`USER_NAME`/`USER_PASS` al workflow de CI
- 🚧 Cubrir `buscarPorAdmin()`, `filtroVencido()` y `nextPage()` de `EvaluacionDesempenoPage`, hoy sin test
- ⚠️ Revisar deuda técnica conocida (ver sección de Pendientes en la [wiki](docs/wiki/Pruebas-Automatizadas-E2E.md))
- ✅ Tests para cambio de contraseña (`FormChangePass.jsx`)
- ✅ Tests para recuperación de contraseña (`FormResetPass.jsx`)
- ✅ Tests para selección de múltiples sistemas (`SystemOptions.jsx`)
- ✅ Tests de manejo de errores API (timeouts, errores 500, etc.)

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