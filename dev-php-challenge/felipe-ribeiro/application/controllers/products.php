<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Products extends CI_Controller 
{

    public function __construct() 
    {
        parent::__construct();
        $this->load->model('Product');
    }

    public function index() 
    {
        $data['page'] = 'products';
        $this->load->view('products', $data);
    }

    public function search() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->getAll()));
        }
    }

    public function get() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->getById($_GET['product_id'])));
        }
    }

    public function create() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->create($_POST)));
        }
    }

    public function update() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->update($_POST)));
        }
    }

    public function delete() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->delete($_POST)));
        }
    }

    public function buyTicket() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Customer->buyTicket($_POST)));
        }
    }

    public function getBuyers() 
    {
        if ($this->input->is_ajax_request()) {
            exit(json_encode($this->Product->getBuyers($_GET)));
        }
    }
}