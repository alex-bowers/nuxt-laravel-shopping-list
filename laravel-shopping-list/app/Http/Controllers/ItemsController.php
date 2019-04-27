<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Cache\Repository;
use Illuminate\Routing\Controller;

class ItemsController extends Controller
{
    /**
     * Get all items.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItems()
    {
        $cache = app(Repository::class);

        return $cache->remember('items', 1440, function () {
            return Item::all();
        });
    }
}
