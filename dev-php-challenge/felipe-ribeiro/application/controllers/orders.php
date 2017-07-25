<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Orders extends CI_Controller 
{

    public function __construct() 
    {
        parent::__construct();
        $this->load->model('Order');
        $this->load->model('Product');
    }

    public function index() 
    {
        $data['page'] = 'orders';
        $this->load->view('orders', $data);
    }

    public function search() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Order->getAll()));
        }
    }

    public function get() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Order->getById($_GET['order_id'])));
        }
    }

    public function create() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Order->create($_POST)));
        }
    }

    public function update() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Order->update($_POST)));
        }
    }

    public function delete() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Order->delete($_POST)));
        }
    }
}