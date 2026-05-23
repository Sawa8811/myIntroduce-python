# myIntroduce FastAPI

這是把原本 Java Spring Boot/MyBatis 留言板後端改寫成 Python FastAPI 的新專案，資料庫從 MySQL 改為 PostgreSQL。

## 專案結構

```text
app/
  controller/message_controller.py
  service/message_service.py
  mapper/message_mapper.py
  entity/message.py
  config.py
  database.py
```

## 安裝

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

如果 PostgreSQL 帳號密碼不同，請修改 `.env` 的 `DATABASE_URL`。

## 建立資料表

先建立 `message_board` database，然後執行：

```bash
psql postgresql://postgres:postgres@localhost:5432/message_board -f schema.sql
```

## 啟動

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

## API

- `GET /message/public`
- `POST /message`

`POST /message` 範例：

```json
{
  "nickname": "Sawa",
  "content": "hello",
  "isPublic": true
}
```
