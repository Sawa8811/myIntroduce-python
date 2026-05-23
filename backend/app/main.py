from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.controller.message_controller import router as message_router

# FastAPI 主程式入口，等同原本 Spring Boot 的 MyIntroduceApplication。
app = FastAPI(title="myIntroduce")

# 設定 CORS，讓前端開發伺服器可以呼叫後端 API。
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 掛上留言相關 API。
app.include_router(message_router)
