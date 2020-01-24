<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->text('owner_name')->nullable();
            $table->text('address')->nullable();
            $table->text('street_address')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('apartment_number')->nullable();
            $table->string('floors')->nullable();
            $table->string('floor')->nullable();
            $table->integer('size')->nullable()->index();
            $table->integer('bedroom_type_id')->nullable()->index();
            $table->integer('building_type_id')->nullable()->index();
            $table->float('bathrooms')->nullable();
            $table->text('cross_streets')->nullable();
            $table->date('available_date')->nullable()->index();
            $table->date('available_until')->nullable()->index();
            $table->float('rate', 10, 2)->nullable()->index();
            $table->float('utility_cable')->default(0);
            $table->float('utility_wifi')->default(0);
            $table->float('utility_electricity')->default(0);
            $table->float('utility_cleaning')->default(0);
            $table->float('move_out_fee')->default(0);
            $table->integer('months_due_on_checkin')->default(0);
            $table->integer('days_due_on_checkin')->default(0);
            $table->integer('duci_advance_payment_days')->default(0);
            $table->json('due_to_reserve');
            $table->json('due_by_checkin');
            $table->float('rating')->nullable()->index();
            $table->double('lat')->nullable()->index();
            $table->double('lng')->nullable()->index();
            $table->string('video_url')->nullable();
            $table->boolean('is_active')->default(false)->index();
            $table->mediumText('title');
            $table->longText('description');
            $table->boolean('faked')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartments');
    }
}
