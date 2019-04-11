<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOlymUserLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('olym_user_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_olympiad')->references('id')->on('olympiads')->onDelete('cascade');
            $table->integer('id_user')->references('id')->on('students')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('olym_user_links');
    }
}
