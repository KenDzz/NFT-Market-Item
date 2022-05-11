<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class ItemController extends Controller
{
    public function index()
    {
        $item = DB::connection('mysql')->table('item')->get();
        return response()->json(['item' => $item]);
    }

    public function shop()
    {
        $item = DB::connection('mysql')->table('shop')->join('item', 'shop.idItem', '=', 'item.id')->select('shop.*', 'item.name', 'item.image', 'item.type')->get();
        return response()->json(['item' => $item]);

    }


    public function addItemAdress(Request $request)
    {
        if($request){
            $values = array('address' => $request->input('address'),'idItem' => $request->input('id'), 'isBind' => '0');
            DB::connection('mysql')->table('user_item')->insert($values);
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function showItemBalo(Request $request)
    {
        if($request){
            $item = DB::connection('mysql')->table('user_item')->join('item', 'user_item.idItem', '=', 'item.id')->select('user_item.*', 'item.name', 'item.image', 'item.type' , 'user_item.isWear')->where('address', $request->input('address'))->get();
            return response()->json(['item' => $item]);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function updateIsWear(Request $request)
    {
        if($request){
            $item = DB::connection('mysql')->table('user_item')->join('item', 'user_item.idItem', '=', 'item.id')->where('address', $request->input('address'))->where('type', $request->input('type'))->update(['user_item.isWear' => 0]);;
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function SetIsWear(Request $request)
    {
        if($request){
            $item = DB::connection('mysql')->table('user_item')->where('address', $request->input('address'))->where('id', $request->input('id'))->update(['isWear' => 1]);;
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function sellItem(Request $request)
    {
        if($request){
            $values = array('address' => $request->input('address'),'idItem' => $request->input('idItem'), 'price' => $request->input('price'), 'idUser' => $request->input('id'));
            DB::connection('mysql')->table('shop')->insert($values);
            DB::connection('mysql')->table('user_item')->where('id', $request->input('id'))->update(['isBind' => 1]);
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function delSell(Request $request)
    {
        if($request){
            DB::connection('mysql')->table('user_item')->where('id', $request->input('id'))->update(['isBind' => 0]);
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }

    public function delShop(Request $request)
    {
        if($request){
            DB::connection('mysql')->table('shop')->where('id', $request->input('id'))->delete();
            return response()->json(['result' => 'true']);
        }else{
            return response()->json(['result' => 'false']);
        }
    }
}
