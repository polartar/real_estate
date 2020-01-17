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
            $table->float('tax_rate')->nullable();
            $table->float('application_charge')->nullable();
            $table->float('service_charge')->nullable();
            $table->float('security_deposit')->nullable();
            $table->integer('min_days_count')->nullable();
            $table->integer('duci_days_count')->nullable();
            $table->integer('months_due')->nullable();
            $table->float('rating')->nullable()->index();
            $table->double('lat')->nullable()->index();
            $table->double('lng')->nullable()->index();
            $table->string('video_url')->nullable();
            $table->json('images')->nullable();
            $table->json('floor_plans')->nullable();
            $table->text('advance_charges')->nullable();
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
