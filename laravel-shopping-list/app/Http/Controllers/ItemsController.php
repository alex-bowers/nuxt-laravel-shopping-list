<?php

namespace App\Http\Controllers;

use App\Models\Item;
use GrahamCampbell\Binput\Facades\Binput;
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

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $item = Binput::all();

        Item::create($item);

        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id)
    {
        $item = Item::find($id);

        if (Binput::has('quantity')) {
            $item->quantity = Binput::get('quantity');
        }

        if (Binput::has('active')) {
            $item->active = Binput::get('active');
        }

        $item->save();

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $item = Item::find($id);

        $item->delete();

        return response()->json(['success' => true]);
    }
}
