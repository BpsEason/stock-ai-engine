<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ForecastController extends Controller
{
    public function getForecast(Request $request)
    {
        // 檢查快取中是否有預測結果
        $cacheKey = 'forecast_' . $request->dish_id;
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        try {
            // 從外部 FastAPI 服務取得預測結果
            $response = Http::get('http://fastapi_service:8001/api/forecast', [
                'dish_id' => $request->dish_id,
            ]);

            // 檢查回應是否成功
            if ($response->successful()) {
                $forecastData = $response->json();
                
                // 將結果寫入快取，並設定快取過期時間 (例如 1 小時)
                Cache::put($cacheKey, $forecastData, now()->addHour());

                return response()->json($forecastData);
            }

            return response()->json(['error' => '無法從預測服務取得資料'], 500);

        } catch (\Exception $e) {
            return response()->json(['error' => '服務連線失敗', 'message' => $e->getMessage()], 500);
        }
    }
}
