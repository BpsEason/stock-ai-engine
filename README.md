# 智能庫存預測專案骨架

這是一個基於 iCHEF 業務場景的智能庫存預測專案骨架，採用微服務架構，旨在為餐廳提供精準的銷售預測，優化庫存管理。

## 專案架構圖

```mermaid
graph TD
    subgraph Frontend (前端)
        A[Vue 3 應用程式] -->|HTTP/S| B(後端 API);
    end

    subgraph Backend (後端)
        B[Laravel API Gateway] -->|JWT Auth| C(MySQL);
        B -->|HTTP/S| D[FastAPI AI 預測服務];
        B -->|Caching| E[Redis];
    end

    subgraph Database (資料庫)
        C[MySQL]
    end

    subgraph AI/ML (預測微服務)
        D[FastAPI] -->|SQLAlchemy| C;
        D -->|Prophet/LightGBM| F[預測模型];
    end

    style Frontend fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
    style Backend fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style Database fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style AI/ML fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
```

## 環境需求

* Docker 與 Docker Compose
* Node.js (用於 Vue 前端)
* Composer (用於 Laravel)

## 執行步驟

1.  **複製並設定環境檔案**
    ```bash
    cp laravel/.env.example laravel/.env
    cp fastapi/.env.example fastapi/.env
    ```
    在 `laravel/.env` 中，你需要自行設定 `APP_KEY` 和 `JWT_SECRET`。

2.  **啟動 Docker 容器**
    ```bash
    docker-compose up --build -d
    ```

3.  **安裝後端依賴並設定 Laravel**
    ```bash
    docker-compose exec laravel_app composer install
    docker-compose exec laravel_app php artisan key:generate
    docker-compose exec laravel_app php artisan jwt:secret
    docker-compose exec laravel_app php artisan migrate
    ```

4.  **安裝前端依賴並啟動開發伺服器**
    ```bash
    cd vue
    npm install
    npm run dev
    ```

5.  **訪問應用程式**
    打開瀏覽器，前往 `http://localhost:8080`。

## AI 協作亮點

* **雙層後端架構**：採用 Laravel 作為 API Gateway，處理使用者認證、資料庫 CRUD 等業務邏輯；而將複雜的 AI 預測模型獨立成 FastAPI 微服務，實現關注點分離，使系統更具彈性與可擴展性。
* **彈性預測模型**：FastAPI 服務中預留了 Prophet 和 LightGBM 等模型的整合空間，您可以根據不同菜品或銷售數據的特性，選擇最適合的時序預測模型。
* **快取機制**：Laravel 後端整合了 Redis 快取，對於頻繁請求的預測結果進行快取，減少重複計算，顯著提升系統響應速度並降低運算成本。
* **現代前端體驗**：Vue 3 + Pinia + Vue Router 提供了高效能的單頁應用體驗，搭配 Tailwind CSS，快速建構美觀且響應式的使用者介面。
