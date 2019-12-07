<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentSubwayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartment_subway', function (Blueprint $table) {
            $table->bigInteger('apartment_id')->unsigned()->index();
            $table->bigInteger('subway_id')->unsigned()->index();
            $table->unique(['apartment_id', 'subway_id']);
        });

        Schema::table('apartment_subway', function($table) {
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
            $table->foreign('subway_id')->references('id')->on('subways')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartment_subway');
    }
}
