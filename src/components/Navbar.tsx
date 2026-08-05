import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent web design: navbar começa transparente e ganha "vidro" ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full sticky top-4 z-50 px-4 pt-2 transition-all mb-6">
        <div
          className={`mx-auto w-full max-w-[1400px] flex items-center justify-between h-[104px] rounded-lg px-6 font-sans transition-all duration-500 ${
            scrolled
              ? 'bg-[#001a35]/70 backdrop-blur-lg shadow-xl border border-white/10'
              : 'bg-transparent border border-transparent shadow-none'
          }`}
        >

          {/* Logo: Rede Ronaldo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer py-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo_rede_ronaldo.png" alt="Rede Ronaldo" className="h-20 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-7 text-[13px] text-neutral-300 font-medium">
            <a href="/" onClick={scrollTo('trending')} className="hover:text-gold transition-colors duration-200">Em Alta</a>
            <a href="/" onClick={scrollTo('events')} className="hover:text-gold transition-colors duration-200">Experiências</a>
            <a href="/" onClick={scrollTo('platinum')} className="hover:text-gold transition-colors duration-200">Acesso Lenda</a>
            <a
              href="/"
              onClick={scrollTo('contato-form')}
              className="bg-gold text-black font-bold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-300"
            >
              Seja um Parceiro
            </a>
          </div>


          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#001a35]/95 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col">
          <div className="flex flex-col gap-6 text-xl font-medium text-center text-white">
            <a href="/" className="hover:text-gold" onClick={scrollTo('trending')}>Em Alta</a>
            <a href="/" className="hover:text-gold" onClick={scrollTo('events')}>Experiências</a>
            <a href="/" className="hover:text-gold" onClick={scrollTo('platinum')}>Acesso Lenda</a>
            <a href="/" className="hover:text-gold" onClick={scrollTo('contato-form')}>Seja um Parceiro</a>
          </div>
        </div>
      )}
    </>
  );
}
