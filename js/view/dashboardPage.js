define(function(require) {
  'use strict';
  var Backbone      = require('backbone'),
      _             = require('underscore'),
      dashBoardTemplate  = require('text!../../html/dashBoard.html'),
      Layout        = require('view/layouts/dashboardLayout'),  oTable;  
	  

  var DashBoardPage = Backbone.View.extend({
    template: _.template(dashBoardTemplate),
    render: function() {
	  	  require(['jquery','jqueryui','bootstrap','jquery_validate','md5', 'store','wb_translate','underscore','highcharts','highcharts-3d','highcharts-exporting','highcharts-drilldown','xml2json','am_service'], function($){ 		
		
		  $(function(){				 
			 	renderTranslations();	
				
				
				var employeeRole = JSON.parse(sessionStorage["AbsEmployeeRole"].toString()); 
				var employeeRoles = JSON.parse(sessionStorage["AbsEmployeeRoles"].toString()); 
				
				employeeRole.SL10 == "true" ? $(".SL10").show() : $(".SL10").hide();	
				employeeRole.SL15 == "true" ? $(".SL15").show() : $(".SL15").hide();	
				employeeRole.SL20 == "true" ? $(".SL20").show() : $(".SL20").hide();	
				employeeRole.SL30 == "true" ? $(".SL30").show() : $(".SL30").hide();	
				employeeRole.SL50 == "true" ? $(".SL50").show() : $(".SL50").hide();	
				employeeRole.SL70 == "true" ? $(".SL70").show() : $(".SL70").hide();	
				employeeRole.SL97 == "true" ? $(".SL97").show() : $(".SL97").hide();	
				employeeRole.SL99 == "true" ? $(".SL99").show() : $(".SL99").hide();	
				employeeRole.SL100 == "true" ? $(".SL100").show() : $(".SL100").hide();											   					
				
				$.each(employeeRoles, function(key, val){
					store.get(val.Access) == "Y" ?  $("."+val.Item).show() : $("."+val.Item).hide();								
				});						
								
				!store.get("sGetEmpIDStorageKey") && store.get("sGetEmpIDStorageKey") === null ? ($("#IDTR").hide(), $("#IDd").html()) : ($("#IDTR").show(), $("#IDd").html(store.get("sGetEmpIDStorageKey")));		
				
			    if (store.get("sGetGenderStorageKey") == 'M'){	
			     !store.get("sGetPhotoUrlStorageKey") && store.get("sGetPhotoUrlStorageKey") === null ?  $("#img-thumbnail").attr("src","images/mdw_male.png") :  $("#img-thumbnail").attr("src",store.get("sGetPhotoUrlStorageKey"));	
				} else {
				 !store.get("sGetPhotoUrlStorageKey") && store.get("sGetPhotoUrlStorageKey") === null ?  $("#img-thumbnail").attr("src","images/mdw_female.png") :  $("#img-thumbnail").attr("src",store.get("sGetPhotoUrlStorageKey"));
				}					
				!store.get("sGetDisplayNameStorageKey") && store.get("sGetDisplayNameStorageKey") === null ? ($("#displayNameTR").hide(), $("#displayName").html()) : ($("#displayNameTR").show(), $("#displayName").html(store.get("sGetDisplayNameStorageKey")));	
				!store.get("sGetFunctionNameStorageKey") && store.get("sGetFunctionNameStorageKey") === null ? ($("#functionNameTR").hide(), $("#functionName").html()) : ($("#functionNameTR").show(), $("#functionName").html(store.get("sGetFunctionNameStorageKey")));	
			    !store.get("sGetLastSickDateStorageKey") && store.get("sGetLastSickDateStorageKey") === null ? ($("#EersteverzuimdagTR").hide(), $("#Eersteverzuimdag").html()) : ($("#EersteverzuimdagTR").show(), $("#Eersteverzuimdag").html(store.get("sGetLastSickDateStorageKey")));	
				//!store.get("sGetLastSickDateStorageKey") && store.get("sGetLastSickDateStorageKey") === null ? "" :  $("#Eersteverzuimdag").html(store.get("sGetLastSickDateStorageKey"));	
				!store.get("sGetCurrentSickDateStorageKey") && store.get("sGetCurrentSickDateStorageKey") === null ? "" :  $("#Eersteziektedag").html(store.get("sGetCurrentSickDateStorageKey"));	
				!store.get("sGetSickStatusStorageKey") && store.get("sGetSickStatusStorageKey") === null ? "" :  $("#Vangnetstatus").html(store.get("sGetSickStatusStorageKey"));//?
				!store.get("sGetLastSickDateStorageKey") && store.get("sGetLastSickDateStorageKey") === null ? "" :  $("#aanvangsdatumWIA").html(store.get("sGetLastSickDateStorageKey"));//?
				!store.get("sGetSickFrequencyStorageKey") && store.get("sGetSickFrequencyStorageKey") === null ? "" :  $("#Verzuimfrequentie").html(store.get("sGetSickFrequencyStorageKey"));
				!store.get("sGetGenderStorageKey") && store.get("sGetGenderStorageKey") === null ? "" :  $("#Geslacht").html(store.get("sGetGenderStorageKey"));
				!store.get("sGetManagerNameStorageKey") && store.get("sGetManagerNameStorageKey") === null ? "" :  $("#Manager").html(store.get("sGetManagerNameStorageKey"));
				!store.get("sGetDepartmentNameStorageKey") && store.get("sGetDepartmentNameStorageKey") === null ? "" :  $("#Department").html(store.get("sGetDepartmentNameStorageKey"));
				!store.get("sGetBirthdateStorageKey") && store.get("sGetBirthdateStorageKey") === null ? "" :  $("#Birthdate").html(store.get("sGetBirthdateStorageKey"));
				!store.get("sGetIsManagerStorageKey") && store.get("sGetIsManagerStorageKey") === null ? "" :  $("#IsManager").html(store.get("sGetIsManagerStorageKey"));
				!store.get("sGetNumberOfSickdaysStorageKey") && store.get("sGetNumberOfSickdaysStorageKey") === null ? "" :  $("#NumberOfSickdays").html(store.get("sGetNumberOfSickdaysStorageKey"));				
				!store.get("sGetSickStatusStorageKey") && store.get("sGetSickStatusStorageKey") === null ? "" :  $("#SickStatus").html(store.get("sGetSickStatusStorageKey"));				
				//employe data details				
				$('#detailsPanel').hide(); 
				$('#containerID').hide(); 
				//$('#actionID').hide(); 				
				 $(document).on("click", "#getDetails", function (evt) {			
					evt.preventDefault();	
					var sOrg = decodeURIComponent(escape(window.atob( store.get("session_Org_am_emp")))),
					sUser = decodeURIComponent(escape(window.atob( store.get("session_User_am_emp")))),
					sPass = decodeURIComponent(escape(window.atob( store.get("session_Pass_am_emp"))));
					 var $btn = $('#getDetails');
						$btn.button('loading');
						// simulating a timeout
						  $btn.button('reset');
						setTimeout(function () {
							
							absService.getEmployeeDetails(sOrg,sUser,sPass,store.get("sGetEmpIDStorageKey"));		
							
							    !store.get("sGetEmpData_Id_StorageKey") && store.get("sGetEmpData_Id_StorageKey") === null ? ($("#iDTR").hide(), $("#Id").html()) :  $("#Id").html(store.get("sGetEmpData_Id_StorageKey"));
								!store.get("sGetEmpData_Code_StorageKey") && store.get("sGetEmpData_Code_StorageKey") === null ? ($("#CodeTR").hide(), $("#Code").html()) :  $("#Code").html(store.get("sGetEmpData_Code_StorageKey"));
								!store.get("sGetEmpData_Initials_StorageKey") && store.get("sGetEmpData_Initials_StorageKey") === null ? ($("#InitialsTR").hide(), $("#Initials").html()) :  $("#Initials").html(store.get("sGetEmpData_Initials_StorageKey"));
								!store.get("sGetEmpData_Title_StorageKey") && store.get("sGetEmpData_Title_StorageKey") === null ? ($("#TitleTR").hide(), $("#Title").html()) :  $("#Title").html(store.get("sGetEmpData_Title_StorageKey"));
								!store.get("sGetEmpData_Prefix_StorageKey") && store.get("sGetEmpData_Prefix_StorageKey") === null ? ($("#PrefixTR").hide(), $("#Prefix").html()):  $("#Prefix").html(store.get("sGetEmpData_Prefix_StorageKey"));
								!store.get("sGetEmpData_Firstname_StorageKey") && store.get("sGetEmpData_Firstname_StorageKey") === null ? ($("#FirstnameTR").hide(), $("#Firstname").html()) :  $("#Firstname").html(store.get("sGetEmpData_Firstname_StorageKey"));
								!store.get("sGetEmpData_Lastname_StorageKey") && store.get("sGetEmpData_Lastname_StorageKey") === null ? ($("#LastnameTR").hide(), $("#Lastname").html())  :  $("#Lastname").html(store.get("sGetEmpData_Lastname_StorageKey"));
								
								!store.get("sGetEmpData_Street_StorageKey") && store.get("sGetEmpData_Street_StorageKey") === null ? ($("#StreetTR").hide(), $("#Street").html()) :  $("#Street").html(store.get("sGetEmpData_Street_StorageKey"));
								!store.get("sGetEmpData_Housenr_StorageKey") && store.get("sGetEmpData_Housenr_StorageKey") === null ? ($("#HousenrTR").hide(), $("#Housenr").html())  :  $("#Housenr").html(store.get("sGetEmpData_Housenr_StorageKey"));
								!store.get("sGetEmpData_Housenrsuffix_StorageKey") && store.get("sGetEmpData_Housenrsuffix_StorageKey") === null ? ($("#HousenrsuffixTR").hide(), $("#Housenrsuffix").html()) :  $("#Housenrsuffix").html(store.get("sGetEmpData_Housenrsuffix_StorageKey"));
								!store.get("sGetEmpData_Postalcode_StorageKey") && store.get("sGetEmpData_Postalcode_StorageKey") === null ? ($("#PostalcodeTR").hide(), $("#Postalcode").html()) :  $("#Postalcode").html(store.get("sGetEmpData_Postalcode_StorageKey"));
								!store.get("sGetEmpData_City_StorageKey") && store.get("sGetEmpData_City_StorageKey") === null ? ($("#CityTR").hide(), $("#City").html())  :  $("#City").html(store.get("sGetEmpData_City_StorageKey"));
								!store.get("sGetEmpData_Address_StorageKey") && store.get("sGetEmpData_Address_StorageKey") === null ? ($("#AddressTR").hide(), $("#Address").html()) :  $("#Address").html(store.get("sGetEmpData_Address_StorageKey"));
								!store.get("sGetEmpData_Country_StorageKey") && store.get("sGetEmpData_Country_StorageKey") === null ? ($("#CountryTR").hide(), $("#Country").html())  :  $("#Country").html(store.get("sGetEmpData_Country_StorageKey"));
								
								!store.get("sGetEmpData_Birthdate_StorageKey") && store.get("sGetEmpData_Birthdate_StorageKey") === null ? ($("#BirthdateTR").hide(), $("#Birthdate").html()) :  $("#Birthdate").html(store.get("sGetEmpData_Birthdate_StorageKey"));
								!store.get("sGetEmpData_Telephonenr_StorageKey") && store.get("sGetEmpData_Telephonenr_StorageKey") === null ? ($("#TelephonenrTR").hide(), $("#Telephonenr").html()) :  $("#Telephonenr").html(store.get("sGetEmpData_Telephonenr_StorageKey"));
								!store.get("sGetEmpData_WorkTelephonenr_StorageKey") && store.get("sGetEmpData_WorkTelephonenr_StorageKey") === null ? ($("#WorkTelephonenrTR").hide(), $("#WorkTelephonenr").html()) :  $("#WorkTelephonenr").html(store.get("sGetEmpData_WorkTelephonenr_StorageKey"));
								!store.get("sGetEmpData_Mobilenr_StorageKey") && store.get("sGetEmpData_Mobilenr_StorageKey") === null ? ($("#MobilenrTR").hide(), $("#Mobilenr").html()) :  $("#Mobilenr").html(store.get("sGetEmpData_Mobilenr_StorageKey"));
								
								!store.get("sGetEmpData_Gender_StorageKey") && store.get("sGetEmpData_Gender_StorageKey") === null ?  ($("#GenderTR").hide(), $("#Gender").html())  :  $("#Gender").html(store.get("sGetEmpData_Gender_StorageKey"));
								!store.get("sGetEmpData_Sofinr_StorageKey") && store.get("sGetEmpData_Sofinr_StorageKey") === null ?  ($("#SofinrTR").hide(), $("#Sofinr").html())  :  $("#Sofinr").html(store.get("sGetEmpData_Sofinr_StorageKey"));
								!store.get("sGetEmpData_Email_StorageKey") && store.get("sGetEmpData_Email_StorageKey") === null ?  ($("#EmailTR").hide(), $("#Email").html())  :  $("#Email").html(store.get("sGetEmpData_Email_StorageKey"));
								!store.get("sGetEmpData_EmailSecondary_StorageKey") && store.get("sGetEmpData_EmailSecondary_StorageKey") === null ?  ($("#EmailSecondaryTR").hide(), $("#EmailSecondary").html())  :  $("#EmailSecondary").html(store.get("sGetEmpData_EmailSecondary_StorageKey"));
								!store.get("sGetEmpData_Startdate_StorageKey") && store.get("sGetEmpData_Startdate_StorageKey") === null ?  ($("#StartdateTR").hide(), $("#Startdate").html())  :  $("#Startdate").html(store.get("sGetEmpData_Startdate_StorageKey"));
								!store.get("sGetEmpData_Department_Id_StorageKey") && store.get("sGetEmpData_Department_Id_StorageKey") === null ?  ($("#Department_IdTR").hide(), $("#Department_Id").html())  :  $("#Department_Id").html(store.get("sGetEmpData_Department_Id_StorageKey"));
								!store.get("sGetEmpData_DepartmentName_StorageKey") && store.get("sGetEmpData_DepartmentName_StorageKey") === null ?  ($("#DepartmentNameTR").hide(), $("#DepartmentName").html())  :  $("#DepartmentName").html(store.get("sGetEmpData_DepartmentName_StorageKey"));
								!store.get("sGetEmpData_Company_Id_StorageKey") && store.get("sGetEmpData_Company_Id_StorageKey") === null ?  ($("#Company_IdTR").hide(), $("#Company_Id").html())  :  $("#Company_Id").html(store.get("sGetEmpData_Company_Id_StorageKey"));
								!store.get("sGetEmpData_CompanyName_StorageKey") && store.get("sGetEmpData_CompanyName_StorageKey") === null ?  ($("#CompanyNameTR").hide(), $("#CompanyName").html())  :  $("#CompanyName").html(store.get("sGetEmpData_CompanyName_StorageKey"));
								!store.get("sGetEmpData_Function_Id_StorageKey") && store.get("sGetEmpData_Function_Id_StorageKey") === null ?  ($("#Function_IdTR").hide(), $("#Function_Id").html())  :  $("#Function_Id").html(store.get("sGetEmpData_Function_Id_StorageKey"));
								!store.get("sGetEmpData_FunctionName_StorageKey") && store.get("sGetEmpData_FunctionName_StorageKey") === null ?  ($("#FunctionNameTR").hide(), $("#FunctionName").html())  :  $("#FunctionName").html(store.get("sGetEmpData_FunctionName_StorageKey"));
								!store.get("sGetEmpData_Location_Id_StorageKey") && store.get("sGetEmpData_Location_Id_StorageKey") === null ?  ($("#Location_IdTR").hide(), $("#Location_Id").html())  :  $("#Location_Id").html(store.get("sGetEmpData_Location_Id_StorageKey"));
								!store.get("sGetEmpData_LocationName_StorageKey") && store.get("sGetEmpData_LocationName_StorageKey") === null ?  ($("#LocationNameTR").hide(), $("#LocationName").html())  :  $("#LocationName").html(store.get("sGetEmpData_LocationName_StorageKey"));
								!store.get("sGetEmpData_Maritalstatus_id_StorageKey") && store.get("sGetEmpData_Maritalstatus_id_StorageKey") === null ?  ($("#Maritalstatus_idTR").hide(), $("#Maritalstatus_id").html())  :  $("#Maritalstatus_id").html(store.get("sGetEmpData_Maritalstatus_id_StorageKey"));
								!store.get("sGetEmpData_Salutation_StorageKey") && store.get("sGetEmpData_Salutation_StorageKey") === null ?  ($("#SalutationTR").hide(), $("#Salutation").html())  :  $("#Salutation").html(store.get("sGetEmpData_Salutation_StorageKey"));
								!store.get("sGetEmpData_Clamourname_StorageKey") && store.get("sGetEmpData_Clamourname_StorageKey") === null ?  ($("#ClamournameTR").hide(), $("#Clamourname").html())  :  $("#Clamourname").html(store.get("sGetEmpData_Clamourname_StorageKey"));
								!store.get("sGetEmpData_Faxnr_StorageKey") && store.get("sGetEmpData_Faxnr_StorageKey") === null ?  ($("#FaxnrTR").hide(), $("#Faxnr").html())  :  $("#Faxnr").html(store.get("sGetEmpData_Faxnr_StorageKey"));
												
								!store.get("sGetEmpData_Hoursperweek_StorageKey") && store.get("sGetEmpData_Hoursperweek_StorageKey") === null ? ($("#HoursperweekTR").hide(), $("#Hoursperweek").html()) :  $("#Hoursperweek").html(store.get("sGetEmpData_Hoursperweek_StorageKey"));
								!store.get("sGetEmpData_Enddate_StorageKey") && store.get("sGetEmpData_Enddate_StorageKey") === null ? ($("#EnddateTR").hide(), $("#Enddate").html()) :  $("#Enddate").html(store.get("sGetEmpData_Enddate_StorageKey"));
								!store.get("sGetEmpData_External_ref_StorageKey") && store.get("sGetEmpData_External_ref_StorageKey") === null ? ($("#External_refTR").hide(), $("#External_ref").html()) :  $("#External_ref").html(store.get("sGetEmpData_External_ref_StorageKey"));
								!store.get("sGetEmpData_Spouse_StorageKey") && store.get("sGetEmpData_Spouse_StorageKey") === null ? ($("#SpouseTR").hide(), $("#Spouse").html()) :  $("#Spouse").html(store.get("sGetEmpData_Spouse_StorageKey"));
								!store.get("sGetEmpData_Nationality_StorageKey") && store.get("sGetEmpData_Nationality_StorageKey") === null ? ($("#NationalityTR").hide(), $("#Nationality").html()) :  $("#Nationality").html(store.get("sGetEmpData_Nationality_StorageKey"));
								!store.get("sGetEmpData_NickName_StorageKey") && store.get("sGetEmpData_NickName_StorageKey") === null ? ($("#NickNameTR").hide(), $("#NickName").html()) :  $("#NickName").html(store.get("sGetEmpData_NickName_StorageKey"));
								!store.get("sGetEmpData_DisplayName_StorageKey") && store.get("sGetEmpData_DisplayName_StorageKey") === null ? ($("#DisplayNameTR").hide(), $("#DisplayName").html()) :  $("#DisplayName").html(store.get("sGetEmpData_DisplayName_StorageKey"));
								
								!store.get("sGetEmpData_Partner_prefix_StorageKey") && store.get("sGetEmpData_Partner_prefix_StorageKey") === null ? ($("#Partner_prefixTR").hide(), $("#Partner_prefix").html())  :  $("#Partner_prefix").html(store.get("sGetEmpData_Partner_prefix_StorageKey"));
								!store.get("sGetEmpData_Partner_firstname_StorageKey") && store.get("sGetEmpData_Partner_firstname_StorageKey") === null ? ($("#Partner_firstnameTR").hide(), $("#Partner_firstname").html()) :  $("#Partner_firstname").html(store.get("sGetEmpData_Partner_firstname_StorageKey"));
								!store.get("sGetEmpData_Partner_lastname_StorageKey") && store.get("sGetEmpData_Partner_lastname_StorageKey") === null ? ($("#Partner_lastnameTR").hide(), $("#Partner_lastname").html())  :  $("#Partner_lastname").html(store.get("sGetEmpData_Partner_lastname_StorageKey"));
								!store.get("sGetEmpData_displayname_code_StorageKey") && store.get("sGetEmpData_displayname_code_StorageKey") === null ? ($("#displayname_codeTR").hide(), $("#displayname_code").html())  :  $("#displayname_code").html(store.get("sGetEmpData_displayname_code_StorageKey"));
								
								!store.get("sGetEmpData_Hours_monday_StorageKey") && store.get("sGetEmpData_Hours_monday_StorageKey") === null ?  ($("#Hours_mondayTR").hide(), $("#Hours_monday").html()) :  $("#Hours_monday").html(store.get("sGetEmpData_Hours_monday_StorageKey"));
								!store.get("sGetEmpData_Hours_tuesday_StorageKey") && store.get("sGetEmpData_Hours_tuesday_StorageKey") === null ?  ($("#Hours_tuesdayTR").hide(), $("#Hours_tuesday").html()) :  $("#Hours_tuesday").html(store.get("sGetEmpData_Hours_tuesday_StorageKey"));
								!store.get("sGetEmpData_Hours_wednesday_StorageKey") && store.get("sGetEmpData_Hours_wednesday_StorageKey") === null ?  ($("#Hours_wednesdayTR").hide(), $("#Hours_wednesday").html()) :  $("#Hours_wednesday").html(store.get("sGetEmpData_Hours_wednesday_StorageKey"));
								!store.get("sGetEmpData_Hours_thursday_StorageKey") && store.get("sGetEmpData_Hours_thursday_StorageKey") === null ?  ($("#Hours_thursdayTR").hide(), $("#Hours_thursday").html()) :  $("#Hours_thursday").html(store.get("sGetEmpData_Hours_thursday_StorageKey"));												
								!store.get("sGetEmpData_Hours_friday_StorageKey") && store.get("sGetEmpData_Hours_friday_StorageKey") === null ?  ($("#Hours_fridayTR").hide(), $("#Hours_friday").html()) :  $("#Hours_friday").html(store.get("sGetEmpData_Hours_friday_StorageKey"));
								!store.get("sGetEmpData_Hours_saturday_StorageKey") && store.get("sGetEmpData_Hours_saturday_StorageKey") === null ?  ($("#Hours_saturdayTR").hide(), $("#Hours_saturday").html()) :  $("#Hours_saturday").html(store.get("sGetEmpData_Hours_saturday_StorageKey"));
								!store.get("sGetEmpData_Hours_sunday_StorageKey") && store.get("sGetEmpData_Hours_sunday_StorageKey") === null ?  ($("#Hours_sundayTR").hide(), $("#Hours_sunday").html()):  $("#Hours_sunday").html(store.get("sGetEmpData_Hours_sunday_StorageKey"));
								
								!store.get("sGetEmpData_EndReason_StorageKey") && store.get("sGetEmpData_EndReason_StorageKey") === null ? ($("#EndReasonTR").hide(), $("#EndReason").html()) :  $("#EndReason").html(store.get("sGetEmpData_EndReason_StorageKey"));
								!store.get("sGetEmpData_EndTemporaryContract_StorageKey") && store.get("sGetEmpData_EndTemporaryContract_StorageKey") === null ? ($("#EndTemporaryContractTR").hide(), $("#EndTemporaryContract").html()) :  $("#EndTemporaryContract").html(store.get("sGetEmpData_EndTemporaryContract_StorageKey"));
								
								!store.get("sGetEmpData_Salary_StorageKey") && store.get("sGetEmpData_Salary_StorageKey") === null ?  ($("#SalaryTR").hide(), $("#Salary").html()) :  $("#Salary").html(store.get("sGetEmpData_Salary_StorageKey"));
								!store.get("sGetEmpData_is_manager_StorageKey") && store.get("sGetEmpData_is_manager_StorageKey") === null ?  ($("#is_managerTR").hide(), $("#is_manager").html()) :  $("#is_manager").html(store.get("sGetEmpData_is_manager_StorageKey"));
								!store.get("sGetEmpData_manager_id_StorageKey") && store.get("sGetEmpData_manager_id_StorageKey") === null ?  ($("#manager_idTR").hide(), $("#manager_id").html()) :  $("#manager_id").html(store.get("sGetEmpData_manager_id_StorageKey"));
								!store.get("sGetEmpData_manager2_id_StorageKey") && store.get("sGetEmpData_manager2_id_StorageKey") === null ?  ($("#manager2_idTR").hide(), $("#manager2_id").html()) :  $("#manager2_id").html(store.get("sGetEmpData_manager2_id_StorageKey"));
								!store.get("sGetEmpData_manager3_id_StorageKey") && store.get("sGetEmpData_manager3_id_StorageKey") === null ?  ($("#manager3_idTR").hide(), $("#manager3_id").html()) :  $("#manager3_id").html(store.get("sGetEmpData_manager3_id_StorageKey"));
								!store.get("sGetEmpData_Manager2Active_StorageKey") && store.get("sGetEmpData_Manager2Active_StorageKey") === null ?  ($("#Manager2ActiveTR").hide(), $("#Manager2Active").html()) :  $("#Manager2Active").html(store.get("sGetEmpData_Manager2Active_StorageKey"));			
								!store.get("sGetEmpData_Manager3Active_StorageKey") && store.get("sGetEmpData_Manager3Active_StorageKey") === null ?  ($("#Manager3ActiveTR").hide(), $("#Manager3Active").html()) :  $("#Manager3Active").html(store.get("sGetEmpData_Manager3Active_StorageKey"));
								!store.get("sGetEmpData_Permanent_Employment_StorageKey") && store.get("sGetEmpData_Permanent_Employment_StorageKey") === null ?  ($("#Permanent_EmploymentTR").hide(), $("#Permanent_Employment").html()) :  $("#Permanent_Employment").html(store.get("sGetEmpData_Permanent_Employment_StorageKey"));
								!store.get("sGetEmpData_Emergency_Contact_StorageKey") && store.get("sGetEmpData_Emergency_Contact_StorageKey") === null ?  ($("#Emergency_ContactTR").hide(), $("#Emergency_Contact").html()) :  $("#Emergency_Contact").html(store.get("sGetEmpData_Emergency_Contact_StorageKey"));
								
								!store.get("sGetEmpData_Emergency_PhoneNr_StorageKey") && store.get("sGetEmpData_Emergency_PhoneNr_StorageKey") === null ?  ($("#Emergency_PhoneNrTR").hide(), $("#Emergency_PhoneNr").html()) :  $("#Emergency_PhoneNr").html(store.get("sGetEmpData_Emergency_PhoneNr_StorageKey"));
								!store.get("sGetEmpData_ContractType_StorageKey") && store.get("sGetEmpData_ContractType_StorageKey") === null ?  ($("#ContractTypeTR").hide(), $("#ContractType").html()) :  $("#ContractType").html(store.get("sGetEmpData_ContractType_StorageKey"));
														
					           $('#detailsPanel').slideToggle( "slow", function(e) {});	
							   
							 
						   // $('#detailsPanel').show();		
						}, 1050);						
				});											
			  
			    $('#idAction').on('click', function(e){ 				  				
					$('#actionID').slideToggle( "slow", function() {});										
			     });				 
				
				 $('#idChart').on('click', function(evt){ 
				   	evt.preventDefault();	
					var sOrg = decodeURIComponent(escape(window.atob( store.get("session_Org_am_emp")))),
					sUser = decodeURIComponent(escape(window.atob( store.get("session_User_am_emp")))),
					sPass = decodeURIComponent(escape(window.atob( store.get("session_Pass_am_emp"))));
					 var $btn = $('#idChart');
						$btn.button('loading');
						// simulating a timeout
						  $btn.button('reset');
						// simulating a timeout
						setTimeout(function () {
																				
							absService.getEmployeeDetails(sOrg,sUser,sPass,store.get("sGetEmpIDStorageKey"));											
							var cData = alasql('SELECT COUNT(DISTINCT startDate) AS numberOfsick, YEAR(startDate) AS sYear FROM ? GROUP BY startDate',[JSON.parse(sessionStorage["AbsEmployeeVerzData"].toString())]);
							
							Highcharts.setOptions({
							  lang: {
								loading: 'Wordt geladen...',
								months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
								weekdays: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
								shortMonths: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
								exportButtonTitle: "Exporteren",
								printButtonTitle: "Printen",
								rangeSelectorFrom: "Vanaf",
								rangeSelectorTo: "Tot",
								rangeSelectorZoom: "Periode",
								downloadPNG: 'Download als PNG',
								downloadJPEG: 'Download als JPEG',
								downloadPDF: 'Download als PDF',
								downloadSVG: 'Download als SVG',
								contextButtonTitle: 'Menu',	
								resetZoom: 'Reset',
								resetZoomTitle: 'Reset',
								thousandsSep: '.',
								decimalPoint: ','
								}
							  }
							);												
							var fncSum = function(numbers) {	
								return _.reduce(numbers, function(result, current) {
								return result + parseFloat(current);
								}, 0);
							},arrSick =[], arrYear=[];
							
							var groupByYear = _.chain(cData).groupBy("sYear").map(function(value, key) {														
								return {
									sKey: key,
									sYear: fncSum(_.pluck(value, "sYear")),						
									numberOfsick: fncSum(_.pluck(value, "numberOfsick")),								
								}			
							}).value();				
							_(groupByYear).each(function(val) {			  			  				
								arrSick.push(val.numberOfsick); 	
								arrYear.push(val.sKey); 			
								//arrErrors.push(val.Errors); 			
							});			
							
							$('#containerID').highcharts({
								title: {
								text: 'Veerzuimdagen /jaar',
								x: -20 //center
							},							
							chart: {type: "column"},
							credits: {
								enabled: false
							},												
							xAxis: {
								categories: arrYear
							},
							yAxis: {
								title: {
								text: '   verzuimdagen/jaar'
							},
							/*plotLines: [{
								value: 0,
								width: 1,
								color: '#808080'
							}]*/
							},
							tooltip: {
								valueSuffix: ' keer jaar'
							},
							legend: {
								layout: 'vertical',
								align: 'right',
								verticalAlign: 'middle',
								borderWidth: 0
							},
							series: [{
								name: 'Ziek',
								data: arrSick
							}]					
						 });							
												
					    $('#containerID').slideToggle( "slow", function(){});	
								
					 }, 1050);				
			     });		

				 $(document).on("click", ".insert_sick_button", function (evt,eid,ecode) {			
					evt.preventDefault();							
					eid = store.get("sGetEmpIDStorageKey"); 
					ecode= store.get("sGetEmpCodeStorageKey");
					var modal = $('#sickModal').modal();
					modal.find('.modal-body').load($(this).attr('href'), function (responseText, textStatus) {					
						if ( textStatus === 'success' ||  textStatus === 'notmodified') {
							$('.modal-body #employeeId').val(eid);
							$('.modal-body #employeeCode').val(ecode);
							modal.show();								
						}
					});
				});
				
				 $(document).on("click", ".update_sick_button", function (evt,eid,ecode) {			
					evt.preventDefault();							
					eid = store.get("sGetEmpIDStorageKey"); 
					ecode= store.get("sGetEmpCodeStorageKey");
					var modal = $('#betterModal').modal();
					modal.find('.modal-body').load($(this).attr('href'), function (responseText, textStatus) {					
						if ( textStatus === 'success' ||  textStatus === 'notmodified') {
							$('.modal-body #employeeId').val(eid);
							$('.modal-body #employeeCode').val(ecode);
							modal.show();								
						}
					});
				});
				
				$(document).on("click", ".insert_preg_button", function (evt,eid,ecode) {			
					evt.preventDefault();							
					eid = store.get("sGetEmpIDStorageKey"); 
					ecode= store.get("sGetEmpCodeStorageKey");
					var modal = $('#pregModal').modal();
					modal.find('.modal-body').load($(this).attr('href'), function (responseText, textStatus) {					
						if ( textStatus === 'success' ||  textStatus === 'notmodified') {
							$('.modal-body #employeeId').val(eid);
							$('.modal-body #employeeCode').val(ecode);
							modal.show();								
						}
					});
				});					
				
										
	      });//ready		  
		  
	   });//require
      this.$el.html(this.template(this));    
      return this;
    }
  });
  return Layout.extend({
    content: DashBoardPage
  });
});


