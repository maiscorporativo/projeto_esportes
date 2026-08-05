import { Handshake, Trophy, Mic, UtensilsCrossed, MessagesSquare, Camera, Medal, Video } from 'lucide-react';
import Reveal from './Reveal';

/* Ações e atividades realizadas com o ídolo — base do portfólio de experiências */
const ACTIONS = [
  {
    icon: Handshake,
    title: 'Encontro com Ídolos',
    desc: 'Meet & greet exclusivo: seus convidados frente a frente com quem fez história no futebol.',
  },
  {
    icon: Trophy,
    title: 'Jogo com Lendas em Campo',
    desc: 'Campeonato entre convidados com ídolos em campo e uniformes exclusivos do evento.',
  },
  {
    icon: Mic,
    title: 'Podcast & Talk ao Vivo',
    desc: 'Bate-papo ao vivo com o ídolo durante o evento, com participação da plateia.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Jantares Temáticos',
    desc: 'Alta gastronomia em ambiente decorado, com o ídolo à mesa dos seus convidados.',
  },
  {
    icon: MessagesSquare,
    title: 'Histórias de Bastidores',
    desc: 'Sessões intimistas em que a lenda revela os bastidores das grandes conquistas.',
  },
  {
    icon: Camera,
    title: 'Fotos & Autógrafos',
    desc: 'Sessão oficial de fotos, camisas autografadas e kit premium para cada convidado.',
  },
  {
    icon: Medal,
    title: 'Premiação Simbólica',
    desc: 'Medalhas e troféus entregues pelo próprio ídolo — um momento inesquecível.',
  },
  {
    icon: Video,
    title: 'Vídeos Personalizados',
    desc: 'Convites e mensagens gravados pelo ídolo para clientes, equipes e eventos.',
  },
];

const FORMATS = ['Resort fechado', 'Evento corporativo', 'Viagem com o ídolo', 'Ação digital'];

export default function ExperienceActions() {
  return (
    <section id="acoes" className="relative py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #001a35 0%, #141a8f 100%)' }}>
      {/* Glow decorativo */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full blur-[140px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #FED000 0%, transparent 70%)' }} aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto relative">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3">A Experiência Definitiva</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            O ídolo em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED000] to-[#c9a400]">cada momento</span>
          </h2>
          <p className="text-neutral-400 mt-4 text-lg max-w-2xl mx-auto">
            Do convite em vídeo à premiação final — cada ação é desenhada para aproximar seus convidados das lendas do futebol.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIONS.map((action, i) => (
            <Reveal key={action.title} delay={(i % 4) * 80}>
              <div className="group h-full bg-white/[0.04] border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/40">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-gold group-hover:shadow-lg group-hover:shadow-gold/30">
                  <action.icon size={22} className="text-gold transition-colors duration-300 group-hover:text-black" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 leading-snug">{action.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{action.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Formatos disponíveis */}
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mr-1">Formatos:</span>
            {FORMATS.map(f => (
              <span key={f} className="text-xs font-semibold text-neutral-300 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-gold/40 hover:text-gold transition-colors duration-300 cursor-default">
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
