<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';

require_once 'Employee.php';
require_once 'Company.php';
require_once 'Corporate.php';
require_once 'Individual.php';

use Exception;
use ArrayObject;
//session_start();
class Product extends BaseClass{
	
	private $product_id;
	private $company_id;
	private $product_category_id; // cast edilecek
	private $product_name;
	private $uom_id;
	private $code;
	private $barcode;
	private $img_url;
	private $is_inventory_tracking;
	private $inital_stock_amount;
	private $is_notifying;
	private $notification_amount;
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
	function setis_inventory_tracking($is_inventory) { $this->is_inventory_tracking = $is_inventory; }
	function getis_inventory_tracking() { return $this->is_inventory_tracking; }
	function setTracking($tracking) { $this->tracking = $tracking; }
	function getTracking() { return $this->tracking; }
	function setInital_stock_amount($inital_stock_amount) { $this->inital_stock_amount = $inital_stock_amount; }
	function getInital_stock_amount() { return $this->inital_stock_amount; }
	function setIs_notifying($is_notifying) { $this->is_notifying = $is_notifying; }
	function getIs_notifying() { return $this->is_notifying; }
	function setNofitication_amount($notification_amount) { $this->notification_amount = $notification_amount; }
	function getNofitication_amount() { return $this->notification_amount; }
	function setPurchasing_price($purchasing_price) { $this->purchasing_price = $purchasing_price; }
	function getPurchasing_price() { return $this->purchasing_price; }
	function setSelling_price($selling_price) { $this->selling_price = $selling_price; }
	function getSelling_price() { return $this->selling_price; }
	function setTax_id($tax_id) { $this->tax_id = $tax_id; }
	function getTax_id() { return $this->tax_id; }



    public function __construct() {
        parent::__construct();
    }

	function getProductStockInformationById(){


		$query = "SELECT `warehouse`.`name` , `warehouse`.`warehouse_id` , `product_warehouse`.`quantity_in_stock` from `warehouse`, `product_warehouse` 
		WHERE `product`.`company_id`=? and `warehouse`.`warehouse_id` = `product_warehouse`.`warehouse_id` and `product_warehouse`.`product_id` = ? " ;
		$product = $this->db->rawQuery ($query,Array($_SESSION["Admin_Company"]["company"][0]["company_id"], intval($_POST["product_id"])));

        if(!$product){
			$this->response( "" , false, $this->db->getLastError()  );
        }else{
			$this->response( $product , true, ""  );
        }
	}
	function getAllProduct(){
        $query = "SELECT `product`.`product_id`,`product`.`company_id`,`product`.`product_category_id`,`product`.`product_name`,
		`product`.`uom_id`,`product`.`code`,`product`.`barcode`,`product`.`img_url`,`product`.`is_inventory_tracking`,`product`.`initial_stock_amount`,
		`product`.`is_notifying`,`product`.`notification_amount`,`product`.`purchasing_price`,`product`.`selling_price`,`product`.`tax_id`, 
		SUM(`product_warehouse`.`quantity_in_stock`) as product_in_quantity from `product`, `product_warehouse` 
		WHERE `product`.`product_id`=`product_warehouse`.`product_id` and `product`.`company_id`=?
		GROUP BY `product`.`product_id`";

		$product = $this->db->rawQuery ($query,Array($_SESSION["Admin_Company"]["company"][0]["company_id"]));
		
        if(!$product){
			$this->response( "" , false, $this->db->getLastError()  );
        }else{
			$this->response($product , true);
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
		$this->setis_inventory_tracking(intval($data["is_inventory_tracking"]));
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
			"is_inventory_tracking"	=>	$this->getis_inventory_tracking(),
			"initial_stock_amount"	=>	$this->getInital_stock_amount(),
			"is_notifying"			=>	$this->getIs_notifying(),
			"notification_amount"	=>	$this->getNofitication_amount(),
			"purchasing_price"		=>	$this->getPurchasing_price(),
			"selling_price"			=>	$this->getSelling_price(),
			"tax_id"				=>	$this->getTax_id()
        );
		
        $id =  $this->db->insert ('product', $data);
       
        if(!$id){
			$this->response( "" , false, $this->db->getLastError()  );
        }else{
			$this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
			$warehouse = $this->db->get("warehouse",1);

			$data = array (
				"warehouse_id" 		=> $warehouse[0]["warehouse_id"],
				"product_id" 		=> $id,
				"quantity_in_stock" => $this->getInital_stock_amount()
			);
			$warehousePrdct =  $this->db->insert ('product_warehouse', $data);

			if(!$warehousePrdct){
				$this->response( "" , false, $this->db->getLastError()  );
			}else{
			   
				$this->response( $warehousePrdct , true, ""  );
			}
        }
	}

	function getProductById(){
		$this->db->where('product_id',$_POST["product_id"]);
        $product = $this->db->get("product");

        if(!$product){
			$this->response( "" , false, $this->db->getLastError()  );
        }else{
			$this->response( $product , true, ""  );
        }
	} 
	function updateProduct(){
        $post = json_decode($_POST["product"],true);
        $data = array(
			'product_category_id' => intval($post["product_category_id"]),// string (1) "8"
			'product_name' => $post["product_name"],//string (6) "deneme"
			'uom_id' => intval($post["uom_id"]),//integer 5
			'code' => $post["code"],//string (3) "559"
			'barcode' => $post["barcode"],//string (11) "asdsdfsd564"
			'img_url' => "",//string (0) ""
			'is_inventory_tracking' => intval($post["is_inventory_tracking"]),//integer 1
			'initial_stock_amount' => floatval($post["initial_stock_amount"]),//string (3) "666"
			'is_notifying' => intval($post["is_notifying"]),//integer 1
			'notification_amount' => floatval($post["notification_amount"]),//string (3) "555"
			'purchasing_price' => floatval($post["purchasing_price"]),//integer 77
			'selling_price' => floatval($post["selling_price"]),//double 79.4178
			'tax_id' => intval($post["tax_id"])//
		);
        
        $this->db->where ('product_id', $post["product_id"]);
        $update =  $this->db->update ('product', $data); 

        if(!$update){
			$this->response( "" , false, $this->db->getLastError()  );
        }else{

			$this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
			$warehouse = $this->db->get("warehouse",1);

			$data = array (
				"warehouse_id" 		=> $warehouse[0]["warehouse_id"],
				"product_id" 		=> $post["product_id"],
				"quantity_in_stock" => floatval($post["initial_stock_amount"])
			);
			$this->db->where ('product_id', $post["product_id"]);
			$warehousePrdct =  $this->db->update ('product_warehouse', $data);
			
			$this->response( $update , true, ""  );
        }
    }
	function deleteProduct(){
		
        $this->db->where('product_id', intval($_POST["product_id"]));
        $delete = $this->db->delete('product') ;
        if($delete){
			$this->response( $delete , true, ""  );
        }else{
			$this->response( "" , false, $this->db->getLastError()  );
        }
	}
}
		
    