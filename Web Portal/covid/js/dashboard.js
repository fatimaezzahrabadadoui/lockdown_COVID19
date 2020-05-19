$(document).ready(function () {
    var reqeust_data = {
        'FilterCustomerID': $("#dashboard_customers").val(),
        'FilterTechnicianID': $("#dashboard_technicians").val(),
        'FilterSiteID': $("#dashboard_sites").val(),
        'Type': logged_user_type,
        'OwnerSupplierID': logged_user_id
    };




    var mydata;
    var catch8am;
    var dead;
    var closed;
    var reported;
    var visitData;
    var trapStats;
    var clickedField = 0;

    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/CatchesDashoardMorning/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {
                data = data['alertMorningCatchs'];
                catch8am = data;
                console.log("yes");
                console.log(catch8am);
                $(".spinner-catch8AM").hide();
                $("#initiated_catch8AM").html(data["initiatedTill8am"]);
                $("#outstand_catch8AM").html(data["outstandingTill8am"]);

                
                $("#initiated_catch8AM").css('cursor', 'pointer');
                $("#outstand_catch8AM").css('cursor', 'pointer');
            } else {
                $("#initiated_catch8AM").html("---")
                $("#outstand_catch8AM").html("---")
            }
        }
    });

    //catches untill now
    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/CatchesDashoardTillNow/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {

                data = data['alertCatchs'];
                mydata = data;
                $(".spinner-catch").hide();
                $("#initiated_catch").html(data["initiated"]);
                $("#outstand_catch").html(data["outstanding"]);

                $("#initiated_catch").css('cursor', 'pointer');
                $("#outstand_catch").css('cursor', 'pointer');
            } else {
                $("#initiated_catch").html("---")
                $("#outstand_catch").html("---")
            }
        }
    });

    //closed actions
    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/ClosedActDashoard/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {
                data = data['closedAlert'];
                closed = data;
                $(".spinner-closed").hide();
                $("#closed_reported").html(data["reportedIssue"]);
                $("#closed_reported8AM").html(data["reportedIssueTill8am"]);
                $("#closed_catches").html(data["catches"]);
                $("#closed_catches8AM").html(data["catchesTill8am"]);
                $("#closed_dead").html(data["dead"]);
                $("#closed_dead8AM").html(data["deadTill8am"]);
                $("#closed_routin").html(data["routineVisits"]);
                $("#closed_routin8AM").html(data["routineVisitsTill8am"]);

                $("#closed_reported").css('cursor', 'pointer');
                $("#closed_reported8AM").css('cursor', 'pointer');
                $("#closed_catches").css('cursor', 'pointer');
                $("#closed_catches8AM").css('cursor', 'pointer');
                $("#closed_dead").css('cursor', 'pointer');
                $("#closed_dead8AM").css('cursor', 'pointer');
                $("#closed_routin").css('cursor', 'pointer');
                $("#closed_routin8AM").css('cursor', 'pointer');

            } else {
                $("#closed_reported").html("---");
                $("#closed_reported8AM").html("---");
                $("#closed_catches").html("---");
                $("#closed_catches8AM").html("---");
                $("#closed_dead").html("---");
                $("#closed_dead8AM").html("---");
                $("#closed_visits").html("---");
                $("#closed_visits8AM").html("---");
            }
        }
    });
    //dead actions
    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/DeadDashoard/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {
                data = data['alertDeads'];
                dead = data;
                $(".spinner-dead").hide();
                $("#initiated_dead").html(data["initiated"]);
                $("#initiated_dead8AM").html(data["initiatedTill8am"]);
                $("#outstand_dead").html(data["outstanding"]);
                $("#outstand_dead8AM").html(data["outstandingTill8am"]);

                $("#initiated_dead").css('cursor', 'pointer');
                $("#initiated_dead8AM").css('cursor', 'pointer');
                $("#outstand_dead").css('cursor', 'pointer');
                $("#outstand_dead8AM").css('cursor', 'pointer');

            } else {
                $("#initiated_dead").html("---");
                $("#initiated_dead8AM").html("---");
                $("#outstand_dead").html("---");
                $("#outstand_dead8AM").html("---");
            }
        }
    });
    //visits actions
    /*
     $.ajax({
         type: "GET",
         url: BASE_API_URL + '/Dashoard/RoutinVisitDashoard/',
         data: reqeust_data,
         crossDomain: true,
         success: function (data) {
             if (data) {
                 data = data['routinVisitAlerts'];
                 visitData = data;
                 $(".spinner-routin").hide();
                 $("#initiated_routin").html(data["initiated"]);
                 $("#initiated_routin8AM").html(data["initiatedTill8am"]);
                 $("#outstand_routin").html(data["outstanding"]);
                 $("#outstand_routin8AM").html(data["outstandingTill8am"]);
 
             } else {
                 $("#initiated_visits").html("---");
                 $("#initiated_visits8AM").html("---");
                 $("#outstand_visits").html("---");
                 $("#outstand_visits8AM").html("---");
             }
         }
     });
    */
    //reported issue actions
    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/ReportedIssueDashoard/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {
                data = data['alertReportedIssue'];
                reported = data;
                $(".spinner-visits").hide();
                $("#initiated_reported").html(data["initiated"]);
                $("#initiated_reported8AM").html(data["initiatedTill8am"]);
                $("#outstand_reported").html(data["outstanding"]);
                $("#outstand_reported8AM").html(data["outstandingTill8am"]);
                
                $("#initiated_reported").css('cursor', 'pointer');
                $("#initiated_reported8AM").css('cursor', 'pointer');
                $("#outstand_reported").css('cursor', 'pointer');
                $("#outstand_reported8AM").css('cursor', 'pointer');

            } else {
                $("#initiated_reported").html("---");
                $("#initiated_reported8AM").html("---");
                $("#outstand_reported").html("---");
                $("#outstand_reported8AM").html("---");
            }
        }
    });


    $.ajax({
        type: "GET",
        url: BASE_API_URL + '/Dashoard/StatisticsDashoard/',
        data: reqeust_data,
        crossDomain: true,
        success: function (data) {
            if (data) {
                trapStats = data;
                $(".spinner-alive").hide();



            } else {

            }
        }
    });


    $("#all-active-stations").click(function () {

        if( trapStats === undefined)
        return;

        clickedField=0;
        console.log("okkk");
        var sites = trapStats['activeTrapSites'];
        var traps = trapStats['activeTraps'];
        var locations = trapStats['activeTrapLocations'];
        var sites_embedded = {};

        $("#Clickable-Action-Prargraph").text("Active Stations");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");



    });


    $("#all-inactive-stations").click(function () {

        if( trapStats === undefined)
        return;

        var sites = trapStats['inActiveTrapSites'];
        var traps = trapStats['inActiveTraps'];
        var locations = trapStats['inActiveTrapLocations'];
        var sites_embedded = {};
        clickedField=0;

        $("#Clickable-Action-Prargraph").text("Inactive Stations");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);

            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j ++) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trap_content += '<li class="">' + trapvalue  + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");



    });

    
    $("#all-alive-stations").click(function () {

        if( trapStats === undefined)
        return;

        var sites = trapStats['aliveTrapSites'];
        var traps = trapStats['aliveTraps'];
        var locations = trapStats['aliveTrapLocations'];
        var sites_embedded = {};
        clickedField=0;

        $("#Clickable-Action-Prargraph").text("Alive Stations");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");



    });



    $(".click-initiated-catch").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = mydata['initiatedSite'];
        var traps = mydata['initiatedTrap'];
        var locations = mydata['initiatedTrapLocation'];
        var sites_embedded = {};
        clickedField = 2;
        $("#Clickable-Action-Prargraph").text("Initiated Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });

    $(".click-initiated-routin").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = visitData['initiatedSite'];
        var traps = visitData['initiatedTrap'];
        var locations = visitData['initiatedTrapLocation'];
        var sites_embedded = {};
        clickedField = 4;
        $("#Clickable-Action-Prargraph").text("Initiated Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-outstanding-catch").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = mydata['outstandingSite'];
        var traps = mydata['outstandingTrap'];
        var locations = mydata['outstandingTrapLocation'];
        var sites_embedded = {};
        clickedField = 10;
        $("#Clickable-Action-Prargraph").text("Outstanding Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });

    $(".click-outstanding-routin").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = visitData['outstandingSite'];
        var traps = visitData['outstandingTrap'];
        var locations = visitData['outstandingTrapLocation'];
        var sites_embedded = {};
        clickedField = 12;
        $("#Clickable-Action-Prargraph").text("Outstanding Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-catch-8am").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = catch8am['outstandingTill8amSite'];
        var traps = catch8am['outstandingTill8amTrap'];
        var locations = catch8am['outstandingTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 22;
        $("#Clickable-Action-Prargraph").text("Outstanding Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-routin-8am").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = visitData['outstandingTill8amSite'];
        var traps = visitData['outstandingTill8amTrap'];
        var locations = visitData['outstandingTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 24;
        $("#Clickable-Action-Prargraph").text("Outstanding Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-initiated-catch-8am").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = catch8am['initiatedTill8amSite'];
        var traps = catch8am['initiatedTill8amTrap'];
        var locations = catch8am['initiatedTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 14;
        $("#Clickable-Action-Prargraph").text("Initiated Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-initiated-routin-8am").click(function () {
        //console.log("click-initiated-catch ", mydata);
        var sites = visitData['initiatedTill8amSite'];
        var traps = visitData['initiatedTill8amTrap'];
        var locations = visitData['initiatedTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 16;
        $("#Clickable-Action-Prargraph").text("Initiated Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-initiated-dead").click(function () {
        console.log("initiateddead");
        var sites = dead['initiatedSite'];
        var traps = dead['initiatedTrap'];
        var locations = dead['initiatedTrapLocation'];
        var sites_embedded = {};
        clickedField = 3;
        $("#Clickable-Action-Prargraph").text("Initiated Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-initiated-dead-8am").click(function () {
        console.log("initiateddead8am");
        var sites = dead['initiatedTill8amSite'];
        var traps = dead['initiatedTill8amTrap'];
        var locations = dead['initiatedTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 15;
        $("#Clickable-Action-Prargraph").text("Initiated Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-dead").click(function () {
        console.log("outstandingdead");
        var sites = dead['outstandingSite'];
        var traps = dead['outstandingTrap'];
        var locations = dead['outstandingTrapLocation'];
        var sites_embedded = {};
        clickedField = 11;
        $("#Clickable-Action-Prargraph").text("Outstanding Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!(siteName in sites_embedded)) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)
            var cnt = 0;

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-dead-8am").click(function () {
        console.log("outstandingdead8am");
        var sites = dead['outstandingTill8amSite'];
        var traps = dead['outstandingTill8amTrap'];
        var locations = dead['outstandingTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 23;
        $("#Clickable-Action-Prargraph").text("Outstanding Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    console.log("created site - ", siteName);
                    sites_embedded[siteName] = [];
                }

                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });





    $(".click-closed-catch").click(function () {
        console.log("closedcatch");
        var sites = closed['catchActSite'];
        var traps = closed['catchAct'];
        var locations = closed['catchActLocation'];
        var sites_embedded = {};
        clickedField = 6;
        $("#Clickable-Action-Prargraph").text("Closed Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });

    $(".click-closed-routin").click(function () {
        console.log("closedroutin");
        var sites = closed['visitActSite'];
        var traps = closed['visitAct'];
        var locations = closed['visitActLocation'];
        var sites_embedded = {};
        clickedField = 8;
        $("#Clickable-Action-Prargraph").text("Closed Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-closed-dead").click(function () {
        console.log("closeddead");
        var sites = closed['deadActSite'];
        var traps = closed['deadAct'];
        var locations = closed['deadActLocation'];
        var sites_embedded = {};
        clickedField = 7;
        $("#Clickable-Action-Prargraph").text("Closed Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-closed-reported").click(function () {
        console.log("closedReported");
        var sites = closed['priorityActSite'];
        var traps = closed['priorityAct'];
        var locations = closed['priorityActLocation'];
        var sites_embedded = {};
        clickedField = 5;
        $("#Clickable-Action-Prargraph").text("Closed Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-closed-catch8am").click(function () {
        console.log("closedCatch8am");
        var sites = closed['catchAct8amSite'];
        var traps = closed['catchAct'];
        var locations = closed['catchActLocation'];
        var sites_embedded = {};
        clickedField = 18;
        $("#Clickable-Action-Prargraph").text("Closed Catch");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-closed-routin8am").click(function () {
        console.log("closedroutin8am");
        var sites = closed['visitAct8amSite'];
        var traps = closed['visitAct'];
        var locations = closed['visitActLocation'];
        var sites_embedded = {};
        clickedField = 20;
        $("#Clickable-Action-Prargraph").text("Closed Scheduled Visit");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-closed-dead8am").click(function () {
        console.log("ClosedDead8am");
        var sites = closed['deadAct8amSite'];
        var traps = closed['deadAct8am'];
        var locations = closed['deadAct8amLocation'];
        var sites_embedded = {};
        clickedField = 19;
        $("#Clickable-Action-Prargraph").text("Closed Dead");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-closed-reported8am").click(function () {
        console.log("closedreported8am");
        var sites = closed['priorityAct8amSite'];
        var traps = closed['priorityAct8am'];
        var locations = closed['priorityAct8amLocation'];
        var sites_embedded = {};
        clickedField = 17;
        $("#Clickable-Action-Prargraph").text("Closed Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });




    $(".click-initiated-report").click(function () {
        console.log("initReport");
        var sites = reported['initiatedSite'];
        var traps = reported['initiatedTrap'];
        var locations = reported['initiatedTrapLocation'];
        var sites_embedded = {};
        clickedField = 1;
        $("#Clickable-Action-Prargraph").text("Initiated Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-report").click(function () {
        console.log("closedreported8am");
        var sites = reported['outstandingSite'];
        var traps = reported['outstandingTrap'];
        var locations = reported['outstandingTrapLocation'];
        var sites_embedded = {};
        clickedField = 9;
        $("#Clickable-Action-Prargraph").text("Outstanding Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });



    $(".click-initiated-report8am").click(function () {
        console.log("initReport");
        var sites = reported['initiatedTill8amSite'];
        var traps = reported['initiatedTill8amTrap'];
        var locations = reported['initiatedTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 13;
        $("#Clickable-Action-Prargraph").text("Initiated Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $(".click-outstanding-report8am").click(function () {
        console.log("outstandingreported8am");
        var sites = reported['outstandingTill8amSite'];
        var traps = reported['outstandingTill8amTrap'];
        var locations = reported['outstandingTill8amTrapLocation'];
        var sites_embedded = {};
        clickedField = 21;
        $("#Clickable-Action-Prargraph").text("Outstanding Issue");



        $(".customer-sites-details").html("");
        if (sites.length > 0) {

            for (var i = 0; i < (sites).length; i++) {
                var siteName = sites[i];
                if (!sites_embedded[siteName]) {
                    sites_embedded[siteName] = [];
                }
                sites_embedded[siteName].push(traps[i]);
                sites_embedded[siteName].push(locations[i]);


            }
            //console.log(sites_embedded)

            Object.keys(sites_embedded).forEach(function (key) {
                var trap_content = '<ul class="">';

                value = sites_embedded[key];
                for (var j = 0; j < value.length; j += 2) {
                    // console.log(trapvalue.trapName)
                    trapvalue = value[j];
                    trapLocation = value[j + 1];
                    trap_content += '<li class="">' + trapvalue + " - " + trapLocation + '</li>';

                };
                trap_content += '</ul>'
                var item_content = '<div class="cal-row">' +
                    '<hr class="cal-hr">' +
                    '<div class="row">' +

                    '<div  class="cal-title">' +
                    '    <h6>' + key + '</h6>' +
                    trap_content +
                    '</div>' +
                    '</div>';
                $("#customer-sites").find(".customer-sites-details").append(item_content);

            });
        } else {
            $("#customer-sites").find(".customer-sites-details").append('<div class="alert alert-info text-center"><h6>0 Actions</h6></div>');

        }
        toggle_customers_sites("open");
    });


    $("#eightAM").click(function () {
        if (clickedField == 0 || clickedField > 12)
            return;
        clickedField += 12;
        var clickFunctions = [".click-initiated-report", ".click-initiated-catch", ".click-initiated-dead",
            ".click-initiated-routin",
            ".click-closed-reported", ".click-closed-catch", ".click-closed-dead",
            ".click-closed-routin", ".click-outstanding-report",
            ".click-outstanding-catch", ".click-outstanding-dead",
            ".click-outstanding-routin", ".click-initiated-report8am",
            ".click-initiated-catch-8am", ".click-initiated-dead-8am", ".click-initiated-routin-8am",
            ".click-closed-reported8am",
            ".click-closed-catch8am", ".click-closed-dead8am", ".click-closed-routin8am",
            ".click-outstanding-report8am",
            ".click-outstanding-catch-8am", ".click-outstanding-dead-8am",
            ".click-outstanding-routin-8am"];



        $(clickFunctions[clickedField - 1]).click();
    });


    $("#NOWtab").click(function () {
        if (clickedField == 0 || clickedField <= 12)
            return;
        clickedField -= 12;
        var clickFunctions = [".click-initiated-report", ".click-initiated-catch", ".click-initiated-dead",
            ".click-initiated-routin",
            ".click-closed-reported", ".click-closed-catch", ".click-closed-dead",
            ".click-closed-routin", ".click-outstanding-report",
            ".click-outstanding-catch", ".click-outstanding-dead",
            ".click-outstanding-routin", ".click-initiated-report8am",
            ".click-initiated-catch-8am", ".click-initiated-dead-8am", ".click-initiated-routin-8am",
            ".click-closed-reported8am",
            ".click-closed-catch8am", ".click-closed-dead8am", ".click-closed-routin8am",
            ".click-outstanding-report8am",
            ".click-outstanding-catch-8am", ".click-outstanding-dead-8am",
            ".click-outstanding-routin-8am"];


        $(clickFunctions[clickedField - 1]).click();
    });


});