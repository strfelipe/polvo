<?php $this->load->view('header');?>
 
<div class="page-header container">
  <h1><small>Produtos</small></h1>
</div>

<div class="container">
 
    <div class="panel panel-default">
        <div class="panel-heading"> 
            <button id="createAction" class="btn btn-success">
                <i class="fa fa-plus"></i> Criar Produto
            </button>
        </div>
            
        </br>

        <div class="col col-lg-12">

            <div class="panel panel-default">

                <table id="productsDatatable" class="display table-responsive table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SKU</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    <thead>
                </table>
            </div>  
        </div>  
    </div>
</div><!-- /.container -->

<?php $this->load->view('_alert_modal');?>
<?php $this->load->view('_confirm_modal');?>
<?php $this->load->view('_product_modal');?>
<?php $this->load->view('footer');?>

<script type="text/javascript">
jQuery(function(){
    products = new Products();
    products.setDataTable();
});
</script>