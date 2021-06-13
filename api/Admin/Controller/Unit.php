<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';


use Exception;
use ArrayObject;
//session_start();
class Unit extends BaseClass{
    public function __construct() {
        parent::__construct();
    }
    

	function addUnit(){
        $post = json_decode( $_POST["unit_of_measurement"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $id =  $this->db->insert ('unit_of_measurement', $data);
       
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
           
            return $this->response( $id ,true  );
        }
	}
    function getAllUnit(){
        
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $unit = $this->db->get("unit_of_measurement");
        
        if(!$unit){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $unit ,true  );
        }
	}
    function getUnitById(){
        $this->db->where('uom_id',$_POST["uom_id"]);
        $unit = $this->db->get("unit_of_measurement");

        if(!$unit){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response($unit , true);
        }
    }
    function updateUnit(){
        $post = json_decode($_POST["unit_of_measurement"],true);
        $data = array (
            "company_id" => $post["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $this->db->where ('uom_id', $post["uom_id"]);
        $update =  $this->db->update ('unit_of_measurement', $data); 

        if(!$update){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $update ,true);
        }
    }
    function deleteUnit(){
       
        $this->db->where('uom_id', intval($_POST["uom_id"]));
        $delete = $this->db->delete('unit_of_measurement') ;
        if($delete){
            return $this->response( $delete, true );
        }else{
            return $this->response( "" , false, $this->db->getLastError()  );
        }

    }
}
		
    