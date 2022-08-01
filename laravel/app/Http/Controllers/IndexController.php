<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\Club;
use App\Models\Student;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        $major = Major::count();
        $club = Club::count();
        $student = Student::count();
        return response()->json([
            'status' => 200,
            'major' => $major,
            'club' => $club,
            'student' => $student,
        ], 200);
    }
}
