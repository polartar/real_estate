<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateReferralsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('referrals', function (Blueprint $table) {
            $table->dropColumn('referrer_name', 'referrer_email', 'referrer_phone' );

            $table->integer('referrer_uid');
            $table->string('referrer_agent')->nullable();
            $table->text('referral_details')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('referrals', function (Blueprint $table) {
            $table->dropColumn('referrer_uid');
            $table->dropColumn('referrer_agent');
            $table->dropColumn('referral_details');

            //
        });
    }
}
