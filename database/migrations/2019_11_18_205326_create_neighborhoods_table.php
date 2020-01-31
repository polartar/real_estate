<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeighborhoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('neighborhoods', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->bigInteger('region_id');
            $table->integer('is_featured');
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->longText('experience')->nullable();
            $table->longText('eat')->nullable();
            $table->longText('drink')->nullable();
            $table->longText('shop')->nullable();
            $table->longText('play')->nullable();
            $table->longText('explore')->nullable();
            $table->longText('life')->nullable();
            $table->longText('tags')->nullable();
            $table->json('perimeter_coordinates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('neighborhoods');
    }
}
