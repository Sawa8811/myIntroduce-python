-- PostgreSQL 資料表，對應 Python 的 Message entity。
CREATE TABLE IF NOT EXISTS messages (
    -- BIGSERIAL 會自動產生遞增 id。
    id BIGSERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    -- 對應 Python/Java 的 isPublic，預設為私人留言。
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    -- 建立時間，預設使用資料庫目前時間。
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
