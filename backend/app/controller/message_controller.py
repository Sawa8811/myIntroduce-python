from fastapi import APIRouter

from app.entity.message import Message
from app.service.message_service import MessageService

# 建立 /message 開頭的路由群組。
router = APIRouter(prefix="/message")
messageService = MessageService()


# GET /message/public：取得公開留言。
@router.get("/public", response_model=list[Message])
def getPublicMessages() -> list[Message]:
    return messageService.getPublicMessages()


# POST /message：新增留言，成功回傳 true，失敗回傳 false。
@router.post("", response_model=bool)
def addMessage(message: Message) -> bool:
    return messageService.addMessage(message)
