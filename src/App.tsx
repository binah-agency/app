import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home } from './pages/Home';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
 
  return (
    <Home />
  );
}

export default App;