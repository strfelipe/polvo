<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Order extends CI_Model {
		
    const TABLE = 'orders';

    public function Order() 
    {
        parent::__construct();
        $this->load->model('Product');
    }

    public function getAll() 
    {        	        
        $sql = "
            SELECT 
                order_id,
                create_date,
                DATE_FORMAT(create_date,'%d/%m/%Y %H:%i') as create_date_ptbr,
                total
            FROM 
                orders
            ORDER BY 
                order_id DESC";

        $query = $this->db->query($sql);

        $orders = $query->result();
        
        foreach($orders as &$order) {
            $order->products = $this->Product->getAllByOrder($order->order_id);
        }       

        return $orders;
    }

    public function getById($id) 
    {    	
        $sql = "
            SELECT 
                order_id,
                create_date,
                DATE_FORMAT(create_date,'%d/%m/%Y %H:%i') as create_date_ptbr,
                total
            FROM 
                orders
            WHERE 
                order_id = $id";
        
        $query = $this->db->query($sql);

        $order = $query->row();

        $order->products = $this->Product->getAllByOrder($order->order_id);

        return $order;
    }
    
    public function create($products) 
    {
        try {
            $total = 0;

            foreach ($products['products'] as $product_id) {
                $product = $this->Product->getById($product_id);
                $total += $product->price;
            }

            $data = array('total' => $total); 

            $this->db->set($data);
            
            $this->db->insert(self::TABLE);

            $order_id = $this->db->insert_id();

            foreach ($products['products'] as $product_id) {
                $this->createOrderProducts($order_id, $product_id);
            }

            return array('message' => 'Operação realizada com sucesso');

        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function createOrderProducts($order_id, $product_id) 
    {
        try {
            $data = array(
                'order_id' => $order_id,
                'product_id' => $product_id,
            ); 

            $this->db->set($data);

            $sql = "INSERT INTO orders_products(order_id, product_id) VALUES($order_id, $product_id)";
            
            $this->db->query($sql);

            return array('message' => 'Operação realizada com sucesso');

        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function delete($order) 
    {
        try {
            $this->db->where('order_id', $order['order_id']);
            $this->db->delete(self::TABLE);
            $this->deleteOrderProducts($order['order_id']);
            return array('message' => 'Operação realizada com sucesso');
        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }

    public function deleteOrderProducts($order_id) 
    {
        try {
            $sql = "DELETE FROM orders_products WHERE order_id = $order_id";
            $this->db->query($sql);
        } catch (Exception $e) {
            return array(
                'error' => 1,
                'message' => $e->getMessage()
            );
        }
    }
}
