<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemCategoryCollection;
use App\Models\Item;
use App\Models\ItemCategory;
use GrahamCampbell\Binput\Facades\Binput;
use Illuminate\Routing\Controller;

class ItemsController extends Controller
{
    /**
     * Get all active items.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getActiveItems()
    {
        return new ItemCategoryCollection(ItemCategory::all());
    }

    /**
     * Get all inactive items.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInactiveItems()
    {
        return Item::withTrashed()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $item = Binput::all();

        $newItem = Item::create($item);

        return response()->json($newItem);
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
