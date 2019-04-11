<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOnChange extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('olym_user_links', function (Blueprint $table) {
            $table->integer('olympiad_id')->references('id')->on('olympiads')->onDelete('cascade');
            $table->integer('student_id')->references('id')->on('students')->onDelete('cascade');;
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
