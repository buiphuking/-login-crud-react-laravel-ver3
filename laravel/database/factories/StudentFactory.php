<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Major;
use App\Models\Club;
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            "email" => $this->faker->safeEmail,
            "gender" => $this->faker->numberBetween(0, 1),
            "major_id" => $this->faker->randomElement(Major::pluck('id')),
            "club" => $this->faker->randomElement(Club::pluck('id')),
        ];
    }
}
