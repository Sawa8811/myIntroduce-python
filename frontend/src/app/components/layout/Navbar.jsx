import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FolderIcon from "@mui/icons-material/Folder";
import ChatIcon from "@mui/icons-material/Chat";

const navItems = [
  { page: "home", href: "#home", labelKey: "nav_home", Icon: HomeIcon },
  { page: "about", href: "#about", labelKey: "nav_about", Icon: AccountCircleIcon },
  { page: "projects", href: "#projects", labelKey: "nav_projects", Icon: FolderIcon },
  { page: "message", href: "#message", labelKey: "nav_message", Icon: ChatIcon },
];

export function Navbar({ setPage, t }) {
  const handleNavigate = (event, page) => {
    event.preventDefault();
    setPage(page);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map((item) => {
          const NavIcon = item.Icon;

          return (
            <li key={item.page}>
              <a href={item.href} onClick={(event) => handleNavigate(event, item.page)}>
                <NavIcon style={{ verticalAlign: "middle", marginRight: 6 }} />
                {t(item.labelKey)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
