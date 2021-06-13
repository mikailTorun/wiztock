<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';


use Exception;
use ArrayObject;
//session_start();
class Category extends BaseClass{
   
    public function __construct() {
        parent::__construct();
    }
    

	function addCategory(){
        $post = json_decode( $_POST["category"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $id =  $this->db->insert ('product_category', $data);
        
        if(!$id){
            $this->response( "" , false, $this->db->getLastError()  );
        }else{
            $this->response( $id, true  );
        }
	}
    function getAllCategories(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $category = $this->db->get("product_category");

        if(!$category){
            $this->response( "" , false, $this->db->getLastError()  );
        }else{
            $this->response( $category, true  );
        }
	}
    function getCategoryById(){
        
        
        $this->db->where('product_category_id',$_POST["product_category_id"]);
        $category = $this->db->get("product_category");

        if(!$category){
            $this->response( "" , false, $this->db->getLastError()  );
        }else{
            $this->response( $category , true  );
        }
    }
    function updateCategory(){
        $post = json_decode($_POST["category"],true);
        $data = array (
            "company_id" => $post["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        $this->db->where ('product_category_id', $post["product_category_id"]);
        $update =  $this->db->update ('product_category', $data); 
        if(!$update){
            $this->response( "" , false, $this->db->getLastError()  );
        }else{
            $this->response( $update , true  );
        }
    }
    function deleteCategory(){
        
        $this->db->where('product_category_id', intval($_POST["product_category_id"]));
        $delete = $this->db->delete('product_category') ;
        if($delete){
            $this->response( $delete ,true  );
        }else{
            $this->response( "" , false, $this->db->getLastError()  );
        }

    }
}
		
    