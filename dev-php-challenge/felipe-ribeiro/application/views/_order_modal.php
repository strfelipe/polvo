<div id="orderModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="row">
          
          <div class="col col-lg-6">
            <label>ID</label> 
            <input type="text" class="form-control" id="order_id" name="order_id" readonly>
          </div>
          
          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Data</label> 
            <input type="text" class="form-control" id="create_date" name="create_date" readonly>
          </div>

          <div class="col col-lg-12">
            <label>Produtos</label> 
                <table style="cursor:pointer!important" id="orderProductsDatatable" class="display table table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    <thead>
                </table>
          </div>

          <div class="col col-lg-6">
            <label>Total</label> 
            <input type="text" class="form-control" id="total" name="total" readonly>
          </div>

        </div>

      </div>
      <div class="modal-footer">
        <button id="createButton" type="button" class="btn btn-success">Confirmar</button>
        <button id="cancelButton" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>