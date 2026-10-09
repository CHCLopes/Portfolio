import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { ProjectShowcase } from './sections/ProjectShowcase';
import { About } from './sections/About';
import { Trajectory } from './sections/Trajectory';
import { Approach } from './sections/Approach';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

function App() {
  return <><a className="skip-link" href="#main">Pular para o conteúdo</a><Navbar /><main id="main" tabIndex={-1}><Hero /><About /><ProjectShowcase /><Trajectory /><Approach /><Contact /></main><Footer /></>;
}
export default App;
