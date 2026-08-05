import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PartnersMarquee from './components/PartnersMarquee';
import ExperienceActions from './components/ExperienceActions';
import TrendingPackages from './components/TrendingPackages';
import PlatinumAccess from './components/PlatinumAccess';
import ContactForm from './components/ContactForm';

import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ImageAdmin from './admin/ImageAdmin';
import MasterAdmin from './admin/MasterAdmin';
import MarketingPanel from './admin/MarketingPanel';
import PackageLP from './pages/PackageLP';
import CategoriesSection from './components/CategoriesSection';
import NotFound from './components/NotFound';
import { SelectedPackageProvider } from './hooks/useSelectedPackage';

const PAGE_TITLES: Record<string, string> = {
  '/':            'Rede Ronaldo — Experiências Lendárias com o Fenômeno',
  '/admin':       'Admin Vendas | Rede Ronaldo',
  '/admin-master': 'Admin Mestre | Rede Ronaldo',
  '/marketing':    'Marketing & Conversão | Rede Ronaldo',
};

function usePageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'Rede Ronaldo';
  }, [pathname]);
}

function SitePage() {
  usePageTitle();
  return (
    <div className="min-h-screen bg-primary-main text-white selection:bg-gold selection:text-white pb-0">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      {/* Hero em tela cheia fluindo atrás da navbar transparente */}
      <HeroSection />
      <PartnersMarquee />
      <ExperienceActions />
      <TrendingPackages />
      <CategoriesSection />
      <ContactForm />
      <PlatinumAccess />

      <Footer />
      <BackToTop />
    </div>
  );
}

function AdminPage() { usePageTitle(); return <ImageAdmin />; }
function MasterPage() { usePageTitle(); return <MasterAdmin />; }

function App() {
  return (
    <SelectedPackageProvider>
      <Routes>
        <Route path="/"            element={<SitePage />} />
        <Route path="/admin"       element={<AdminPage />} />
        <Route path="/admin-master"element={<MasterPage />} />
        <Route path="/marketing"   element={<MarketingPanel />} />
        <Route path="/pacote/:id"  element={<PackageLP />} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
    </SelectedPackageProvider>
  );
}

export default App;
