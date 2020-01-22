<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImageUploadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_uploads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable()->index();
            $table->bigInteger('user_id')->index();
            $table->bigInteger('container_id')->nullable()->index();
            $table->mediumText('title')->nullable();
            $table->longText('description')->nullable();
            $table->longText('size_original');
            $table->longText('size_small');
            $table->longText('size_medium');
            $table->longText('size_large');
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
        Schema::dropIfExists('image_uploads');
    }
}
