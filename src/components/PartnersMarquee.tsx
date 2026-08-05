const FOOTBALL_LOGOS: { src: string; alt: string; h: string }[] = [
  { src: '/partners/champions_logo.png',    alt: 'Champions League', h: 'h-8 md:h-22' },
  { src: '/partners/libertadores_logo.png', alt: 'Libertadores',     h: 'h-8 md:h-22' },
  { src: '/partners/premier_logo.png',      alt: 'Premier League',   h: 'h-8 md:h-16' },
  { src: '/partners/laliga_logo.svg',       alt: 'La Liga',          h: 'h-8 md:h-16' },
  { src: '/partners/bundesliga_logo.png',   alt: 'Bundesliga',       h: 'h-8 md:h-16' },
  { src: '/partners/elclasico_logo.png',    alt: 'El Clasico',       h: 'h-8 md:h-20' },
];

export default function PartnersMarquee() {
  return (
    <section className="-mt-12 relative z-20 py-20 border-b border-white/5 overflow-hidden flex flex-col items-center" style={{ background: 'linear-gradient(to bottom, transparent 0%, #001a35 60%)' }}>
      <p className="text-[11px] text-white uppercase tracking-[0.2em] mb-10 font-bold z-10 px-6 text-center">
        Os palcos que consagraram as maiores lendas do futebol
      </p>

      <div className="w-full relative flex overflow-hidden py-4">
        {/* Gradient masks for smooth fade in/out on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#001a35] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#001a35] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee">
          {[1, 2, 3, 4].map((set) => (
            <div key={set} className="flex items-center justify-around gap-16 md:gap-32 px-8 md:px-16 w-max" aria-hidden={set !== 1 ? "true" : "false"}>
              {FOOTBALL_LOGOS.map(logo => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.h} w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
