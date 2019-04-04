<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOlympiadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('olympiads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('hardness');
            $table->time('deadline');
            $table->integer('participants');
        });
    }

    /**
     * Reverse the migrations.users
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('olympiads');
    }
}
