<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';

use Exception;
use ArrayObject;
//session_start();
class Unit extends AppParent{
    private $db="";
    public function __construct() {
        $this->db = new DatabaseFunc();
    }
    

	function addUnit(){
        $post = json_decode( $_POST["unit_of_measurement"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $id =  $this->db->db->insert ('unit_of_measurement', $data);
       
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
    function getAllUnit(){
        
        $this->db->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $unit = $this->db->db->get("unit_of_measurement");
        
        if(!$unit){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $unit ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    function getUnitById(){
        
       
        $this->db->db->where('uom_id',$_POST["uom_id"]);
        $unit = $this->db->db->get("unit_of_measurement");

        if(!$unit){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $unit ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
    function updateUnit(){
        $post = json_decode($_POST["unit_of_measurement"],true);
        $data = array (
            "company_id" => $post["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $this->db->db->where ('uom_id', $post["uom_id"]);
        $update =  $this->db->db->update ('unit_of_measurement', $data); 

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
    function deleteUnit(){
       
        $this->db->db->where('uom_id', intval($_POST["uom_id"]));
        $delete = $this->db->db->delete('unit_of_measurement') ;
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
		
    