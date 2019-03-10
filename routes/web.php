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
    Route::get('/reset', 'HomeController@reset');

    Route::post('/tick', 'TickController@tick')->name('tick');

    Route::prefix('/research')->group(function () {
        Route::get('/', 'ResearchController@getAvailable');
        Route::post('/complete', 'ResearchController@complete');
    });

    Route::prefix('/materials')->group(function () {
        Route::post('/increment', 'MaterialsController@increment');
        Route::post('/pay', 'MaterialsController@pay');
    });
});

Auth::routes();
