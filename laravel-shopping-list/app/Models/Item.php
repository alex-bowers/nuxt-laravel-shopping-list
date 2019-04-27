<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var string[]
     */
    protected $casts = [
        'name'     => 'string',
        'slug'     => 'string',
        'quantity' => 'int',
        'image'    => 'string',
        'active'   => 'bool'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'quantity',
        'image',
        'active'
    ];

    /**
     * The validation rules.
     *
     * @var string[]
     */
    public $rules = [
        'name'     => 'required|string',
        'slug'     => 'required|string',
        'quantity' => 'required|int',
        'image'    => 'nullable|string',
        'active'   => 'required|bool'
    ];
}
