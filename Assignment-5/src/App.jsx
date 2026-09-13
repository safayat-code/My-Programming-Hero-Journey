import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechnologySection from "./components/TechnologySection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#technologies"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to technologies
      </a>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechnologySection />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
    </div>
  );
}

export default App;
