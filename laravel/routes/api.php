<?php

use App\Http\Controllers\ClubController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;

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
Route::post('/token', [UserController::class, 'token']);

// Route::get('/item/search', [ItemController::class, 'search']);
// Route::middleware('auth:sanctum')->get('/', function (Request $request) {
//     return $request->user();
   
// });
    
Route::middleware(['auth:sanctum'])->group(function () {
    //count
    Route::get('count', [IndexController::class, 'index']);
    //major
    Route::get('major', [MajorController::class, 'index']);
    Route::post('/major/add', [MajorController::class, 'store']);
    Route::get('/major/edit/{id}', [MajorController::class, 'edit']);
    Route::put('/major/update/{id}', [MajorController::class, 'update']);
    Route::delete('/major/delete/{id}', [MajorController::class, 'destroy']);
    //club
    Route::get('club', [ClubController::class, 'index']);
    Route::post('/club/add', [ClubController::class, 'store']);
    Route::get('/club/edit/{id}', [ClubController::class, 'edit']);
    Route::put('/club/update/{id}', [ClubController::class, 'update']);
    Route::delete('/club/delete/{id}', [ClubController::class, 'destroy']);
    //students
    Route::get('students', [StudentController::class, 'index']);
    Route::post('/student/add', [StudentController::class, 'store']);
    Route::get('/student/edit/{id}', [StudentController::class, 'edit']);
    Route::put('/student/update/{id}', [StudentController::class, 'update']);
    Route::delete('/student/delete/{id}', [StudentController::class, 'destroy']);  
});

