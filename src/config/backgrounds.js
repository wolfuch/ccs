// Fondos del panel izquierdo (desktop). Viven en public/img/backgrounds.
// Para agregar uno: convertirlo a WebP (ver docs/login-visual-refactor.md) y sumarlo aquí.
// `position` es el object-position del recorte: el borde derecho queda bajo el degradado
// a blanco, así que el sujeto de la foto no debe quedar pegado a ese borde.
export const BACKGROUNDS = [
  { src: '/img/backgrounds/bg-ccs-tower.webp', position: '100% center' },
  { src: '/img/backgrounds/bg-santiago-aerial.webp', position: '30% center' },
  { src: '/img/backgrounds/bg-city-lowangle.webp', position: '40% center' },
];

// Debe coincidir con $carousel-interval y $carousel-fade en src/styles/abstracts/_tokens.sass
export const BACKGROUND_INTERVAL_MS = 7000;
export const BACKGROUND_FADE_MS = 1200;
