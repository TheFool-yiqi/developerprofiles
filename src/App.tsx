import { profile } from "./data/profile";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import {
  hasExperience,
  hasProjects,
  hasSkills,
} from "./utils/sectionVisibility";

function App() {
  return (
    <div className="min-h-screen text-neutral-100">
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        {hasSkills(profile) ? <Skills profile={profile} /> : null}
        {hasProjects(profile) ? <Projects profile={profile} /> : null}
        {hasExperience(profile) ? <Experience profile={profile} /> : null}
        <Contact profile={profile} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}

export default App;
