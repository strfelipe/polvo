<?php $this->load->view('header');?>
 
<div class="page-header container">
  <h1><small>Pedidos</small></h1>
</div>

<div class="container">
 
    <div class="panel panel-default">
        <div class="panel-heading"> 
            <button id="createAction" class="btn btn-success">
                <i class="fa fa-plus"></i> Criar Pedido
            </button>
        </div>
            
        </br>

        <div class="col col-lg-12">

            <div class="panel panel-default">

                <table id="ordersDatatable" class="display table-responsive table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Total</th>
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
<?php $this->load->view('_order_modal');?>
<?php $this->load->view('footer');?>

<script type="text/javascript">
jQuery(function(){
    orders = new Orders();
    orders.setDataTable();
});
</script>