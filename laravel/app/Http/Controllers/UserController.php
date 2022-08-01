<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use DB;

class UserController extends Controller
{
    public function token(Request $request)
    {
        $loginDetails = $request->only('name', 'password');
        if (Auth::attempt($loginDetails)) {
            $user =  User::where("name", $request->name)->first();
            return response()->json(
                [
                    'status' => 200,
                    'user' => $user,
                    'token' => $user->createToken($user->name)->plainTextToken,
                    'message' => 'success',
                ], 200);
        } else {
            return response()->json(
                [
                    'status' => 501,
                    'message' => 'The Username or Password is Incorrect',
                ], 501);
        }
    }
}
