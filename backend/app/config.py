import os
from pathlib import Path


# 讀取專案根目錄的 .env 檔案，不另外依賴 pydantic-settings 或 python-dotenv。
def load_env() -> None:
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


class Settings:
    def __init__(self) -> None:
        load_env()
        # PostgreSQL 連線字串，格式：postgresql://帳號:密碼@主機:port/database
        self.DATABASE_URL = os.getenv(
            "DATABASE_URL",
            "postgresql://postgres:postgres@localhost:5432/message_board",
        )
        # 允許前端跨域呼叫 API 的來源，對應原本 Java 的 @CrossOrigin。
        self.FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")


# 匯出一個全專案共用的設定物件。
settings = Settings()
