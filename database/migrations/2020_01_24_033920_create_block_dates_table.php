<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_dates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('apartment_id')->unsigned()->index();
            $table->date('start');
            $table->date('end');
            $table->timestamps();
        });

        Schema::table('block_dates', function($table) {
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
        Schema::dropIfExists('block_dates');
    }
}
