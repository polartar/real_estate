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
            ],
            [
                'question' => 'How do I book an apartment?',
                'answer' => 'Start by browsing our selection of properties. When you find one (or several!) that fit your needs, you can contact our booking agents directly to confirm availability, set up a viewing or make a reservation.',
                'category' => 'Booking'
            ],
            [
                'question' => 'What is the difference between private rooms and full apartments?',
                'answer' => 'Private rooms are available for solo travelers looking for a bedroom in a multi-bedroom apartment that is shared with other guests. If you book a full apartment, you will be the only resident in the home.',
                'category' => 'Private Rooms'
            ],
            [
                'question' => 'Where do I get my keys?',
                'answer' => 'Guests can check-in after 3pm at our Soho office, Monday through Friday. For late night or weekend check-ins, you can coordinate directly with your booking agent.',
                'category' => 'Your Stay'
            ],
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
