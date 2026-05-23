from app.database import get_connection
from app.entity.message import Message


# Mapper 負責直接操作資料庫，角色等同原本 Java MyBatis 的 MessageMapper。
class MessageMapper:
    def selectPublicMessages(self) -> list[Message]:
        # PostgreSQL 使用 TRUE/FALSE；用 AS 把 snake_case 欄位轉回 camelCase。
        sql = """
            SELECT id, nickname, content, is_public AS "isPublic", create_time AS "createTime"
            FROM messages
            WHERE is_public = TRUE
            ORDER BY id DESC
        """
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql)
                return [Message(**row) for row in cursor.fetchall()]

    def insertMessage(self, message: Message) -> int:
        # 使用參數化查詢，避免 SQL injection。
        sql = """
            INSERT INTO messages (nickname, content, is_public, create_time)
            VALUES (%s, %s, %s, NOW())
        """
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql, (message.nickname, message.content, message.isPublic))
                return cursor.rowcount
