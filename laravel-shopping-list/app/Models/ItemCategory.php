<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be casted to native types.
     *
     * @var string[]
     */
    protected $casts = [
        'name'     => 'string'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The validation rules.
     *
     * @var string[]
     */
    public $rules = [
        'name'     => 'required|string'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
}
