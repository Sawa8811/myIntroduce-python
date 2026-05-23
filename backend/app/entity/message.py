from datetime import datetime

from pydantic import BaseModel


# 對應 messages 資料表，也作為 FastAPI request/response 的資料格式。
class Message(BaseModel):
    id: int | None = None
    nickname: str
    content: str
    # 保留原本 Java 欄位名稱 isPublic，資料庫欄位則是 is_public。
    isPublic: bool | None = None
    # 保留原本 Java 欄位名稱 createTime，資料庫欄位則是 create_time。
    createTime: datetime | None = None
