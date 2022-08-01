<?php

namespace App\Http\Controllers;

use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MajorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Major::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->messages(),
            ], 422);
        } else {
            $data = new Major;
            $data->title = $request->input('title');
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function show(Major $major)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function edit(Major $major, $id)
    {
        $data = Major::find($id);
        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Data ID Found',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Major $major, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validationErrors' => $validator->messages(),
            ], 422);
        } else {
            $data = Major::find($id);
            if ($data) {

                $data->title = $request->input('title');
                $data->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Student Data Successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Data ID Found',
                ], 404);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function destroy(Major $major, $id)
    {
        $data = Major::find($id);
        if ($data) {
            $data->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Data Deleted Successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Data ID Found',
            ], 404);
        }
    }
}
