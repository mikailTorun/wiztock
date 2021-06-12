<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'AppParent.php';
//use Exception;
//use ArrayObject;
//session_start();
use Exception;
use ArrayObject;
session_start();
class DatabaseFunc{

    public $db;

    public function __construct ()
    {
        //parent::__construct();
        
        $servername = "localhost";
        $database   = "wiztock";
        $username   = "root";
        $password   = "GIV5od6EN7LYQeLF";  //GIV5od6EN7LYQeLF     
        $mysqli = new \mysqli ($servername, $username, $password, $database);
        
        $this->db = new \MysqliDb (Array (
                'host' => $servername,
                'username' => $username, 
                'password' => $password,
                'db'=> $database,
//                'port' => 3306,
//                'prefix' => 'my_',
                'charset' => 'utf8'));   
    }
    public function response ($data = "" , $success= false , $errorMsg =null ){

        $response['data']       =  $data ;
        $response['success']    =  $success;
        $response['errMsg']     =  $errorMsg;
        
        $this->dumpResponse( $response);
    }
    private function dumpResponse ($response) {
        ob_clean();
        echo json_encode($response);
        return true;
    }

}