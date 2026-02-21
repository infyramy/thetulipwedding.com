import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import Bridal from './pages/Bridal';
import Hall from './pages/Hall';
import Vendors from './pages/Vendors';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Delay scroll to top so it happens when the screen is fully covered
    // by the PageTransition exit animation (which takes ~800-1000ms)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative pb-24 md:pb-32">{children}</main>
      <Footer />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
        <Route path="/bridal" element={<PageTransition><Bridal /></PageTransition>} />
        <Route path="/hall" element={<PageTransition><Hall /></PageTransition>} />
        <Route path="/vendors" element={<PageTransition><Vendors /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;