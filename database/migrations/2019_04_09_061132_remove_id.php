<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('olym_user_links', function (Blueprint $table) {
                $table->dropColumn('id_olympiad');
                $table->dropColumn('id_user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('olym_user_links', function (Blueprint $table) {
            $table->integer('id_olympiad');
            $table->integer('id_user');
        });
    }
}
