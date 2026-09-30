# Refactor visual del Login (AuthLayout + carrusel)

## Qué hace
Las 3 pantallas (`/login`, `/reset-password`, `/change-password`) comparten `AuthLayout`:

- **Desktop (≥ 992px):** pantalla dividida. A la izquierda va un carrusel de fotos y a la derecha un panel blanco (`minmax(420px, 32%)`) con el logo CCS | REDNEGOCIOS, el formulario y el pie con los datos de contacto y la parte legal.
- **Mobile:** una sola columna blanca con el logo de REDNEGOCIOS. El carrusel **no se monta**, así que no se descarga ninguna foto.
- El selector de idioma (un chip con bandera, código y flecha) va fijo arriba a la derecha del panel.

## Estructura
```
src/
  pages/                 Login, ResetPassword, ChangePassword  → <AuthLayout><FormX/></AuthLayout>
  components/
    layout/              AuthLayout, BackgroundCarousel, AuthFooter
    ui/                  FormField, PasswordInput, LanguageSwitcher, Loading/
    forms/               FormLogin, FormResetPass, FormChangePass (lógica de negocio)
    ProtectedRoute.jsx
  hooks/                 useMediaQuery, useFieldErrors
  config/backgrounds.js  lista de fondos + tiempos del carrusel
  styles/
    abstracts/           _tokens.sass (colores, medidas, breakpoints), _mixins.sass (desktop, visually-hidden, cover)
    base/_global.sass
    components/          un .sass por componente
  index.sass             punto de entrada de estilos
```
El CSS de PrimeReact se importa **una sola vez** en `main.jsx`, antes de `index.sass`, para que los estilos propios lo sobrescriban.

## Carrusel (`BackgroundCarousel`)
- Arranca en una imagen al azar y avanza cada `BACKGROUND_INTERVAL_MS` (7 s).
- El efecto es un crossfade de 1.2 s más un zoom lento estilo Ken Burns (`scale 1 → 1.08`).
- Usa dos capas: la entrante (`.is-active`) hace el fade-in **encima** de la saliente (`.is-leaving`), que se queda opaca y congelada en el zoom final. Así el cambio nunca pasa por negro. La saliente se desmonta al terminar el fundido.
- Precarga la siguiente imagen y se pausa si la pestaña está oculta.
- Con `prefers-reduced-motion: reduce` no rota ni hace zoom.
- Encima de las fotos hay una capa `.carousel__fade` con un degradado horizontal a blanco (transparente hasta el 52%, blanco puro en el borde del panel). Así la foto se funde con el panel en vez de cortarse. Tiene varias paradas intermedias para que no se vea dónde empieza el degradado.
- `.auth__media` tiene fondo blanco: mientras carga la primera foto se ve blanco, no negro.
- **Los tiempos están duplicados** en `config/backgrounds.js` y en `$carousel-*` de `_tokens.sass`. Si cambias uno, cambia el otro.
- Lo mismo pasa con el breakpoint: `DESKTOP_QUERY` en `AuthLayout.jsx` debe coincidir con `$bp-desktop`.

### Agregar o cambiar un fondo
1. Convertir la imagen a WebP, con 1920px de ancho como máximo:
   `ffmpeg -i original.png -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 78 public/img/backgrounds/bg-<sector>-<tema>.webp`
2. Agregar `{ src, position }` en `BACKGROUNDS` (`src/config/backgrounds.js`). `position` es el `object-position` del recorte: el tercio derecho de la foto queda bajo el degradado, así que hay que correr el encuadre para que el sujeto (p. ej. el edificio CCS) no quede lavado.

Nunca subas un PNG fotográfico: los originales pesaban ~4 MB y cada WebP pesa entre 100 y 410 KB (la vista aérea de Santiago va a calidad 68 por su detalle).

Fondos actuales: `bg-ccs-tower` (edificio CCS), `bg-santiago-aerial` (Santiago 2035) y `bg-city-lowangle` (contrapicado urbano). Reemplazaron las fotos sectoriales (minería, industria, pesca, agro, energía), que fueron rechazadas.

## Comportamiento crítico que no hay que romper
- **`internalNavigation`**: `ProtectedRoute` solo deja entrar a `/reset-password` y `/change-password` si ese flag existe en `sessionStorage`. Los links del login lo guardan con `markInternalNavigation(loading)` (en `FormLogin.jsx`). Si alguien crea un link nuevo a esas rutas, **debe** usar ese handler; si no, la ruta redirige a `/login`.
- `pages/Login.jsx` borra `sessionStorage 't'` al montarse, para invalidar la sesión anterior.
- `FormChangePass` lee `sessionStorage 'email'` (lo guarda el login cuando la contraseña está vencida) y lo borra al montarse.

## Componentes reutilizables
- `FormField({ label, htmlFor, errors })`: `errors` es un arreglo de `{ show, message, className? }`. En mobile el label queda oculto visualmente pero sigue accesible.
- `PasswordInput`: maneja su propio estado de mostrar u ocultar. El toggle es un `<button>` con `aria-label` desde i18n (`mostrarPassword` / `ocultarPassword`).
- `useFieldErrors(initial)`: devuelve `{ fieldErrors, setFieldErrors, clearFieldError }`.

## `data-testid` para QA (regla de desarrollo frontend)
Todo componente nuevo lleva `data-testid` para que la automatización de QA no dependa de clases CSS ni de textos, que cambian con el diseño o con el idioma.

| Caso | Convención | Ejemplo |
|---|---|---|
| Raíz del componente | `nombre-componente` (kebab-case) | `auth-layout`, `form-login` |
| Elemento interno relevante | `nombre-componente-elemento` | `form-login-submit`, `form-login-email` |
| Componente reutilizable | prop `testId` con valor por defecto; los hijos derivan de él | `<PasswordInput testId="form-login-password"/>` → `form-login-password-input`, `form-login-password-toggle` |
| Errores de `FormField` | `<testId>-error-<id>` | `form-login-email-field-error-required`, `...-error-format`, `...-error-mismatch` |
| Elementos generados por listas | sufijo con un id estable (nunca el índice) | `form-login-system-option-<idSistema>`, `form-change-pass-rule-<regla>` |

- Las reglas de contraseña exponen su estado en `data-valid="true|false"`.
- No repitas un `data-testid` dentro de una misma pantalla. Si un componente se usa más de una vez, pásale `testId`.

### Catálogo por pantalla
- **Comunes:** `auth-layout`, `auth-layout-media`, `auth-layout-panel`, `auth-layout-logo`, `background-carousel`, `background-carousel-slide-active`, `background-carousel-slide-leaving`, `language-switcher`, `language-switcher-trigger`, `language-switcher-menu`, `language-switcher-option-{es|en}`, `auth-footer`, `auth-footer-contact-{address|email|phone}`, `auth-footer-terms`, `loading`.
- **Login (`form-login`):**
  - `-email`, `-email-field-error-{required|format}`
  - `-password-input`, `-password-toggle`, `-password-field-error-required`
  - `-forgot-password`, `-submit`, `-change-password`, `-loading`
  - `-dialog-message`, `-dialog-accept`
  - `-system-selector`, `-system-option-<idSistema>`, `-system-back`
- **Reset (`form-reset-pass`):**
  - `-email`, `-email-field-error-{required|format}`
  - `-submit`, `-back-login`, `-loading`
  - `-dialog-message`, `-dialog-accept`
- **Cambio de clave (`form-change-pass`):**
  - `-email`, `-current-password-input`
  - `-new-password-input`, `-rules`, `-rule-{min-length|lowercase|uppercase|number|special-char}`
  - `-repeat-password-input`, `-repeat-password-field-error-{required|mismatch}`
  - `-submit`, `-back-login`, `-loading`
  - `-dialog-message`, `-dialog-accept`

## Assets
- `src/assets/logos/logo-ccs-rednegocios.png`: logo de desktop, copiado del repo de Mandante.
- `src/assets/logos/logo-rednegocios.svg`: logo de mobile. Es vectorial y bicolor (RED `#003B70`, NEGOCIOS `#555559`), generado a partir del SVG blanco anterior.
- `public/assets/flags/es-flag.svg`: se recortó su `viewBox` a `0 5 36 26` porque el Twemoji original tenía márgenes transparentes.

## Pendientes conocidos
- `package-lock.json` está desincronizado con `package.json` (faltan los binarios opcionales de `@parcel/watcher`), así que `npm ci` falla.
- `prop-types` se usa pero no está declarado en `dependencies`; hoy llega como dependencia transitiva.
- `npm run lint` no funciona porque falta el `eslint.config.js` (flat config) que exige ESLint 9.
