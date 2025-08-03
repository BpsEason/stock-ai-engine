<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForecastController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('auth/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
Route::post('auth/me', [AuthController::class, 'me'])->middleware('auth:api');

Route::middleware('auth:api')->group(function () {
    Route::get('/forecast', [ForecastController::class, 'getForecast']);
    // CRUD 資源路由
    Route::apiResource('dishes', DishController::class);
    Route::apiResource('orders', OrderController::class);
});
