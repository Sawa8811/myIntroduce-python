from datetime import datetime

from app.entity.message import Message
from app.mapper.message_mapper import MessageMapper


# Service 放商業邏輯，Controller 不直接碰 SQL。
class MessageService:
    def __init__(self, messageMapper: MessageMapper | None = None) -> None:
        self.messageMapper = messageMapper or MessageMapper()

    def getPublicMessages(self) -> list[Message]:
        return self.messageMapper.selectPublicMessages()

    def addMessage(self, message: Message) -> bool:
        # 對齊原本 Java 邏輯：沒有傳 isPublic 時，預設為私人留言。
        if message.isPublic is None:
            message.isPublic = False
        message.createTime = datetime.now()
        return self.messageMapper.insertMessage(message) > 0
