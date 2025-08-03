import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 從 .env 檔案中取得資料庫連線 URL
DATABASE_URL = os.getenv("DATABASE_URL")

# 建立 SQLAlchemy 引擎
engine = create_engine(DATABASE_URL)

# 建立 SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
