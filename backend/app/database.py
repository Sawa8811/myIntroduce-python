from collections.abc import Iterator
from contextlib import contextmanager

import psycopg2
from psycopg2.extras import RealDictCursor

from app.config import settings


# 建立資料庫連線，使用 RealDictCursor 讓查詢結果可以用欄位名稱取值。
@contextmanager
def get_connection() -> Iterator[psycopg2.extensions.connection]:
    with psycopg2.connect(settings.DATABASE_URL, cursor_factory=RealDictCursor) as connection:
        yield connection
