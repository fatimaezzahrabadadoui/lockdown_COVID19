<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
require_once('includes/config.php');
$sql = "SELECT * FROM statistics";
$result = $conn->query($sql);
$country=array();
$lat=array();
$lng=array();
$confirmed=array(); $deaths=array(); $recovered=array();
if ($result->num_rows > 0)
{
      $i = 0;
      while($row = $result->fetch_assoc()) {
      	  $country[$i]=$row['country'];
      	  $lat[$i]=$row['lat'];
      	  $lng[$i]=$row['lng'];
      	  $confirmed[$i]=$row['confirmed'];
      	  $deaths[$i]=$row['death'];
      	  $recovered[$i]=$row['recovered'];
      	  $i++;
      }
      /*for($i=0;$i<count($country);$i++)
      {
      		$str=explode(',',$confirmed[$i]);
      		$str2=explode(',',$deaths[$i]);
      		$str3=explode(',',$recovered[$i]);
      		 $con=0; $det=0; $rec=0;
      		for($j=0;$j<count($str);$j++)
      		{
      			$con=$con+(int)$str[$j];
      			$det=$det+(int)$str2[$j];
      			$rec=$rec+(int)$str3[$j];
      		}
      		$confirmed[$i]=$con;
      		$deaths[$i]=$det;
      		$recovered[$i]=$rec;				      			  
      }*/
	  $world="[";
      for($i=0;$i<count($country);$i++)
      {
      	$world=$world.'[&quot;'.$lat[$i].'&quot;,&quot;'.$lng[$i].'&quot;,'.$deaths[$i].$recovered[$i].$confirmed[$i];
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
        <div class="row">
            <div class="col-md-12 cont-wrap">
                <h2>World COVID19 Statistics (till 14-4-2020)</h2>
            </div>
            <div class="row col-md-12 cont-wrap">
                <!-- col 1 -->
                <div class="col-md-12">
                    <div class="panel panel-chart">
                        <div class="panel-head"><h4>Chart Statistics</h4></div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <div id="chart" style="max-width: 100%">
                                        <canvas style="border: none" id="myChart" width="300" height="300"></canvas>
                                    </div>
                                    <div style="display: none" class="pie-spinner spinner"></div>
                                </div>
                                <div class="row col-md-7">
                                    <div class="row guide">
                                        <!--col1 -->
                                        <div class="col-md-6">
                                            <div class="guide1">
                                                <hr class="guide1-hr-g">
                                                <div>Recovered <span class="gray-text recovred-txt"></span></div>
                                            </div>
                                        </div>
                                        <!--col3-->
                                        
                                        <!--col4-->
                                        <div class="col-md-6">
                                            <div class="guide1">
                                                <hr class="guide1-hr-y">
                                                <div>Confirmed <span class="gray-text confirmed-txt"></span></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="guide1">
                                                <hr class="guide1-hr-r">
                                                <div>Death <span class="gray-text deaths-txt"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- col 2 -->
            </div>



        </div>

        <!-- div map -->
        <div class="row">
            <div class="col-md-12 cont-wrap">
                <h4 class="title-h4">Statistics on Map</h4>
                
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
                                    <!--2-->
                                    <div class="custom-control custom-radio mb-3 ch-LB">
                                        <input type="radio" class="map-radio custom-control-input" id="red" name="example1">
                                        <label class="custom-control-label" for="red">
                                            Deaths </label>
                                    </div>
                                    <!--3-->
                                    <div class="custom-control custom-radio mb-3 ch-y trap-number">
                                        <input type="radio" class="map-radio custom-control-input" id="green" name="example1">
                                        <label class="custom-control-label" for="green">
                                            Recovered </label>
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
    <script src="js/sites-map.js"></script>
 
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
