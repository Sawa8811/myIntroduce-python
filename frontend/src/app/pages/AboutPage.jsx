function CareerItemWithDetail({ language, main, detail, suffix }) {
  return (
    <li>
      {main}
      {language === "en" && <br />}
      <span className="highlight-paren">{detail}</span>
      {suffix}
    </li>
  );
}

export function AboutPage({ t, i18n }) {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-left">
          <h3 style={{ textAlign: "center" }}>{t("about_title")}</h3>
          <div className="about-copy">
            <p>
              <b>{t("about_intro_bold")}</b>
              <br />
              {t("about_intro_birth")}
            </p>
            <p className="about-motto">{t("about_intro_skills")}</p>
            <p>{t("about_intro_love")}</p>
            <p>{t("about_intro_work_hobby")}</p>
            <p>
              <span className="about-hobby">{t("about_intro_hobby")}</span>{t("about_intro_hobby_extra")}
            </p>
          </div>
        </div>

        <div className="about-right">
          <h3 style={{ textAlign: "center", marginBottom: "1.2em" }}>{t("career_title")}</h3>

          <div className="career-block">
            <div className="career-title">{t("career_education_work")}</div>
            <ul>
              <li>{t("career_item_2018")}</li>
              <CareerItemWithDetail
                language={i18n.language}
                main={t("career_item_2022_part1")}
                detail={t("career_item_2022_part2")}
                suffix={t("career_item_2022_part3")}
              />
              <CareerItemWithDetail
                language={i18n.language}
                main={t("career_item_2025_masters_part1")}
                detail={t("career_item_2025_masters_part2")}
                suffix={t("career_item_2025_masters_part3")}
              />
              <li>{t("career_item_2025_work")}</li>
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

          <div className="career-block">
            <div className="career-title">{t("services_title")}</div>
            <ul>
              <li>{t("services_item_web")}</li>
              <li>{t("services_item_api")}</li>
              <li>{t("services_item_deploy")}</li>
              <li>{t("services_item_support")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
