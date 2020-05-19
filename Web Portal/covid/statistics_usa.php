<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
require_once('includes/config.php');
$sql = "SELECT * FROM statistics_us";
$result = $conn->query($sql);
$country=array();
$lat=array();
$lng=array();
$confirmed=array(); $deaths=array(); $recovered=array();
if ($result->num_rows > 0)
{
      $i = 0;
      while($row = $result->fetch_assoc()) {
      	  $city[$i]=$row['city'];
      	  $lat[$i]=$row['lat'];
      	  $lng[$i]=$row['lng'];
      	  $confirmed[$i]=$row['confirmed'];
      	  $i++;
      }
	  $world="[";
      for($i=0;$i<count($city);$i++)
      {
      	$world=$world.'[&quot;'.$lat[$i].'&quot;,&quot;'.$lng[$i].'&quot;,'.$confirmed[$i];
      	$world=substr($world, 0, -1);
      	$world=$world.'],';
      }
      $world=substr($world, 0, -1);
      $world=$world.']';
}

?>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       

    <title>Statistics</title>

    <!-- Bootstrap CSS CDN -->
    <link rel="shortcut icon" href="img/logo.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="bootstrap/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="css/ipest.css">
    <link rel="stylesheet" href="css/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/css/font-awesome.css">
    <link href="css/datepicker3.css" rel="stylesheet">
            <!-- Font Awesome  -->
</head>
<body >
<div class="wrapper">
        <!-- Sidebar  -->
<nav id="sidebar">
    <div class="sidebar-header">
        <div><img src="img/logo.png" width="60px"></div>

    </div>
<ul class="list-unstyled components">
         <li class="">
            <a href="index.php">
                <i class="fa fa-dashboard"></i>
                <div>Home</div>
            </a>

        </li>
        <li class="">
            <a href="statistics.php">
                <i class="fa fa-flag-o"></i>
                <div>Statistics</div>
            </a>

        </li>
       
        <li class="">
            <a href="statistics_usa.php">
                <i class="fa fa-flag-o"></i>
                <div>USA Statistics</div>
            </a>
        </li>
        <li class="">
            <a href="lockdown.php">
                <i class="fa fa-history"></i>
                <div>Lock Down</div>
            </a>
        </li>
   </ul>


</nav>
    <div id="content">
            <nav class="navbar ipest-nav justify-content-end" role="navigation" style="margin-bottom: 40px">
<div class="container-fluid">
    <button type="button" id="sidebarCollapse" class="float-left btn in-fo md-hide">
        <i class="fa fa-align-left"></i>
        <span></span>
    </button>
        <ul class="nav navbar-top-links navbar-right">
             <li class="nav-item dropdown">
                <a class="nav-link user-top" href="javascript:void[0]" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="img/Russell IOT Logo PNG-01.png">
                </a>
            </li>
        </ul>
</div>
</nav>
    <div class="main-content">
        <!-- div map -->
        <div class="row">
            <div class="col-md-12 cont-wrap">
                <h4 class="title-h4">USA Statistics on Map (only cases which have Lat and Long information by end of 13-4-2010)</h4>
            </div>
        </div>

        <!-- mapy-->

        <div class="tab-content">
            <div class="row tab-pane  active" id="map" >
                <div class="col-md-12 cont-wrap row">
                    <div class="col-md-3 left-map-side">
                        <div class="panel filter-panel">
                            <div class="panel-head"><h6 class="h6-gray">FILTER BY</h6></div>
                            <div class="panel-body">

                                <div class="text-center row on-off">
                                  <!--  <select name="" class="form-control col-11" id="switch_button">
                                        <option value="area">Area</option>
                                        <option value="city">City</option>
                                        <option value="country">Country</option>
                                    	<option value="world">World</option>
                                    </select> -->
                                    <label>Select Date</label>
                                    <input class="form-control" type="text" placeholder="yyyy-mm-dd" id="dateexpense" value="" name="dateexpense" autocomplete="off">
                                </div>

                                <div class="checks-choose">
                                    <!--1-->
                                    <div class="custom-control custom-radio mb-3 ch-b">
                                        <input type="radio" class="map-radio custom-control-input" id="yellow" name="example1">
                                        <label class="custom-control-label" for="yellow">
                                            Confirmed </label>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                   

					<input type="hidden" class="world-map-data" value="<?php echo $world;?>" placeholder="">
                    <!-- Map side -->
                    <div class="col-md-9  map-view">
                        <div class="map">
                            <div id="site-map"></div>
                        </div>

                    </div>

                </div>

            </div>

            <div class="row tab-pane " id="tables" >
                <div class="col-md-12 cont-wrap tables-content float-left ">
                    <div class="panel">
                        <div class="panel-head">
                            <div class="tables-tabs">
                                <ul class="nav" role="tablist" id="table-tap-nav">
                                    <li class="nav-item">
                                        <a class="active nav-link" id="nav-customer" data-toggle="tab" href="#table-tap-area">
                                         <h5>Area</h5>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="nav-site" data-toggle="tab" href="#table-tap-city">
                                            <h5>City</h5>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="nav-trap" data-toggle="tab" href="#table-tap-country">
                                            <h5>Country</h5>
                                        </a>
                                    </li>
                					<li class="nav-item">
                                        <a class="nav-link" id="nav-trap" data-toggle="tab" href="#table-tap-world">
                                            <h5>World</h5>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="row tab-pane active" id="table-tap-area">
                                    <div class="table-responsive ">
                            			<table class="table header-fixed tables-customer-tab1">
											<thead>
                                            <tr>
                                                <th class="left-align">Name</th>
                                                <th class="center">COVID19</th>
                                                <th class="center">Death Cases</th>
                                                <th class="center">Recovered</th>
                                           </tr>
                                            </thead>
                                            <tbody>
                                                  <tr class="trap-row">
                                                    <td class="left-align" ><div class="li-name">Iraq</div></td>
                                                    <td class="center" >332</td>
                                                    <td class="center">4</td>
                                                    <td class="center">167</td>
                                                </tr>
                                        </tbody>
                                       </table>
                                    </div>


                                </div>

                                <div class="row tab-pane" id="table-tap-city">

                                <div class="table-responsive ">
                                    <table class="table header-fixed tables-customer-tab1">
                                       <thead>
                                            <tr>
                                                <th class="left-align">Name</th>
                                                <th class="center">COVID19</th>
                                                <th class="center">Death Cases</th>
                                                <th class="center">Recovered</th>
                                           </tr>
                                            </thead>
                                            <tbody>
                                                  <tr class="trap-row">
                                                    <td class="left-align" ><div class="li-name">Iraq</div></td>
                                                    <td class="center" >332</td>
                                                    <td class="center">4</td>
                                                    <td class="center">167</td>
                                                </tr>
                                        </tbody>
                                        </table>
                                    </table>
                                </div>
                            </div>
                                <div class="row tab-pane" id="table-tap-country">

                                    <div class="table-responsive ">
                                        <table class="table header-fixed tables-customer-tab1">
                                            <thead>
                                            <tr>
                                                <th class="left-align">Name</th>
                                                <th class="center">COVID19</th>
                                                <th class="center">Death Cases</th>
                                                <th class="center">Recovered</th>
                                           </tr>
                                            </thead>
                                            <tbody>
                                                  <tr class="trap-row">
                                                    <td class="left-align" ><div class="li-name">Iraq</div></td>
                                                    <td class="center" >332</td>
                                                    <td class="center">4</td>
                                                    <td class="center">167</td>
                                                </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
								<div class="row tab-pane" id="table-tap-world">

                                    <div class="table-responsive ">
                                        <table class="table header-fixed tables-customer-tab1">
                                            <thead>
                                            <tr>
                                                <th class="left-align">Name</th>
                                                <th class="center">COVID19</th>
                                                <th class="center">Death Cases</th>
                                                <th class="center">Recovered</th>
                                           </tr>
                                            </thead>
                                            <tbody>
                                                  <tr class="trap-row">
                                                    <td class="left-align" ><div class="li-name">Iraq</div></td>
                                                    <td class="center" >332</td>
                                                    <td class="center">4</td>
                                                    <td class="center">167</td>
                                                </tr>
                                        </tbody>
                                       </table>
                                      </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                 </div>

            </div>
                <div id="trap-details" class="col-md-3 aside float-right" style="display: none">
                    <div class="my-aside table-row-details">
                        <div class="aside-title media">
                            <div class="media-body">
                                <h5 class=" media-heading">Trap details</h5>

                            </div>
                        </div>
                        <hr class="base-hr">
                        <div class="cal-row">
                            <form >
                                <div class="form-group">
                                    <dt class="mb-1">Site name</dt>
                                    <dd class="site-name"></dd>
                                </div>
                                <hr class="cal-hr">

                                <div class="form-group">
                                    <dt class="mb-1">Customer name</dt>
                                    <dd class="details-customer-name"></dd>
                                </div>
                                <hr class="cal-hr">

                                <div class="form-group">
                                    <dt class="mb-1">Installation date</dt>
                                    <dd class="details-installDate"></dd>
                                </div>
                                <hr class="cal-hr">

                                <div class="form-group">
                                    <dt class="mb-1">Upcoming schedule</dt>
                                    <dd class="details-upcomingSchedule"></dd>
                                </div>
                                <div class="create-form-btns">
                                    <div class="row ">
                                        <button type="button" id="cancel_trap_details" class="mx-auto btn btn-primary col-md-4">Cancel</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

        </div>
    </div>
</div>
    </div>
</div>

    <!-- jQuery 3.3.1 version (=with AJAX) -->
<script src="js/jquery-3.3.1.min.js"></script>

<script src="js/languages/jquery.validationEngine-en.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
<!-- Popper.JS -->
<script src="js/popper.min.js"></script>
<!-- Bootstrap JS -->
<script src="bootstrap/js/bootstrap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/aes.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<script src="js/ipest.js"></script>
<script type="text/javascript">
    //var BASE_API_URL="http://localhost:56894";
    var BASE_API_URL = "https://ndoydvhw9i.execute-api.eu-west-2.amazonaws.com/Prod";
    var BASE_URL="http://www.i-pest.net"
            var logged_user_type="1";
    </script>
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="js/ipestCharts.js"></script>
    <script src='https://maps.google.com/maps/api/js?key=AIzaSyBebNB7vFZ2ubifyxxjfvEHXNGmO8GWAic'>
    </script>
    <script src="js/richmarker.js"></script>
    	 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    	   	<script src="js/bootstrap-datepicker.js"></script>

 <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="js/sites-map-usa.js"></script>
    <script type="text/javascript">
        var logged_user_id="aaskslkdlk-ss"
    </script>
    <script type="text/javascript">
        window.localStorage.removeItem("history_activeTab");
    </script>
    <script type="text/javascript">
        window.localStorage.removeItem("home_activeTab");
    </script>


    
        
            
        
    

</body>
</html>
