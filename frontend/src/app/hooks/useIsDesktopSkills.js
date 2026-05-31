import { useEffect, useState } from "react";

const DESKTOP_SKILLS_QUERY = "(min-width: 701px)";

export function useIsDesktopSkills() {
  const [isDesktopSkills, setIsDesktopSkills] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(DESKTOP_SKILLS_QUERY).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_SKILLS_QUERY);
    const updateSkillsLayout = () => setIsDesktopSkills(media.matches);

    updateSkillsLayout();
    media.addEventListener("change", updateSkillsLayout);
    return () => media.removeEventListener("change", updateSkillsLayout);
  }, []);

  return isDesktopSkills;
}
