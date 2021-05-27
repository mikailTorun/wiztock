<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';

use Exception;
use ArrayObject;
//session_start();
class Warehouse extends AppParent{
    private $db="";
    public function __construct() {
        $this->db = new DatabaseFunc();
    }
    

	function addWarehouse(){
        $post = json_decode( $_POST["warehouse_of_measurement"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "name" => $post["name"],
            "address" => $post["address"],
            "town" => $post["town"],
            "city" => $post["city"],
            "postal_code" => $post["postal_code"]
        );
        
        $id =  $this->db->db->insert ('warehouse', $data);
       
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
    function getAllWarehouse(){
        
        $this->db->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $warehouse = $this->db->db->get("warehouse");
        
        if(!$warehouse){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $warehouse ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    function getWarehouseById(){
        
       
        $this->db->db->where('warehouse_id',$_POST["uom_id"]);
        $warehouse = $this->db->db->get("warehouse");

        if(!$warehouse){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $warehouse ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
    function updateWarehouse(){
        $post = json_decode($_POST["warehouse_of_measurement"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "name" => $post["name"],
            "address" => $post["address"],
            "town" => $post["town"],
            "city" => $post["city"],
            "postal_code" => $post["postal_code"]
        );
        
        $this->db->db->where ('warehouse_id', $post["warehouse_id"]);
        $update =  $this->db->db->update ('warehouse', $data); 

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
    function deleteWarehouse(){
       
        $this->db->db->where('warehouse_id', intval($_POST["warehouse_id"]));
        $delete = $this->db->db->delete('warehouse') ;
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
		
    