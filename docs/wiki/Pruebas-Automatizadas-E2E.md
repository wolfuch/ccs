# Pruebas Automatizadas E2E — Red Negocios FE Login

## Resumen

Este proyecto incluye una suite de pruebas E2E (end-to-end) construida con **Playwright** y **TypeScript**, siguiendo el patrón **Page Object Model (POM)**. Las pruebas validan los flujos de autenticación de la aplicación y la navegación del portal de Mandante.

| | |
|---|---|
| **Framework** | Playwright ^1.63.0 |
| **Lenguaje** | TypeScript |
| **Patrón** | Page Object Model (POM) |
| **Ubicación del código** | `src/pom/` |
| **Navegadores cubiertos** | Chromium, Firefox, WebKit (`playwright.config.ts`) |
| **CI** | GitHub Actions — [`.github/workflows/playwright.yml`](../../.github/workflows/playwright.yml) |

## Estructura del proyecto de pruebas

```
src/pom/
├── pages/
│   ├── login.page.ts                    # Formulario de login
│   ├── navbar_mandante_black.page.ts     # Navegación (navbar) del portal Mandante
│   ├── evaluacion_desempeno.page.ts      # Pendiente de implementación
│   └── mandante_dashboard.page.ts        # Pendiente de implementación
└── tests/
    └── login.spec.ts                     # Casos de prueba de autenticación
```

- **`pages/`** contiene una clase por página/componente de la aplicación. Cada clase expone los `Locator` de los elementos con los que interactúa la prueba y métodos de alto nivel (`submitLogin`, `goToMetricas`, etc.) que encapsulan las acciones del usuario.
- **`tests/`** contiene los archivos `*.spec.ts` con los casos de prueba, que consumen las clases de `pages/` en lugar de interactuar directamente con `page.locator(...)`.

## Page Objects disponibles

| Page Object | Archivo | Estado | Descripción |
|---|---|---|---|
| `LoginPage` | [`login.page.ts`](../../src/pom/pages/login.page.ts) | ✅ Implementado y en uso | Formulario de ingreso (email, contraseña, botón "Ingresar"). |
| `NavBar_Mandante_BlackPage` | [`navbar_mandante_black.page.ts`](../../src/pom/pages/navbar_mandante_black.page.ts) | ✅ Implementado (sin tests aún) | Barra de navegación del portal Mandante: acceso a Proveedores, Mi Cartera, Métricas y Evaluación. |
| `EvaluacionDesempenoPage` | [`evaluacion_desempeno.page.ts`](../../src/pom/pages/evaluacion_desempeno.page.ts) | 🚧 Pendiente (`//to do`) | Página de Evaluación de Desempeño. Aún sin locators propios. |
| `MandanteDashboarPage` | [`mandante_dashboard.page.ts`](../../src/pom/pages/mandante_dashboard.page.ts) | 🚧 Pendiente (`//to do`) | Dashboard del Mandante posterior al login. Aún sin locators propios. |

### `NavBar_Mandante_BlackPage` — métodos de navegación

Cada método sigue el mismo patrón: `readonly <locator>` declarado en la clase → asignado en el constructor → expuesto mediante un método `async goTo...()` que ejecuta los clics necesarios.

| Método | Ruta de clics | Destino |
|---|---|---|
| `goToBuscaProveedores()` | Buscar proveedores | Búsqueda de proveedores |
| `goToCartera()` | Proveedores → Mi Cartera | Mi Cartera |
| `goToMetricas()` | Proveedores → Métricas | Métricas |
| `goToEvaluacionDesempeno()` | Evaluación → Evaluación de desempeño | Evaluación de desempeño |
| `goToCargarDatosEvaluacion()` | Evaluación → Cargar datos evaluación | Cargar datos evaluación |
| `goToConfiguracionEscala()` | Evaluación → Configuración escala | Configuración escala |
| `goToConfigurarEvaluacion()` | Evaluación → Configurar evaluación | Configurar evaluación |

> **Nota:** los locators y el método `goToRankingProveedores()` (Ranking → Ranking proveedores) están dejados comentados en el código a la espera de que el módulo de Ranking esté disponible para pruebas.

## Suite de pruebas: `login.spec.ts`

Tags aplicados a todos los casos: **`@smoke`**, **`@login`**.

### 1. Login Correct Credentials

| | |
|---|---|
| **Objetivo** | Validar que un usuario se autentica correctamente con credenciales válidas. |
| **Pasos** | 1. Navega a `BASE_URL`.<br>2. Completa email (`USER_NAME`) y contraseña (`USER_PASS`).<br>3. Clic en "Ingresar".<br>4. Espera a que la página cargue. |
| **Resultado esperado** | La URL final es `https://devmandante.rednegocios.cl/dashboard`. |

### 2. Login Invalid User

| | |
|---|---|
| **Objetivo** | Validar que el formulario rechaza un email con formato inválido. |
| **Pasos** | 1. Navega a `BASE_URL`.<br>2. Ingresa usuario `UserTest` y contraseña `badPass` (valores fijos, no usa variables de entorno de credenciales). |
| **Resultado esperado** | El formulario muestra el mensaje **"Ingrese un email válido"**. |

### 3. Login Incorrect Password

| | |
|---|---|
| **Objetivo** | Validar que el backend rechaza una contraseña incorrecta para un usuario válido. |
| **Pasos** | 1. Navega a `BASE_URL`.<br>2. Ingresa `USER_NAME` válido con contraseña `badPass`.<br>3. Clic en "Ingresar". |
| **Resultado esperado** | Se muestra un diálogo con el mensaje **"Parámetros no válidos"**, que se cierra con el botón "Entendido". |

### 4. Fail Test *(`test.skip`, deshabilitado)*

| | |
|---|---|
| **Objetivo** | Caso de prueba dejado fallando intencionalmente para validar la reportería (no se ejecuta por estar con `test.skip`). |
| **Pasos** | Login con `USER_NAME` + `badPass`, luego valida visibilidad del botón "Menú de perfil". |
| **Estado** | Deshabilitado — no forma parte de la ejecución regular. |

## Variables de entorno

Las pruebas leen sus valores desde un archivo `.env_playwright` en la raíz del proyecto (no versionado). La plantilla de referencia es [`.env_example`](../../.env_example).

| Variable | Descripción |
|---|---|
| `BASE_URL` | URL del ambiente a testear (ej. `https://devlogin.rednegocios.cl/`). |
| `USER_NAME` | Email de un usuario de prueba válido en el ambiente. |
| `USER_PASS` | Contraseña del usuario de prueba. |

> ⚠️ `.env_playwright` contiene credenciales y **no debe subirse a control de versiones**. En CI/CD, estas variables deben cargarse como *secrets* del pipeline en lugar de un archivo local.

## Ejecución de las pruebas

```bash
# Instalar dependencias del proyecto
npm ci

# Instalar los navegadores de Playwright
npx playwright install

# Ejecutar únicamente la suite de login
npm run loginTest

# Ejecutar todos los tests marcados con @smoke
npm run smoke

# Ejecutar toda la suite
npx playwright test

# Ejecutar en modo headed (con navegador visible)
npx playwright test --headed

# Ejecutar en modo debug
npx playwright test --debug

# Ver el último reporte HTML generado
npx playwright show-report
```

## Reportería

La configuración (`playwright.config.ts`) usa el reporter **`html`** por defecto, generado en `playwright-report/`. Además:

- `trace: 'on-first-retry'` — se captura una traza navegable solo si una prueba falla y se reintenta.
- Los navegadores configurados como proyectos son **chromium**, **firefox** y **webkit**; por defecto las pruebas corren en los tres salvo que se filtre con `--project`.

## Integración continua

El workflow [`playwright.yml`](../../.github/workflows/playwright.yml) (GitHub Actions) se ejecuta en cada `push` y `pull request` contra `main`/`master`:

1. Instala dependencias (`npm ci`).
2. Instala navegadores Playwright con sus dependencias del sistema.
3. Ejecuta `npx playwright test` (toda la suite).
4. Publica el `playwright-report/` como artefacto del build (30 días de retención).

## Pendientes conocidos

- `EvaluacionDesempenoPage` y `MandanteDashboarPage` están declaradas pero sin locators ni métodos (`//to do`).
- Los métodos de navegación al módulo de **Ranking** en `NavBar_Mandante_BlackPage` están implementados pero comentados hasta que el módulo esté disponible para pruebas.
- Aún no existen archivos `*.spec.ts` que ejerciten `NavBar_Mandante_BlackPage`, `EvaluacionDesempenoPage` ni `MandanteDashboarPage` — la única suite activa es `login.spec.ts`.
