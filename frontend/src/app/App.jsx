import "./i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles/global.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { LanguageSwitcher } from "./components/layout/LanguageSwitcher";
import { Navbar } from "./components/layout/Navbar";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { MessagePage } from "./pages/MessagePage";
import { ProjectsPage } from "./pages/ProjectsPage";

const pages = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  message: MessagePage,
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState("home");
  const ActivePage = pages[page] || HomePage;

  return (
    <div className="container">
      <Header />

      <main className="main" id="home">
        <ActivePage t={t} i18n={i18n} />
      </main>

      <LanguageSwitcher i18n={i18n} />
      <Navbar setPage={setPage} t={t} />
      <Footer />
    </div>
  );
}
