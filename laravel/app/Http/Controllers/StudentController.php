<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    //
    public function index()
    {
        // $data = Student::orderBy('id', 'desc')->get();
        $data = Student::join('majors', 'students.major_id', '=', 'majors.id')
            ->orderBy('students.id','desc')
            ->get(['students.*', 'majors.title as major_title']);
        // $test = Student::join('majors', 'students.major_id', '=', 'majors.id')
        //     ->join('clubs', 'clubs.id', '=',  'students.club')
        //     ->get(['students.*', 'majors.title as major_title', 'clubs.title as club_title']);
        return response()->json([
            'status' => 200,
            'data' => $data,
            // 'test' => $test,
        ], 200);
    }

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
            'name' => 'required|max:191',
            'email' => 'required|max:191',
            'gender' => 'required|max:191',
            'major_id' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->messages(),
            ], 422);
        } else {
            $data = new Student;
            $data->name = $request->input('name');
            $data->email = $request->input('email');
            $data->gender = $request->input('gender');
            $data->major_id = $request->input('major_id');
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
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student, $id)
    {
        $data = Student::find($id);
        $data2 = Major::orderBy('id','desc')->get();
        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'data2' => $data2,
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
    public function update(Request $request, Student $student, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|max:191',
            'gender' => 'required|max:191',
            'major_id' => 'required|max:191',
            // 'club' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validationErrors' => $validator->messages(),
            ], 422);
        } else {
            $data = Student::find($id);
            if ($data) {

                $data->name     = $request->input('name');
                $data->email    = $request->input('email');
                $data->gender   = $request->input('gender');
                $data->major_id = $request->input('major_id');
                $data->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Update Data Successfully',
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
    public function destroy(Student $student, $id)
    {
        $data = Student::find($id);
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
