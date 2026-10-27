# Pruebas Automatizadas E2E — Red Negocios FE Login

## Resumen

Este proyecto incluye una suite de pruebas E2E (end-to-end) construida con **Playwright** y **TypeScript**, siguiendo el patrón **Page Object Model (POM)**. Las pruebas validan los flujos de autenticación, navegación, dashboard de métricas, evaluación de desempeño (incluida la versión V2), carga de datos de evaluación, alta de proveedores y ranking de proveedores del portal Mandante.

| | |
|---|---|
| **Framework** | Playwright ^1.63.0 |
| **Lenguaje** | TypeScript |
| **Patrón** | Page Object Model (POM) |
| **Ubicación del código** | `src/pom/` |
| **Navegadores cubiertos** | Chromium y WebKit (`playwright.config.ts`). Firefox está comentado en la config ("Firefox está fallando"). |
| **CI** | GitHub Actions — [`.github/workflows/playwright.yml`](../../.github/workflows/playwright.yml) |

## Estructura del proyecto de pruebas

```
src/pom/
├── pages/
│   ├── login.page.ts                    # Formulario de login
│   ├── navbar_mandante_black.page.ts     # Navegación (navbar) del portal Mandante
│   ├── evaluacion_desempeno.page.ts      # Filtros y búsqueda de Evaluación de Desempeño
│   ├── evaluacionV2.page.ts              # Filtros y búsqueda de Evaluación de Desempeño V2
│   ├── carga_datos_evaluacion.page.ts    # Carga de datos de evaluación (plantillas de Contratos / Evaluadores)
│   ├── mi_cartera.page.ts                # Tabs y búsqueda de Mi Cartera
│   ├── registro.page.ts                  # Formulario de registro de proveedor
│   ├── ranking.page.ts                   # Filtros, búsqueda y ficha del Ranking de proveedores
│   └── mandante_metricas.page.ts         # Dashboard de métricas (Resumen Riesgo / Dashboard 360)
└── tests/
    ├── login.spec.ts                      # Autenticación
    ├── evaluacion_desempeno.spec.ts        # Filtros y búsqueda de contratos
    ├── evaluacionV2.spec.ts                # Filtros y búsqueda de contratos (V2)
    ├── carga_datos_evaluacion.spec.ts      # Descarga, edición y carga de plantillas Excel
    ├── registro_proveedor.spec.ts          # Alta de proveedor (licitación / misceláneo)
    ├── mandante_metricas.spec.ts           # Dashboard de métricas del Mandante
    └── ranking.spec.ts                     # Filtros, búsqueda y ficha del Ranking de proveedores
```

- **`pages/`** contiene una clase por página/componente de la aplicación. Cada clase expone los `Locator` de los elementos con los que interactúa la prueba y métodos de alto nivel que encapsulan las acciones del usuario.
- **`tests/`** contiene los archivos `*.spec.ts` con los casos de prueba, que consumen las clases de `pages/` en lugar de interactuar directamente con `page.locator(...)` para los elementos que un page object ya gestiona.

## Convenciones del POM

- **Locators públicos:** cada elemento es un campo `readonly <nombre>: Locator`, declarado en la clase y asignado en el constructor. Sin sufijo `Locator`, sin getters/setters.
- **Campos privados:** `page` y `getStartedLink` (heredado de la plantilla de Playwright, no se usa en los métodos) son `private readonly`. `getStartedLink` solo existe en `LoginPage`, `NavBar_Mandante_BlackPage`, `EvaluacionDesempenoPage` y `MiCarteraPage`; `RegistroPage`, `MandanteMetricasPage`, `EvaluacionV2Page` y `CargaDatosEvaluacionPage` solo declaran `page`.
- **Métodos de alto nivel:** las acciones se exponen como métodos `async` (`submitLogin`, `goToCartera`, `buscarPorRut`...). Los specs no deben llamar `page.locator(...)` para elementos que el page object ya posee.
- **Locator factories:** cuando el elemento depende de un valor dinámico (opciones de un dropdown), el campo es una función `readonly x: (valor: string) => Locator`.
- **Nombres de locator vs. método:** cuando un elemento y su acción comparten nombre base, el campo conserva el nombre del elemento y el método usa un verbo. Ejemplos en `RegistroPage`: `selectOrganizacion` (trigger del multiselect, por `data-testid`) vs. `organizacionCompra` (label de texto); `opcionPago` (factory de opción) vs. el método `seleccionPago()`.
- **Prioridad de selectores:** `getByTestId` primero, luego role/texto; se evitan ids generados (como `#pr_id_1_content`).
- **Archivos:** snake_case con sufijos `.page.ts` / `.spec.ts`.
- **Tags:** cada test lleva `{ tag: [...] }` con al menos un tag `@<feature>`; los casos de humo añaden `@smoke` (no todos los tests lo llevan; ver tags por spec más abajo).
- **Entorno:** los valores vienen de `.env_playwright` vía dotenv (ver [Variables de entorno](#variables-de-entorno)); nunca se hardcodean ni se versionan credenciales.
- **Pendientes:** el trabajo pendiente se marca con comentarios `//to do` y no se elimina sin implementarlo.

## Page Objects disponibles

| Page Object | Archivo | Estado | Descripción |
|---|---|---|---|
| `LoginPage` | [`login.page.ts`](../../src/pom/pages/login.page.ts) | ✅ Implementado | Formulario de ingreso (email, contraseña, botón de envío, enlace de cambio de contraseña). |
| `NavBar_Mandante_BlackPage` | [`navbar_mandante_black.page.ts`](../../src/pom/pages/navbar_mandante_black.page.ts) | ✅ Implementado | Barra de navegación del portal Mandante: Buscar proveedores, Mi Cartera, Métricas, Evaluación (incluye Evaluación v2) y Ranking. |
| `EvaluacionDesempenoPage` | [`evaluacion_desempeno.page.ts`](../../src/pom/pages/evaluacion_desempeno.page.ts) | ✅ Implementado | Búsqueda de contratos (RUT/N° contrato/administrador) y filtros de vencimiento. |
| `EvaluacionV2Page` | [`evaluacionV2.page.ts`](../../src/pom/pages/evaluacionV2.page.ts) | ✅ Implementado | Evaluación de Desempeño V2: búsqueda por RUT proveedor / N° contrato, filtros de estado, validación de encabezados y mensaje de "sin resultados". |
| `CargaDatosEvaluacionPage` | [`carga_datos_evaluacion.page.ts`](../../src/pom/pages/carga_datos_evaluacion.page.ts) | ✅ Implementado | Descarga de plantillas de Contratos y Evaluadores (Excel/CSV), carga de archivos y mensajes de validación de la planilla. |
| `MiCarteraPage` | [`mi_cartera.page.ts`](../../src/pom/pages/mi_cartera.page.ts) | ✅ Implementado | Tabs de Mi Cartera (En Proceso, Rechazados, Pendientes, Creados SAP), buscador y acceso a "Crear proveedor". |
| `RegistroPage` | [`registro.page.ts`](../../src/pom/pages/registro.page.ts) | ✅ Implementado | Formulario de registro de proveedor (Licitación / Misceláneo). |
| `RankingPage` | [`ranking.page.ts`](../../src/pom/pages/ranking.page.ts) | ⚠️ Parcial | Ranking de proveedores: búsqueda por nombre/RUT/razón social, filtros de período, categoría y tamaño de empresa, y acceso a la ficha de EARLY BIRD SPA. La selección de Categoría y Tamaño de empresa admite pocas alternativas (ver detalle abajo). |
| `MandanteMetricasPage` | [`mandante_metricas.page.ts`](../../src/pom/pages/mandante_metricas.page.ts) | ⚠️ Parcial | Validación de la tabla de Resumen Riesgo y clic en el botón Dashboard 360. `segmentacionPiramide` está comentado y el archivo termina con un bloque grabado comentado (ver detalle abajo). |

### `LoginPage` — locators y métodos

| Locator | Selector |
|---|---|
| `user` | `getByTestId('form-login-email')` |
| `pass` | `getByTestId('form-login-password-input')` |
| `loginButton` | `getByTestId('form-login-submit')` |
| `cambiaContraseña` | `getByTestId('form-login-change-password')` |

Método: `submitLogin(user, pass)` (llena email y contraseña y clickea el botón de envío). `cambiaContraseña` no tiene método ni test asociado.

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
| `goToConfigurarEvaluacionV2()` | Evaluación → Evaluación v2 | Evaluación de desempeño V2 (el nombre del método es engañoso: hace clic en la opción "Evaluación v2", no en "Configurar evaluación") |
| `goToRankingProveedores()` | Ranking → Ranking proveedores | Ranking proveedores |

Locators:

| Locator | Selector |
|---|---|
| `buscaProveedores` | `getByRole('menuitem', { name: 'Buscar proveedores' }).locator('a')` |
| `proveedores` | `locator('a').filter({ hasText: /^Proveedores$/ })` |
| `cartera` | `getByRole('menuitem', { name: 'Mi Cartera' }).locator('a')` |
| `metricas` | `getByRole('menuitem', { name: 'Métricas' }).locator('a')` |
| `evaluacion` | `locator('a').filter({ hasText: /^Evaluación$/ })` |
| `evaluacionDesempeno` | `locator('a').filter({ hasText: 'Evaluación de desempeño' })` |
| `cargarDatosEvaluacion` | `locator('a').filter({ hasText: 'Cargar datos evaluación' })` |
| `configuracionEscala` | `locator('a').filter({ hasText: 'Configuración escala' })` |
| `configurarEvaluacion` | `locator('a').filter({ hasText: 'Configurar evaluación' })` |
| `evaluacionV2` | `locator('a').filter({ hasText: 'Evaluación v2' })` |
| `ranking` | `locator('a').filter({ hasText: /^Ranking$/ })` |
| `rankingProveedores` | `locator('a').filter({ hasText: 'Ranking proveedores' })` |

> **Nota:** `goToRankingProveedores()` es invocado por `ranking.spec.ts`. El comentario al inicio del archivo (`Ranking se agregara más adelante`) sigue presente, aunque la navegación ya está implementada y en uso.

### `EvaluacionDesempenoPage` — locators y métodos

| Locator | Selector | Método que lo usa |
|---|---|---|
| `rutProveedor` | `getByRole('button', { name: 'RUT Proveedor' })` | `buscarPorRut()` |
| `buscadorProveedor` | `getByRole('textbox', { name: 'Ingrese el RUT del proveedor' })` | `buscarPorRut()` |
| `contrato` | `getByRole('button', { name: 'N° Contrato' })` | `buscarPorContrato()` |
| `buscadorContrato` | `getByRole('textbox', { name: 'Ingrese el número de contrato' })` | `buscarPorContrato()` |
| `administrador` | `getByRole('button', { name: 'RUT Administrador' })` | `buscarPorAdmin()` |
| `buscadorAdministrador` | `getByRole('textbox', { name: 'Ingrese el RUT del' })` | `buscarPorAdmin()` |
| `botonBuscar` | `getByRole('button', { name: 'Buscar' })` | `buscarPorRut/Contrato/Admin()` |
| `filtroVence15Dias` | `getByRole('button', { name: 'Filtrar por Vence en los próximos 15 días' })` | `filtroVenceEn15()` |
| `filtroVence5Dias` | `getByRole('button', { name: 'Filtrar por Vence en los próximos 5 días' })` | `filtroVenceEn5()` |
| `filtroEvaluacionVencida` | `getByRole('button', { name: 'Filtrar por Evaluación Vencida' })` | `filtroVencido()` |
| `filtroSinEvaluaciones` | `getByRole('button', { name: 'Filtrar por Sin evaluaciones' })` | `filtroSinEvaluar()` |
| `verPrograma` | `getByRole('button', { name: 'Ver Programa' })` | `seleccionarContrato()` |
| `botonNextPage` | `getByRole('button', { name: 'Next Page' })` | `nextPage()` |

Además declara `getStartedLink` (`private readonly`, heredado de la plantilla, sin uso).

| Método | Qué hace |
|---|---|
| `buscarPorRut(rut: string)` | Clic en `rutProveedor` → `buscadorProveedor.fill(rut)` → clic en `botonBuscar`. |
| `buscarPorContrato(contrato: string)` | Clic en `contrato` → `buscadorContrato.fill(contrato)` → clic en `botonBuscar`. |
| `buscarPorAdmin(admin: string)` | Clic en `administrador` → `buscadorAdministrador.fill(admin)` → clic en `botonBuscar`. |
| `filtroVenceEn15()` | Clic en `filtroVence15Dias`. |
| `filtroVenceEn5()` | Clic en `filtroVence5Dias`. |
| `filtroVencido()` | Clic en `filtroEvaluacionVencida`. |
| `filtroSinEvaluar()` | Clic en `filtroSinEvaluaciones`. |
| `nextPage()` | Clic en `botonNextPage`. |
| `seleccionarContrato(num: string)` | Ver reglas abajo. |
| `validaEncabezadosTabla()` | Aserta visibles (con `exact: true`) los 9 encabezados de columna: Rut Proveedor, Proveedor, N° de contrato, Dimensión, Periodicidad, Última evaluación, Fecha evaluación, Estado, Acción. |

Los métodos de búsqueda y filtro solo ejecutan la acción: no esperan ni validan resultados.

Reglas de `seleccionarContrato(num)`: el argumento es un `string` que se convierte con `parseInt(num, 10)`.

| Valor de `num` | Botón "Ver Programa" clickeado |
|---|---|
| Mayor que 1 (ej. `"2"`, `"3"`) | `verPrograma.nth(num - 1)`: posición contada desde 1 (`"2"` → segundo botón). |
| `"1"`, `"0"` o cualquier número negativo | `verPrograma.first()` (el primero). |
| No numérico (`parseInt` devuelve `NaN`, y `NaN > 1` es falso) | `verPrograma.first()` (el primero). |

El método no valida que exista un botón en la posición pedida. Los comentarios del código indican la misma intención: un número negativo, 0 o 1 elige el primero.

### `EvaluacionV2Page` — locators y métodos

Solo declara `private readonly page: Page` (no tiene `getStartedLink`).

| Locator | Selector | Método que lo usa |
|---|---|---|
| `rutProveedor` | `getByRole('button', { name: 'RUT Proveedor' })` | `buscarPorRut()` |
| `buscadorProveedor` | `getByRole('textbox', { name: 'Ingrese el RUT del proveedor' })` | `buscarPorRut()` |
| `contrato` | `getByRole('button', { name: 'N° Contrato' })` | `buscarPorContrato()` |
| `buscadorContrato` | `getByRole('textbox', { name: 'Ingrese el número de contrato' })` | `buscarPorContrato()` |
| `botonBuscar` | `getByRole('button', { name: 'Buscar' })` | `buscarPorRut/Contrato()` |
| `filtroAtrasada` | `getByRole('button', { name: 'Filtrar por Atrasada:' })` | `filtrarAtrasada()` |
| `filtroPorVencer` | `getByRole('button', { name: 'Filtrar por Por vencer:' })` | `filtrarPorVencer()` |
| `filtroEnCurso` | `getByRole('button', { name: 'Filtrar por En curso:' })` | `filtrarEnCurso()` |
| `filtroSinIniciar` | `getByRole('button', { name: 'Filtrar por Sin iniciar:' })` | `filtrarSinIniciar()` |
| `filtroAlDia` | `getByRole('button', { name: 'Filtrar por Al día:' })` | `filtrarAlDia()` |
| `filtroSinPeriodo` | `getByRole('button', { name: 'Filtrar por Sin período' })` | `filtrarSinPeriodo()` |
| `verPrograma` | `getByRole('button', { name: 'Ver Programa' })` | `seleccionarContrato()` |
| `botonNextPage` | `getByRole('button', { name: 'Next Page' })` | `nextPage()` |
| `sinResultados` | `getByRole('cell', { name: 'Ningún contrato coincide con el filtro.' })` | Ninguno (se usa directamente desde el spec) |

| Método | Qué hace |
|---|---|
| `buscarPorRut(rut: string)` / `buscarPorContrato(contrato: string)` | Clic en el selector del tipo de búsqueda → `fill` del buscador → clic en `botonBuscar`. No hay búsqueda por administrador. |
| `filtrarAtrasada()`, `filtrarPorVencer()`, `filtrarEnCurso()`, `filtrarSinIniciar()`, `filtrarAlDia()`, `filtrarSinPeriodo()` | Clic en el botón de filtro correspondiente. |
| `nextPage()` | Clic en `botonNextPage`. |
| `seleccionarContrato(num: string)` | Misma regla que en `EvaluacionDesempenoPage`: `parseInt(num, 10)`; si es mayor que 1 hace clic en `verPrograma.nth(num - 1)` (posición desde 1), en cualquier otro caso en `verPrograma.first()`. |
| `validaEncabezadosTabla()` | Aserta visibles los mismos 9 encabezados (con `exact: true`) que `EvaluacionDesempenoPage`. |

Observaciones:

- El filtro "Sin período" existe en el page object, pero el botón no aparece para el usuario de prueba; ningún test lo usa.
- Los filtros de estado permanecen activos una vez aplicados y se combinan con la búsqueda por RUT o N° de contrato.

### `CargaDatosEvaluacionPage` — locators y métodos

Solo declara `private readonly page: Page`.

| Locator | Selector |
|---|---|
| `descargarContratosExcel` | `getByRole('button', { name: 'Descargar plantilla de Contratos en Excel' })` |
| `descargarContratosCsv` | `getByRole('button', { name: 'Descargar plantilla de Contratos en CSV' })` |
| `descargarEvaluadoresExcel` | `getByRole('button', { name: 'Descargar plantilla de Evaluadores en Excel' })` |
| `descargarEvaluadoresCsv` | `getByRole('button', { name: 'Descargar plantilla de Evaluadores en CSV' })` |
| `botonSeleccionarArchivo` | `getByRole('button', { name: 'Seleccionar archivo' })` |
| `planillaContratosOK` | `getByRole('heading', { name: 'La plantilla de Contratos est' })` (nombre parcial) |
| `planillaEvaluadoresOK` | `getByRole('heading', { name: 'Ambas plantillas están' })` (nombre parcial) |
| `planillaBad` | `getByRole('heading', { name: 'Corrige 1 error para continuar' })` |
| `botonContinuarEvaluadores` | `getByRole('button', { name: 'Continuar a Evaluadores' })` |
| `enviaCarga` | `getByRole('button', { name: 'Enviar carga' })` |

| Método | Qué hace |
|---|---|
| `descargarPlantillaContratosExcel()` / `descargarPlantillaContratosCsv()` | Hace clic en el botón de descarga de la plantilla de Contratos y devuelve el `Download`. |
| `descargarPlantillaEvaluadoresExcel()` / `descargarPlantillaEvaluadoresCsv()` | Igual, para la plantilla de Evaluadores. |
| `cargarArchivo(ruta: string)` | Hace clic en "Seleccionar archivo" y adjunta el archivo de `ruta` con `fileChooser.setFiles(ruta)`. |

Las descargas usan `Promise.all([page.waitForEvent('download'), boton.click()])`: la espera del evento debe registrarse antes del clic (el código lo deja anotado en un comentario). `cargarArchivo` aplica el mismo patrón con `waitForEvent('filechooser')`. Al final del archivo hay un bloque comentado con los `getByRole('heading', ...)` grabados que ya están implementados como locators `planilla*`.

### `MiCarteraPage` — locators y métodos

| Locator | Selector | Método que lo usa |
|---|---|---|
| `tabEnProcesos` | `getByText('En Proceso', { exact: true })` | `tabEnProceso()` |
| `tabRechazados` | `getByText('Rechazados')` | `tabRechazado()` |
| `tabPendientes` | `getByText('Pendiente1')` | `tabPendiente()` |
| `tabCreadosSap` | `getByText('Creados SAP')` | `tabCreadoSAP()` |
| `buscador` | `getByRole('textbox', { name: 'Rut o Razón social' })` | `buscaProveedor()` |
| `botonBuscador` | `getByRole('button').filter({ hasText: /^$/ })` (botón sin texto, ícono de búsqueda) | `buscaProveedor()` |
| `creaProveedor` | `getByRole('button', { name: 'Crear proveedor' })` | `crearProveedor()` |

Métodos: `buscaProveedor(proveedor)`, `tabEnProceso()`, `tabRechazado()`, `tabPendiente()`, `tabCreadoSAP()`, `crearProveedor()`. Todos hacen `await` sobre la acción interna. El locator `verDetalle` está comentado (sin implementar).

### `RegistroPage` — locators y métodos

| Locator | Selector |
|---|---|
| `cerrarAyuda` | `getByTestId('datos-proveedor-coachmark-boton-cerrar')` |
| `licitacion` | `getByRole('radio', { name: 'Licitaciones' })` |
| `miscelaneo` | `getByRole('radio', { name: 'Misceláneo' })` |
| `proposito` | `getByRole('button', { name: 'Seleccione propósito' })` |
| `organizacionCompra` | `getByText('Organización de compras', { exact: true })` (label) |
| `selectOrganizacion` | `getByTestId('datos-proveedor-select-organizacion-compras')` (trigger del multiselect) |
| `vistaPago` | `locator('span').filter({ hasText: 'Seleccione vía de pago' })` |
| `retencionFiscal` | `getByText('¿Aplica retención fiscal?')` |
| `labelProposito` | `getByText('Propósito del requerimiento')` |
| `botonSiguiente` | `getByTestId('datos-proveedor-boton-siguiente')` |

`seleccionProposito`, `seleccionOrganizacion` y `opcionPago` son **locator factories** (`(valor: string) => Locator`, todas sobre `getByRole('option', { name: valor })`) para seleccionar un valor dinámico dentro de un dropdown.

| Método | Qué hace |
|---|---|
| `creaLicitacion()` / `creaMiscelaneo()` | Cierra el coachmark de ayuda y selecciona el tipo de proveedor (Licitaciones / Misceláneo). |
| `seleccionarProposito(valor)` | Abre "Seleccione propósito" y elige la opción `valor`. |
| `seleccionarOrganizacion(valor)` | Abre el MultiSelect de PrimeReact (`selectOrganizacion`), marca el checkbox de la opción `valor`, lo cierra con `.p-multiselect-close` y espera a que el panel `.p-multiselect-panel` quede oculto. |
| `seleccionPago(valor)` | Abre "Seleccione vía de pago" y elige la opción `valor`. |
| `validaCamposLicitacion()` | Aserta visibles: `labelProposito`, `organizacionCompra`, `vistaPago`, `retencionFiscal`. |
| `validaCamposMiscelaneo()` | Aserta visibles: `labelProposito`, `vistaPago`, `retencionFiscal`. |

### `RankingPage` — locators y métodos

Solo declara `private readonly page: Page` (no tiene `getStartedLink`).

| Locator | Selector | Método que lo usa |
|---|---|---|
| `proveedor` | `getByRole('textbox', { name: 'Buscar por nombre, RUT o Razó' })` (nombre parcial) | `buscarProveedor()` |
| `botonBuscar` | `getByRole('button', { name: 'Buscar' })` | `buscarProveedor()` |
| `periodo` | `getByRole('button', { name: 'Período' })` | `seleccionarPeriodo()`, `seleccionarPeriodoMarzo2026()` |
| `categoria` | `locator('span').filter({ hasText: 'Categoría' })` | `seleccionarCategoria()`, `seleccionarCategoriaEquipo()` |
| `tamanoEmpresa` | `getByRole('button', { name: 'Tamaño Empresa' })` | `seleccionaTamanoEmpresa()` |
| `verFichaEBS` | `getByRole('row').filter({ hasText: 'EARLY BIRD SPA' }).getByRole('button', { name: 'Ver ficha completa' })` | `verFichaEB()` |

`verFichaEBS` está acotado a la fila de la empresa **EARLY BIRD SPA**: solo permite abrir la ficha de ese proveedor.

| Método | Qué hace |
|---|---|
| `buscarProveedor(rut: string)` | `proveedor.fill(rut)` → clic en `botonBuscar`. Acepta RUT o razón social; el parámetro se llama `rut` para mantener la nomenclatura de otros tests. |
| `seleccionarPeriodo()` | Clic en `periodo` (abre el selector). |
| `seleccionarPeriodoMarzo2026()` | Clic en `periodo` → clic en la opción `Marzo` (`getByRole('option', { name: 'Marzo' }).getByText('Marzo')`). |
| `seleccionarCategoria()` | Clic en `categoria` (abre el selector). |
| `seleccionarCategoriaEquipo()` | Clic en `categoria` → clic en la opción `M02.00.00 EQUIPOS`. |
| `seleccionaTamanoEmpresa(tamano)` | `tamano` es `'micro' \| 'pequena' \| 'mediana' \| 'grande'`. Clic en `tamanoEmpresa` y luego en el texto de la opción: `MicroEmpresa`, `Empresa Pequeña`, `Empresa Mediana` o `Empresa Grande`. |
| `verFichaEB()` | Clic en `verFichaEBS`. |

Los comentarios del page object indican que la selección de Categoría y Tamaño de empresa requiere un método que reciba un string con la alternativa a elegir; por ahora, `seleccionarCategoriaEquipo()` y `seleccionaTamanoEmpresa()` cubren el camino feliz con opciones fijas.

### `MandanteMetricasPage` — locators y métodos

Solo declara `private readonly page: Page` (no tiene `getStartedLink`). Todos los locators se asignan en el constructor.

| Locator | Selector | Método que lo usa |
|---|---|---|
| `resumenRiesgo` | `getByText('Resumen Riesgo GeneralRiesgo')` | Ninguno (declarado y asignado, sin uso en métodos ni specs) |
| `dashboard360` | `getByRole('button', { name: 'Dashboard 360 Visualiza mé' })` (nombre parcial) | `irDashboard360()` |
| `columnaRiesgo` | `getByRole('cell', { name: 'Riesgo Bajo' })` (es una **celda** `cell`, no un `columnheader`) | `validaCamposRiesgo()` |
| `columnaPorcentaje` | `getByRole('columnheader', { name: '%' })` | `validaCamposRiesgo()` |
| `columnaCantidad` | `getByRole('columnheader', { name: 'Cantidad' })` | `validaCamposRiesgo()` |

| Método | Qué hace |
|---|---|
| `validaCamposRiesgo()` | `await expect(...).toBeVisible()` sobre `columnaRiesgo`, `columnaPorcentaje` y `columnaCantidad`, en ese orden. |
| `irDashboard360()` | `await this.dashboard360.click()`. No espera ni valida nada después del clic. |

Código comentado / pendiente en `mandante_metricas.page.ts`:

- `//readonly segmentacionPiramide: Locator;` (declaración) y `//this.segmentacionPiramide = ;` (asignación, sin selector): sin implementar.
- Al final del archivo hay un bloque `/* ... */` con código grabado (codegen), no migrado al page object. En orden:
  1. `getByRole('img', { name: 'Distribución de proveedores' }).click()`
  2. `getByText('Resumen Riesgo GeneralRiesgo').click()`
  3. `getByText('Segmentación3.480 proveedores segmentadosS1S2S3S4PCHCVCOCSMEE').click()`
  4. `const page1Promise = page.waitForEvent('popup')`
  5. `getByRole('button', { name: 'Dashboard 360 Visualiza mé' }).click()`
  6. `const page1 = await page1Promise` (el clic abre un popup)
  7. `getByRole('cell', { name: 'Riesgo Bajo' }).click()`
  8. `getByRole('columnheader', { name: 'Riesgo' }).click()` (encabezado "Riesgo": no está en el page object)
  9. `getByRole('columnheader', { name: '%' }).click()` y `getByRole('columnheader', { name: 'Cantidad' }).click()`
  
  El bloque termina con un `});` suelto, residuo del `test(...)` grabado.

## Suite de pruebas

### `login.spec.ts`

Tags en todos los casos: **`@smoke`**, **`@login`**.

| Test | Objetivo | Resultado esperado |
|---|---|---|
| Login Correct Credentials | Login exitoso con `USER_NAME`/`USER_PASS` (entra por `VITE_APP_URL_EVALUACION`) | URL final `https://devmandante.rednegocios.cl/dashboard` |
| Login Invalid User | Rechazo de email con formato inválido (`UserTest`/`badPass`, valores fijos) | Mensaje **"Ingrese un email válido"** en el formulario |
| Login Incorrect Password | Rechazo de contraseña incorrecta (`badPass`) para usuario válido | Diálogo **"Parámetros no válidos"**, se cierra con "Entendido" |
| Fail Test ⏭️ *(`test.skip`)* | Caso dejado fallando a propósito para validar la reportería (aserta el botón "Menú de perfil" tras un login con contraseña incorrecta) | **Skipped**, no se ejecuta |

### `evaluacion_desempeno.spec.ts`

`test.describe('Evaluación de Desempeño', ...)`. Carga `.env_playwright` con dotenv y toma `USER_NAME`, `USER_PASS` y `VITE_APP_URL_EVALUACION` a nivel de módulo.

`beforeEach` común, en este orden:

1. `page.goto(process.env.VITE_APP_URL_EVALUACION)`.
2. `loginPage.submitLogin(user, pass)`.
3. `page.waitForLoadState()`.
4. `expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard")`.
5. `navBar.goToEvaluacionDesempeno()`.
6. `expect(page).toHaveURL(`${url}EvaluacionDesempeno`)`, donde `url` es `VITE_APP_URL_EVALUACION` (se concatena sin separador, por lo que la variable debe terminar en `/`).

En los tests de filtros, la única espera explícita es `expect(evaPage.verPrograma.first()).toBeVisible()` (confirma que la búsqueda por RUT devolvió filas antes de filtrar). La aserción de "sin resultados" se hace directamente en el spec con `page.getByRole('cell')` + `toContainText('No se encontraron contratos')` (no pasa por el page object).

| Test | Tags | Pasos | Resultado esperado |
|---|---|---|---|
| Valida encabezados de la tabla | `@smoke @evaluacion` | `validaEncabezadosTabla()` | Los 9 encabezados de columna visibles |
| Selecciona primer contrato por Rut Proveedor | `@smoke @evaluacion` | `buscarPorRut("0987")` → `seleccionarContrato("1")` | URL `https://devev.rednegocios.cl/EvaluacionDesempeno/contrato/11432` |
| Valida Botón "Vence en próximos 15 días" | `@evaluacion @botonesEvaluador` | `buscarPorRut("0987")` → espera primer "Ver Programa" visible → `filtroVenceEn15()` | Celda con "No se encontraron contratos" |
| Valida Botón "Vence en próximos 5 días" | `@evaluacion @botonesEvaluador` | `buscarPorRut("0987")` → espera primer "Ver Programa" visible → `filtroVenceEn5()` | Celda con "No se encontraron contratos" |
| Valida Botón "Sin evaluaciones Pendientes" | `@evaluacion @botonesEvaluador` | `buscarPorRut("0987")` → espera primer "Ver Programa" visible → `filtroSinEvaluar()` | Celda con "No se encontraron contratos" |
| Selecciona primer por N° comntrato *(sic)* | `@smoke @evaluacion` | `buscarPorContrato("4501925266")` → `seleccionarContrato("1")` | URL `https://devev.rednegocios.cl/EvaluacionDesempeno/contrato/3796` |
| No hay resultados en tabla | `@evaluacion` | `buscarPorRut("09876")` (RUT inexistente) | Celda con "No se encontraron contratos" |

Notas:

- Los datos son fijos y dependen del ambiente: RUT `"0987"` / `"09876"`, contrato `"4501925266"` y los ids de URL `11432` y `3796`.
- El título "Valida Botón "Sin evaluaciones Pendientes"" usa `filtroSinEvaluar()`, cuyo botón es "Filtrar por Sin evaluaciones".
- Sin cobertura en el spec: `buscarPorAdmin()`, `filtroVencido()` (botón "Evaluación Vencida") y `nextPage()` están implementados en el page object pero ningún test los invoca.

### `evaluacionV2.spec.ts`

`test.describe('Evaluación de Desempeño V2', ...)`. Toma `USER_NAME`, `USER_PASS` y `VITE_APP_URL_EVALUACION` a nivel de módulo.

Constantes de datos del spec (dependen de los datos del ambiente de desarrollo): `RUT_CON_DATOS`, `RUT_SIN_DATOS` y `CONTRATO_CON_DATOS`.

`beforeEach` común, en este orden:

1. `page.goto(process.env.VITE_APP_URL_EVALUACION)`.
2. `loginPage.submitLogin(user, pass)`.
3. `page.waitForLoadState()`.
4. `expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard")`.
5. `navBar.goToConfigurarEvaluacionV2()`.
6. `expect(page).toHaveURL(`${url}EvaluacionV2`)`.

| Test | Tags | Pasos | Resultado esperado |
|---|---|---|---|
| Selecciona primer contrato por Rut Proveedor | `@smoke @evaluacionV2` | `buscarPorRut(RUT_CON_DATOS)` → `seleccionarContrato("1")` | URL que cumple la regex `/EvaluacionV2\/contrato\/\d+$/` (no se fija el id) |
| Selecciona primer contrato por N° contrato | `@smoke @evaluacionV2` | `buscarPorContrato(CONTRATO_CON_DATOS)` → espera `verPrograma` con `toHaveCount(1)` → `seleccionarContrato("1")` | URL que cumple la misma regex |
| Valida encabezados de la tabla | `@smoke @evaluacionV2` | `validaEncabezadosTabla()` | Los 9 encabezados de columna visibles |
| Valida Botón "Por vencer" muestra contratos | `@evaluacionV2 @botonesEvaluador` | `filtrarPorVencer()` | Primer "Ver Programa" visible |
| Valida Botón "Atrasada" sin contratos | `@evaluacionV2 @botonesEvaluador` | `filtrarAtrasada()` | `sinResultados` visible ("Ningún contrato coincide con el filtro.") |
| Valida Botón "En curso" sin contratos | `@evaluacionV2 @botonesEvaluador` | `filtrarEnCurso()` | `sinResultados` visible |
| Valida Botón "Sin iniciar" sin contratos | `@evaluacionV2 @botonesEvaluador` | `filtrarSinIniciar()` | `sinResultados` visible |
| Valida Botón "Al día" sin contratos | `@evaluacionV2 @botonesEvaluador` | `filtrarAlDia()` | `sinResultados` visible |
| No hay resultados en tabla | `@evaluacionV2` | `buscarPorRut(RUT_SIN_DATOS)` | `sinResultados` visible |

Notas:

- Los cuatro tests de filtros "sin contratos" se generan con un bucle sobre un arreglo `{ nombre, filtrar }`, por lo que el título se arma como `Valida Botón "<nombre>" sin contratos`.
- Que cada filtro devuelva o no contratos depende de los datos del ambiente de desarrollo.
- Sin cobertura en el spec: `filtrarSinPeriodo()` y `nextPage()`.

### `carga_datos_evaluacion.spec.ts`

`test.describe('Evaluación de Desempeño', ...)` (mismo nombre que el `describe` de `evaluacion_desempeno.spec.ts`). Importa `exceljs` para editar las planillas descargadas. Toma `USER_NAME`, `USER_PASS`, `VITE_APP_URL_EVALUACION` y `BASE_URL_MANDANTE` a nivel de módulo.

`beforeEach` común, en este orden:

1. `page.goto(process.env.VITE_APP_URL_EVALUACION)`.
2. `loginPage.submitLogin(user, pass)`.
3. `page.waitForLoadState()`.
4. `expect(page).toHaveURL(urlMandante)` (`BASE_URL_MANDANTE`).
5. `navBar.goToCargarDatosEvaluacion()`.
6. `expect(page).toHaveURL(`${url}CargarDatosEvaluacion`)`.

Las planillas se guardan con `testInfo.outputPath(...)`: son archivos temporales por test, dentro de la carpeta de salida de Playwright. Los tests no envían la carga (nunca hacen clic en "Enviar carga").

| Test | Tags | Pasos | Resultado esperado |
|---|---|---|---|
| Descarga plantilla contratos y la sube ⏭️ *(`test.skip`)* | `@smoke @cargaContratos` | Descarga la plantilla de Contratos (Excel), verifica el nombre `plantilla-contratos.xlsx`, la guarda y la sube con `cargarArchivo()` | **Skipped**. Habría esperado `planillaContratosOK` visible |
| Descarga plantilla contratos y evaluadores. Sube ambas planillas | `@smoke @cargaEvaluadores` | Descarga y sube Contratos (nombre `plantilla-contratos.xlsx`) → `planillaContratosOK` → "Continuar a Evaluadores" → descarga y sube Evaluadores (nombre `plantilla-evaluadores.xlsx`) | `planillaEvaluadoresOK` y botón "Enviar carga" visibles |
| Plantilla contratos sin 1 valor muestra error | `@cargaContratos` | Descarga la plantilla de Contratos → con `exceljs` abre la primera hoja y borra la celda `B2` → guarda `plantilla-contratos-editada.xlsx` → la sube | `planillaBad` visible ("Corrige 1 error para continuar") |
| Plantilla evaluadores sin 1 valor muestra error | `@smoke @cargaEvaluadores` | Sube la plantilla de Contratos sin modificar (→ `planillaContratosOK`) → "Continuar a Evaluadores" → descarga la de Evaluadores, borra la celda `B2` de la primera hoja con `exceljs`, guarda `plantilla-evaluadores-editada.xlsx` y la sube | `planillaBad` visible |

Notas:

- Los métodos `descargarPlantilla*Csv()` y los locators CSV existen en el page object, pero ningún test los usa.
- La celda `B2` es obligatoria en ambas plantillas (Contratos y Evaluadores), según lo verificado por el equipo en la aplicación; por eso los bad-path la borran para provocar el error de validación.
- `BASE_URL_MANDANTE` se compara tal cual con `toHaveURL(urlMandante)` en el `beforeEach`, es decir, debe ser exactamente la URL del landing posterior al login. En cambio, `ranking.spec.ts` la concatena (ver [Variables de entorno](#variables-de-entorno)).

### `registro_proveedor.spec.ts`

`test.describe('Registro Proveedores', ...)`. `beforeEach` común: `page.goto(process.env.VITE_APP_URL_EVALUACION)` → login (`LoginPage`) → asserta dashboard → `navBar.goToCartera()` → asserta URL `https://devregistrocodelco.rednegocios.cl/MisProveedores`. Todos los tests parten con `MiCarteraPage.crearProveedor()` y aserta la URL `https://devregistrocodelco.rednegocios.cl/registro`.

| Test | Tags | Pasos (tras `crearProveedor()`) | Resultado esperado |
|---|---|---|---|
| Crear Nuevo Proveedor Parte 1 | `@proveedores` | `creaLicitacion()` → `seleccionarProposito("Compras Spot / Spot Purchases")` → `seleccionarOrganizacion("P001: Materiales VAB - Vicepresidencia Abastecimiento")` → `seleccionPago("Transferencia")` | Botón "Siguiente" habilitado |
| Valida Elementos Licitación | `@smoke @proveedor @licitacion` | `creaLicitacion()` → `validaCamposLicitacion()` | 4 campos visibles: propósito, organización de compras, vía de pago, retención fiscal |
| Valida Elementos Misceláneos | `@smoke @proveedor @micelaneo` *(sic)* | `creaMiscelaneo()` → `validaCamposMiscelaneo()` | 3 campos visibles: propósito, vía de pago, retención fiscal |

El primer test cubre solo la primera parte del flujo (hasta habilitar "Siguiente"); no avanza al paso siguiente.

### `mandante_metricas.spec.ts`

`test.describe('Dashboard', ...)`. Importa `LoginPage` y `MandanteMetricasPage` (no usa `NavBar_Mandante_BlackPage`: valida directamente sobre el dashboard al que se llega tras el login). Carga `.env_playwright` con dotenv y toma `USER_NAME`/`USER_PASS` a nivel de módulo. Tags en ambos tests: **`@smoke`**, **`@dashboard`**.

`beforeEach` común, en este orden (comentario del código: login con contraseña correcta, previo a cada test de la suite):

1. `page.goto(process.env.VITE_APP_URL_EVALUACION)`.
2. `loginPage.submitLogin(user, pass)`.
3. `page.waitForLoadState()`.
4. `expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard")`.

| Test | Estado | Pasos | Resultado esperado |
|---|---|---|---|
| Valida Columnas Dashboard | Implementado | `new MandanteMetricasPage(page)` → `validaCamposRiesgo()` | Visibles la celda "Riesgo Bajo" y los encabezados de columna "%" y "Cantidad" (no valida el encabezado "Riesgo" ni el contenido de la tabla) |
| Botón Dashboard 360 | ⏭️ **Skipped** (`test.skip`) | `new MandanteMetricasPage(page)` → `irDashboard360()` | Sin aserciones. Comentario `//TODO: Cuando se termine el desarrollo de dashboard360 se validará la URL destino y las interacciones con esta.` |

Estado: 1 test activo y 1 omitido. No hay tests para `resumenRiesgo` ni para el resto del bloque grabado comentado del page object (distribución de proveedores, segmentación, popup de Dashboard 360).

### `ranking.spec.ts`

`test.describe('Ranking test', ...)`. Carga `.env_playwright` con dotenv y toma `USER_NAME`, `USER_PASS` y `BASE_URL_MANDANTE` (en la constante `url`) a nivel de módulo.

`beforeEach` común, en este orden:

1. `page.goto(process.env.VITE_APP_URL_EVALUACION)`.
2. `loginPage.submitLogin(user, pass)`.
3. `page.waitForLoadState()`.
4. `expect(page).toHaveURL(`${url}dashboard`)`.
5. `navBar.goToRankingProveedores()`.
6. `expect(page).toHaveURL(`${url}Ranking`)`.
7. `page.waitForLoadState('networkidle')`.

| Test | Tags | Pasos | Resultado esperado |
|---|---|---|---|
| Selecciona periodo Marzo 2026 | `@smoke @ranking` | `seleccionarPeriodoMarzo2026()` | Texto `FijoDinámicoENERO – MARZO` visible |
| Selecciona categoría M02 | `@smoke @ranking` | `seleccionarCategoriaEquipo()` | Chip `ranking-filter-chip-categoria` con el texto `M02.00.00 EQUIPOS` visible |
| Selecciona tamaño empresa Micro | `@smoke @ranking` | `seleccionaTamanoEmpresa("micro")` | Chip `ranking-filter-chip-tamano` con el texto `MicroEmpresa` visible |
| Busca EARLY BIRD SPA por rut y revisa la ficha | `@ranking` | `buscarProveedor("77982298-2")` → `verFichaEB()` | URL `${url}Ranking/detalleRanking/45413/456/77982298-2/EARLY%20BIRD%20SPA/0` |
| Utiliza los filtros y seleccionar EARLY BIRD SPA | `@ranking` | `seleccionarPeriodoMarzo2026()` → `seleccionaTamanoEmpresa("micro")` → valida la tarjeta `ranking-sidepanel-card-45413` con "EARLY BIRD SPA" → la selecciona → valida el chip `ranking-selection-chip-45413` → `verFichaEB()` | URL `${url}Ranking/detalleRanking/45413/456/77982298-2/EARLY%20BIRD%20SPA/MicroEmpresa` |

Notas:

- Los datos son fijos y dependen del ambiente: RUT `77982298-2`, los ids `45413` y `456` y el mes `Marzo`.
- Los chips de filtro, las tarjetas del panel lateral y el encabezado de detalle se localizan directamente en el spec con `page.getByTestId(...)` / `page.getByText(...)`, sin pasar por el page object.
- Sin cobertura en el spec: `seleccionarPeriodo()`, `seleccionarCategoria()` y las opciones de tamaño `pequena`, `mediana` y `grande`.

### Resumen de tags

| Tag | Dónde se usa |
|---|---|
| `@smoke` | `login`, `mandante_metricas`, y los tests de selección de contrato, encabezados, validación de campos y carga de planillas (`evaluacion_desempeno`, `evaluacionV2`, `registro_proveedor`, `carga_datos_evaluacion`), además de los tres tests de filtros de `ranking` |
| `@ranking` | `ranking.spec.ts` (todos los tests) |
| `@login` | `login.spec.ts` |
| `@evaluacion` | `evaluacion_desempeno.spec.ts` (todos los tests) |
| `@evaluacionV2` | `evaluacionV2.spec.ts` (todos los tests) |
| `@botonesEvaluador` | Tests de filtros (vencimiento / sin evaluaciones en `evaluacion_desempeno`; estado en `evaluacionV2`) |
| `@cargaContratos` | Tests de carga de la plantilla de Contratos (incluye el test omitido) |
| `@cargaEvaluadores` | Tests de carga conjunta de Contratos y Evaluadores |
| `@proveedores` | Crear Nuevo Proveedor Parte 1 |
| `@proveedor` | Validaciones de campos de registro (licitación y misceláneo) |
| `@licitacion` | Valida Elementos Licitación |
| `@micelaneo` | Valida Elementos Misceláneos |
| `@dashboard` | `mandante_metricas.spec.ts` |

## Variables de entorno

Las pruebas leen sus valores desde un archivo `.env_playwright` en la raíz del proyecto (no versionado). La plantilla de referencia es [`.env_example`](../../.env_example), que trae las cuatro variables con valor vacío:

```dotenv
VITE_APP_URL_EVALUACION=
BASE_URL_MANDANTE=
USER_NAME=
USER_PASS=
```

| Variable | Descripción | Usada en |
|---|---|---|
| `VITE_APP_URL_EVALUACION` | URL a la que se accede al inicio de cada test (login). En los specs de evaluación también se concatena con la ruta destino (`${url}EvaluacionDesempeno`, `${url}EvaluacionV2`, `${url}CargarDatosEvaluacion`), por lo que debe terminar en `/`. | `page.goto(...)` en todos los specs; concatenación en `evaluacion_desempeno`, `evaluacionV2` y `carga_datos_evaluacion` |
| `BASE_URL_MANDANTE` | URL del landing de Mandante una vez iniciada la sesión. En `carga_datos_evaluacion.spec.ts` se compara tal cual con `toHaveURL`. En `ranking.spec.ts` se concatena con la ruta destino (`${url}dashboard`, `${url}Ranking`, `${url}Ranking/detalleRanking/...`), por lo que debe terminar en `/`. | `carga_datos_evaluacion.spec.ts` y `ranking.spec.ts` |
| `USER_NAME` | Email de un usuario de prueba válido en el ambiente. | Todos los specs excepto "Login Invalid User", que usa valores fijos |
| `USER_PASS` | Contraseña del usuario de prueba. | Igual que `USER_NAME` |

Cada spec carga el archivo por sí mismo (`dotenv.config({ path: path.resolve('.env_playwright') })`); en `playwright.config.ts` la carga de dotenv está comentada. La plantilla indica que, si se necesitan más credenciales, se agregan en ese archivo para ser usadas por los tests, sin adjuntar información sensible dentro de los tests.

> ⚠️ `.env_playwright` contiene credenciales y **no debe subirse a control de versiones**. Nunca se escriben credenciales reales en la documentación ni en el código.

## Cómo ejecutar

Scripts de Playwright definidos en `package.json`:

| Script | Comando que ejecuta | Qué corre |
|---|---|---|
| `npm run restroTest` | `npx playwright test` | Toda la suite |
| `npm run loginTest` | `npx playwright test login.spec.ts` | Solo `login.spec.ts` |
| `npm run smoke` | `npx playwright test --grep @smoke` | Tests con tag `@smoke` |
| `npm run ranking` | `npx playwright test --grep @ranking` | Tests con tag `@ranking` |
| `npm run testReport` | `npx playwright show-report` | Abre el último reporte HTML |

El `package.json` también contiene los scripts de la aplicación (`dev`, `build`, `lint`, `preview`), que no forman parte de la suite E2E.

```bash
# Instalar dependencias del proyecto (incluye exceljs, usado en carga_datos_evaluacion.spec.ts)
npm ci

# Instalar los navegadores de Playwright
npx playwright install

# Ejecutar por tag
npx playwright test --grep @evaluacion
npx playwright test --grep @evaluacionV2
npx playwright test --grep @cargaEvaluadores
npx playwright test --grep @proveedor
npx playwright test --grep @dashboard
npx playwright test --grep @ranking

# Ejecutar un archivo específico
npx playwright test evaluacion_desempeno.spec.ts
npx playwright test evaluacionV2.spec.ts
npx playwright test carga_datos_evaluacion.spec.ts
npx playwright test registro_proveedor.spec.ts
npx playwright test mandante_metricas.spec.ts
npx playwright test ranking.spec.ts

# Ejecutar en un solo navegador
npx playwright test --project=chromium

# Ejecutar en modo headed (con navegador visible)
npx playwright test --headed

# Ejecutar en modo debug
npx playwright test --debug
```

> No hay scripts de `package.json` dedicados a `evaluacion_desempeno.spec.ts`, `evaluacionV2.spec.ts`, `carga_datos_evaluacion.spec.ts`, `registro_proveedor.spec.ts` ni `mandante_metricas.spec.ts`; se ejecutan con `npx playwright test <archivo>` o filtrando por tag.

## Reportería y configuración

`playwright.config.ts` define:

- `testDir: './src/pom'`.
- `reporter: [['html', { open: 'never' }]]` — reporte HTML en `playwright-report/` sin abrirse automáticamente (usar `npm run testReport`). Hay una variante comentada con reporter `list` + `html`.
- `trace: 'on-first-retry'` — se captura una traza navegable solo si una prueba falla y se reintenta.
- `fullyParallel: true`; en CI (`process.env.CI`): `retries: 2`, `workers: 1` y `forbidOnly` activo.
- Proyectos activos: **chromium** (Desktop Chrome) y **webkit** (Desktop Safari); por defecto las pruebas corren en ambos salvo que se filtre con `--project`.
- **firefox** (Desktop Firefox) está comentado, con la nota "Firefox está fallando".
- Grabación de video (`retain-on-failure`), proyectos móviles/Edge/Chrome y `webServer` también están comentados en el archivo.

## Integración continua

El workflow [`playwright.yml`](../../.github/workflows/playwright.yml) ("Playwright Tests", GitHub Actions) se ejecuta en cada `push` y `pull request` contra `main`/`master`. Un único job `test` en `ubuntu-latest`, con `timeout-minutes: 60`:

1. `actions/checkout@v4`.
2. `actions/setup-node@v4` con `node-version: lts/*`.
3. `npm ci`.
4. `npx playwright install --with-deps` (navegadores y dependencias del sistema).
5. `npx playwright test` (toda la suite, proyectos chromium y webkit).
6. `actions/upload-artifact@v4` (`if: ${{ !cancelled() }}`): publica `playwright-report/` como artefacto `playwright-report`, 30 días de retención.

Con `CI` definido, `playwright.config.ts` aplica `retries: 2`, `workers: 1` y `forbidOnly`.

> El workflow **no define variables de entorno ni secrets**: `VITE_APP_URL_EVALUACION`, `BASE_URL_MANDANTE`, `USER_NAME` y `USER_PASS` no se inyectan y `.env_playwright` no está versionado. Para que los tests tengan valores en CI, hay que agregarlos al workflow (por ejemplo desde *secrets* del repositorio); hoy no está configurado.

## Pendientes conocidos

- `MandanteMetricasPage`: `segmentacionPiramide` (declaración y asignación) está comentado sin implementar; `resumenRiesgo` está declarado pero ningún método ni test lo usa; el archivo termina con un bloque comentado de código grabado (codegen) con interacciones no migradas (imagen "Distribución de proveedores", texto de Segmentación, popup de Dashboard 360, encabezado "Riesgo").
- `mandante_metricas.spec.ts`: el test "Botón Dashboard 360" está en `test.skip` y sin aserciones, a la espera de que se termine el desarrollo de Dashboard 360 (comentario `//TODO` en el spec).
- `evaluacion_desempeno.spec.ts`: sin test para `buscarPorAdmin()`, `filtroVencido()` ni `nextPage()`.
- `playwright.config.ts`: el proyecto firefox está desactivado (comentado) porque falla.
- CI: el workflow no inyecta `VITE_APP_URL_EVALUACION`, `BASE_URL_MANDANTE`, `USER_NAME` ni `USER_PASS`.
- `RankingPage`: la selección de Categoría y Tamaño de empresa necesita un método que reciba el texto de la alternativa (hoy hay opciones fijas), según los comentarios del page object. Las opciones de tamaño `pequena`, `mediana` y `grande`, `seleccionarPeriodo()` y `seleccionarCategoria()` no tienen cobertura en `ranking.spec.ts`.
- `NavBar_Mandante_BlackPage`: el comentario inicial "Ranking se agregara más adelante" quedó desactualizado, porque la navegación ya se usa desde `ranking.spec.ts`.
- `evaluacionV2.spec.ts`: sin test para `filtrarSinPeriodo()` (el botón no apareció para el usuario de prueba) ni `nextPage()`. Los datos `RUT_CON_DATOS`, `RUT_SIN_DATOS` y `CONTRATO_CON_DATOS` dependen del ambiente de desarrollo.
- `carga_datos_evaluacion.spec.ts`: el test "Descarga plantilla contratos y la sube" está en `test.skip`; las descargas/cargas en CSV y el envío final de la carga ("Enviar carga") no tienen cobertura.
- `NavBar_Mandante_BlackPage`: `goToConfigurarEvaluacionV2()` navega a "Evaluación v2"; el nombre del método es engañoso.
- `LoginPage` declara el locator `cambiaContraseña` pero ningún método ni test lo usa todavía (funcionalidad de cambio de contraseña sin cubrir).
- `MiCarteraPage`: el locator `verDetalle` está comentado sin implementar.
- `login.spec.ts`: el test "Fail Test" permanece en `test.skip`.

### Deuda técnica / bugs conocidos

- Typos conocidos: título de test `"Selecciona primer por N° comntrato"` (falta la "o" de "contrato") en `evaluacion_desempeno.spec.ts`; tag `@micelaneo` (falta la "s" de "misceláneo") en `registro_proveedor.spec.ts`.
- **`mi_cartera.page.ts`**: el locator `tabPendientes` matchea el texto literal `'Pendiente1'` — confirmar si es un sufijo de contador intencional o un error de grabación.
- **`registro.page.ts`**: `seleccionProposito`, `seleccionOrganizacion` y `opcionPago` son tres locator factories con el mismo cuerpo (`getByRole('option', { name: valor })`) — candidatas a unificar en una sola función compartida.
- **`login.spec.ts`**: "Login Incorrect Password" usa el selector `#pr_id_1_content` (id generado), contrario a la convención de selectores del proyecto.
- Los page objects `LoginPage`, `NavBar_Mandante_BlackPage`, `EvaluacionDesempenoPage` y `MiCarteraPage` declaran `getStartedLink` (heredado de la plantilla de Playwright) sin usarlo, y varios importan `expect` sin usarlo.
- `evaluacion_desempeno.spec.ts` aserta con `page.getByRole('cell')` directamente en el spec, en lugar de un locator del page object.
- Las URLs de destino (p. ej. `https://devmandante.rednegocios.cl/dashboard`, `https://devev.rednegocios.cl/...`, `https://devregistrocodelco.rednegocios.cl/...`) y los datos de prueba (RUT, N° de contrato, ids de contrato) están escritos en los specs; solo `carga_datos_evaluacion.spec.ts` y `ranking.spec.ts` usan `BASE_URL_MANDANTE`.
- **`ranking.spec.ts`**: tiene datos que dependen del ambiente escritos en el spec (RUT, ids `45413` y `456`, mes `Marzo`).
- **`ranking.spec.ts`**: construye con `page.getByTestId` / `page.getByText` los locators de los chips de filtro, las tarjetas del panel lateral y el encabezado de detalle, en lugar de exponerlos desde `RankingPage`.
- El repositorio versiona `.vscode/.checkmarxIgnored`, un artefacto de una extensión del IDE.
- Los valores de `process.env` no se validan: si falta una variable en `.env_playwright`, el test falla sin un mensaje claro (por ejemplo `page.goto(undefined)`).
- `carga_datos_evaluacion.spec.ts` usa `test.describe('Evaluación de Desempeño', ...)`, el mismo nombre que `evaluacion_desempeno.spec.ts`, lo que dificulta distinguirlos en el reporte.
- `EvaluacionV2Page` y `EvaluacionDesempenoPage` duplican `validaEncabezadosTabla()` y gran parte de los locators de búsqueda.
- `carga_datos_evaluacion.spec.ts`: el flujo de descarga y carga de Contratos se repite en dos tests (el de ambas planillas y el bad-path de evaluadores).
