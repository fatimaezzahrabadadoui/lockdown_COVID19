<!DOCTYPE html>
<html>
<head>
      <link type="text/css" href="http://jqueryui.com/latest/themes/base/ui.all.css" rel="stylesheet" />
  <script type="text/javascript" src="http://jqueryui.com/latest/jquery-1.3.2.js"></script>
  <script type="text/javascript" src="http://jqueryui.com/latest/ui/ui.core.js"></script>
  <script type="text/javascript" src="http://jqueryui.com/latest/ui/ui.datepicker.js"></script>
  <script type="text/javascript">
<script>
$(document).ready(function(){
	$('#dateexpense').datepicker({
	autoclose: true,
	onSelect: function(dateText, inst) {
	alert ("hi"); //this prints out the right value.
	}
});
$('#dateexpense').datepicker('setEndDate', '+1d');
$('#dateexpense').datepicker('setStartDate', new Date("2020, 1, 22") );
    });


		</script>

  </script>
</head>
<body style="font-size:62.5%;">

<input type="text" id="dateexpense">
</body>
</html>