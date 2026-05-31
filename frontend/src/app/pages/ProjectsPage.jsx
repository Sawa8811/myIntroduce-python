import { projects } from "../data/projects";

export function ProjectsPage({ t }) {
  return (
    <section className="projects-section" id="projects">
      <p className="project-intro">{t("projects_title")}</p>
      <div className="project-cards">
        {projects.map((project) => (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            key={project.title}
          >
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="tech-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
