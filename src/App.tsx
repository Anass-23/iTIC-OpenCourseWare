import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Utils
import { isCordova } from "./utils";

// Localization
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Our i18n configuration

// Layout components
import NavBar from "./components/Layout/NavBar/NavBar";
import Footer from "./components/Layout/Footer";


// Pages
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Course from "./pages/Course";
import NotFound from "./pages/NotFound";

function App() {
  const Router = isCordova() ? HashRouter : BrowserRouter;
  
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <NavBar />

        <div className="flex flex-col min-h-screen">        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eines" element={<Tools />} />
            <Route path="/buscador" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Course />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </I18nextProvider>
  );
}

export default App;