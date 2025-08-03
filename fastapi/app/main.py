from fastapi import FastAPI, HTTPException, Depends
import pandas as pd
from typing import List, Dict
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .db import get_db

# 為了從專案根目錄載入 .env 檔案
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

app = FastAPI()

# 模擬資料庫連線或資料讀取 (此處應替換為真實的 SQLAlchemy 查詢)
def get_historical_data(dish_id: int, db: Session) -> pd.DataFrame:
    # TODO: 使用 SQLAlchemy 從資料庫中讀取歷史銷售資料
    print(f"正在從資料庫取得菜品 {dish_id} 的歷史資料...")
    # 假設這是我們讀取到的資料
    data = {
        'ds': pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03']),
        'y': [10, 15, 12]
    }
    return pd.DataFrame(data)

# 模擬預測模型
def run_prediction_model(data: pd.DataFrame) -> List[Dict]:
    # TODO: 在這裡實作 Prophet 或 LightGBM 模型的訓練與預測邏輯
    # 假設這是我們返回的模擬預測結果
    future_data = [
        {'date': '2023-01-04', 'forecast': 18},
        {'date': '2023-01-05', 'forecast': 20},
        {'date': '2023-01-06', 'forecast': 15},
    ]
    return future_data

@app.get("/api/forecast")
def get_forecast(dish_id: int, db: Session = Depends(get_db)):
    if not dish_id:
        raise HTTPException(status_code=400, detail="請提供有效的菜品 ID (dish_id)")

    try:
        # 1. 讀取歷史資料
        historical_data = get_historical_data(dish_id, db)
        if historical_data.empty:
            raise HTTPException(status_code=404, detail="找不到此菜品的歷史資料")
        
        # 2. 執行預測
        forecast_result = run_prediction_model(historical_data)

        return {
            "dish_id": dish_id,
            "predictions": forecast_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"預測時發生錯誤: {str(e)}")
