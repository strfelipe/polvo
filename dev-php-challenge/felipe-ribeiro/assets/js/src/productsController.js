var Products = function()
{
    var self = this;
    self.helper = new Helper();
    self.product_id;
    self.init();
};

Products.prototype.init = function()
{
    var self = this;

    jQuery('.numeric').keydown(function(event) {
        return self.helper.onlyNumber(event);
    });

    self.bindHideModals();
    self.bindCreateAction();
    self.bindCreateButton();
    self.bindUpdateAction();
    self.bindDeleteAction();
    self.bindUpdateButton();
    self.bindDeleteButton();
    self.bindYesButton();
};

Products.prototype.setDataTable = function(getParams)
{
    var self = this;

    ProductsService.getByParams(getParams, function(response) {

        var dataSet = [];

        if (response) {

            jQuery.each(response, function(key, value) {

                var actions = '<button class="updateAction btn btn-default" data-product_id="' + value.product_id + '" title="Editar">';
                actions += '<i class="fa fa-pencil"></i>';
                actions += '</button>&nbsp';
                
                actions += '<button class="deleteAction btn btn-danger" data-product_id="' + value.product_id + '" title="Excluir">';
                actions += '<i class="fa fa-times"></i>';
                actions += '</button>&nbsp';

                dataSet.push([
                    parseInt(value.product_id), 
                    value.name,
                    value.sku,
                    value.description,
                    value.price,
                    actions
                ]);
            });
        }

        jQuery('#productsDatatable').DataTable({
            sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
            sPaginationType: "full_numbers",
            columns: [
			    {"width": "05%"},
			    {"width": "10%"},
			    {"width": "10%"},
			    {"width": "11%"},
			    {"width": "10%"},
			    {"width": "02%"},
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

Products.prototype.bindCreateAction = function()
{
    var self = this;

    jQuery(document).on('click', '#createAction', function(event) {
        event.preventDefault();
        jQuery("#productModal .modal-title").html('Criar Produto');
        jQuery("#productModal #createButton").show();
        jQuery("#productModal #updateButton").hide();
        jQuery("#productModal").modal('show');
    });
};

Products.prototype.bindCreateButton = function()
{
    var self = this;

    jQuery(document).on('click', '#createButton', function(event) {

        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
            name: jQuery('#productModal #name').val(),
        	sku: jQuery('#productModal #sku').val(),
        	description: jQuery('#productModal #description').val(),
        	price: jQuery('#productModal #price').val(),
        };

        ProductsService.create(postParams, function(response) {

            var modalHeader = 'Criar Produto';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.clearProductModalFields();
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        jQuery('#productModal').modal('hide');
    });
};

Products.prototype.bindUpdateAction = function()
{
    var self = this;

    jQuery(document).on('click', '.updateAction', function(event) {

        event.preventDefault();

        var getParams = {
        	product_id: jQuery(this).data('product_id')
        };

        ProductsService.getById(getParams, function(response) {
            jQuery("#productModal .modal-title").html('Editar Produto');
            jQuery('#productModal #product_id').val(response.product_id);
            jQuery('#productModal #name').val(response.name);
            jQuery('#productModal #sku').val(response.sku);
            jQuery('#productModal #description').val(response.description);
            jQuery('#productModal #price').val(response.price);
            jQuery("#productModal #createButton").hide();
            jQuery("#productModal #updateButton").show();
            jQuery("#productModal").modal('show');
        });
    });
};

Products.prototype.bindUpdateButton = function()
{
    var self = this;

    jQuery(document).on('click', '#updateButton', function(event) {

        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
        	product_id: jQuery('#productModal #product_id').val(),
        	name: jQuery('#productModal #name').val(),
        	sku: jQuery('#productModal #sku').val(),
        	description: jQuery('#productModal #description').val(),
        	price: jQuery('#productModal #price').val(),
        };

        ProductsService.update(postParams, function(response) {

            var modalHeader = 'Editar Produto';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        self.clearProductModalFields();

        jQuery('#productModal').modal('hide');
    });
};

Products.prototype.bindDeleteAction = function() 
{
    var self = this;

    jQuery(document).on('click', '.deleteAction', function(event) {
        
        event.preventDefault();

        var modalHeader = 'Excluir Produto';

        self.product_id = jQuery(this).data('product_id');
        
        self.helper.showConfirmModal('Você realmente deseja excluir o produto #' + self.product_id + '?', 'Atenção', 'alert-warning', modalHeader);
    });
};

Products.prototype.bindYesButton = function() {
    
    var self = this;
    
    jQuery(document).on('click', '#confirmModalYesButton', function(event) {
        
        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
            product_id: self.product_id
        };

        ProductsService.delete(postParams, function(response) {
            
            var modalHeader = 'Excluir Produto';

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
};

Products.prototype.bindDeleteButton = function()
{
    var self = this;

    jQuery(document).on('click', '#cancelButton', function(event) {
        self.clearProductModalFields();
    });
};

Products.prototype.bindHideModals = function()
{
    jQuery(document).on('hide.bs.modal', '#alertModal', function(event) {
        jQuery('.modal-backdrop').remove();
    });
};

Products.prototype.clearProductModalFields = function()
{
    jQuery('#productModal #product_id').val('');
    jQuery('#productModal #name').val('');
    jQuery('#productModal #sku').val('');
    jQuery('#productModal #description').val('');
    jQuery('#productModal #price').val('');
};

// Products.prototype.bindBuyTicketButton = function()
// {
//     var self = this;

//     jQuery(document).on('click', '.buyTicketButton', function(event) {

//         event.preventDefault();

//         var getParams = {
//             product_id: jQuery(this).data('product_id')
//         };

//         ProductsService.getById(getParams, function(response) {
//             jQuery("#buyTicketModal .modal-title").html('Comprar Ingresso');
//             jQuery('#buyTicketModal #product_id').val(response.product_id);
//             jQuery('#buyTicketModal #name').val(response.name);
//             jQuery('#buyTicketModal #event_organizer_name').val(response.event_organizer_name);
//             jQuery('#buyTicketModal #description').val(response.description);
//             jQuery('#buyTicketModal #event_date').val(response.event_date);
//             jQuery('#buyTicketModal #price').val(response.price);
//             jQuery('#buyTicketModal #event_published').val(response.event_published);
//             jQuery('#buyTicketModal #event_type').val(response.event_type);
//             jQuery('#buyTicketModal #event_status').val(response.event_status);
//             jQuery("#buyTicketModal").modal('show');
//         });
//     });
// };

// Products.prototype.bindBuyTicketModalConfirmButton = function()
// {
//     var self = this;

//     jQuery(document).on('click', '#confirmButton', function(event) {

//         event.preventDefault();

//         waitingDialog.show('Processando');

//         var postParams = {
//             product_id: jQuery('#buyTicketModal #product_id').val(),
//             customer_name: jQuery('#buyTicketModal #customer_name').val(),
//             customer_document: jQuery('#buyTicketModal #customer_document').val()
//         };

//         ProductsService.buyTicket(postParams, function(response) {

//             var modalHeader = 'Comprar Ingresso';

//             waitingDialog.hide();

//             if (response.error) {
//                 self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
//             } else {
//                 self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
//             }
//         });

//         self.clearBuyTicketModalFields();

//         jQuery('#buyTicketModal').modal('hide');
//     });
// };

// Products.prototype.clearBuyTicketModalFields = function()
// {
//     jQuery('#buyTicketModal #customer_name').val('');
//     jQuery('#buyTicketModal #customer_document').val('');
// };

// Products.prototype.bindBuyersButton = function()
// {
//     var self = this;

//     jQuery(document).on('click', '.buyersButton', function(event) {

//         event.preventDefault();

//         var getParams = {
//             product_id: jQuery(this).data('product_id')
//         };

//         ProductsService.getById(getParams, function(response) {
//             jQuery("#buyersModal .modal-title").html('Compradores');
//             jQuery('#buyersModal #product_id').val(response.product_id);
//             jQuery('#buyersModal #name').val(response.name);
//             jQuery("#buyersModal").modal('show');
//             self.setBuyersDataTable(getParams);
//         });
//     });
// };

// Products.prototype.setBuyersDataTable = function(getParams)
// {
//     var self = this;

//     ProductsService.getProductBuyersById(getParams, function(response) {

//         var dataSet = [];

//         if (response) {

//             jQuery.each(response, function(key, value) {

//                 dataSet.push([
//                     parseInt(value.ticket_id), 
//                     value.customer_name,
//                     parseInt(value.customer_document) 
//                 ]);
//             });
//         }

//         jQuery('#buyersDatatable').DataTable({
//             sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
//             sPaginationType: "full_numbers",
//             columns: [
//                 {"width": "20%"},
//                 {"width": "40%"},
//                 {"width": "40%"},
//             ],
//             data: dataSet,
//             iDisplayLength: 5,
//             bLengthChange: true,
//             lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Todos']],
//             autoWidth: false,
//             aaSorting: [],
//             destroy: true,
//             language: {
//                 url: "assets/js/datatables/pt-br.json"
//             }
//         });
//     });
// };