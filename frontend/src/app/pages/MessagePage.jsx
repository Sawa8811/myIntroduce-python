import { useEffect, useState } from "react";
import { createMessage, fetchPublicMessages } from "../services/messages";

export function MessagePage({ t }) {
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [publicMessages, setPublicMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const loadMessages = async () => {
    setLoadingMessages(true);
    try {
      const messages = await fetchPublicMessages();
      setPublicMessages(messages);
    } catch {
      setPublicMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nickname.trim() || !message.trim()) {
      alert("暱稱和留言內容都要填寫喔！");
      return;
    }

    try {
      const response = await createMessage({
        nickname,
        content: message,
        isPublic,
      });

      if (!response.ok) {
        alert("留言送出失敗！");
        return;
      }

      setMessage("");
      setNickname("");
      setIsPublic(true);
      alert("留言送出成功！");
      loadMessages();
    } catch {
      alert("留言送出失敗！");
    }
  };

  return (
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
              onChange={(event) => setNickname(event.target.value)}
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
                onChange={(event) => setMessage(event.target.value)}
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
                onChange={(event) => setIsPublic(event.target.checked)}
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
            ) : publicMessages.length > 0 ? (
              publicMessages.map((item, index) => (
                <div className="message-card" key={`${item.nickname || "anonymous"}-${index}`}>
                  <p>
                    <strong>{item.nickname || t("message_anonymous")}</strong>: {item.content}
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
  );
}
