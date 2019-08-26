<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be casted to native types.
     *
     * @var string[]
     */
    protected $casts = [
        'name'        => 'string',
        'slug'        => 'string',
        'category_id' => 'int',
        'quantity'    => 'int',
        'image'       => 'string',
        'active'      => 'bool'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'category_id',
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
        'name'        => 'required|string',
        'slug'        => 'required|string',
        'category_id' => 'required|string',
        'quantity'    => 'required|int',
        'image'       => 'nullable|string',
        'active'      => 'required|bool'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function category(): HasOne
    {
        return $this->hasOne(ItemCategory::class, 'id', 'category_id');
    }
}
