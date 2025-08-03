# 智能庫存預測系統

這是一個基於微服務架構的智能庫存預測專案骨架，專為餐廳庫存管理設計，利用 AI 技術提供精準的銷售預測，優化庫存管理流程。本專案僅包含關鍵代碼，需手動完成依賴安裝與環境配置方可運行。

## 專案架構圖

```mermaid
graph TD
    subgraph 前端
        A[Vue 3 應用程式] -->|HTTP/S| B[後端 API]
    end
    subgraph 後端
        B[Laravel API 閘道] -->|JWT 認證| C[MySQL]
        B -->|HTTP/S| D[FastAPI AI 服務]
        B -->|快取| E[Redis]
    end
    subgraph 資料庫
        C[MySQL]
    end
    subgraph AI/ML
        D[FastAPI] -->|SQLAlchemy| C
        D -->|Prophet/LightGBM| F[預測模型]
    end

    style 前端 fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
    style 後端 fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style 資料庫 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style AI/ML fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
```

## 專案亮點

- **雙層後端架構**：採用 Laravel 作為 API 閘道，負責使用者認證與資料庫 CRUD 操作，同時將 AI 預測邏輯獨立於 FastAPI 微服務，實現關注點分離，提升系統模組化與可擴展性。
- **彈性 AI 預測模型**：FastAPI 服務預留 Prophet 與 LightGBM 模型整合空間，可根據菜品銷售數據特性選擇最適合的時序預測模型，確保預測精準度。
- **高效快取機制**：Laravel 整合 Redis 快取，針對頻繁請求的預測結果進行快取，顯著降低重複計算負擔，提升系統響應速度與運算效率。
- **現代化前端體驗**：採用 Vue 3、Pinia 與 Vue Router 打造高效能單頁應用，搭配 Tailwind CSS 與 ECharts，提供美觀、響應式的儀表板與數據視覺化。
- **容器化部署**：透過 Docker Compose 編排 Laravel、FastAPI、MySQL 與 Redis 服務，實現一致的開發與生產環境，簡化部署流程。

## 環境需求

- **Docker** 與 **Docker Compose**
- **Node.js** (v18 或更高版本，用於 Vue 前端)
- **Composer** (用於 Laravel 依賴管理)
- **Python** (3.9 或更高版本，用於 FastAPI 服務)

## 安裝與執行步驟

> **注意**：本專案僅提供關鍵代碼，需手動安裝依賴並完成環境配置。請按照以下步驟操作：

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
