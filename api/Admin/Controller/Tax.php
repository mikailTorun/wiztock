<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';


use Exception;
use ArrayObject;
//session_start();
class Tax extends BaseClass{
    //private $db="";
    public function __construct() {
        parent::__construct();
    }
    

	function addTax(){
        $post = json_decode( $_POST["tax"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "rate" => floatval( $post["rate"]),
            "description" => $post["description"]
        );
        $id =  $this->db->insert ('tax', $data);
       
        if(!$id){
            $response['data']=  "" ;
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $id , true);
        }
	}
    function getAllTax(){
        
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $tax = $this->db->get("tax");
        
        if(!$tax){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $tax, true);
        }
	}
    function getTaxById(){
        $this->db->where('tax_id',$_POST["tax_id"]);
        $tax = $this->db->get("tax");
        if(!$tax){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $tax , true);
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
        
        $this->db->where ('tax_id', $post["tax_id"]);
        $update =  $this->db->update ('tax', $data); 

        if(!$update){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{ 
            return $this->response( $update , true );
        }
    }
    function deleteTax(){
        $this->db->where('tax_id', intval($_POST["tax_id"]));
        $delete = $this->db->delete('tax') ;
        if($delete){
            return $this->response( $delete ,true);
        }else{
            return $this->response( "" , false, $this->db->getLastError()  );
        }
    }
}
		
    