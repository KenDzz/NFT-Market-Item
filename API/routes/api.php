<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('item/', [ItemController::class, 'index']);
Route::get('shop/', [ItemController::class, 'shop']);
Route::post('addItemAdress/', [ItemController::class, 'addItemAdress']);
Route::post('showItemBalo/', [ItemController::class, 'showItemBalo']);
Route::post('sellItem/', [ItemController::class, 'sellItem']);
Route::post('delSell/', [ItemController::class, 'delSell']);
Route::post('delShop/', [ItemController::class, 'delShop']);
Route::post('updateIsWear/', [ItemController::class, 'updateIsWear']);
Route::post('setIsWear/', [ItemController::class, 'SetIsWear']);