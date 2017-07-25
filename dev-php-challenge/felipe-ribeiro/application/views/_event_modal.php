<div id="eventModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
            <input type="text" class="form-control" id="event_id" name="event_id" readonly>
          </div>
          
          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Nome</label> 
            <input type="text" class="form-control" id="event_name" name="event_name">
          </div>

          <div class="col col-lg-6">
            <label>Nome Organizador</label> 
            <input type="text" class="form-control" id="event_organizer_name" name="event_organizer_name">
          </div>

          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Data de Realização</label> 
            <input type="text" class="form-control" id="event_date" name="event_date">
          </div>

          <div class="col col-lg-6">
            <label>Descrição</label> 
            <input type="text" class="form-control" id="event_description" name="event_description">
          </div>

          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Capacidade Máxima</label> 
            <input type="text" class="numeric form-control" id="event_max_capacity" name="event_max_capacity">
          </div>

          <div class="col col-lg-6">
            <label>Tipo</label> 
            <select class="form-control" id="event_type" name="event_type">
              <?php foreach($types as $type) : ?>
                <option value="<?php echo $type['id'];?>">
                    <?php echo $type['name'];?>
                </option>
              <?php endforeach; ?>
            </select>
          </div>

          <div class="col col-lg-6" style="margin-bottom:15px;">
            <label>Publicado</label> 
            <select class="form-control" id="event_published" name="event_published">
                <option value="0">Não</option>
                <option value="1">Sim</option>
            </select>
          </div>

          <div class="col col-lg-6">
            <label>Status</label> 
            <select class="form-control" id="event_status" name="event_status">
              <?php foreach($status as $sts) : ?>
                <option value="<?php echo $sts['id'];?>">
                    <?php echo $sts['name'];?>
                </option>
              <?php endforeach; ?>
            </select>
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