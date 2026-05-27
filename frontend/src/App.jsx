import "./i18n";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import "./style.css";
import { ChevronDown, ChevronUp, Github, Instagram, Mail, MapPin } from "lucide-react";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import ChatIcon from '@mui/icons-material/Chat';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "");


export default function App() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState("home");
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  // === 新增 ===
  const [publicMessages, setPublicMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isDesktopSkills, setIsDesktopSkills] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 701px)").matches;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname.trim() || !message.trim()) {
      alert("暱稱和留言內容都要填寫喔！");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          content: message,
          isPublic,
        }),
      });
      if (res.ok) {
        setMessage("");
        setNickname("");
        setIsPublic(true);
        alert("留言送出成功！");
        // 重新拉留言
        setLoadingMessages(true);
        fetch(`${API_BASE_URL}/message/public`)
          .then(res => res.ok ? res.json() : [])
          .then(data => {
            if (Array.isArray(data)) setPublicMessages(data);
            else setPublicMessages([]);
          })
          .catch(() => setPublicMessages([]))
          .finally(() => setLoadingMessages(false));
      } else {
        alert("留言送出失敗！");
      }
    } catch (err) {
      alert("留言送出失敗！");
    }
  };

  // 取得留言資料
  React.useEffect(() => {
    if (page === "message") {
      setLoadingMessages(true);
      fetch(`${API_BASE_URL}/message/public`)
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          if (Array.isArray(data)) setPublicMessages(data);
          else setPublicMessages([]);
        })
        .catch(() => setPublicMessages([]))
        .finally(() => setLoadingMessages(false));
    }
  }, [page]); // 每次切到 message 頁面都會 fetch

  useEffect(() => {
    const media = window.matchMedia("(min-width: 701px)");
    const updateSkillsLayout = () => setIsDesktopSkills(media.matches);
    updateSkillsLayout();
    media.addEventListener("change", updateSkillsLayout);
    return () => media.removeEventListener("change", updateSkillsLayout);
  }, []);

  const allProjects = [
    {
      title: "UserLogin",
      desc: "使用者登入システム",
      tags: ["Spring-Boot", "Thymeleaf", "MyBatis-Plus", "MySQL", "Java"],
      url: "https://github.com/Sawa8811/UserLogin",
      image: "/userLogin.png"
    },
    {
      title: "Student Management System",
      desc: "学生管理システム",
      tags: ["Spring-Boot", "Thymeleaf", "MyBatis", "MySQL", "Java"],
      url: "https://github.com/Sawa8811/student_Manage",
      image: "/Student-Management.png"
    },
    /*
      可以在這邊新增專案
    */
  ];

  const skills = [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Podman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg" },
    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "LaTeX", icon: "https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg" },
    { name: "MUI", icon: "https://mui.com/static/logo.png" },
  ];

  const featuredSkillCount = isDesktopSkills ? 10 : 6;
  const visibleSkills = showAllSkills ? skills : skills.slice(0, featuredSkillCount);

  const filteredProjects = allProjects;
  return (
    <div className="container">
      <header className="header">
        <div className="logo">{"<Sawa />"}</div>
      </header>

      {/* === Home 分頁內容 === */}
      <main className="main" id="home">
        {/* --- Home 頁面 --- */}
        {page === "home" && (
          <>
            <div className="profile">
              <div className="intro">
                <h1 className="highlight">{t("welcome")}</h1>
                <div className="name-block">
                  <h2><strong>ChingTse Ho</strong></h2>
                  <p className="aka">a.k.a Sawa</p>
                </div>
                <p className="role">{t("role")}</p>
                <a
                  href="https://www.google.com/maps/place/Tokyo,+Japan"
                  target="_blank"
                  rel="noreferrer"
                  className="subtext"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <MapPin size={16} />
                  {t("based")}
                </a>
              </div>

              <div className="photo">
                <img src="/sawa.jpg" alt="Sawa Ho" className="avatar" />
                <div className="icons">
                  <a href="https://github.com/Sawa8811" target="_blank" rel="noreferrer">
                    <Github color="white" size={28} className="social-icon" />
                  </a>
                  <a href="https://www.instagram.com/sawa88101" target="_blank" rel="noreferrer">
                    <Instagram color="white" size={28} className="social-icon" />
                  </a>
                  <a href="mailto:sawa88101@gmail.com">
                    <Mail color="white" size={28} className="social-icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="skills-section" id="skills">
              <div className="skills-list">
                {visibleSkills.map((skill) => (
                  <div className="skill-icon" key={skill.name}>
                    <img src={skill.icon} alt={skill.name} />
                    {skill.name}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="skills-toggle"
                onClick={() => setShowAllSkills((current) => !current)}
                aria-expanded={showAllSkills}
                aria-label={showAllSkills ? t("skills_show_less") : t("skills_show_all")}
                title={showAllSkills ? t("skills_show_less") : t("skills_show_all")}
              >
                {showAllSkills ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>
            </div>
          </>
        )}

        {/* --- About Me 頁面 --- */}
        {page === "about" && (
          <section className="about-section" id="about">

            <div className="about-content">
              <div className="about-left">
                <h3 style={{ textAlign: "center" }}>{t("about_title")}</h3>
                <div style={{ textAlign: "left", margin: "1.5rem 0 0 0", lineHeight: "2" }}>
                  <b>{t("about_intro_bold")}</b><br />
                  {t("about_intro_birth")}<br />
                  <span style={{ color: "#62a6f7", fontWeight: 600 }}>{t("about_intro_skills")}</span><br />
                  <br />
                  <span style={{ fontStyle: "italic", color: "#aaa" }}>
                    {t("about_intro_love")}
                  </span><br />
                  <br />
                  {t("about_intro_work_hobby")}<br />
                  <span style={{ color: "#e5c39a" }}>{t("about_intro_hobby")}</span>{t("about_intro_hobby_extra")}
                </div>
              </div>
              <div className="about-right">
                <h3 style={{ textAlign: "center", marginBottom: "1.2em" }}>{t("career_title")}</h3>

                <div className="career-block">
                  <div className="career-title">{t("career_education_work")}</div>
                  <ul>
                    <li>
                      {t("career_item_2018")}
                    </li>
                    <li>
                      {t("career_item_2022_part1")}
                      {i18n.language === "en" && <br />}
                      <span className="highlight-paren">{t("career_item_2022_part2")}</span>
                      {t("career_item_2022_part3")}
                    </li>
                    <li>
                      {t("career_item_2025_masters_part1")}
                      {i18n.language === "en" && <br />}
                      <span className="highlight-paren">{t("career_item_2025_masters_part2")}</span>
                      {t("career_item_2025_masters_part3")}
                    </li>
                    <li>
                      {t("career_item_2025_work")}
                    </li>
                  </ul>
                </div>

                <div className="career-block">
                  <div className="career-title">{t("career_certifications_skills")}</div>
                  <ul>
                    <li>{t("career_cert_toeic")}</li>
                    <li>
                      {t("career_cert_japanese_part1")}
                      <span className="highlight-paren">{t("career_cert_japanese_part2")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Projects 頁面 --- */}
        {page === "projects" && (
          <section className="projects-section" id="projects">
            <p className="project-intro">{t("projects_title")}</p>
            <div className="project-cards">
              {filteredProjects.map((project, idx) => (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  key={idx}
                >
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <img
                    src={project.image}
                    alt={`${project.title}`}
                    className="project-image"
                  />
                  <div className="tech-tags">
                    {project.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* --- message 頁面 --- */}
        {page === "message" && (
          <section className="about-section" id="message">
            <h2>{t("message_title")}</h2>
            <div className="message-container">
              <form className="message-form" onSubmit={handleSubmit}>
                <label>
                  {t("message_nickname")}:
                  <input
                    type="text"
                    placeholder={t("message_nickname_placeholder")}
                    className="message-input"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                </label>
                <label>
                  {t("message_content")}:
                  <div style={{ position: "relative" }}>
                    <textarea
                      className="message-textarea"
                      maxLength={500}
                      rows={6}
                      placeholder={t("message_content_placeholder")}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>
                </label>
                <div className="message-toggle">
                  <span>{t("message_public")}</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="toggleVisibility"
                      checked={isPublic}
                      onChange={e => setIsPublic(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <button className="message-submit" type="submit">{t("message_submit")}</button>
              </form>
              <div className="message-messages">
                <h3>{t("message_list_title")}</h3>
                <div className="messages-scroll">
                  {loadingMessages ? (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "1em" }}>{t("message_loading")}</div>
                  ) : Array.isArray(publicMessages) && publicMessages.length > 0 ? (
                    publicMessages.map((msg, idx) => (
                      <div className="message-card" key={idx}>
                        <p>
                          <strong>{msg.nickname || t("message_anonymous")}</strong>: {msg.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "1em" }}>{t("message_empty")}</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <div
        className="language-switcher"
        style={{
          position: 'fixed',
          left: 32,
          bottom: 86,
          zIndex: 100,
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        <button onClick={() => i18n.changeLanguage('ja')}>日本語</button>
        <button onClick={() => i18n.changeLanguage('zh')}>中文</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>

      {/* === 導覽列 Navigation === */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={e => { e.preventDefault(); setPage("home"); }}>
              <HomeIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
              {t("nav_home")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={e => { e.preventDefault(); setPage("about"); }}>
              <AccountCircleIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
              {t("nav_about")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={e => { e.preventDefault(); setPage("projects"); }}>
              <FolderIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
              {t("nav_projects")}
            </a>
          </li>
          <li>
            <a href="#message" onClick={e => { e.preventDefault(); setPage("message"); }}>
              <ChatIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
              {t("nav_message")}
            </a>
          </li>
        </ul>
      </nav>

      {/* === 頁尾 Footer === */}
      <footer className="footer">
        <p>© 2025 Sawa Ho | All rights reserved.</p>
      </footer>
    </div>
  );
} 
