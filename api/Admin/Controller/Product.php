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
class Product extends AppParent{
	private $db="";
	private $product_id;
	private $company_id;
	private $product_category_id; // cast edilecek
	private $product_name;
	private $uom_id;
	private $code;
	private $barcode;
	private $img_url;
	private $is_inventroy_tracking;
	private $inital_stock_amount;
	private $is_notifying;
	private $nofitication_amount;
	private $purchasing_price;
	private $selling_price;
	private $tax_id;

	function setProduct_id($product_id) { $this->product_id = $product_id; }
	function getProduct_id() { return $this->product_id; }
	function setCompany_id($company_id) { $this->company_id = $company_id; }
	function getCompany_id() { return $this->company_id; }
	function setProduct_category_id($product_category_id) { $this->product_category_id = $product_category_id; }
	function getProduct_category_id() { return $this->product_category_id; }
	function setProduct_name($product_name) { $this->product_name = $product_name; }
	function getProduct_name() { return $this->product_name; }
	function setUom_id($uom_id) { $this->uom_id = $uom_id; }
	function getUom_id() { return $this->uom_id; }
	function setCode($code) { $this->code = $code; }
	function getCode() { return $this->code; }
	function setBarcode($barcode) { $this->barcode = $barcode; }
	function getBarcode() { return $this->barcode; }
	function setImg_url($img_url) { $this->img_url = $img_url; }
	function getImg_url() { return $this->img_url; }
	function setis_inventroy_tracking($is_inventroy) { $this->is_inventroy_tracking = $is_inventroy; }
	function getis_inventroy_tracking() { return $this->is_inventroy_tracking; }
	function setTracking($tracking) { $this->tracking = $tracking; }
	function getTracking() { return $this->tracking; }
	function setInital_stock_amount($inital_stock_amount) { $this->inital_stock_amount = $inital_stock_amount; }
	function getInital_stock_amount() { return $this->inital_stock_amount; }
	function setIs_notifying($is_notifying) { $this->is_notifying = $is_notifying; }
	function getIs_notifying() { return $this->is_notifying; }
	function setNofitication_amount($nofitication_amount) { $this->nofitication_amount = $nofitication_amount; }
	function getNofitication_amount() { return $this->nofitication_amount; }
	function setPurchasing_price($purchasing_price) { $this->purchasing_price = $purchasing_price; }
	function getPurchasing_price() { return $this->purchasing_price; }
	function setSelling_price($selling_price) { $this->selling_price = $selling_price; }
	function getSelling_price() { return $this->selling_price; }
	function setTax_id($tax_id) { $this->tax_id = $tax_id; }
	function getTax_id() { return $this->tax_id; }



    public function __construct() {
        $this->db = new DatabaseFunc();
    }

	function getAllProduct(){
        $this->db->db->where('company_id', $_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $product = $this->db->db->get("product");
        
        if(!$product){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $product ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
	function addProduct(){
		
		$data = json_decode($_POST["product"],true);
		
		$this->setCompany_id($_SESSION["Admin_Company"]["company"][0]["company_id"]);
		//$this->setProduct_id();
		$this->setProduct_category_id(intval( $data["product_category_id"]));
		$this->setProduct_name($data["product_name"]);
		$this->setUom_id(intval($data["uom_id"]));
		$this->setCode($data["code"]);
		$this->setBarcode($data["barcode"]);
		$this->setImg_url("");
		$this->setis_inventroy_tracking(intval($data["is_inventory_tracking"]));
		$this->setInital_stock_amount(floatval( $data["initial_stock_amount"]));
		$this->setIs_notifying(intval($data["is_notifying"]));
		$this->setNofitication_amount( floatval($data["notification_amount"]));
		$this->setPurchasing_price(floatval($data["purchasing_price"]));
		$this->setSelling_price(floatval($data["selling_price"]));
		$this->setTax_id(intval($data["tax_id"]));

		
		$data = array (
            "company_id"		 	=>  $this->getCompany_id(),
			"product_category_id"	=>  $this->getProduct_category_id(),
			"product_name"			=>  $this->getProduct_name(),	
			"uom_id"				=>  $this->getUom_id(),
			"code"					=>	$this->getCode(),
			"barcode"				=>	$this->getBarcode(),
			"img_url"				=>	$this->getImg_url(),
			"is_inventroy_tracking"	=>	$this->getis_inventroy_tracking(),
			"initial_stock_amount"	=>	$this->getInital_stock_amount(),
			"is_notifying"			=>	$this->getIs_notifying(),
			"nofitication_amount"	=>	$this->getNofitication_amount(),
			"purchasing_price"		=>	$this->getPurchasing_price(),
			"selling_price"			=>	$this->getSelling_price(),
			"tax_id"				=>	$this->getTax_id()
        );
		
        $id =  $this->db->db->insert ('product', $data);
       
        if(!$id){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{


			$this->db->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
			$warehouse = $this->db->db->get("warehouse",1);

			$data = array (
				"warehouse_id" 		=> $warehouse[0]["warehouse_id"],
				"product_id" 		=> $id,
				"quantity_in_stock" => $this->getInital_stock_amount()
			);
			$warehousePrdct =  $this->db->db->insert ('product_warehouse', $data);

			if(!$warehousePrdct){
				$response['data']=  "" ;
				$response['success']  =false;
				$response['errMsg']   =null;
				$response['warnMsg']  = $this->db->db->getLastError();
				$response['errCode']  =0;
	
				return (($response)); 
			}else{
			   
				$response['data']=  $warehousePrdct ;
				$response['success']  =true;
				$response['errMsg']   =null;
				$response['warnMsg']  =null;
				$response['errCode']  =0;
				return (($response)); 
			}


        }
		
		//s($_POST["product"],$data,intval($data["product_category_id"]));die;
	}
}
		
    