$(document).ready(function() {


    if($(".validate-form").length>0)$(".validate-form").validationEngine();
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    //remain active tabs in sites page
    var default_activeTab=$('#sites-nav a.active').attr('href');
    $('#sites-nav a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
        window.localStorage.setItem('SitesActiveTab', $(e.target).attr('href'));
    });
    var SitesActiveTab = window.localStorage.getItem('SitesActiveTab');
    if (SitesActiveTab) {
        $('#sites-nav a[href="' + SitesActiveTab + '"]').tab('show');
        // window.localStorage.removeItem("activeTab");
    }else {
        $('#sites-nav a[href="' + default_activeTab + '"]').tab('show');
    }
    $('#table-tap-nav a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        window.localStorage.setItem('tableActiveTab', $(e.target).attr('href'));
    });
    var tableActiveTab = window.localStorage.getItem('tableActiveTab');
    if (tableActiveTab) {
        $('#table-tap-nav a[href="' + tableActiveTab + '"]').tab('show');
        // window.localStorage.removeItem("lastTab");

    }
    $('.history-nav a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        window.localStorage.setItem('history_activeTab', $(e.target).attr('href'));
    });
    var history_activeTab = window.localStorage.getItem('history_activeTab');
    if (history_activeTab) {
        $('.history-nav a[href="' + history_activeTab + '"]').tab('show');
        // window.localStorage.removeItem("activeTab2");

    }
    $('.home-tabs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        window.localStorage.setItem('home_activeTab', $(e.target).attr('href'));
    });
    var home_activeTab = window.localStorage.getItem('home_activeTab');
    if (home_activeTab) {
        $('.home-tabs a[href="' + home_activeTab + '"]').tab('show');
        // window.localStorage.removeItem("activeTab2");

    }
    //map modal
    $( "#exampleModal" ).on('show.bs.modal', function(){
        initMap();
    });
    //custom select checkboxes
    $("#custom-select").on("click",function(){
        $("#custom-select-option-box").toggle();
    });
    $("body").on("click",function(e){
        if(e.target.id != "custom-select" && (!$(e.target).hasClass("custom-select-option") && !$(e.target).hasClass("prim-tech-option"))) {
            $("#custom-select-option-box").hide();
        }
    });
    // bootstrap upload file button actions
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });
    // hash passwords
    $('#password').keyup(function() {
        var hash_key= AESEncryption($(this).val());
        $("#hashed_password").val(hash_key);
    });

    $("#login-form").on('submit', function (e) {
        e.preventDefault();
        user_type=$(this).find( "input:checked" ).val();
        var hash_key= AESEncryption($("#password").val());
        $("#hashed_password").val(hash_key);
        var password_check=(user_type==1)?$('#hashed_password'):$('#password');
        if($(password_check).val()==""){
            e.preventDefault();
            $("#hint-password").show()
        }else{
            if($(this).validationEngine('validate')) {$(this.submit());}
        }
        // alert(user_type)
    });
    //history filter
    $("#filter-history").on('submit', function (e) {
        e.preventDefault();
        var dateFrom=$(this).find("#datepicker_from").val();
        var dateTo=$(this).find("#datepicker_to").val();
        // dateFrom=dateFrom.split("-");
        // console.log(new Date(dateFrom).getTime() > new Date(dateTo).getTime())
        if(new Date(dateFrom).getTime() <= new Date(dateTo).getTime()) {
            $('#filter-history')[0].submit();

        }else {
            e.preventDefault();
            swal({
                text: "To date should be equal or greater than from date",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "error",
            })
        }
    });
    //check password matching - edit profile form

        $('#edit-profile-form').on('submit', function (e) {

                var password_check=$('#hashed_password');
                if($(password_check).val()=="" && $('#imgInp').val()==""){
                    e.preventDefault();
                    $("#hint-data-required").show()
                }else{
                    if($("#hint-data-required:visible"))$("#hint-data-required").hide()
                }
                if($('#old_password').val()!="" ) {
                   if($("#hint-data-required:visible")) $("#hint-data-required").hide()
                    e.preventDefault();
                    var hash_password = AESEncryption($('#old_password').val());
                    var old_password = $("#old_hashed_password").val();
                    if (hash_password == old_password) {
                        $("#hint-password").hide()
                        if($(this).validationEngine('validate')) {$(this.submit());}
                    } else {
                        $("#hint-password").show()
                    }
                }
        });

    //expand collapse tables
    $("a.expanded").click(function () {
        var parent_div =$(this).parent().parent();
        $(this).parent().hide();
        $(parent_div).find("tbody").removeClass("expanded");
        $(parent_div).find(".gradiant-collapse").show();
    });
    $("a.collapsed").click(function () {
        var parent_div =$(this).parent().parent();
        $(this).parent().hide();
        $(parent_div).find("tbody").addClass("expanded");
        $(parent_div).find(".gradiant-expanded").show();
    });
    // $("ol.days li") listener on datepicker item
    $('#calendar').on('changeDate', function() {
        $.ajax({
            type: "GET",
            url: BASE_API_URL+'/Dashoard/OwnerMaintainenceDashoard?',
            data: {'Filter_Date': $('#calendar').datepicker('getFormattedDate'),
                'Type':logged_user_type,
                'OwnerSupplierID':logged_user_id},
            //actual value $(this).attr("data-calendar-day")
            success: function(data){
                mydate=$('#calendar').datepicker('getFormattedDate')
                $(".calender-details").html("");
                $(".maintainence-date").html(data["filterDate"]);
                if(data["trapMaintenance"].length>0){
                    $.each(data["trapMaintenance"], function( index, value ) {
                        var item_content='<div class="cal-row">' +
                            '<hr class="cal-hr">' +
                            '<div class="row">' +
                            '<div class="day-title">'+value['maintainDate']+'</div>' +
                            '<div class="tech-id">\n' +
                            '    Tech ID <span>'+value['technician_ID']+'</span>' +
                            '</div>' +
                            '</div>' +
                            '<div  class="cal-title">' +
                            '    <h6>'+value['siteName']+'</h6>' +
                            '</div>' +
                            '</div>';
                        $(".calender-details").append( item_content );

                    });
                }else {
                    $(".calender-details").append( '<hr><div class="alert alert-info text-center"><h6>No plans for this day</h6></div>' );

                }

            }
        });
    });


    // all actions of users page
    $("input#technician_email, input#customer_email, input#contact_email, input#email").on("blur",function () {
        if($(this).val()!=""){
            $(this).addClass("validate[custom[email]]");
        }else{
            if($(this).hasClass("validate[custom[email]]"))$(this).removeClass("validate[custom[email]]")
        }
    });
    $("input#technician_phone, input#customer_phone, input#site_phone, input#contact_phone, input#supplier_phone").on("blur",function () {
        if($(this).val()!=""){
            $(this).addClass("validate[custom[phone],minSize[11]]");
        }else{
            if($(this).hasClass("validate[custom[phone],minSize[11]]"))$(this).removeClass("validate[custom[phone],minSize[11]]")
        }
    });
    $("input#contact_subject").on("blur",function () {
        if($(this).val()!=""){
            $(this).addClass("validate[maxSize[32]]");
        }else{
            if($(this).hasClass("validate[maxSize[32]]"))$(this).removeClass("validate[[maxSize[32]]")
        }
    });
    // 1-customers actions
    $("#add-customer-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input');
        var values = {};
        inputs.each(function() {
            values[this.name] = $(this).val().trim();
        });
        values['Supplier_ID']=$(this).find("#supplier_id").val().trim();
        var latLon=$("#map_latLon").val().trim();
        latLon=latLon.split(",");
        values['Location_Lat']=latLon[0];
        values['Location_Long']=latLon[1];
        // console.log(values)
        var api_url=(values["form_action"]!="add")?"UpdateCustomer":"AddCustomer";
        // console.log(values)
        if($(this).validationEngine('validate')){
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/'+api_url,
                data: values,
                success: function(data){
                    if(data!=false){
                        if(typeof data != "boolean" && data.includes('already exists')){
                            swal({
                                text: data,
                                icon: "error",
                            })
                        }else {
                            if (values["form_action"] != "add") {
                                toggle_result_div("customer", "updated", "success");
                                var parent_row = $("#customerRow_" + values["ID"]);
                                $(parent_row).find(".li-name").html(values["Name"]);
                                $(parent_row).find(".customer_address_td").html(values["Address"]);
                                $(parent_row).find(".customer_phone_td").html(values["Phone"]);
                                $(parent_row).find(".customer_email_td").html(values["Email"]);
                                $(parent_row).find(".customer_website_td").val(values["WebSite"]);
                                $(parent_row).find(".customer_supplierID_td").val(values["Supplier_ID"]);
                                $(parent_row).find(".customer_latLng_td").val($("#map_latLon").val());
                                $(parent_row).find(".customer_id_td").val(values["ID"]);
                            } else {
                                var added_tr = "<tr class='data-found' id='customerRow_" + values["ID"] + "'>" +
                                    '<td class=" left-align lg-col" ><div class="li-name">' + values["Name"] + '</div></td>' +
                                    '<td class=" center" >0</td>' +
                                    '<td class=" center" >0</td>' +
                                    '<td class=" customer_address_td left-align" >' + values["Address"] + '</td>' +
                                    '<td class=" customer_phone_td left-align" >' + values["Phone"] + '</td>' +
                                    '<td class=" customer_email_td left-align lg-col" >' + values["Email"] + '</td>' +
                                    '<input type="hidden" class="customer_website_td" value="' + values["WebSite"] + '"/>' +
                                    '<input type="hidden" class="customer_supplierID_td" value="' + values["Supplier_ID"] + '"/>' +
                                    '<input type="hidden" class="customer_latLng_td" value="' + $("#map_latLon").val() + '"/>' +
                                    '<input type="hidden" class="customer_id_td" value="' + values["ID"] + '"/>' +
                                    ' <td class="action right-align">' +
                                    ' <div class="dropdown" data-toggle="dropdown">' +
                                    '<a class="ropdown-toggle" href="javascript:void[0]" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '  <span class="fa fa-ellipsis-v"></span>' +
                                    '</a>' +
                                    ' <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                                    ' <a class="dropdown-item edit-customer" onclick="edit_customer(this)" id="editcustomer_' + values["ID"] + '" href="javascript:void[0]">Edit</a>' +
                                    ' <a class="dropdown-item delete delete-customer" onclick="delete_customer(this)" id="deletecustomer_' + values["ID"] + '" href="javascript:void[0]">Delete</a>' +
                                    ' </div>' +
                                    '</div>' +
                                    '</td>' +
                                    "</tr>";
                                $("#customers-table").find(".no-data-added").hide();
                                $(added_tr).prependTo("#customers-table > tbody");
                                toggle_result_div("customer", "added", "success");
                                $("#site_customer_id").append("<option value='" + data + "'>" + values["Name"] + "</option>")
                            }
                            $("#map_latLon").val("24.4713203,39.7576454");
                            toggle_customers_form("close");
                        }
                    }else {
                        if(values["ID"]!="")
                            toggle_result_div("customer","updating","danger");
                        else
                            toggle_result_div("customer","adding","danger");
                    }

                }
            });
        }
    });
    $(".add-customer-btn").click(function () {
        $(".add-customer-form").find('input').val("");
        if(logged_user_type==1)$(".add-customer-form").find('select').val("");
        $(".add-customer-form").find(".form-head").html("Add customer");
        $("#add-customer-form").find('#form_action').val("add")
        $("#add-customer-form").find("#customer_id").removeAttr("disabled");
        toggle_customers_form("open");
    })
    $("#cancel_add_customer").click(function () {
        toggle_customers_form("close");
    })
    $(".customer-row td:not(:last-child)").click(function () {
        var _id=$(this).closest(".customer-row").attr("id");
        customer_id=_id.split(/_(.+)/)[1];
        var customer_name= $(this).closest("tr").find(".li-name").html();
        $("#customer-sites").find(".customer-name").html(customer_name)
        $.ajax({
            type: "GET",
            url: BASE_API_URL+'/UserDashboard/CustomerSites',
            data: {"CustomerID":customer_id},
            success: function(data){
                $(".customer-sites-details").html("");
                if(data.length>0){
                    $.each(data, function( index, value ) {
                        var trap_content= '<ul class="">';
                            $.each(value.logs.traps,function (i,trapvalue) {
                                // console.log(trapvalue.trapName)
                                trap_content+='<li class="">'+trapvalue.trapName+'</li>';
                            });
                            trap_content+='</ul>'
                            var item_content='<div class="cal-row">' +
                            '<hr class="cal-hr">' +
                            '<div class="row">' +

                            '<div  class="cal-title">' +
                            '    <h6>'+value.logs.siteName[0].siteName+'</h6>' +
                                trap_content+
                            '</div>' +
                            '</div>';
                        $("#customer-sites").find(".customer-sites-details").append( item_content );

                    });
                }else {
                    $("#customer-sites").find(".customer-sites-details").append( '<div class="alert alert-info text-center"><h6>No sites available for this customer</h6></div>' );

                }
                toggle_customers_sites("open");
            }
        });
    });








    if(logged_user_type==1){
        $("#customer_email").on("keyup",function () {
            $("#spinner-customer-email").show();
            $("#hint-customer-email").hide();
        });
        $("#customer_id").on("keyup",function () {
            $("#spinner-customer-id").show();
            $("#hint-customer-id").hide();
        });
    }

    $("#customer_email").on("blur",function () {
        var form_action=$(this).closest("form").find("#form_action").val();
        var item_id=$(this).closest("form").find("#customer_ID").val();
       if($(this).validationEngine('validate') && logged_user_type==1){
           check_item_exists("customer",this,item_id,'email',form_action);
       }
    });
    $("#add-customer-form").find("#customer_id").on("blur",function () {
        // alert('r')
        var form_action=$(this).closest("form").find("#form_action").val();
        var item_id=$(this).closest("form").find("#old_customer_id").val();
        if($(this).validationEngine('validate') && logged_user_type==1) check_item_exists("customer",this,item_id,'id',form_action);
    });
    // 2-sites actions
    $("#add-site-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input:not([type=checkbox])');
        var values = {};
        inputs.each(function() {
            values[this.name] = $(this).val().trim();
        });
        var selected_technicians = [];
        $("input[name='Secondary_Technicians[]']:checked").each(function (e) {
            selected_technicians.push($(this).val())
        })
        values["Secondary_Technicians"]=selected_technicians.join(",")
        values['Customer_ID']=$(this).find("#site_customer_id").val().trim();
        values['Primary_Technician']=$(this).find("#primary_technician_id").val().trim();
        values['Supervisor_ID']=$(this).find("#supervisor_id option:selected").val().trim();
        values['Supervisor_name']=values['Supervisor_ID']!="default"?$(this).find("#supervisor_id option:selected").text().trim():"";
        console.log(values['supervisor_ID']);
        var latLon=$("#map_latLon").val().trim();
        latLon=latLon.split(",");
        values['Location_Lat']=latLon[0];
        values['Location_Long']=latLon[1];
        var primary_technician_name=$(this).find("#primary_technician_id option:selected").text();
        var primary_technician_phone=$(this).find("#primary_technician_id option:selected").attr("data-phone");
        var api_url=(values["site_form_action"]!="add")?"UpdateSite":"AddSite";
        
       

        if($(this).validationEngine('validate')){
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/'+api_url,
                data: values,
                success: function(data){
                    if(data!=false) {
                        if(typeof data != "boolean" && data.includes('already exists')){
                            swal({
                                text: data,
                                icon: "error",
                            })
                        }else{
                            if (values["site_form_action"] != "add") {
                                toggle_result_div("site", "updated", "success");
                                var parent_row = $("#siteRow_" + values["ID"]);
                                $(parent_row).find(".li-name").html(values["Name"]);
                                $(parent_row).find(".site_id_td").html(values["ID"]);
                                $(parent_row).find(".site_phone_td").html(values["Phone"]);
                                $(parent_row).find(".site_address_td").html(values["Address"]);
                                $(parent_row).find(".site_technicianName_td").html(primary_technician_name);
                                $(parent_row).find(".site_technicianPhone_td").html(primary_technician_phone);
                                $(parent_row).find(".site_city_td").val(values["City"]);
                                $(parent_row).find(".site_latLng_td").val(latLon);
                                $(parent_row).find(".site_secondaryTechnicians_td").val(values["Secondary_Technicians"]);
                                $(parent_row).find(".site_primaryTechnician_td").val(values["Primary_Technician"]);
                                $(parent_row).find(".site_customerID_td").val(values['Customer_ID'])
                                //Supervisor_name site_supervisor_id_td
                                $(parent_row).find(".site_supervisor_td").text(values['Supervisor_name'])
                                $(parent_row).find(".site_supervisor_id_td").text(values['Supervisor_ID'])


                            } else {
                                var added_tr = "<tr class='data-found' id='siteRow_" + data + "'>" +
                                    '<td class=" left-align lg-col" ><div class="li-name">' + values["Name"] + '</div></td>' +
                                    '<td class=" site_id_td center" >' + data + '</td>' +
                                    '<td class=" site_address_td left-align" >' + values["Address"] + '</td>' +
                                    '<td class=" site_phone_td left-align" >' + values["Supervisor_name"] + '</td>' +
                                    '<td class=" site_trapCount_td center" >0</td>' +
                                    '<td class=" site_technicianName_td left-align mmd-col" >' + primary_technician_name + '</td>' +
                                    '<td class=" site_technicianPhone_td left-align mmd-col" >' + primary_technician_phone + '</td>' +
                                    '<input type="hidden" class="site_primaryTechnician_td" value="' + values['Primary_Technician'] + '"/>' +
                                    '<input type="hidden" class="site_customerID_td" value="' + values['Customer_ID'] + '"/>' +
                                    '<input type="hidden" class="site_latLng_td" value="' + latLon + '"/>' +
                                    '<input type="hidden" class="site_city_td" value="' + values['City'] + '"/>' +
                                    '<input type="hidden" class="site_secondaryTechnicians_td" value="' + values['Secondary_Technicians'] + '"/>' +
                                    ' <td class="action right-align">' +
                                    ' <div class="dropdown" data-toggle="dropdown">' +
                                    '<a class="ropdown-toggle" href="javascript:void[0]" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '  <span class="fa fa-ellipsis-v"></span>' +
                                    '</a>' +
                                    ' <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                                    ' <a class="dropdown-item edit-site" onclick="edit_site(this)" id="editsite_' + data + '" href="javascript:void[0]">Edit</a>' +
                                    ' <a class="dropdown-item delete delete-site" onclick="delete_site(this)" id="deletesite_' + data + '" href="javascript:void[0]">Delete</a>' +
                                    ' </div>' +
                                    '</div>' +
                                    '</td>' +
                                    "</tr>";
                                $("#sites-table").find(".no-data-added").hide();
                                $(added_tr).prependTo("#sites-table > tbody");
                                toggle_result_div("site", "added", "success");
                            }
                            $("#map_latLon").val("24.4713203,39.7576454");
                            toggle_sites_form("close");
                    }
                    }else {
                        if(values["ID"]!="")
                            toggle_result_div("site","updating","danger");
                        else
                            toggle_result_div("site","adding","danger");
                        }

                }
            });
        }
    });

    $(".add-site-btn").click(function () {
        $(".add-site-form").find('input:not([type=checkbox])').val("");
        $(".selected-values").html("");
        // secondaryTechnicians_elements =$(_targeted_form).find(":checkbox");
        $.each( $(".add-site-form").find(":checkbox"), function( e ) {
            $(this).attr("checked",false);
        });
        $(".add-site-form").find('select').val("");
        $(".add-site-form").find(".form-head").html("Add site");
        $("#add-site-form").find("#site_id").removeAttr("disabled");

        $("#add-site-form").find('#site_form_action').val("add")
        toggle_sites_form("open");
    });

    $("#cancel_add_sites").click(function () {
        toggle_sites_form("close");
    });
    if(logged_user_type==1) {
        $("#site_name").on("keyup", function () {
            $("#spinner-site-name").show();
            $("#hint-site-name").hide();
        });
        $("#site_id").on("keyup", function () {
            $("#spinner-site-id").show();
            $("#hint-site-id").hide();
        });
    }
    $("#site_name").on("blur",function () {
        var form_action=$(this).closest("form").find("#form_action").val();
        var item_id=$(this).closest("form").find("#site_old_id").val();
        if($(this).validationEngine('validate') && logged_user_type==1){
            check_item_exists("site",this,item_id,'name',form_action);
        }
    });
  $("#site_id").on("blur",function () {
        var form_action=$(this).closest("form").find("#form_action").val();
        var item_id=$(this).closest("form").find("#site_old_id").val();
        if($(this).validationEngine('validate') && logged_user_type==1) check_item_exists("site",this,item_id,'id',form_action);
    });
    $("#site_customer_id").change(function () {
        var _id=$(this).val();
        fill_tech_data(_id);

    });
    // 3-technicians actions
    $("#add-technician-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input');
        var values = {};
        inputs.each(function() {
            values[this.name] = $(this).val().trim();
        });
        values['Role']=$(this).find("#technician_role").val().trim();
        values['Status']=$(this).find("#technician_status").val().trim();
        values['Supplier_ID']=$(this).find("#tech_supplier_id").val().trim();
        if(values["Password"]!="")values['Password']=AESEncryption(values['Password']);
        var role_txt=$(this).find("#technician_role option:selected").text();
        var api_url=(values["ID"]!="")?"UpdateTechnician":"AddTechnician";
        if($(this).validationEngine('validate')){
        $.ajax({
            type: "POST",
            url: BASE_API_URL+'/UserDashboard/'+api_url,
            data: values,
            success: function(data){
                // console.log(typeof data )
                if(data!=false){
                    if(typeof data != "boolean" && data.includes('already exists')){
                            swal({
                                text: data,
                                icon: "error",
                            })
                    }
                else{
                    if(values["ID"].length>0){
                        toggle_result_div("technician","updated","success");
                        var parent_row=$("#technicianRow_"+values["ID"]);
                        $(parent_row).find(".li-name").html(values["Name"]);
                        $(parent_row).find(".technician_id_td").html(values["ID"]);
                        $(parent_row).find(".technician_phone_td").html(values["Phone"]);
                        $(parent_row).find(".technician_email_td").html(values["Email"]);
                        $(parent_row).find(".technician_username_td").html(values["User_Name"]);
                        $(parent_row).find(".technician_role_td").html(role_txt);
                        $(parent_row).find(".technician_status_td").val($("#technician_status").val());
                        $(parent_row).find(".technician_supplierID_td").val(values['Supplier_ID']);
                        $(parent_row).find(".technician_password_td").val(values['Password']);

                    }else{
                        var added_tr="<tr class='data-found' id='technicianRow_"+data+"'>"+
                            '<td class=" left-align lg-col" ><div class="li-name">'+values["Name"]+'</div></td>'+
                            '<td class=" technician_id_td center" >'+data+'</td>'+
                            '<td class=" technician_phone_td left-align" >'+values["Phone"]+'</td>'+
                            '<td class=" technician_role_td center" >'+role_txt+'</td>'+
                            '<td class=" technician_email_td left-align lg-col" >'+values["Email"]+'</td>'+
                            '<td class=" technician_username_td left-align" >'+values["User_Name"]+'</td>'+
                            '<input type="hidden" class="technician_role_value" value="'+values["Role"]+'"/>'+
                            '<input type="hidden" class="technician_status_td" name="technician_status_td" value="'+$("#technician_status").val()+'">'+
                            '<input type="hidden" class="technician_supplierID_td" value="'+values["Supplier_ID"]+'"/>'+
                            '<input type="hidden" class="technician_password_td" value="'+values["Password"]+'"/>'+

                            ' <td class="action right-align">' +
                            ' <div class="dropdown" data-toggle="dropdown">' +
                            '<a class="ropdown-toggle" href="javascript:void[0]" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                            '  <span class="fa fa-ellipsis-v"></span>' +
                            '</a>'+
                            ' <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                            ' <a class="dropdown-item edit-technician" onclick="edit_technician(this)" id="edittechnician_'+ data+'" href="javascript:void[0]">Edit</a>' +
                            ' <a class="dropdown-item delete delete-technician" onclick="delete_technician(this)" id="deletetechnician_'+data+'" href="javascript:void[0]">Delete</a>' +
                            ' </div>' +
                            '</div>' +
                            '</td>'+
                            "</tr>";
                        $("#technicians-table").find(".no-data-added").hide();
                        $(added_tr).prependTo("#technicians-table > tbody");
                        toggle_result_div("technician","added","success");
                        // $("#primary_technician_id").append("<option value='"+data+"'>"+values["Name"]+"</option>")
                        //
                        // $("#custom-select-option-box").append("<div class='custom-select-option' onclick='handle_multiselect_techniciansDD(this)'>" +
                        //     "<input type='checkbox' data-tech-name='"+values["Name"]+"' value='"+data+"' class='custom-select-option-checkbox' name='Secondary_Technicians[]'>" +
                        //     "<label class='prim-tech'>"+values['Name']+"</label></div>")
                    }
                    toggle_technicians_form("close");
                }

                }else {
                    if(values["ID"]!="")
                        toggle_result_div("technician","updating","danger");
                    else
                        toggle_result_div("technician","adding","danger");
                    }

            }
        });
        }
    });

    $(".add-technician-btn").click(function () {
        $(".add-technician-form").find('input').val("");
        if(logged_user_type==1)$(".add-technician-form").find('select').val("");
        $(".add-technician-form").find(".form-head").html("Add technician");
        if(! $("#technician_password").hasClass("validate[required]"))$("#technician_password").addClass("validate[required]")
        toggle_technicians_form("open");
    });
        $("#cancel_add_technician").click(function () {
            toggle_technicians_form("close");
        });
    if(logged_user_type==1) {
        $("#technician_email").on("keyup", function () {
            $("#spinner-technician").show();
            $("#hint-technician").hide();
        });
    }
    $("#technician_email").on("blur",function () {
        var item_id=$(this).closest("form").find("#technician_ID").val();
        if($(this).validationEngine('validate') && logged_user_type==1) {
            check_item_exists("technician",this,item_id);
        }
        });

    //4-suppliers actions
    $("#add-supplier-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input');
        var values = {};
        inputs.each(function() {
            values[this.name] = $(this).val().trim();
        });
        
        if(values["Password"]!="")values['Password']=AESEncryption(values['Password']);
        var api_url=(values["ID"]!="")?"UpdateSupplier":"AddSupplier";
        if($(this).validationEngine('validate')){
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/'+api_url,
                data: values,
                success: function(data){
                    // console.log(typeof data )
                    if(data!=false){
                        if(typeof data != "boolean" && data.includes('already exists')){
                            swal({
                                text: data,
                                icon: "error",
                            })
                        }
                        else{
                            if(values["ID"].length>0){
                                toggle_result_div("supplier","updated","success");
                                var parent_row=$("#supplierRow_"+values["ID"]);
                                $(parent_row).find(".li-name").html(values["Name"]);
                                $(parent_row).find(".supplier_id_td").html(values["ID"]);
                                $(parent_row).find(".supplier_phone_td").html(values["Phone"]);
                                $(parent_row).find(".supplier_email_td").html(values["Email"]);
                                $(parent_row).find(".supplier_password_td").val(values["Password"]);
                                $("#supplier_id option[value='"+values["ID"]+"']").text(values["Name"]);
                                $("#tech_supplier_id option[value='"+values["ID"]+"']").text(values["Name"]);
                            }else{
                                var added_tr="<tr class='data-found' id='supplierRow_"+data+"'>"+
                                    '<td class=" left-align lg-col" ><div class="li-name">'+values["Name"]+'</div></td>'+
                                    '<td class=" supplier_id_td center" >'+data+'</td>'+
                                    '<td class=" supplier_phone_td left-align" >'+values["Phone"]+'</td>'+
                                    '<td class=" supplier_email_td left-align lg-col" >'+values["Email"]+'</td>'+
                                    '<input type="hidden" class="supplier_password_td left-align lg-col" value="'+values["Password"]+'">'+
                                    ' <td class="action right-align">' +
                                    ' <div class="dropdown" data-toggle="dropdown">' +
                                    '<a class="ropdown-toggle" href="javascript:void[0]" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '  <span class="fa fa-ellipsis-v"></span>' +
                                    '</a>'+
                                    ' <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                                    ' <a class="dropdown-item edit-supplier" onclick="edit_supplier(this)" id="editsupplier_'+ data+'" href="javascript:void[0]">Edit</a>' +
                                    ' <a class="dropdown-item delete delete-supplier" onclick="delete_supplier(this)" id="deletesupplier_'+data+'" href="javascript:void[0]">Delete</a>' +
                                    ' </div>' +
                                    '</div>' +
                                    '</td>'+
                                    "</tr>";
                                $("#suppliers-table").find(".no-data-added").hide();
                                $(added_tr).prependTo("#suppliers-table > tbody");
                                $("#supplier_id").append("<option value='"+data+"'>"+values["Name"]+"</option>")
                                $("#tech_supplier_id").append("<option value='"+data+"'>"+values["Name"]+"</option>")
                                toggle_result_div("supplier","added","success");
                            }
                            toggle_suppliers_form("close");
                        }

                    }else {
                        if(values["ID"]!="")
                            toggle_result_div("supplier","updating","danger");
                        else
                            toggle_result_div("supplier","adding","danger");
                    }

                }
            });
        }
    });

    $(".add-supplier-btn").click(function () {
        $(".add-supplier-form").find('input').not( "#logged_user_id" ).val("");
        if(logged_user_type==1)$(".add-supplier-form").find('select').val("");
        $(".add-supplier-form").find(".form-head").html("Add supplier");
        if(! $("#supplier_password").hasClass("validate[required]"))$("#supplier_password").addClass("validate[required]")
        toggle_suppliers_form("open");
    });
    $("#cancel_add_supplier").click(function () {
        toggle_suppliers_form("close");
    });

    

    if(logged_user_type==1) {
        $("#supplier_email").on("keyup", function () {
            $("#spinner-supplier").show();
            $("#hint-supplier").hide();
        });
    }
    $("#supplier_email").on("blur",function () {
        var item_id=$(this).closest("form").find("#form_supplier_id").val();
        // console.log(item_id)
        if($(this).validationEngine('validate') && logged_user_type==1) {
            check_item_exists("supplier",this,item_id);
        }
    });


// supervisor actions
    $("#add-supervisor-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input');
        var values = {};
        inputs.each(function() {
            values[this.name] = $(this).val().trim();

        });
        console.log(values["Supervisor_ID"]);
       
        if(values["Password"]!="")values['Password']=AESEncryption(values['Password']);
        var api_url=(values["ID"]!="")?"UpdateSupervisor":"AddSupervisor";
        if($(this).validationEngine('validate')){
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/'+api_url,
                data: values,
                success: function(data){
                     console.log("finally0" );
                    if(data!=false){
                        console.log("finally4" );
                        if(typeof data != "boolean" && data.includes('already exists')){
                            
            console.log("finally1");
                            swal({
                                text: data,
                                icon: "error",
                            })
                        }
                        else{
                            if(values["ID"].length>0){
                                
            console.log("finally2");
                                toggle_result_div("supervisor","updated","success");
                                var parent_row=$("#supervisorRow_"+values["ID"]);
                                $(parent_row).find(".li-name").html(values["Name"]);
                                $(parent_row).find(".supervisor_id_td").html(values["ID"]);
                                $(parent_row).find(".supervisor_phone_td").html(values["Phone"]);
                                $(parent_row).find(".supervisor_email_td").html(values["Email"]);
                                $(parent_row).find(".supervisor_password_td").val(values["Password"]);
                                $("#supervisor_id option[value='"+values["ID"]+"']").text(values["Name"]);
                                $("#tech_supervisor_id option[value='"+values["ID"]+"']").text(values["Name"]);
                            }else{
                                
            console.log("finally3");
                                var added_tr="<tr class='data-found' id='supervisorRow_"+data+"'>"+
                                    '<td class=" left-align lg-col" ><div class="li-name">'+values["Name"]+'</div></td>'+
                                    '<td class=" supervisor_id_td center" >'+data+'</td>'+
                                    '<td class=" supervisor_phone_td left-align" >'+values["Phone"]+'</td>'+
                                    '<td class=" supervisor_email_td left-align lg-col" >'+values["Email"]+'</td>'+
                                    '<input type="hidden" class="supervisor_password_td left-align lg-col" value="'+values["Password"]+'">'+
                                    ' <td class="action right-align">' +
                                    ' <div class="dropdown" data-toggle="dropdown">' +
                                    '<a class="ropdown-toggle" href="javascript:void[0]" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '  <span class="fa fa-ellipsis-v"></span>' +
                                    '</a>'+
                                    ' <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                                    ' <a class="dropdown-item edit-supervisor" onclick="edit_supervisor(this)" id="editsupervisor_'+ data+'" href="javascript:void[0]">Edit</a>' +
                                    ' <a class="dropdown-item delete delete-supervisor" onclick="delete_supervisor(this)" id="deletesupervisor_'+data+'" href="javascript:void[0]">Delete</a>' +
                                    ' </div>' +
                                    '</div>' +
                                    '</td>'+
                                    "</tr>";
                                $("#supervisors-table").find(".no-data-added").hide();
                                $(added_tr).prependTo("#supervisors-table > tbody");
                                $("#supervisor_id").append("<option value='"+data+"'>"+values["Name"]+"</option>")
                                $("#tech_supervisor_id").append("<option value='"+data+"'>"+values["Name"]+"</option>")
                                toggle_result_div("supervisor","added","success");
                            }
                            toggle_supervisors_form("close");
                        }

                    }else {
                        
                     console.log("finally6" );
                        if(values["ID"]!="")
                            toggle_result_div("supervisor","updating","danger");
                        else
                            toggle_result_div("supervisor","adding","danger");
                    }

                }
            });
        }
    });

    $(".add-supervisor-btn").click(function () {
        $(".add-supervisor-form").find('input').not( "#logged_user_idd" ).val("");
        if(logged_user_type==1)$(".add-supervisor-form").find('select').val("");
        $(".add-supervisor-form").find(".form-head").html("Add supervisor");
        if(! $("#supervisor_password").hasClass("validate[required]"))$("#supervisor_password").addClass("validate[required]")
        toggle_supervisors_form("open");
    });
    $("#cancel_add_supervisor").click(function () {
        toggle_supervisors_form("close");
    });
    // contact us
    $("#add-contact-form").submit(function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var inputs = $(this).find('input, textarea');
        var values = {};
       
        inputs.each(function() {
            values[this.name] = $(this).val();
        });
        if($(this).validationEngine('validate')) {

            $.ajax({
                type: "POST",
                url: BASE_API_URL + '/ContactUs/AddContactUs/',
                data: values,
                success: function (data) {
                    if (data) {
                        $(inputs).each(function() {
                            if(this.name !='Email' && this.name !='Name')  $(this).val("");
                        });
                        $(".contact-result").addClass("alert-success").text("Thank you for contacting us.").show();
                        setTimeout(function() { $(".contact-result").hide(1000); }, 10000);
                    } else{
                        $(".contact-result").addClass("alert-danger").text("Sorry, something went wrong.").show();
                        setTimeout(function() { $(".contact-result").hide(1000); }, 10000);
                    }
                }
            });
        };
    });
// issues PAGE
    $(".issue-row td:not(:last-child)").click(function () {
        $("#issue-contact").hide();
        $(".notes-col").hide();
        parent_row=$(this).closest('tr');
        // $(parent_row).css("background","#38b5ed")
        // $(parent_row).find("td").css("color","#FFFFFF")
        $("#issues-table tr").removeClass("highlight");
        $(parent_row).addClass("highlight");
        $("#issue_notes_details").val($(parent_row).find(".issue_notes_td").html())
        img_src=$(parent_row).find(".base64string").val()
        no_img_src=$(".no_image").val()
        // console.log(img_src)
        if(img_src!=''){
            setBase64ToImage(img_src);
        }
        else {
            $(".issue-img").attr('src',no_img_src)
        }
        $(".issues-list").removeClass("col-md-12").addClass("col-md-9");
        $("#issue-details").show();

    });
    $(".issue-img-link").click(function () {
        img_src=$(this).find("img").attr("src");
        $("#pictureModal").find(".modal-img").attr("src",img_src)
        $('#pictureModal').modal('show');

    });
    $(".contact-russel").click(function () {
        $(".issues-list").removeClass("col-md-12").addClass("col-md-9");
        $("#issue-contact").show();
        $("#issue-details").hide();

    });
    $("#cancel_contact_issue").click(function () {
        $(".issues-list").removeClass("col-md-9").addClass("col-md-12");
        $("#issue-contact").hide();
    });
    $("#cancel_issue_details").click(function () {
        $(".notes-col").show();
        $(".issues-list").removeClass("col-md-9").addClass("col-md-12");
        $("#issue-details").hide();

    });
    $("#contact-issue-form").on('submit', function (e) {
        e.preventDefault();
        // get all the inputs into an array.
        var content = $(this).find('textarea').val();
        var owner_mail = $(this).find('#owner_mail').val();
        if($(this).validationEngine('validate')) {
            $("#spinner-contact").show();
            $.ajax({
                type: "POST",
                url: BASE_URL + '/reply_issue',
                data: {
                    'content_msg':content,
                    'owner_mail':owner_mail,
                    "_token": $('#token').val()
                },
                success: function (data) {
                    if (data==1) {
                        $("#spinner-contact").hide();
                        $("#contact_issue_details").val("");
                        $(".contact-issue-result").addClass("alert-success").text("Thank you for contacting Russel.").show();
                        setTimeout(function() { $(".contact-issue-result").hide(1000); }, 10000);
                    } else{
                        $(".contact-issue-result").addClass("alert-danger").text("Sorry, something went wrong.").show();
                        setTimeout(function() { $(".contact-issue-result").hide(1000); }, 10000);
                    }
                }
            });
        };
    });
    // contact details
    $(".contact-row td").click(function () {
        var parent_row=$(this).closest(".contact-row");
        var msg_details=$(parent_row).find(".msg-details").val()
        $(".contact-list").removeClass("col-md-12").addClass("col-md-9");
        $("#contact-details").find(".contact-name").val($(parent_row).find(".contact_name_td .li-name").html())
        $("#contact-details").find(".contact-phone").val($(parent_row).find(".contact_phone_td").html())
        $("#contact-details").find(".contact-email").val($(parent_row).find(".contact_email_td .li-name").html())
        $("#contact-details").find(".contact-subject").val($(parent_row).find(".contact_subject_td").html())
        $("#contact-details").find("#contact_details").val(msg_details)
        $("#contact-details").show();

    });
    $("#cancel_contact_details").click(function () {
        $(".contact-list").removeClass("col-md-9").addClass("col-md-12");
        $("#contact-details").hide();
    });
    $("#technician_list").on('change', function (e) {
        if($(this).val() !="")$(".tech_assign").removeAttr("disabled")
    });
    $(".trap-row").click(function () {
        $(".tables-content").removeClass("col-md-12").addClass("col-md-9");
        site_name=$(this).find(".siteName").val();
        customer_name=$(this).find(".customer-name").val();
        install_date=$(this).find(".installDate").val();
        upcoming_schedule=$(this).find(".upcomingSchedule").val();
        $("#trap-details").find(".site-name").html(site_name)
        $("#trap-details").find(".details-customer-name").html(customer_name)
        $("#trap-details").find(".details-installDate").html(install_date)
        $("#trap-details").find(".details-upcomingSchedule").html(upcoming_schedule)
        $("#trap-details").show();
    });
    $("#cancel_trap_details").click(function () {
        $(".tables-content").removeClass("col-md-9").addClass("col-md-12");
        $("#trap-details").hide();
    });
    $('#table-tap-nav a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        activeTab = e.target;
        if($(activeTab).attr('id') !='nav-trap')
            $(".tables-content").removeClass("col-md-9").addClass("col-md-12");
    })
});
function AESEncryption(message) {

    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    var encryptedData = CryptoJS.AES.encrypt(message, key, { iv: iv });
    return encryptedData.toString();
}
function AESDeccryption(message) {

    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    var encryptedData = CryptoJS.AES.decrypt(message, key, { iv: iv });
    return encryptedData.toString(CryptoJS.enc.Utf8);
}
function toggle_customers_form(action) {
    if(action=="open"){
        // initMap()
        toggle_customers_sites("close");
        toggle_technicians_form("close");
        toggle_sites_form("close");
        toggle_supervisors_form("close");
        toggle_suppliers_form("close");
        $(".customers-list").removeClass("col-md-12").addClass("col-md-9");
        $("#hint-customer-email").html("");
        $("#hint-customer-id").html("");
        $(".add-customer-form").show();
    }else{
        $(".customers-list").removeClass("col-md-9").addClass("col-md-12");
        $(".add-customer-form").hide();
    }
}
function toggle_sites_form(action) {
    if(action=="open"){
        toggle_technicians_form("close");
        toggle_customers_form("close");
        toggle_customers_sites("close");
        toggle_suppliers_form('close');
        toggle_supervisors_form("close");
        // initMap();
        $("#hint-site-name").html("");
        $("#hint-site-id").html("");
        $(".sites-list").removeClass("col-md-12").addClass("col-md-9");
        $(".add-site-form").show();
    }else{
        $(".sites-list").removeClass("col-md-9").addClass("col-md-12");
        $(".add-site-form").hide();
    }
}
function toggle_technicians_form(action) {
    if(action=="open"){
        toggle_customers_sites("close");
        toggle_customers_form("close");
        toggle_sites_form("close");
        toggle_suppliers_form('close');
        toggle_supervisors_form("close");
        $("#hint-technician").html("");
        $(".technicians-list").removeClass("col-md-12").addClass("col-md-9");
        $(".add-technician-form").show();
    }else{
        $(".technicians-list").removeClass("col-md-9").addClass("col-md-12");
        $(".add-technician-form").hide();
    }
}
function toggle_customers_sites(action) {
    console.log("yes");
    if(action=="open"){
        toggle_sites_form("close");
        toggle_technicians_form("close");
        toggle_customers_form("close");
        toggle_suppliers_form('close');
        toggle_supervisors_form("close");
        $(".customers-list").removeClass("col-md-12").addClass("col-md-9");
        $("#customer-sites").show();
    }else{
        $(".customers-list").removeClass("col-md-9").addClass("col-md-12");
        $("#customer-sites").hide();
    }
}
function toggle_suppliers_form(action) {
    if(action=="open"){
        toggle_customers_sites("close");
        toggle_customers_form("close");
        toggle_sites_form("close");
        toggle_technicians_form("close");
        toggle_supervisors_form("close");
        $("#hint-supplier").html("");
        $(".suppliers-list").removeClass("col-md-12").addClass("col-md-9");
        $(".add-supplier-form").show();
    }else{
        $(".suppliers-list").removeClass("col-md-9").addClass("col-md-12");
        $(".add-supplier-form").hide();
    }
}

function toggle_supervisors_form(action) {
    
    if(action=="open"){
        toggle_customers_sites("close");
        toggle_customers_form("close");
        toggle_sites_form("close");
        toggle_technicians_form("close");
        toggle_suppliers_form("close");
        $("#hint-supervisor").html("");
        $(".supervisors-list").removeClass("col-md-12").addClass("col-md-9");
        $(".add-supervisor-form").show();
    }else{
        $(".supervisors-list").removeClass("col-md-9").addClass("col-md-12");
        $(".add-supervisor-form").hide();
    }
}

function edit_customer(e) {
    var parent_row=$(e).closest("tr")
    var customer_name=$(parent_row).find(".li-name").html();
    var address=$(parent_row).find(".customer_address_td").html();
    var phone=$(parent_row).find(".customer_phone_td").html();
    var email=$(parent_row).find(".customer_email_td").html();
    var website=$(parent_row).find(".customer_website_td").val();
    var supplier_id=$(parent_row).find(".customer_supplierID_td").val();
    var customer_latLng=$(parent_row).find(".customer_latLng_td").val();
    var customer_id=$(parent_row).find(".customer_id_td").val();
    $("#add-customer-form").find("#customer_name").val(customer_name);
    $("#add-customer-form").find("#customer_address").val(address);
    $("#add-customer-form").find("#customer_email").val(email);
    $("#add-customer-form").find("#customer_phone").val(phone);
    $("#add-customer-form").find("#customer_website").val(website);
    $("#add-customer-form").find("#customer_id").val(customer_id).attr("disabled","true");
    $("#add-customer-form").find("#old_customer_id").val(customer_id);
    $("#add-customer-form").find("#supplier_id").val(supplier_id);
    $("#add-customer-form").find('#form_action').val("edit")

    $("#map_latLon").val(customer_latLng);
    $(".add-customer-form").find(".form-head").html("Edit customer");
    toggle_customers_form("open");
}
function delete_customer(e) {
    swal({
        title: "Are you sure you want to delete this customer?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            var customer_id = $(e).attr("id");
            customer_id = customer_id.split(/_(.+)/)[1]
            var parent_row = $(e).closest("tr")
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/DeleteCustomer',
                data: {CustomerID: customer_id},
                success: function(data){
                    if(data=="Customer is exist in site"){
                        toggle_result_div("customer","deleting","danger",1);
                    }
                    else if(data==true){
                        $(parent_row).hide(1000);
                        if($("#customers-table").find(".data-found:visible").length==0)$(".no-data-added").show();
                        toggle_result_div("customer","deleted","success");
                        $("#site_customer_id option[value='"+customer_id+"']").remove();

                    }else {
                         toggle_result_div("customer","deleting","danger");
                     }

                }
            });
    }
    });
}
function edit_technician(e) {
    if($("#technician_password").hasClass("validate[required]"))$("#technician_password").removeClass("validate[required]")
    var technician_id=$(e).attr("id");
    technician_id=technician_id.split(/_(.+)/)[1]
    $("input#customer_id").val(technician_id)
    var parent_row=$(e).closest("tr")
    var technician_name=$(parent_row).find(".li-name").html();
    var username=$(parent_row).find(".technician_username_td").html();
    var phone=$(parent_row).find(".technician_phone_td").html();
    var email=$(parent_row).find(".technician_email_td").html();
    var status=$(parent_row).find(".technician_status_td").val();
    var role=$(parent_row).find(".technician_role_value").val();
    var supplier_id=$(parent_row).find(".technician_supplierID_td").val();
    // console.log(supplier_id)
    var customer_latLng=$(parent_row).find(".technician_latLng_td").val();
    var tech_password=$(parent_row).find(".technician_password_td").val();
    var _targeted_form= $("#add-technician-form");
    $(_targeted_form).find("#technician_name").val(technician_name);
    $(_targeted_form).find("#technician_username").val(username);
    $(_targeted_form).find("#technician_email").val(email);
    $(_targeted_form).find("#technician_phone").val(phone);
    $(_targeted_form).find("#technician_status").val(status);
    $(_targeted_form).find("#technician_role").val(role)
    $(_targeted_form).find("#technician_id").val(technician_id);
    $(_targeted_form).find("#tech_supplier_id").val(supplier_id);
    $(_targeted_form).find("#technician_password").val(AESDeccryption(tech_password));
    $(_targeted_form).find("#confirm_password").val(AESDeccryption(tech_password));
    $(".add-technician-form").find(".form-head").html("Edit technician");
    toggle_technicians_form("open");

}
function delete_technician(e) {
    swal({
        title: "Are you sure you want to delete this Supplier?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            var technician_id = $(e).attr("id");
            technician_id = technician_id.split(/_(.+)/)[1]
            var parent_row = $(e).closest("tr")
            $.ajax({
                type: "POST",
                url: BASE_API_URL+'/UserDashboard/DeleteTechnician',
                data: {TechnicianID: technician_id},
                success: function(data){
                    if(data=="Technician is exist in site"){
                        toggle_result_div("technician","deleting","danger",1);
                    }
                    else if(data==true){
                        $(parent_row).hide(1000);
                        if($("#technicians-table").find(".data-found:visible").length==0)$(".no-data-added").show();
                        toggle_result_div("technician","deleted","success");
                        $("#primary_technician_id option[value='"+technician_id+"']").remove();
                        $("#custom-select-option-box input[type=checkbox][value='"+technician_id+"']").closest(".custom-select-option").remove();

                    }else {
                        toggle_result_div("technician","deleting","danger");
                    }

                }
            });
        }
    });

}
function edit_supplier(e) {
    if($("#supplier_password").hasClass("validate[required]"))$("#supplier_password").removeClass("validate[required]")
    var supplier_id=$(e).attr("id");
    supplier_id=supplier_id.split(/_(.+)/)[1]
    var parent_row=$(e).closest("tr")
    var supplier_name=$(parent_row).find(".li-name").html();
    var phone=$(parent_row).find(".supplier_phone_td").html();
    var email=$(parent_row).find(".supplier_email_td").html();
    // console.log(supplier_id)
    var supplier_password=$(parent_row).find(".supplier_password_td").val();
    var _targeted_form= $("#add-supplier-form");
    $(_targeted_form).find("#supplier_name").val(supplier_name);
    $(_targeted_form).find("#supplier_email").val(email);
    $(_targeted_form).find("#supplier_phone").val(phone);
    $(_targeted_form).find("#form_supplier_id").val(supplier_id);
    $(_targeted_form).find("#supplier_password").val(AESDeccryption(supplier_password));
    $(_targeted_form).find("#confirm_supplier_password").val(AESDeccryption(supplier_password));
    $(".add-supplier-form").find(".form-head").html("Edit supplier");
    toggle_suppliers_form("open");

}
function delete_supplier(e) {
    swal({
        title: "Are you sure you want to delete this Supplier?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var supplier_id = $(e).attr("id");
                supplier_id = supplier_id.split(/_(.+)/)[1]
                var parent_row = $(e).closest("tr")
                $.ajax({
                    type: "POST",
                    url: BASE_API_URL+'/UserDashboard/DeleteSupplier',
                    data: {supplierID: supplier_id},
                    success: function(data){
                        if(typeof data != "boolean" && data.includes("Supplier can't be deleted")){
                            toggle_result_div("supplier","deleting","danger",1,data);
                        }
                        else if(data==true){
                            $(parent_row).hide(1000);
                            if($("#suppliers-table").find(".data-found:visible").length==0)$(".no-data-added").show();
                            $("#supplier_id option[value='"+supplier_id+"']").remove();
                            $("#tech_supplier_id option[value='"+supplier_id+"']").remove();

                        toggle_result_div("supplier","deleted","success");
                        }else {
                            toggle_result_div("supplier","deleting","danger");
                        }

                    }
                });
            }
        });

}

function edit_supervisor(e) {
    if($("#supervisor_password").hasClass("validate[required]"))$("#supervisor_password").removeClass("validate[required]")
    var supervisor_id=$(e).attr("id");
    supervisor_id=supervisor_id.split(/_(.+)/)[1]
    var parent_row=$(e).closest("tr")
    var supervisor_name=$(parent_row).find(".li-name").html();
    var phone=$(parent_row).find(".supervisor_phone_td").html();
    var email=$(parent_row).find(".supervisor_email_td").html();
    // console.log(supplier_id)
    var supervisor_password=$(parent_row).find(".supervisor_password_td").val();
    var _targeted_form= $("#add-supervisor-form");
    $(_targeted_form).find("#supervisor_name").val(supervisor_name);
    $(_targeted_form).find("#supervisor_email").val(email);
    $(_targeted_form).find("#supervisor_phone").val(phone);
    $(_targeted_form).find("#form_supervisor_id").val(supervisor_id);
    $(_targeted_form).find("#supervisor_password").val(AESDeccryption(supervisor_password));
    $(_targeted_form).find("#confirm_supervisor_password").val(AESDeccryption(supervisor_password));
    $(".add-supervisor-form").find(".form-head").html("Edit supervisor");
    toggle_supervisors_form("open");
    $("#supervisor_id option[value='"+supervisor_id+"']").text(supervisor_name);

}
function delete_supervisor(e) {
    swal({
        title: "Are you sure you want to delete this Supervisor?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var supervisor_id = $(e).attr("id");
                supervisor_id = supervisor_id.split(/_(.+)/)[1]
                var parent_row = $(e).closest("tr")
                $.ajax({
                    type: "POST",
                    url: BASE_API_URL+'/UserDashboard/DeleteSupervisor',
                    data: {supervisorID: supervisor_id},
                    success: function(data){
                        if(typeof data != "boolean" && data.includes("Supervisor is still attached to site")){
                            toggle_result_div("supervisor","deleting","danger",1,data);
                        }
                        else if(data==true){
                            $(parent_row).hide(1000);
                            if($("#supervisors-table").find(".data-found:visible").length==0)$(".no-data-added").show();
                            $("#supervisor_id option[value='"+supervisor_id+"']").remove();
                            $("#tech_supervisor_id option[value='"+supervisor_id+"']").remove();

                        toggle_result_div("supervisor","deleted","success");
                        }else {
                            toggle_result_div("supervisor","deleting","danger");
                        }

                    }
                });
            }
        });

}


function edit_site(e) {
    var site_id=$(e).attr("id");
    site_id=site_id.split(/_(.+)/)[1]
    // $("input#site_id").val(site_id)
    var parent_row=$(e).closest("tr")
    var customer_id=$(parent_row).find(".site_customerID_td").val();
    var site_name=$(parent_row).find(".li-name").html();
    var address=$(parent_row).find(".site_address_td").html();
    var phone=$(parent_row).find(".site_phone_td").html();
    var city=$(parent_row).find(".site_city_td").val();
    var supervisor_id = $(parent_row).find(".site_supervisor_id_td").text();
    var supervisor_name = $(parent_row).find(".site_supervisor_td").text();
    var technicianName=$(parent_row).find(".site_primaryTechnician_td").val();
    var secondaryTechnicians=$(parent_row).find(".site_secondaryTechnicians_td").val();
    if(secondaryTechnicians.length>0) secondaryTechnicians=secondaryTechnicians.split(",");
    var site_latLng=$(parent_row).find(".site_latLng_td").val();
    var _targeted_form= $("#add-site-form");
    $(_targeted_form).find("#site_name").val(site_name);
    $(_targeted_form).find("#site_address").val(address);
    $(_targeted_form).find("#site_customer_id").val(customer_id);
    $(_targeted_form).find("#site_phone").val(phone);
    $(_targeted_form).find("#site_city").val(city);
    $(_targeted_form).find("#site_id").val(site_id).attr("disabled","true");
    $(_targeted_form).find("#site_old_id").val(site_id);
    
    //current_supervisors = $(_targeted_form).find("#supervisor_id").html();
    //console.log(supervisorElement);
    //console.log(current_supervisors);
    if(supervisor_id!="")
    {
        $('#supervisor_id option[value=' +supervisor_id+']').prop('selected', true);
    }
    else
    {
        $('#supervisor_id option[value=default]').prop('selected', true);
    }
    fill_supervisor_data(customer_id,function(){});
    //$(_targeted_form).find("#supervisor_id").html(supervisorElement + current_supervisors);
    $(_targeted_form).find("#site_form_action").val("edit");
    
    $("#map_latLon").val(site_latLng);
    $(".add-site-form").find(".form-head").html("Edit site");
    secondaryTechnicians_elements=[]
    var _tech_names=[];
    fill_tech_data(customer_id,technicianName,function () {
        $(_targeted_form).find("#primary_technician_id").val(technicianName);
        secondaryTechnicians_elements =$(_targeted_form).find(":checkbox");
        // console.log(secondaryTechnicians_elements.length)
        $.each( secondaryTechnicians_elements, function( e ) {
            if(secondaryTechnicians.includes($(this).val()))
            {
                // console.log("ddd")
                $(this).attr("checked",true);
                _tech_names.push($(this).attr("data-tech-name"));
            }
        });
        $(".selected-values").html(_tech_names.join(", "))
        toggle_sites_form("open");
        if(supervisor_id!="")
    {
        console.log("in");
    }
    })




}
function delete_site(e) {
    swal({
        title: "Are you sure you want to delete this site?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            var site_id = $(e).attr("id");
            site_id = site_id.split(/_(.+)/)[1]
            var parent_row = $(e).closest("tr")
            $.ajax({
                type: "POST",
                url: BASE_API_URL + '/UserDashboard/DeleteSite',
                data: {SiteID: site_id},
                success: function (data) {
                    if (data == true) {
                        $(parent_row).hide(1000);
                        if ($("#sites-table").find(".data-found:visible").length == 0) $(".no-data-added").show();
                        toggle_result_div("site", "deleted", "success");
                    } else {
                        toggle_result_div("site", "deleting", "danger");
                    }

                }
            });
        }
    });
}

function check_item_exists(type,obj,item_id=0,field_to_check,form_action) {
    value=$(obj).val().trim();
    search_array=[];
    item_text="";
    switch (type) {
        case "customer":
            var values_to_check=field_to_check=='email'?$("#customers-table").find(".customer_email_td"):$("#customers-table").find(".customer_id_td");
           // console.log(values_to_check)
            values_to_check.each(function () {
                // console.log(form_action)
                    if(form_action!='add'){
                        if($(this).closest("tr").attr("id")!="customerRow_"+item_id){
                            field_to_check=='email'?search_array.push($(this).html().trim()):search_array.push($(this).val().trim());
                        }
                    } else{
                        field_to_check=='email'?search_array.push($(this).html().trim()):search_array.push($(this).val().trim());
                    }

            });
            // console.log(search_array)

            item_text=field_to_check=='email'?"Customer email":"Customer ID";
            type=type+"-"+field_to_check;
            break;

        case "site":
            var values_to_check=field_to_check=='name'?$("#sites-table").find(".li-name"):$("#sites-table").find(".site_id_td");

            values_to_check.each(function () {
                if(form_action!='add'){
                    if(($(this).closest("tr").attr("id")!="siteRow_"+item_id)){
                        search_array.push($(this).html().trim());
                    }
                } else
                    search_array.push($(this).html().trim());
            });
            item_text=field_to_check=='name'?"Site name":"Site ID";
            type=type+"-"+field_to_check;
            break;

        case "technician":
            $("#technicians-table").find(".technician_email_td").each(function () {
                if(item_id.length>0){
                    if(($(this).closest("tr").attr("id")!="technicianRow_"+item_id)){
                        search_array.push($(this).html().trim());
                    }
                } else
                    search_array.push($(this).html().trim());
            });
            item_text="Technician email";
            break;
        case "supplier":
            $("#suppliers-table").find(".supplier_email_td").each(function () {
                if(item_id.length>0){
                    if(($(this).closest("tr").attr("id")!="supplierRow_"+item_id)){
                        search_array.push($(this).html().trim());
                    }
                } else
                    search_array.push($(this).html().trim());
            });
            item_text="Supplier email";
            break;
    }
    if(search_array.includes(value)){
        $("#hint-"+type).html("<i class='fa fa-times-circle'></i>&nbsp;"+item_text+" already exists").css("color","red");
        // $(obj).val("")
    }else{
        $("#hint-"+type).html("<i class='fa fa-check-circle'></i>&nbsp;"+item_text+" is valid").css("color","green")
    }
    $("#hint-"+type).show();
    // $(obj).removeClass("loading")
     $("#spinner-"+type).hide();
}
function toggle_result_div(type,action,status,custom_txt=false,txt='') {
    switch (status) {
        case "success":
            text=type+" "+action+" successfully";
            inverse_status="danger";
            break;
        case "danger":
            text="Error happened while "+action+" "+type;
            inverse_status="success";
            break
    }
    if(custom_txt) text=type+" can't be deleted because it's used by a site item";
    if(txt) text=txt;
    if($("div."+type+"-result").hasClass("alert-"+inverse_status)) $("div."+type+"-result").removeClass("alert-"+inverse_status)
    $("div."+type+"-result").addClass("alert-"+status).text(text).show();
    setTimeout(function() { $("div."+type+"-result").hide(1000); }, 10000);

}
function handle_multiselect_techniciansDD(e) {
    var checkboxObj = $(e).children("input:checkbox");
    $(checkboxObj).attr("checked", !checkboxObj.prop("checked"));
    var names=$(".selected-values").html();
    if($(checkboxObj).prop("checked")){
        if(names.length==0){
            $(".selected-values").html($(checkboxObj).attr("data-tech-name"));
        }else {
            $(".selected-values").html(names+", "+$(checkboxObj).attr("data-tech-name"));

        }
    }else{
        if(names.includes($(checkboxObj).attr("data-tech-name"))){
            var names=$(".selected-values").html();
            var strArray = names.split(', ');
            for (var i = 0; i < strArray.length; i++) {
                if (strArray[i] == $(checkboxObj).attr("data-tech-name")) {
                    strArray.splice(i, 1);
                }
            }
                $(".selected-values").html(strArray.join(", "))
            }
    }
}
function close_issue_case(e) {
    swal({
        title: "Are you sure you want to close this case?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            var issue_id = $(e).attr("id");
            issue_id = issue_id.split(/_(.+)/)[1]
            var parent_row = $(e).closest("tr")
            $.ajax({
                type: "GET",
                url: BASE_API_URL+'/PCOResolution/CloseCaseByAdmin',
                data: {IssueID: issue_id},
                success: function(data){
                    if(data==true){
                        $(parent_row).hide(1000);
                        toggle_result_div("case","closed","success");
                    }else {
                        toggle_result_div("case","closing","danger");
                    }

                }
            });
    }
    })
}
function prepare_tech_list(e) {
    var issue_id = $(e).attr("id");
    issue_id = issue_id.split(/_(.+)/)[1]
    $("#issue_id").val(issue_id);
    var parent_row = $(e).closest("tr");
    var serialized=$(parent_row).find(".all_tech").val();
    var tech_arr=JSON.parse(serialized);
    $("#issue_trapId").val($(parent_row).find(".issue_trapID_td").val())
    $("#technician_list").html("");
    $("#tech_notes").val("");
    $("#technician_list").append('<option value="">Select technician</option>');
    $.each(tech_arr, function( index, value ) {
        var option='<option value="'+value["techID"]+'">'+value["techName"]+'</option>'
        $("#technician_list").append(option)
    });

    $('#technicianModal').modal('show');
}
function assign_case_to_tech() {
    var tech_id=$("#technician_list").val();
    var trap_id=$("#issue_trapId").val();
    var issue_id=$("#issue_id").val();
    var tech_notes=$("#tech_notes").val();
        $.ajax({
        type: "POST",
        url: BASE_API_URL+'/PCOResolution/AssignTechnicianTask',
        data: {IssueID: issue_id,
            TechnicianID:tech_id,
            AdminNotes :tech_notes,
            TrapID:trap_id},
            success: function(data){
                if(data==true){
                    $(".tech_assign").attr("disabled", "disabled");
                    if($("#tech-assign-result").hasClass("alert-danger")) $("#tech-assign-result").removeClass("alert-danger")
                    $("#tech-assign-result").addClass("alert-success").text('Case assigned successfully').show();
                    $("#technician_list").val("");
                    $("#issue_trapId").val("");
                    $("#issue_id").val("");
                    $("#tech_notes").val("");
                    setTimeout(function() { $("#tech-assign-result").hide(1000); }, 3000);
                    setTimeout(function() {  $('#technicianModal').modal('hide'); }, 5000);

                }else {
                    if($("#tech-assign-result").hasClass("alert-success")) $("#tech-assign-result").removeClass("alert-success")
                    $("#tech-assign-result").addClass("alert-danger").text('Error happened while case assignment').show();
                    setTimeout(function() { $("#tech-assign-result").hide(1000); }, 10000);
                }

        }
    });

}
function fill_tech_data(customer_id,primary_id,callback) {
    var item_content='';
    var item_selected='';
    var sec_item_content='';
    if(customer_id!=''){
        $.ajax({
            type: "GET",
            url: BASE_API_URL+'/Dashoard/FilterCustomerByTech?',
            data: { 'FilterCustomerID':customer_id},
            success: function(data){
                if(data.length>0){
                    $("#primary_technician_id").html("");
                    $("#custom-select-option-box").html("");
                    $(".selected-values").html("");
                    $("#primary_technician_id").append('<option value="">Technician</option>');
                    $.each(data, function(index, value ) {
                        // item_selected=primary_id!=0 && primary_id==value.id?'selected':'';
                        // console.log()
                        item_content='<option data-phone="'+value.phone+'" value="'+value.id+'" '+item_selected+'>' + value.name + '</option>' ;
                        $("#primary_technician_id").append( item_content );
                        sec_item_content='<div class="custom-select-option" onclick="handle_multiselect_techniciansDD(this)">\n' +
                            '    <input name="Secondary_Technicians[]" data-tech-name="'+value.name+'" class="prim-tech-option custom-select-option-checkbox" type="checkbox" value="'+value.id+'">\n' +
                            '    <label class="prim-tech-option prim-tech" for="">\n' + value.name +
                            '    </label>\n' +
                            '</div>';
                        $("#custom-select-option-box").append(sec_item_content);
                    });
                    // callback();
                    if(callback && typeof callback === "function") {
                        callback();
                    }
                }
            },

        });
    }  else {
        $("#primary_technician_id").html("");
        $("#custom-select-option-box").html("");
        $(".selected-values").html("");
        $("#primary_technician_id").append('<option value="">Technician</option>');

    }

}



function fill_supervisor_data(customer_id,callback) {
    if(customer_id!=''){
        $.ajax({
            type: "GET",
            url: BASE_API_URL+'/Dashoard/getSupplierSupervisors?',
            data: { 'FilterCustomerID':customer_id},
            success: function(data){
                if(data.length>0){
                    $.each(data, function(index, value ) {
                    console.log("ok ajax ", value['id']);
                    $("#supervisor_id option[value='"+ value['id'] +"']").remove();
                    });
                    // callback();
                    if(callback && typeof callback === "function") {
                        callback();
                    }
                }
            },

        });
    }

}



function setBase64ToImage(baseString){

    // var baseString = $("#base64string").val().trim();
    // data:image/png;base64

    if(baseString.substring(0,4) != "data"){
        baseString = "data:image/png;base64," + baseString;
    }
    // console.log(baseString)
    $(".issue-img").prop('src',baseString);
    $(".issue-img").addClass("span12 baseurlopa2");
}