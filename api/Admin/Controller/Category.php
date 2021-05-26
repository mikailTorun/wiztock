<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
require_once 'Company.php';
require_once 'Corporate.php';
require_once 'Individual.php';

use Exception;
use ArrayObject;
//session_start();
class Category extends AppParent{
    private $db="";
    public function __construct() {
        $this->db = new DatabaseFunc();
    }
    

	function addCategory(){
        $post = json_decode( $_POST["category"],true);
        $data = array (
            "company_id" => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "title" => $post["title"],
            "description" => $post["description"]
        );
        

        $id =  $this->db->db->insert ('product_category', $data);
        
        if(!$id){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$db->db->getLastError();
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
		//s( $id,json_decode( $_POST["category"],true));
		//$data = json_decode($_POST["product"],true);
	}
    function getAllCategories(){
        $this->db->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $category = $this->db->db->get("product_category");

        if(!$category){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$db->db->getLastError();
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
}
		
    