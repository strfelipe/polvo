<div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
            <input type="text" class="form-control" id="product_id" name="product_id" readonly>
          </div>
          
          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>SKU</label> 
            <input type="text" class="form-control" id="sku" name="sku">
          </div>

          <div class="col col-lg-6">
            <label>Nome</label> 
            <input type="text" class="form-control" id="name" name="name">
          </div>

          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Descrição</label> 
            <input type="text" class="form-control" id="description" name="description">
          </div>

          <div class="col col-lg-6">
            <label>Preço</label> 
            <input type="text" class="form-control" id="price" name="price">
          </div>

        </div>

      </div>
      <div class="modal-footer">
        <button id="createButton" type="button" class="btn btn-success">Confirmar</button>
        <button id="updateButton" type="button" class="btn btn-success">Confirmar</button>
        <button id="cancelButton" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>