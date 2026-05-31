import { useState } from "react";
import { ChevronDown, ChevronUp, Github, Instagram, Mail, MapPin } from "lucide-react";
import { skills } from "../data/skills";
import { useIsDesktopSkills } from "../hooks/useIsDesktopSkills";

export function HomePage({ t }) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const isDesktopSkills = useIsDesktopSkills();
  const featuredSkillCount = isDesktopSkills ? 10 : 6;
  const visibleSkills = showAllSkills ? skills : skills.slice(0, featuredSkillCount);

  return (
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
            <a href="mailto:sawaWork8811@outlook.com">
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
  );
}
