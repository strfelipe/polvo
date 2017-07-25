var Orders = function()
{
    var self = this;
    self.helper = new Helper();
    self.order_id;
    self.init();
};

Orders.prototype.init = function()
{
    var self = this;

    self.bindHideModals();
    self.bindCreateAction();
    self.bindCreateButton();
    self.bindViewAction();
    self.bindDeleteAction();
    self.bindDeleteButton();
    self.bindYesButton();
    self.bindOrderProductsDatatableClick();
};

Orders.prototype.setDataTable = function(getParams)
{
    var self = this;

    OrdersService.getByParams(getParams, function(response) {

        var dataSet = [];

        if (response) {

            jQuery.each(response, function(key, value) {

                var actions = '<button class="viewAction btn btn-default" data-order_id="' + value.order_id + '" title="Visualizar">';
                actions += '<i class="fa fa-eye"></i>';
                actions += '</button>&nbsp';
                
                actions += '<button class="deleteAction btn btn-danger" data-order_id="' + value.order_id + '" title="Excluir">';
                actions += '<i class="fa fa-times"></i>';
                actions += '</button>&nbsp';

                dataSet.push([
                    parseInt(value.order_id), 
                    value.create_date_ptbr,
                    value.total,
                    actions
                ]);
            });
        }

        jQuery('#ordersDatatable').DataTable({
            sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
            sPaginationType: "full_numbers",
            columns: [
			    {"width": "05%"},
			    {"width": "10%"},
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

Orders.prototype.bindCreateAction = function()
{
    var self = this;

    jQuery(document).on('click', '#createAction', function(event) {
        event.preventDefault();
        self.setOrderProductsDatatable(null);
        jQuery("#orderModal .modal-title").html('Criar Pedido');
        jQuery("#orderModal #createButton").show();
        jQuery("#orderModal #viewButton").hide();
        jQuery("#orderModal").modal('show');
    });
};

Orders.prototype.bindCreateButton = function()
{
    var self = this;

    jQuery(document).on('click', '#createButton', function(event) {

        event.preventDefault();

        var table = jQuery('#orderProductsDatatable').DataTable();
    
        var products = $.map(table.rows('.selected').data(), function (item) {
            return item[0];
        });

        console.log(products);

        waitingDialog.show('Processando');

        var postParams = {
        	products: products
        };

        OrdersService.create(postParams, function(response) {

            var modalHeader = 'Criar Pedido';

            waitingDialog.hide();

            if (response.error) {
                self.helper.showAlertModal(response.message, 'Erro', 'alert-danger', modalHeader);
            } else {
                self.clearOrderModalFields();
                self.setDataTable();
                self.helper.showAlertModal(response.message, 'Sucesso', 'alert-success', modalHeader);
            }
        });

        jQuery('#orderModal').modal('hide');
    });
};

Orders.prototype.bindViewAction = function()
{
    var self = this;

    jQuery(document).on('click', '.viewAction', function(event) {

        event.preventDefault();

        var getParams = {
        	order_id: jQuery(this).data('order_id')
        };

        OrdersService.getById(getParams, function(response) {
            jQuery("#orderModal .modal-title").html('Visualizar Pedido');
            self.setOrderProductsDatatable(response);
            jQuery('#orderModal #order_id').val(response.order_id);
            jQuery('#orderModal #create_date').val(response.create_date_ptbr);
            jQuery('#orderModal #total').val(response.total);
            jQuery("#orderModal #createButton").hide();
            jQuery("#orderModal").modal('show');
        });
    });
};

Orders.prototype.bindDeleteAction = function() 
{
    var self = this;

    jQuery(document).on('click', '.deleteAction', function(event) {
        
        event.preventDefault();

        var modalHeader = 'Excluir Pedido';

        self.order_id = jQuery(this).data('order_id');
        
        self.helper.showConfirmModal('Você realmente deseja excluir o pedido #' + self.order_id + '?', 'Atenção', 'alert-warning', modalHeader);
    });
};

Orders.prototype.bindYesButton = function() {
    
    var self = this;
    
    jQuery(document).on('click', '#confirmModalYesButton', function(event) {
        
        event.preventDefault();

        waitingDialog.show('Processando');

        var postParams = {
            order_id: self.order_id
        };

        OrdersService.delete(postParams, function(response) {
            
            var modalHeader = 'Excluir Pedido';

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

Orders.prototype.bindDeleteButton = function()
{
    var self = this;

    jQuery(document).on('click', '#cancelButton', function(event) {
        self.clearOrderModalFields();
    });
};

Orders.prototype.bindHideModals = function()
{
    jQuery(document).on('hide.bs.modal', '#alertModal', function(event) {
        jQuery('.modal-backdrop').remove();
    });
};

Orders.prototype.clearOrderModalFields = function()
{
    $('#orderProductsDatatable > tbody  > tr').each(function() {
        jQuery(this).removeClass('selected');
    });

    jQuery('#orderModal #order_id').val('');
    jQuery('#orderModal #create_date').val('');
    jQuery('#orderModal #total').val('');
    jQuery('#orderModal #price').val('');
};

Orders.prototype.setOrderProductsDatatable = function(order)
{
    var self = this;

    ProductsService.getByParams(null, function(response) {

        var dataSet = [];

        if (order) {
            response = order['products'];
        }

        if (response) {

            jQuery.each(response, function(key, value) {

                dataSet.push([
                    parseInt(value.product_id),
                    value.name,
                    value.price 
                ]);
            });
        }

        jQuery('#orderProductsDatatable').DataTable({
            sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
            sPaginationType: "full_numbers",
            columns: [
                {"visible": false},
                {"width": "80%"},
                {"width": "20%"},
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
            },
            select: {
                style: 'multi'
            }
        });
    });
};

Orders.prototype.bindOrderProductsDatatableClick = function() 
{
    var table = $('#orderProductsDatatable').DataTable();
 
    $('#orderProductsDatatable tbody').on('click', 'tr', function () {
     
        setTimeout(function() {
    
            var table = jQuery('#orderProductsDatatable').DataTable();
            
            var products = $.map(table.rows('.selected').data(), function (item) {
                return item[2];
            });

            var total = 0;
            jQuery.each(products, function(key, value) {
                total += parseFloat(value);
            });

            if (jQuery('#orderModal #order_id').val() == '') {
                jQuery('#orderModal #total').val(total);
            }

        }, 100);
    });
}; 

