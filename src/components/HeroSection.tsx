import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { useImageConfig } from '../hooks/useImageConfig';
import type { ImageKey } from '../imageConfig';

const RONALDO_PHOTOS: { src: string; scale?: number }[] = [
  { src: '/ronaldo/ronaldo_fenomeno03.webp' },
  { src: '/ronaldo/ronaldo_fenomeno06.webp', scale: 1.18 },
  { src: '/ronaldo/ronaldo_fenomeno02.webp', scale: 0.82 },
  { src: '/ronaldo/ronaldo_fenomeno10.webp', scale: 0.82 },
  { src: '/ronaldo/ronaldo_fenomeno04.webp' },
  { src: '/ronaldo/ronaldo_fenomeno12.webp' },
  { src: '/ronaldo/ronaldo_fenomeno07.webp' },
  { src: '/ronaldo/ronaldo_trofeu.webp' },
  { src: '/ronaldo/ronaldo_fenomeno05.webp' },
  { src: '/ronaldo/ronaldo_fenomeno11.webp' },
];

function RonaldoShowcase({ tilt }: { tilt: { x: number; y: number } }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % RONALDO_PHOTOS.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-out"
      style={{ transform: `translate(${tilt.x * 14}px, ${tilt.y * 10}px)` }}
    >
      {RONALDO_PHOTOS.map(({ src, scale = 1 }, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none object-contain object-bottom animate-ronaldo-kenburns transition-opacity duration-[900ms] ease-in-out drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
          style={{
            opacity: i === index ? 1 : 0,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: 'bottom center',
            WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
          }}
          decoding="async"
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

type ColItem = { key: ImageKey; alt: string; h: string };

const COL1: ColItem[] = [
  { key: 'hero_col1_1', alt: 'Ídolo em ação',  h: 'h-48' },
  { key: 'hero_col1_2', alt: 'Experiência VIP', h: 'h-64' },
  { key: 'hero_col1_3', alt: 'Estádio lotado',    h: 'h-56' },
  { key: 'hero_col1_4', alt: 'Momento do jogo',  h: 'h-40' },
];
const COL2: ColItem[] = [
  { key: 'hero_col2_1', alt: 'Comemoração de título', h: 'h-56' },
  { key: 'hero_col2_2', alt: 'Troféu premium',     h: 'h-48' },
  { key: 'hero_col2_3', alt: 'Gramado iluminado', h: 'h-64' },
  { key: 'hero_col2_4', alt: 'Craque em campo',   h: 'h-48' },
];
const COL3: ColItem[] = [
  { key: 'hero_col3_1', alt: 'Camisa autografada',  h: 'h-64' },
  { key: 'hero_col3_2', alt: 'Bastidores do evento',    h: 'h-48' },
  { key: 'hero_col3_3', alt: 'Entrada em campo',       h: 'h-56' },
  { key: 'hero_col3_4', alt: 'Torcida vibrando', h: 'h-40' },
];

function MarqueeCol({ items, direction, offset, getImage }: {
  items: ColItem[];
  direction: 'animate-marquee-up' | 'animate-marquee-down';
  offset: string;
  getImage: (k: ImageKey) => string;
}) {
  // Always render all slots so the marquee height stays consistent.
  // Empty slots get a translucent placeholder so the animation doesn't break.
  function renderSlot(item: ColItem, keyPrefix: string) {
    const src = getImage(item.key);
    if (src) {
      return <img key={`${keyPrefix}-${item.key}`} src={src} alt={item.alt} className={`w-full ${item.h} object-cover rounded-xl shadow-xl shadow-black/80`} />;
    }
    return <div key={`${keyPrefix}-${item.key}`} className={`w-full ${item.h} rounded-xl bg-white/5 border border-white/5`} />;
  }

  return (
    <div className="relative h-full">
      <div className={`flex flex-col gap-4 w-full absolute ${direction} hover:[animation-play-state:paused] ${offset}`}>
        <div className="flex flex-col gap-4">
          {items.map(item => renderSlot(item, 'a'))}
        </div>
        <div className="flex flex-col gap-4">
          {items.map(item => renderSlot(item, 'b'))}
        </div>
      </div>
    </div>
  );
}

const DELIVERABLES = [
  { icon: '🎥', label: 'Vídeos personalizados' },
  { icon: '👕', label: 'Camisas autografadas' },
  { icon: '🎤', label: 'Presença em eventos' },
  { icon: '✈️', label: 'Ativações em viagens' },
];

export default function HeroSection() {
  const { getImage } = useImageConfig();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax de mouse em camadas (profundidade) — cada camada reage com intensidade diferente
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,   // -1 → 1
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* ══ CAMADA 0 — Estádio: céu, gramado e linhas de campo ══ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Céu do estádio */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 90% at 50% -10%, #1F23FE 0%, #141a8f 48%, #02021a 100%)' }} />
        {/* Faixas do gramado (listras verticais sutis) */}
        <div className="absolute inset-0 opacity-60" style={{ background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 140px, transparent 140px, transparent 280px)' }} />
        {/* Linha central + círculo central do campo */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.05]" />
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[46vw] max-w-[720px] aspect-square rounded-full border border-white/[0.05]" />
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/[0.07]" />

        {/* Holofotes animados */}
        <div className="absolute -top-24 left-[6%] w-[240px] h-[85vh] origin-top animate-sway blur-2xl" style={{ background: 'linear-gradient(to bottom, rgba(254,208,0,0.14), transparent 75%)' }} />
        <div className="absolute -top-24 right-[14%] w-[280px] h-[90vh] origin-top animate-sway-reverse blur-2xl" style={{ background: 'linear-gradient(to bottom, rgba(120,180,255,0.10), transparent 75%)' }} />

        {/* Glow laranja que segue o mouse (profundidade) */}
        <div
          className="absolute top-[20%] left-[55%] w-[540px] h-[540px] rounded-full blur-[150px] opacity-30 transition-transform duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #c9a400 0%, transparent 70%)', transform: `translate(${tilt.x * -24}px, ${tilt.y * -16}px)` }}
        />
      </div>

      {/* ══ CAMADA 1 — Galeria inclinada (imagens gerenciáveis pelo Admin) ══ */}
      <div
        className="hidden lg:block absolute -right-[10%] -top-[12%] w-[62%] h-[130%] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(7deg) translate(${tilt.x * 8}px, ${tilt.y * 6}px)` }}
        aria-hidden="true"
      >
        <div className="grid grid-cols-3 gap-4 h-full opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <MarqueeCol items={COL1} direction="animate-marquee-up"   offset="-top-12" getImage={getImage} />
          <MarqueeCol items={COL2} direction="animate-marquee-down" offset="-top-4"  getImage={getImage} />
          <MarqueeCol items={COL3} direction="animate-marquee-up"   offset="-top-16" getImage={getImage} />
        </div>
      </div>
      {/* Overlay de leitura sobre a galeria (transparent web design) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#141a8f] via-[#141a8f]/75 to-transparent lg:via-[#141a8f]/60" aria-hidden="true" />

      {/* ══ CAMADA 2 — Marca d'água tipográfica gigante ══ */}
      <div
        className="absolute bottom-[-2%] left-0 w-full text-center font-black uppercase leading-none select-none pointer-events-none tracking-tighter"
        style={{ fontSize: 'clamp(6rem, 19vw, 20rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.055)' }}
        aria-hidden="true"
      >
        Ronaldo
      </div>

      {/* ══ CAMADA 3 — Ronaldo (composição com profundidade) ══ */}
      <div className="hidden lg:block absolute bottom-0 right-[4%] xl:right-[8%] h-[86%] aspect-square pointer-events-none z-10" aria-hidden="true">
        {/* Anel + glow atrás do Ronaldo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full border border-gold/15" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64%] aspect-square rounded-full blur-[90px] animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(254,208,0,0.5) 0%, rgba(201,164,0,0.25) 50%, transparent 75%)' }} />
        {/* Ronaldo Fenômeno — sequência de fotos em crossfade */}
        <RonaldoShowcase tilt={tilt} />
      </div>

      {/* ══ CONTEÚDO ══ */}
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-4 sm:px-6 pt-[150px] pb-16">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            Experiências com Ídolos do Futebol
          </span>

          <h1 className="text-[2.6rem] sm:text-[3.6rem] xl:text-[4.6rem] font-black uppercase leading-[1.02] mb-7 tracking-tight">
            Viaje ao lado<br />
            de uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED000] via-[#c9a400] to-[#FED000] bg-[length:200%_auto] animate-shine">Lenda</span>
          </h1>

          <p className="text-neutral-300/80 font-medium text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
            Conectamos a sua empresa aos maiores ídolos do futebol em experiências exclusivas — dos bastidores ao centro do gramado.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 bg-gold text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-gold/25 group"
            >
              Explorar Experiências
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); document.getElementById('contato-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm font-bold text-white border border-white/25 backdrop-blur-sm px-8 py-4 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Seja um Parceiro
            </a>
          </div>
        </Reveal>

        {/* Régua de entregas — divisórias finas, estilo editorial */}
        <Reveal delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 max-w-3xl">
            {DELIVERABLES.map((d, i) => (
              <div key={d.label} className={`flex items-center gap-3 py-5 pr-6 ${i > 0 ? 'md:border-l md:border-white/10 md:pl-6' : ''}`}>
                <span className="text-xl" aria-hidden="true">{d.icon}</span>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-neutral-300/90 leading-snug">{d.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Indicador de scroll */}
      <div className="relative z-20 flex justify-center pb-6" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2 animate-bounce">
          <div className="w-1 h-2.5 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
