<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';

use Exception;
use ArrayObject;
//session_start();
class Tax extends AppParent{
    private $db="";
    public function __construct() {
        $this->db = new DatabaseFunc();
    }
    

	function addTax(){
        $post = json_decode( $_POST["tax"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "rate" => floatval( $post["rate"]),
            "description" => $post["description"]
        );
        $id =  $this->db->db->insert ('tax', $data);
       
        if(!$id){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $id ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    function getAllTax(){
        
        $this->db->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $tax = $this->db->db->get("tax");
        
        if(!$tax){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $tax ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    function getTaxById(){
        
       
        $this->db->db->where('tax_id',$_POST["tax_id"]);
        $tax = $this->db->db->get("tax");

        if(!$tax){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $tax ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
    function updateTax(){
        $post = json_decode($_POST["tax"],true);
        $data = array (
            "company_id" => $post["company_id"],
            "tax_id" => $post["tax_id"],
            "rate"   => floatval($post["rate"]),
            "description" => $post["description"]
        );
        
        $this->db->db->where ('tax_id', $post["tax_id"]);
        $update =  $this->db->db->update ('tax', $data); 

        if(!$update){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $update ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
    function deleteTax(){
       
        $this->db->db->where('tax_id', intval($_POST["tax_id"]));
        $delete = $this->db->db->delete('tax') ;
        if($delete){
            $response['data']=  $delete ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }else{
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }

    }
}
		
    