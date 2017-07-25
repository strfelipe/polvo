var Events = function()
{
    var self = this;
    self.helper = new Helper();
    self.event_id;
    self.init();
};

Events.prototype.init = function()
{
    var self = this;

    jQuery('.numeric').keydown(function(event) {
        return self.helper.onlyNumber(event);
    });
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    jQuery('#event_date').datetimepicker({
		minDate: tomorrow,
		dateFormat: 'dd/mm/yy',
        timeFormat: 'HH:mm'
	});

    jQuery('.datetime').datetimepicker({
        dateFormat: 'dd/mm/yy',
        timeFormat: 'HH:mm'
    });

    self.bindHideModals();
    self.bindSearchButton();
    self.bindClearButton();
    self.bindAddButton();
    self.bindEventModalCreateButton();
    self.bindEventModalUpdateButton();
    self.bindEventModalDeleteButton();
    self.bindUpdateButton();
    self.bindDeleteButton();
    self.bindConfirmModalYesButton();
    self.bindBuyTicketButton();
    self.bindBuyTicketModalConfirmButton();
    self.bindBuyersButton();
};

Events.prototype.setDataTable = function(getParams)
{
    var self = this;

    EventsWebServices.getByParams(getParams, function(response) {

        var dataSet = [];

        if (response) {

            jQuery.each(response, function(key, value) {

                var actions = '<button class="updateButton btn btn-default" data-event_id="' + value.event_id + '" title="Editar">';
                actions += '<i class="fa fa-pencil"></i>';
                actions += '</button>&nbsp';
                
                actions += '<button class="deleteButton btn btn-danger" data-event_id="' + value.event_id + '" title="Excluir">';
                actions += '<i class="fa fa-times"></i>';
                actions += '</button>&nbsp';

                actions += '<button class="buyersButton btn btn-success" data-event_id="' + value.event_id + '" title="Compradores">';
                actions += '<i class="fa fa-dollar"></i>';
                actions += '</button>';

                dataSet.push([
                    parseInt(value.event_id), 
                    value.event_name,
                    value.event_organizer_name,
                    value.event_date_ptbr,
                    value.event_description,
                    value.event_type,
                    value.event_max_capacity,
                    value.purchased_tickets,
                    value.event_max_capacity - value.purchased_tickets,
                    value.event_published,
                    value.event_status,
                    actions
                ]);
            });
        }

        jQuery('#eventsDatatable').DataTable({
            sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
            sPaginationType: "full_numbers",
            columns: [
			    {"width": "05%"},
			    {"width": "10%"},
			    {"width": "10%"},
			    {"width": "11%"},
			    {"width": "10%"},
			    {"width": "05%"},
			    {"width": "10%"},
			    {"width": "10%"},
                {"width": "05%"},
                {"width": "05%"},
			    {"width": "05%"},
			    {"width": "12%"},
			],
            data: dataSet,
            iDisplayLength: 10,
            bLengthChange: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'Todos']],
            autoWidth: false,
            aaSorting: [],
            destroy: true,
            language: {
                url: "assets/js/datatables/pt-br.json"
            },
            initComplete: function () {
                waitingDialog.hide();
            }
        });
    });
};

Events.prototype.bindSearchButton = function()
{
    var self = this;

    jQuery(document).on('click', '#searchButton', function(event) {
        event.preventDefault();
        
        var getParams = {
            event_id: jQuery('#event_id').val(),
            event_name: jQuery('#event_name').val(),
            event_organizer_name: jQuery('#event_organizer_name').val(),
            event_date_ini: jQuery('#event_date_ini').val(),
            event_date_fim: jQuery('#event_date_fim').val(),
            event_description: jQuery('#event_description').val(),
            event_max_capacity: jQuery('#event_max_capacity').val(),
            event_published: jQuery('#event_published').val(),
            event_type: jQuery('#event_type').val(),
            event_status: jQuery('#event_status').val(),
        };

        self.setDataTable(getParams);
    });
};

Events.prototype.bindClearButton = function()
{
    var self = this;

    jQuery(document).on('click', '#clearButton', function(event) {
        event.preventDefault();
        
        jQuery('#event_id').val(''),
        jQuery('#event_name').val('');
        jQuery('#event_organizer_name').val('');
        jQuery('#event_date_ini').val('');
        jQuery('#event_date_fim').val('');
        jQuery('#event_description').val('');
        jQuery('#event_max_capacity').val('');
        jQuery('#event_published').val('');
        jQuery('#event_type').val('');
        jQuery('#event_status').val('');
    });
};

Events.prototype.bindAddButton = function()
{
    var self = this;

    jQuery(document).on('click', '#addButton', function(event) {
        event.preventDefault();
        jQuery("#eventModal .modal-title").html('Adicionar Evento');
        jQuery('#eventModal #event_published').val(0);
        jQuery('#eventModal #event_type').val(1);
        jQuery('#eventModal #event_status').val(1);
        jQuery("#eventModal #createButton").show();
        jQuery("#eventModal #updateButton").hide();
        jQuery("#eventModal").modal('show');
    });
};

Events.prototype.bindEventModalCreateButton = function()
{
    var self = this;

    jQuery(document).on('click', '#createButton', function(event) {

        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
        	event_name: jQuery('#eventModal #event_name').val(),
        	event_organizer_name: jQuery('#eventModal #event_organizer_name').val(),
        	event_date: jQuery('#eventModal #event_date').val(),
        	event_description: jQuery('#eventModal #event_description').val(),
        	event_max_capacity: jQuery('#eventModal #event_max_capacity').val(),
        	event_published: jQuery('#eventModal #event_published').val(),
        	event_type: jQuery('#eventModal #event_type').val(),
        	event_status: jQuery('#eventModal #event_status').val(),
        };

        EventsWebServices.create(postParams, function(response) {

            var modalHeader = 'Adicionar Evento';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.clearEventModalFields();
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        jQuery('#eventModal').modal('hide');
    });
};

Events.prototype.bindUpdateButton = function()
{
    var self = this;

    jQuery(document).on('click', '.updateButton', function(event) {

        event.preventDefault();

        var getParams = {
        	event_id: jQuery(this).data('event_id')
        };

        EventsWebServices.getById(getParams, function(response) {
            jQuery("#eventModal .modal-title").html('Editar Evento');
            jQuery('#eventModal #event_id').val(response.event_id);
            jQuery('#eventModal #event_name').val(response.event_name);
            jQuery('#eventModal #event_organizer_name').val(response.event_organizer_name);
            jQuery('#eventModal #event_description').val(response.event_description);
            jQuery('#eventModal #event_date').val(response.event_date);
            jQuery('#eventModal #event_max_capacity').val(response.event_max_capacity);
            jQuery('#eventModal #event_published').val(response.event_published);
            jQuery('#eventModal #event_type').val(response.event_type);
            jQuery('#eventModal #event_status').val(response.event_status);
            jQuery("#eventModal #createButton").hide();
            jQuery("#eventModal #updateButton").show();
            jQuery("#eventModal").modal('show');
        });
    });
};

Events.prototype.bindEventModalUpdateButton = function()
{
    var self = this;

    jQuery(document).on('click', '#updateButton', function(event) {

        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
        	event_id: jQuery('#eventModal #event_id').val(),
        	event_name: jQuery('#eventModal #event_name').val(),
        	event_organizer_name: jQuery('#eventModal #event_organizer_name').val(),
        	event_date: jQuery('#eventModal #event_date').val(),
        	event_description: jQuery('#eventModal #event_description').val(),
        	event_max_capacity: jQuery('#eventModal #event_max_capacity').val(),
        	event_published: jQuery('#eventModal #event_published').val(),
        	event_type: jQuery('#eventModal #event_type').val(),
        	event_status: jQuery('#eventModal #event_status').val(),
        };

        EventsWebServices.update(postParams, function(response) {

            var modalHeader = 'Editar Evento';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        self.clearEventModalFields();

        jQuery('#eventModal').modal('hide');
    });
};

Events.prototype.bindDeleteButton = function() 
{
    var self = this;

    jQuery(document).on('click', '.deleteButton', function(event) {
        
        event.preventDefault();

        var modalHeader = 'Excluir Evento';

        self.event_id = jQuery(this).data('event_id');
        
        self.helper.showConfirmModal('Você realmente deseja excluir o evento #' + self.event_id + '?', 'Atenção', 'alert-warning', modalHeader);
    });
}

Events.prototype.bindConfirmModalYesButton = function() {
    
    var self = this;
    
    jQuery(document).on('click', '#confirmModalYesButton', function(event) {
        
        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
            event_id: self.event_id
        };

        EventsWebServices.delete(postParams, function(response) {
            
            var modalHeader = 'Excluir Evento';

            jQuery('#confirmModal').modal('hide');
            
            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });
    });
}

Events.prototype.bindEventModalDeleteButton = function()
{
    var self = this;

    jQuery(document).on('click', '#cancelButton', function(event) {
        self.clearEventModalFields();
    });
};

Events.prototype.bindHideModals = function()
{
    jQuery(document).on('hide.bs.modal', '#alertModal', function(event) {
        jQuery('.modal-backdrop').remove();
    });
};

Events.prototype.clearEventModalFields = function()
{
    jQuery('#eventModal #event_name').val('');
    jQuery('#eventModal #event_organizer_name').val('');
    jQuery('#eventModal #event_date').val('');
    jQuery('#eventModal #event_description').val('');
    jQuery('#eventModal #event_max_capacity').val('');
    jQuery('#eventModal #event_published').val('');
    jQuery('#eventModal #event_type').val('');
    jQuery('#eventModal #event_status').val('');
};

Events.prototype.bindBuyTicketButton = function()
{
    var self = this;

    jQuery(document).on('click', '.buyTicketButton', function(event) {

        event.preventDefault();

        var getParams = {
            event_id: jQuery(this).data('event_id')
        };

        EventsWebServices.getById(getParams, function(response) {
            jQuery("#buyTicketModal .modal-title").html('Comprar Ingresso');
            jQuery('#buyTicketModal #event_id').val(response.event_id);
            jQuery('#buyTicketModal #event_name').val(response.event_name);
            jQuery('#buyTicketModal #event_organizer_name').val(response.event_organizer_name);
            jQuery('#buyTicketModal #event_description').val(response.event_description);
            jQuery('#buyTicketModal #event_date').val(response.event_date);
            jQuery('#buyTicketModal #event_max_capacity').val(response.event_max_capacity);
            jQuery('#buyTicketModal #event_published').val(response.event_published);
            jQuery('#buyTicketModal #event_type').val(response.event_type);
            jQuery('#buyTicketModal #event_status').val(response.event_status);
            jQuery("#buyTicketModal").modal('show');
        });
    });
};

Events.prototype.bindBuyTicketModalConfirmButton = function()
{
    var self = this;

    jQuery(document).on('click', '#confirmButton', function(event) {

        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
            event_id: jQuery('#buyTicketModal #event_id').val(),
            customer_name: jQuery('#buyTicketModal #customer_name').val(),
            customer_document: jQuery('#buyTicketModal #customer_document').val()
        };

        EventsWebServices.buyTicket(postParams, function(response) {

            var modalHeader = 'Comprar Ingresso';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        self.clearBuyTicketModalFields();

        jQuery('#buyTicketModal').modal('hide');
    });
};

Events.prototype.clearBuyTicketModalFields = function()
{
    jQuery('#buyTicketModal #customer_name').val('');
    jQuery('#buyTicketModal #customer_document').val('');
};

Events.prototype.bindBuyersButton = function()
{
    var self = this;

    jQuery(document).on('click', '.buyersButton', function(event) {

        event.preventDefault();

        var getParams = {
            event_id: jQuery(this).data('event_id')
        };

        EventsWebServices.getById(getParams, function(response) {
            jQuery("#buyersModal .modal-title").html('Compradores');
            jQuery('#buyersModal #event_id').val(response.event_id);
            jQuery('#buyersModal #event_name').val(response.event_name);
            jQuery("#buyersModal").modal('show');
            self.setBuyersDataTable(getParams);
        });
    });
};

Events.prototype.setBuyersDataTable = function(getParams)
{
    var self = this;

    EventsWebServices.getEventBuyersById(getParams, function(response) {

        var dataSet = [];

        if (response) {

            jQuery.each(response, function(key, value) {

                dataSet.push([
                    parseInt(value.ticket_id), 
                    value.customer_name,
                    parseInt(value.customer_document) 
                ]);
            });
        }

        jQuery('#buyersDatatable').DataTable({
            sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
            sPaginationType: "full_numbers",
            columns: [
                {"width": "20%"},
                {"width": "40%"},
                {"width": "40%"},
            ],
            data: dataSet,
            iDisplayLength: 5,
            bLengthChange: true,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Todos']],
            autoWidth: false,
            aaSorting: [],
            destroy: true,
            language: {
                url: "assets/js/datatables/pt-br.json"
            }
        });
    });
};