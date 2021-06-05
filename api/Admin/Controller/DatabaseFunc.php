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
class DatabaseFunc extends AppParent{

    public $db;

    public function __construct ()
    {
        parent::__construct();
        
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

    function login(){
        $this->db->where('email',$_POST['username']);
        $this->db->where('password',$_POST['password']);
        $checkAdmin = $this->db->get("employee");
        
        if(count($checkAdmin) ==0 ){
            $response['data']=  "";
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  ="Bu email adresi daha önce sistem kayıt edilmiştir.";
            $response['errCode']  =0;

            return $response;
        } 
        $this->db->where('company_id',$checkAdmin[0]['company_id']);
        $company = $this->db->get("company");
        if (count($company) == 0) {
            $response['data']=  "";
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  ="Company bilgisine ulaşılamadı. Yöneticinize bildiriniz.";
            $response['errCode']  =0;

            return $response;
        }
        $response = Array( "success" => true,"admin" => $checkAdmin, "company" => $company , "forwardLink"=>"http://localhost/wiztock/#!/Dashboard");
        $_SESSION["Admin_Company"] = $response;
        
        return $response;


    }
 
    function test(){

        $this->db->where('email',$_POST['employeeEmail']);
        $checkAdmin = $this->db->get("employee");

        if(count($checkAdmin) !=0 ){
            $response['data']=  "";
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  ="Bu email adresi daha önce sistem kayıt edilmiştir.";
            $response['errCode']  =0;

            return $this->dumpResponse($response);
        } 
        $data = Array (
            "title"=> $_POST['companyTitle']);
    //        $id = $this->db->insert ('financial_advisor', ['name_surname'=>$nameSurname,'user_name'=>$userName,'password'=>$passw]);
            $id = $this->db->insert ('company', $data);
            
            if(!$id){
                $response['data']=  $resData ;
                $response['success']  = true;
                $response['errMsg']   = $this->db->getLastError();
                $response['warnMsg']  =null;
                $response['errCode']  =0;
    
                return $this->dumpResponse(($response));
            }else{
                $data = Array (
                    "company_id"=> $id,
                    "name_surname"   => $_POST['employeeNameSurname'],
                    "email"    => $_POST['employeeEmail'],
                    "password" => $_POST['emplyeePassword'],
                    "is_main_user" => 1
                );
            
                    $empid = $this->db->insert ('employee', $data);
            
                  
            }
             $resData = array('employeeID' =>  $empid, 'companyID' => $id);

            $response['data']=  $resData ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $this->dumpResponse(($response));  
    }   
}

if (isset($_POST['funcTest'])) {
    $ajaxTalep = new DatabaseFunc(); 
    return $ajaxTalep->test();
}
    