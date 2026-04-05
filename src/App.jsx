import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { SiteDataProvider } from './context/SiteDataContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyBadges from './components/StickyBadges'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Sellers = lazy(() => import('./pages/services/Sellers'))
const Buyers = lazy(() => import('./pages/services/Buyers'))
const Landlords = lazy(() => import('./pages/services/Landlords'))
const Tenants = lazy(() => import('./pages/services/Tenants'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <SiteDataProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <StickyBadges />
        <main className="flex-1 mr-0 lg:mr-[100px] 2xl:mr-[137px]">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sellers" element={<Sellers />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/landlords" element={<Landlords />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </SiteDataProvider>
  )
}

export default App
