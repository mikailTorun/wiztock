<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';

use Exception;
use ArrayObject;
//session_start();
class Category extends DatabaseFunc{
   
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
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
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
    function getAllCategories(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $category = $this->db->get("product_category");

        if(!$category){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $category ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    function getCategoryById(){
        
        
        $this->db->where('product_category_id',$_POST["product_category_id"]);
        $category = $this->db->get("product_category");

        if(!$category){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $category ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
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
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$this->db->getLastError();
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
    function deleteCategory(){
        
        $this->db->where('product_category_id', intval($_POST["product_category_id"]));
        $delete = $this->db->delete('product_category') ;
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
            $response['warnMsg']  =$this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }

    }
}
		
    