<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Major;
use App\Models\Club;
use App\Models\Student;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Major::factory()->count(15)->create();
        Club::factory()->count(15)->create();
        Student::factory()->count(30)->create();
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'level' => 1,
            'password' => bcrypt('admin'),
        ]);
    }
}
