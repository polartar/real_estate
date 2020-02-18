<?php

use App\FAQ;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FAQSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'question' => 'Why choose APT212?',
                'answer' => 'Our apartments are located throughout Manhattan’s most vibrant neighborhoods and provide all the comforts and privacy of home at a fraction of the cost of nearby hotels. With an exceptional customer service team, we make it a priority to ensure our guests a comfortable and enjoyable stay.',
                'category' => 'General'
            ]
        ])
        ->each(function($faq) {
            FAQ::updateOrCreate([
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'category' => $faq['category']
            ]);
        });
    }
}
