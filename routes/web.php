<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth'])->group(function () {
    Route::get('/', 'HomeController@index')->name('home');
        Route::post('/reset', 'HomeController@reset');

    Route::post('/tick', 'TickController@tick')->name('tick');

    Route::prefix('/resources')->group(function () {
        Route::post('/increment', 'ResourceController@increment');
    });
});

Auth::routes();
