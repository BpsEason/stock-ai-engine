# 智能庫存預測系統

這是一個基於微服務架構的智能庫存預測專案骨架，專為餐廳庫存管理設計，利用 AI 技術提供精準的銷售預測，優化庫存管理流程。本專案僅包含關鍵代碼，需手動安裝依賴並完成環境配置方可運行。

## 專案架構圖

```mermaid
graph TD
    subgraph 前端
        A[前端/前端應用] -->|HTTP/HTTPS| B[Vue 3 應用程式]
        B -->|HTTP/HTTPS| C[Laravel API 閘道]
    end

    subgraph 後端
        C[Laravel API 閘道] -->|JWT 認證| D[Redis]
        C -->|HTTP/HTTPS| E[FastAPI]
    end

    subgraph 中間層
        D[Redis] -->|快取| C
        E[FastAPI] -->|SQLAlchemy| F[資料庫 (MySQL)]
        E -->|Prophet/LightGBM| G[預測模型]
    end

    subgraph AI/ML
        G[預測模型] -->|AI/ML 預測模型| H[AI/ML 預測模型]
    end

    style 前端 fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
    style 後端 fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style 中間層 fill:#ffe0b2,stroke:#ff9800,stroke-width:2px
    style AI/ML fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
```

## 專案亮點

- **雙層後端架構**：採用 Laravel 作為 API 閘道，負責使用者認證與資料庫 CRUD 操作，同時將 AI 預測邏輯獨立於 FastAPI 微服務，實現關注點分離，提升系統模組化與可擴展性。
- **彈性 AI 預測模型**：FastAPI 服務預留 Prophet 與 LightGBM 模型整合空間，可根據菜品銷售數據特性選擇最適合的時序預測模型，確保預測精準度。
- **高效快取機制**：Laravel 整合 Redis 快取，針對頻繁請求的預測結果進行快取，顯著降低重複計算負擔，提升系統響應速度與運算效率。
- **現代化前端體驗**：採用 Vue 3、Pinia 與 Vue Router 打造高效能單頁應用，搭配 Tailwind CSS 與 ECharts，提供美觀、響應式的儀表板與數據視覺化。
- **容器化部署**：透過 Docker Compose 編排 Laravel、FastAPI、MySQL 與 Redis 服務，實現一致的開發與生產環境，簡化部署流程。

## 目錄結構

以下為專案的關鍵目錄結構，包含核心代碼檔案：

```
stock-ai-engine/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD 工作流程
├── docs/
│   └── openapi.yaml                # OpenAPI 規範文件
├── fastapi/
│   ├── app/
│   │   ├── db.py                   # FastAPI SQLAlchemy 資料庫連線
│   │   └── main.py                 # FastAPI 主應用與預測端點
│   ├── tests/
│   │   └── test_main.py            # FastAPI 單元測試
│   ├── .env.example                # FastAPI 環境檔案範例
│   ├── .gitignore                  # FastAPI Git 忽略設定
│   ├── Dockerfile                  # FastAPI Docker 配置文件
│   └── requirements.txt            # FastAPI Python 依賴
├── laravel/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       ├── AuthController.php     # 認證控制器
│   │   │       ├── DishController.php     # 菜品 CRUD 控制器
│   │   │       ├── ForecastController.php # 預測控制器
│   │   │       └── OrderController.php    # 訂單 CRUD 控制器
│   │   └── Models/
│   │       ├── Dish.php                   # 菜品模型
│   │       ├── Order.php                  # 訂單模型
│   │       └── User.php                   # 使用者模型
│   ├── config/
│   │   ├── auth.php                       # 認證配置
│   │   └── jwt.php                        # JWT 配置
│   ├── database/
│   │   └── migrations/
│   │       └── 2023_01_01_000000_create_initial_tables.php # 資料庫遷移
│   ├── routes/
│   │   └── api.php                        # API 路由
│   ├── tests/
│   │   └── Unit/
│   │       └── ExampleTest.php            # Laravel 單元測試範例
│   ├── .env.example                       # Laravel 環境檔案範例
│   ├── .gitignore                         # Laravel Git 忽略設定
│   ├── composer.json                      # Laravel 依賴配置文件
│   └── Dockerfile                         # Laravel Docker 配置文件
├── vue/
│   ├── public/
│   │   └── index.html                     # Vue 入口 HTML
│   ├── src/
│   │   ├── components/
│   │   │   └── AppHeader.vue              # 頁頭組件
│   │   ├── router/
│   │   │   └── index.js                   # Vue Router 配置
│   │   ├── stores/
│   │   │   ├── auth.js                    # Pinia 認證狀態管理
│   │   │   └── forecast.js                # Pinia 預測狀態管理
│   │   ├── views/
│   │   │   ├── DashboardPage.vue           # 儀表板頁面
│   │   │   └── LoginPage.vue              # 登入頁面
│   │   ├── App.vue                        # Vue 主組件
│   │   ├── main.js                        # Vue 應用入口
│   │   └── style.css                      # Tailwind CSS 樣式
│   ├── .gitignore                         # Vue Git 忽略設定
│   ├── package.json                       # Vue 依賴配置文件
│   └── vite.config.js                     # Vite 配置文件
├── postman/
│   └── StockAIEngine.postman_collection.json # Postman 測試集合
├── .gitignore                             # 專案根目錄 Git 忽略設定
├── docker-compose.yml                     # Docker Compose 配置文件
└── README.md                              # 專案說明文件
```

## 關鍵代碼範例

以下為專案中幾個核心檔案的代碼片段，包含詳細的正體中文註解，以展示主要功能邏輯。

### 1. Laravel 預測控制器 (`laravel/app/Http/Controllers/ForecastController.php`)

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ForecastController extends Controller
{
    /**
     * 取得菜品銷售預測結果
     *
     * @param Request $request HTTP 請求物件，包含 dish_id 參數
     * @return \Illuminate\Http\JsonResponse 預測結果或錯誤訊息
     */
    public function getForecast(Request $request)
    {
        // 產生快取鍵，基於菜品 ID
        $cacheKey = 'forecast_' . $request->dish_id;
        
        // 檢查 Redis 快取中是否已有預測結果
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        try {
            // 向 FastAPI 服務發送 HTTP 請求，取得預測結果
            $response = Http::get('http://fastapi_service:8001/api/forecast', [
                'dish_id' => $request->dish_id,
            ]);

            // 檢查 FastAPI 回應是否成功
            if ($response->successful()) {
                $forecastData = $response->json();
                
                // 將預測結果存入 Redis 快取，設定 1 小時過期
                Cache::put($cacheKey, $forecastData, now()->addHour());

                return response()->json($forecastData);
            }

            // 若 FastAPI 回應失敗，返回錯誤訊息
            return response()->json(['error' => '無法從預測服務取得資料'], 500);

        } catch (\Exception $e) {
            // 捕獲異常，返回連線錯誤訊息
            return response()->json(['error' => '服務連線失敗', 'message' => $e->getMessage()], 500);
        }
    }
}
```

**說明**：此控制器負責處理前端的預測請求，檢查 Redis 快取，若無快取則向 FastAPI 服務請求預測數據，並將結果快取 1 小時以提升效能。

### 2. FastAPI 主應用 (`fastapi/app/main.py`)

```python
from fastapi import FastAPI, HTTPException, Depends
import pandas as pd
from typing import List, Dict
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .db import get_db

# 載入環境變數，從專案根目錄的 .env 檔案讀取
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

app = FastAPI()

# 模擬從資料庫取得歷史銷售資料
def get_historical_data(dish_id: int, db: Session) -> pd.DataFrame:
    # TODO: 使用 SQLAlchemy 查詢資料庫，取得指定菜品的歷史銷售數據
    print(f"正在從資料庫取得菜品 {dish_id} 的歷史資料...")
    # 模擬資料，實際應用中應替換為真實查詢
    data = {
        'ds': pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03']),
        'y': [10, 15, 12]
    }
    return pd.DataFrame(data)

# 模擬執行預測模型
def run_prediction_model(data: pd.DataFrame) -> List[Dict]:
    # TODO: 實作 Prophet 或 LightGBM 模型的訓練與預測邏輯
    # 模擬預測結果，實際應用中應替換為真實模型預測
    future_data = [
        {'date': '2023-01-04', 'forecast': 18},
        {'date': '2023-01-05', 'forecast': 20},
        {'date': '2023-01-06', 'forecast': 15},
    ]
    return future_data

@app.get("/api/forecast")
def get_forecast(dish_id: int, db: Session = Depends(get_db)):
    """
    取得指定菜品的銷售預測結果
    :param dish_id: 菜品 ID
    :param db: SQLAlchemy 資料庫會話
    :return: 包含菜品 ID 與預測結果的 JSON 回應
    """
    if not dish_id:
        raise HTTPException(status_code=400, detail="請提供有效的菜品 ID (dish_id)")

    try:
        # 取得歷史銷售資料
        historical_data = get_historical_data(dish_id, db)
        if historical_data.empty:
            raise HTTPException(status_code=404, detail="找不到此菜品的歷史資料")
        
        # 執行預測模型
        forecast_result = run_prediction_model(historical_data)

        # 返回預測結果
        return {
            "dish_id": dish_id,
            "predictions": forecast_result
        }

    except Exception as e:
        # 處理異常，返回錯誤訊息
        raise HTTPException(status_code=500, detail=f"預測時發生錯誤: {str(e)}")
```

**說明**：此檔案定義 FastAPI 的預測端點，模擬從資料庫取得歷史數據並執行預測，預留 Prophet/LightGBM 模型的整合空間，目前為占位邏輯。

### 3. Vue 儀表板頁面 (`vue/src/views/DashboardPage.vue`)

```vue
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForecastStore } from '../stores/forecast';

// 初始化預測狀態管理與圖表參考
const forecastStore = useForecastStore();
const chartRef = ref(null);
let myChart = null;

// 取得並繪製預測數據
const fetchAndDrawForecast = async () => {
  await forecastStore.fetchForecast(1); // 模擬取得菜品 ID 為 1 的預測
};

// 繪製 ECharts 圖表
const drawChart = () => {
  if (!myChart && chartRef.value) {
    myChart = echarts.init(chartRef.value); // 初始化 ECharts
  }

  if (myChart && forecastStore.forecastData) {
    const predictions = forecastStore.forecastData.predictions;
    const dates = predictions.map(item => item.date); // 提取日期
    const forecasts = predictions.map(item => item.forecast); // 提取預測值

    // 設定 ECharts 圖表選項
    const option = {
      title: {
        text: '未來備貨預測',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '預測數量',
          type: 'bar',
          data: forecasts,
          itemStyle: {
            borderRadius: [5, 5, 0, 0] // 柱狀圖圓角設定
          }
        },
      ],
    };
    myChart.setOption(option); // 渲染圖表
  }
};

// 組件掛載時執行
onMounted(() => {
  if (typeof echarts !== 'undefined') {
    fetchAndDrawForecast(); // 取得並繪製預測數據
  }
});

// 監聽預測數據變化，更新圖表
watch(() => forecastStore.forecastData, (newVal) => {
  if (newVal) {
    drawChart();
  }
});
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto font-sans">
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">庫存預測數據</h2>
      <button
        @click="fetchAndDrawForecast"
        :disabled="forecastStore.loading"
        class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ forecastStore.loading ? '載入中...' : '重新載入預測數據' }}
      </button>

      <div v-if="forecastStore.loading" class="mt-4 text-gray-600">
        正在載入...
      </div>

      <div v-if="forecastStore.error" class="mt-4 text-red-500">
        發生錯誤: {{ forecastStore.error }}
      </div>

      <div v-if="forecastStore.forecastData" class="mt-6">
        <div ref="chartRef" style="width: 100%; height: 400px;" class="bg-white p-4 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>
```

**說明**：此 Vue 組件使用 Pinia 管理預測狀態，透過 ECharts 繪製柱狀圖展示預測結果，並支援動態數據更新與載入狀態顯示。

## 環境需求

- **Docker** 與 **Docker Compose**
- **Node.js** (v18 或更高版本，用於 Vue 前端)
- **Composer** (用於 Laravel 依賴管理)
- **Python** (3.9 或更高版本，用於 FastAPI 服務)

## 安裝與執行步驟

> **注意**：本專案僅提供關鍵代碼，無法直接運行。需手動安裝依賴並完成環境配置。請按照以下步驟操作：

1. **複製儲存庫**
   ```bash
   git clone https://github.com/BpsEason/stock-ai-engine.git
   cd stock-ai-engine
   ```

2. **複製環境檔案**
   ```bash
   cp laravel/.env.example laravel/.env
   cp fastapi/.env.example fastapi/.env
   ```
   - 編輯 `laravel/.env`，確保 `DB_HOST=mysql_db`、`REDIS_HOST=redis` 等參數與 Docker 服務名稱對應。
   - 編輯 `fastapi/.env`，設置 `DATABASE_URL` 為 `mysql+pymysql://root:secret@mysql_db/stock_ai_engine`。

3. **啟動 Docker 容器**
   ```bash
   docker-compose up --build -d
   ```

4. **安裝 Laravel 依賴並設定**
   ```bash
   docker-compose exec laravel_app composer install
   docker-compose exec laravel_app php artisan key:generate
   docker-compose exec laravel_app php artisan jwt:secret
   docker-compose exec laravel_app php artisan migrate
   ```

5. **安裝 FastAPI 依賴**
   ```bash
   docker-compose exec fastapi_service pip install -r fastapi/requirements.txt
   ```

6. **安裝 Vue 前端依賴**
   ```bash
   cd vue
   npm install
   npm run dev
   ```

7. **訪問應用程式**
   - 開啟瀏覽器，前往 `http://localhost:8080` 訪問 Vue 前端。
   - 預設登入憑證：`email: test@example.com`, `password: password`。

## API 文件

- **OpenAPI 規範**：位於 `docs/openapi.yaml`，提供 API 端點詳細說明。
- **Postman 集合**：位於 `postman/StockAIEngine.postman_collection.json`，用於測試認證與預測端點。

## 開發注意事項

- **關鍵代碼限制**：本專案僅包含核心代碼，無法直接運行。需手動安裝依賴（Laravel、FastAPI、Vue）並配置環境變數。
- **預測模型**：FastAPI 服務中的 `run_prediction_model` 函數為占位符，需根據實際數據集實作 Prophet 或 LightGBM 邏輯。
- **快取機制**：Laravel 使用 Redis 快取預測結果，可在 `laravel/app/Http/Controllers/ForecastController.php` 中調整快取時間。
- **前端代理**：檢查 `vue/vite.config.js` 中的 Vite 代理設定，確保 `/api` 與 `/forecast` 路由正確指向 Laravel 與 FastAPI 服務。
- **資料庫遷移**：執行 `php artisan migrate` 前，確保 MySQL 服務正常運行並正確配置 `laravel/.env`。

## 下一步

- 在 `fastapi/app/main.py` 中實作 Prophet 或 LightGBM 的實際預測邏輯。
- 擴展 Vue 儀表板，新增更多數據視覺化或交互功能。
- 為 Laravel、FastAPI 與 Vue 添加更全面的單元測試與整合測試。
- 部署至生產環境，確保環境變數與敏感數據的安全管理。

如需進一步資訊或支援，請參考 [Laravel](https://laravel.com)、[FastAPI](https://fastapi.tiangolo.com) 和 [Vue 3](https://vuejs.org) 的官方文件。
