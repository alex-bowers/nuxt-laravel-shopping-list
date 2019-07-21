<?php

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

Route::post('/auth/login', 'Auth\AuthController@login')->name('login');
Route::post('/register', 'Auth\AuthController@register')->name('register');

Route::group([
    'middleware' => ['jwt.auth'],
    'prefix' => 'auth'
], function () {
    Route::post('/logout', 'Auth\AuthController@logout');
    Route::get('/user', 'Auth\AuthController@user');
    Route::get('items', 'ItemsController@getItems');
    Route::resource('items', 'ItemsController')->only([
        'store',
        'update',
        'destroy'
    ]);
});
