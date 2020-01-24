<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonthlyRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monthly_rates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('apartment_id')->unsigned()->index();
            $table->string('month')->index();
            $table->float('monthly_rate')->index();
            $table->float('tax_percent')->nullable();
            $table->float('background_check_rate')->nullable();
            $table->float('service_fee_host');
            $table->float('service_fee_client');
            $table->float('security_deposit_percent');
            $table->timestamps();
            $table->unique(['apartment_id', 'month']);
        });

        Schema::table('monthly_rates', function($table) {
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monthly_rates');
    }
}
