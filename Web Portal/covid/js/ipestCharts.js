$(function () {
    var pieChart_data=[];
    var color_data=[];
    var label_data=[];
    $(".pie-spinner").show();
    $.ajax({
        type: "GET",
        url: 'includes/getAlldata.php',
        dataType: "json",
        success: function(data){
            // console.log(data)
            //alert(data["confirmed"]);
            $(".pie-spinner").hide();
            // console.log(Object.values(data))
                var empty_pieData=(parseInt(data["confirmed"])==0 && parseInt(data["deaths"])==0 && parseInt(data["recovred"])==0 );
                 pieChart_data=!empty_pieData?[parseInt(data["confirmed"]),parseInt(data["deaths"]),parseInt(data["recovred"])]:
                     [100];
                 color_data=!empty_pieData?[
                     "#ffc400",
                     "red",
                     "#24ccb8"]:[ "#cccccc"];
                 label_data=!empty_pieData?["confirmed", "deaths", "recovred"]:[ "No data available"];
                $(".recovred-txt").html( ( (parseInt(data["recovred"])*100)/parseInt(data["confirmed"]) ).toFixed(2)+'%');
                $(".deaths-txt").html( ( (parseInt(data["deaths"])*100)/parseInt(data["confirmed"]) ).toFixed(2)+'%');
                $(".confirmed-txt").html(( ((parseInt(data["confirmed"])-parseInt(data["deaths"])-parseInt(data["recovred"]) )*100)/parseInt(data["confirmed"])).toFixed(2)+'%');
            var piedata = {
                datasets: [{
                    data:
                    pieChart_data,
                    backgroundColor: color_data,
                    label: 'My dataset' // for legend
                }],
                labels: label_data
            };
            var ctx = $("#myChart");
            new Chart(ctx, {
                data: piedata,
                type: 'pie',
                options: {
                    legend: false,
                    padding: {
                        left: 0,
                        top: 10,
                    },
                    responsive: true,
                }
            });
            
            //donut chart
            // For a pie chart
            var options = {
                padding: {
                    left: 0,
                    top: 30,
                },
                legend:false,
                responsive: true,
                cutoutPercentage: 70,
            };
            var empty_donutData=(parseInt(data["falseAlertCount"])==0 && parseInt(data["accurateCatchCount"])==0);

            var donutdata = {
                datasets: [{
                    data: empty_donutData?[100] :[parseInt(data["falseAlertCount"]), parseInt(data["accurateCatchCount"])] ,
                    backgroundColor:empty_donutData?["#cccccc"]: ["#ffc400", "#4880ff"],
                    // label: 'My dataset' // for legend
                }],
                labels:empty_donutData?["No data available"]: ["False alerts", "Accurate catch"]
            };
            // var donut_chart=$("#donutchart");
            var myDoughnutChart = new Chart($("#donutchart"), {
                type: 'doughnut',
                data: donutdata,
                options: options,

            });
            $(".donut-inner h5").text(data["catchNumber"]);
            $(".donut-inner span").show();
        }
    });
    // console.log(pieChart_data)




});
function drawDonutChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
    ]);

    var options = {
        title: 'My Daily Activities',
        pieHole: 0.4,
        chartArea:{left:5,top:0,width:'40%',height:'40%'},
        pieSliceText:'none',

    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Sleep',    7]
    ]);

    var options = {
        title: 'My Daily Activities',
        chartArea:{left:-50,top:0,width:'40%',height:'40%'},
        pieSliceText:'none',
        legend:'none',

    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}