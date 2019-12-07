<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentMapMarkersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartment_map_marker', function (Blueprint $table) {
            $table->bigInteger('apartment_id')->unsigned()->index();
            $table->bigInteger('map_marker_id')->unsigned()->index();
            $table->unique(['apartment_id', 'map_marker_id']);
        });

        Schema::table('apartment_map_marker', function($table) {
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
            $table->foreign('map_marker_id')->references('id')->on('map_markers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartment_map_marker');
    }
}
