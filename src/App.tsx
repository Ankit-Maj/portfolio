import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { CustomCursor } from './components/ui/CustomCursor'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Certificates } from './components/sections/Certificates'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'

function App() {
  // isLoaded will gate scroll-triggered animations in subsequent tasks
  const [isLoaded, setIsLoaded] = useState(false)
  void isLoaded
  const lenis = useLenis()

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <Navbar lenis={lenis} />
      <main>
        {/* Hero */}
        <Hero lenis={lenis} />
        {/* About */}
        <About />
        {/* Skills */}
        <Skills />
        {/* Projects */}
        <Projects />
        {/* Certificates */}
        <Certificates />
        {/* Education */}
        <Education />
        {/* Contact */}
        <Contact />
      </main>
      <Footer />
      <ScrollToTop lenis={lenis} />
    </>
  )
}

export default App
