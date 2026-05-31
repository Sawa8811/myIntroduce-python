export function LanguageSwitcher({ i18n }) {
  return (
    <div
      className="language-switcher"
      style={{
        position: "fixed",
        left: 32,
        bottom: 86,
        zIndex: 100,
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <button onClick={() => i18n.changeLanguage("ja")}>日本語</button>
      <button onClick={() => i18n.changeLanguage("zh")}>中文</button>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
    </div>
  );
}
