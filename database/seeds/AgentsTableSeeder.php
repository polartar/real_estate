<?php

use App\Agents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AgentsTableSeeder extends Seeder
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
                'name' => 'Office',
                'email' => 'office@apt212.com'
            ],
              [
                'name' => 'Adi',
                'email' => 'adi@apt212.com'
              ],
              [
                'name' => 'Margaret',
                'email' => 'margaret@apt212.com'
              ],
              [
                'name' => 'Rivka',
                'email' => 'rivka@apt212.com'
              ],
              [
                'name' => 'Jane',
                'email' => 'jane@apt212.com'
              ],
              [
                'name' => 'Dustin',
                'email' => 'dustin@apt212.com'
              ],
              [
                'name' => 'Milena',
                'email' => 'milena@apt212.com'
              ],
              [
                'name' => 'Dana',
                'email' => 'dana@apt212.com'
              ],
              [
                'name' => 'Sara',
                'email' => 'sara@apt212.com'
              ],
              [
                'name' => 'Katherine',
                'email' => 'katie@apt212.com'
              ],
              [
                'name' => 'Karishma',
                'email' => 'karishma@apt212.com'
              ],
              [
                'name' => 'Georgeann',
                'email' => 'georgeann@apt212.com'
              ],
              [
                'name' => 'Esther',
                'email' => 'esther@apt212.com'
              ],
              [
                'name' => 'Pritha',
                'email' => 'pritha@apt212.com'
              ],
              [
                'name' => 'Francois',
                'email' => 'francois@apt212.com'
              ],
              [
                'name' => 'Gloria',
                'email' => 'gloria@apt212.com'
              ]
           
        ])
        ->each(function($agents) {
            Agents::updateOrCreate([
                'name' => $agents['name'],
                'email' => $agents['email']
            ]);
        });
    }
}
