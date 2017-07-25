<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Product extends CI_Model {
		
    const TABLE = 'products';

    public function Product() 
    {
        parent::__construct();
    }

    public function getAll() 
    {        	        
        $sql = "
            SELECT 
                product_id,
                sku,
                name,
                description,
                price
            FROM 
                products
            ORDER BY 
                product_id DESC";
        $query = $this->db->query($sql);

        return $query->result();
    }

    public function getById($id) 
    {    	
        $sql = "
            SELECT 
                product_id,
                sku,
                name,
                description,
                price
            FROM 
                products
            WHERE 
                product_id = $id";
        $query = $this->db->query($sql);
        return $query->row();
    }
    
    public function create($product) 
    {
        try {

            if(!$this->form_validation()->run()) {     
                throw new Exception(validation_errors());
            }

            $data = array(
                'name' => $product['name'],
                'sku' => $product['sku'],
                'description' => $product['description'],
                'price' => $product['price']
            ); 

            $this->db->set($data);
            
            $this->db->insert(self::TABLE);

            return array('message' => 'Operação realizada com sucesso');

        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function update($product) 
    {
        try {

            if(!$this->form_validation()->run()) {     
                throw new Exception(validation_errors());
            }

            $data = array(
                'name' => $product['name'],
                'sku' => $product['sku'],
                'description' => $product['description'],
                'price' => $product['price'],
            ); 

            $this->db->set($data);
            $this->db->where('product_id', $product['product_id']);
            $this->db->update(self::TABLE);

            return array('message' => 'Operação realizada com sucesso');

        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function delete($product) 
    {
        try {
            $this->db->where('product_id', $product['product_id']);
            $this->db->delete(self::TABLE);

            // $this->db->where('product_id', $product['product_id']);
            // $this->db->delete('tickets');
            return array('message' => 'Operação realizada com sucesso');
        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function getAllByOrder($order_id) 
    {           
        $sql = "
            SELECT 
                p.product_id,
                p.sku,
                p.name,
                p.description,
                p.price
            FROM 
                products p
            JOIN
                orders_products op ON op.product_id = p.product_id
            AND
                op.order_id = $order_id
            ORDER BY 
                op.order_product_id DESC";

        $query = $this->db->query($sql);

        return $query->result();
    }

    public function form_validation() 
    {
        $this->form_validation->set_rules('name', 'Nome','trim|required|xss_clean');
        $this->form_validation->set_rules('sku','SKU','trim|required|xss_clean');
        $this->form_validation->set_rules('description','Descrição','trim|required|xss_clean');
        $this->form_validation->set_rules('price', 'Preço', 'trim|required|xss_clean');
        return $this->form_validation;
    }
}
