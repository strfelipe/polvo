var Helper = function()
{
	var self = this;
};

Helper.prototype.onlyNumber = function(evt)
{
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // Backspace and Tab and Enter
        key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45) {

        return true;
    }
    else {
        return false;
    }
};

Helper.prototype.showAlertModal = function(message, title, color, header = 'Aviso') 
{
    jQuery('#alertMessage').html(message);
    jQuery('#alertTitle').html('<strong>' + title + '!</strong>');
    jQuery('#alertColor').attr('class', 'm-b-none alert ' + color);
    jQuery('#alertModal .modal-title').html(header);
    jQuery('#alertModal').modal('show'); 
};

Helper.prototype.showConfirmModal = function(message, title, color, header = 'Aviso')
{
	jQuery('#confirmMessage').html(message);
	jQuery('#confirmTitle').html('<strong>' + title + '!</strong>');
	jQuery('#confirmColor').attr('class', 'm-b-none alert ' + color);
	jQuery('#confirmModal .modal-title').html(header);
	jQuery('#confirmModal').modal('show');
};