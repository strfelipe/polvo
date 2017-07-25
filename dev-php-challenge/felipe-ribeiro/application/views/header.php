<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="<?php echo HTTP_CSS_PATH; ?>favicon.png">
    <title>PHP DEV Challenge</title>
    <!-- Bootstrap core CSS -->
    <link href="<?php echo HTTP_CSS_PATH; ?>bootstrap.css" rel="stylesheet">
    <link href="<?php echo HTTP_CSS_PATH; ?>font-awesome.css" rel="stylesheet">
    <link href="<?php echo HTTP_CSS_PATH; ?>jquery-ui.css" rel="stylesheet">
    <script src="<?php echo HTTP_JS_PATH; ?>jquery.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>jquery-ui.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>bootstrap.min.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>src/helper.js"></script>
    <link href="<?php echo HTTP_CSS_PATH; ?>starter-template.css" rel="stylesheet">
    <link href="<?php echo HTTP_CSS_PATH; ?>jquery.dataTables.min.css" rel="stylesheet">
    <link href="<?php echo HTTP_CSS_PATH; ?>select.dataTables.min.css" rel="stylesheet">
    <link href="<?php echo HTTP_CSS_PATH; ?>jquery-ui-timepicker-addon.css" rel="stylesheet">
    <script src="<?php echo HTTP_JS_PATH; ?>jquery-ui-timepicker-addon.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>jquery.dataTables.min.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>dataTables.select.min.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>waitingfor.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>src/productsController.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>src/ordersController.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>src/productsService.js"></script>
    <script src="<?php echo HTTP_JS_PATH; ?>src/ordersService.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="<?php echo HTTP_JS_PATH; ?>html5shiv.js"></script>
      <script src="<?php echo HTTP_JS_PATH; ?>respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript">
       var CI = {
        'baseUrl': '<?php echo base_url(); ?>',
        'siteUrl': '<?php echo site_url(); ?>',
      };
      </script>
  </head>
<body>
    <?php $pg = isset($page) && $page != '' ?  $page :'products'; ?>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="<?php echo base_url(); ?>">Home</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li <?php echo  $pg == 'products' ? 'class="active"' : '' ?>><a href="<?php echo base_url(); ?>products">Produtos</a></li>
            <li <?php echo  $pg == 'orders'  ? 'class="active"' : '' ?>><a href="<?php echo base_url(); ?>orders">Pedidos</a></li>
          </ul>
        </div><!--/.navbar-collapse -->
      </div>
    </div>
