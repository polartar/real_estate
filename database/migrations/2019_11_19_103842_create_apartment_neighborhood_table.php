<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentNeighborhoodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartment_neighborhood', function (Blueprint $table) {
            $table->bigInteger('apartment_id')->unsigned();
            $table->bigInteger('neighborhood_id')->unsigned();
            $table->unique(['apartment_id', 'neighborhood_id']);
        });

        Schema::table('apartment_neighborhood', function($table) {
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
            $table->foreign('neighborhood_id')->references('id')->on('neighborhoods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartment_neighborhood');
    }
}
