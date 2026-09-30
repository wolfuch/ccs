import React, { useEffect, useState } from 'react';
import { BACKGROUNDS, BACKGROUND_INTERVAL_MS, BACKGROUND_FADE_MS } from '../../config/backgrounds';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const initialSlides = () => ({
  current: Math.floor(Math.random() * BACKGROUNDS.length),
  previous: null,
});

export function BackgroundCarousel() {
  const [{ current, previous }, setSlides] = useState(initialSlides);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const next = (current + 1) % BACKGROUNDS.length;

  // Precarga la siguiente imagen para que el fundido no espere la descarga
  useEffect(() => {
    const img = new Image();
    img.src = BACKGROUNDS[next].src;
  }, [next]);

  useEffect(() => {
    if (reducedMotion || BACKGROUNDS.length < 2) return undefined;

    const intervalId = setInterval(() => {
      if (document.hidden) return;
      setSlides(slides => ({
        current: (slides.current + 1) % BACKGROUNDS.length,
        previous: slides.current,
      }));
    }, BACKGROUND_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [reducedMotion]);

  // Quita la capa saliente cuando termina el fundido
  useEffect(() => {
    if (previous === null) return undefined;
    const timeoutId = setTimeout(() => setSlides(slides => ({ ...slides, previous: null })), BACKGROUND_FADE_MS);
    return () => clearTimeout(timeoutId);
  }, [previous]);

  return (
    <div className="carousel" aria-hidden="true" data-testid="background-carousel">
      {previous !== null && (
        <img key={`leaving-${previous}`} className="carousel__slide is-leaving" data-testid="background-carousel-slide-leaving" src={BACKGROUNDS[previous].src} style={{ objectPosition: BACKGROUNDS[previous].position }} alt="" />
      )}
      <img key={`active-${current}`} className="carousel__slide is-active" data-testid="background-carousel-slide-active" src={BACKGROUNDS[current].src} style={{ objectPosition: BACKGROUNDS[current].position }} alt="" />
      <div className="carousel__fade" />
    </div>
  );
}
