<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';


use Exception;
use ArrayObject;
//session_start();
class Warehouse extends BaseClass{
   
    public function __construct() {
        parent::__construct();
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
        
        $id =  $this->db->insert ('warehouse', $data);
       
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $id ,true  );
        }
	}
    function getAllWarehouse(){
        
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $warehouse = $this->db->get("warehouse");
        
        if(!$warehouse){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
           
            return $this->response( $warehouse ,true  );
        }
	}
    function getWarehouseById(){
        $this->db->where('warehouse_id',$_POST["uom_id"]);
        $warehouse = $this->db->get("warehouse");
        if(!$warehouse){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $warehouse , true  );
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
        
        $this->db->where ('warehouse_id', $post["warehouse_id"]);
        $update =  $this->db->update ('warehouse', $data); 

        if(!$update){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $update ,true  );
        }
    }
    function deleteWarehouse(){
       
        $this->db->where('warehouse_id', intval($_POST["warehouse_id"]));
        $delete = $this->db->delete('warehouse') ;
        if($delete){
            return $this->response( $delete , true  );
        }else{
            return $this->response( "" , false, $this->db->getLastError()  );
        }

    }
}
		
    