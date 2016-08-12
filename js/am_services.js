/**
 * AMS Web service interface. 
 * @author Kinfu Assefa
 */				
var absService = new absServices();

function absServices(){	
	this.processSuccess = function(data, status, req) {
		if (status == "success"){
			$("#response").text($(req.responseXML).find("OK").text());
		}l
	};		
	this.processError = function(data, status, req) {
		$("#response").html(req.responseText + " " + status);
	};  
     /**
	 * checkLogin function. Get the services response and handle it with the 
	 * provided callback. This is enabled via the following assignment:
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.checkLogin = function(sOrg, sUser, sPass){	
		var isOK = false;	
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 				
		var soapBody =
			[ '<?xml version="1.0" encoding="utf-8"?>'
			,  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ser=\"http://www.login.absentiemanager.nl/service2\">"
			,  "<soapenv:Header/>"
			,   '<soapenv:Body>'
			,     '<ser:CheckLogin>'
			,       '<ser:login>'
			,         '<ser:Organization>'+sOrg+'</ser:Organization>'
			,         '<ser:Username>'+sUser+'</ser:Username>'
			,         '<ser:Password>'+sPass+'</ser:Password>'			
			,       '</ser:login>'
			,     '</ser:CheckLogin>'
			,   '</soapenv:Body>'
			, '</soapenv:Envelope>'
			].join('');		
	
		  $.ajax({  
			type: "POST",
			url: restURL+"AMS.Service2.cls",	
			async: false,	
			cache: false,			
			data: soapBody,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/service2/AMS.Service2.CheckLogin'
			},
		   success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.CheckLoginResponse.CheckLoginResult.errorSpecified == 'false'){
				 isOK = true;
				 absService.getRoleList(sOrg, sUser, sPass);					
			  } else {				
				 $('#login_response').html("Oops...: "+  $.xml2json(data).Body.CheckLoginResponse.CheckLoginResult.errorMessage).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				 isOK = false; 
			  }				
			}
		   },
		   error: function(data, status, req){
				isOK = false;  
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				//console.log(req.responseText + " " + status);
		 }
		});   
		return isOK; 
	};
	/**
	 * Get the list of roles. 
	 * to process the returned soap result.
	 */		
	this.getRoleList = function (sOrg, sUser, sPass){	
	    restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 			
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:ser="http://www.login.absentiemanager.nl/service2">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:GetRoleList>'+		
			'<ser:login>'+
			'<ser:Organization>'+sOrg+'</ser:Organization>'+	
			'<ser:Username>'+sUser+'</ser:Username>'+	
			'<ser:Password>'+sPass+'</ser:Password>'+				
			'</ser:login>'+		
		'</ser:GetRoleList>'+
		'</soapenv:Body></soapenv:Envelope>';		
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.Service2.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/service2/AMS.Service2.GetRoleList'
		   },
			success: function(data, status, req){ 		
				if(status == "success") {  // LOGIN OK? 			
					if($.xml2json(data).Body.GetRoleListResponse.GetRoleListResult.errorSpecified == 'true'){						
						$('#login_response').html("Error");
					} else {	
					var getRole = $.xml2json(data).Body.GetRoleListResponse.GetRoleListResult;
				  	var getRoles = $.xml2json(data).Body.GetRoleListResponse.GetRoleListResult.roles.TypedRoleList;	
					
					store.set("AbsEmployeeRole", getRole);						
					store.set("AbsEmployeeRoles", getRoles);	
					
					/*store.set("sGetRole_SL10_StorageKey", getRole.SL10);
					store.set("sGetRole_SL15_StorageKey", getRole.SL15);
					store.set("sGetRole_SL20_StorageKey", getRole.SL20);
					store.set("sGetRole_SL30_StorageKey", getRole.SL30);
					store.set("sGetRole_SL50_StorageKey", getRole.SL50);
					store.set("sGetRole_SL70_StorageKey", getRole.SL70);
					store.set("sGetRole_SL97_StorageKey", getRole.SL97);
					store.set("sGetRole_SL99_StorageKey", getRole.SL99);
					store.set("sGetRole_SL100_StorageKey", getRole.SL100);				   					
					
					$.each(getRoles, function(key, val){
						store.set("sGetRole_"+val.Item+"_StorageKey", val.Access);				
					});*/	
					 						
					}
				} else {  // ERROR? 
				  $('#login_response').html("Error");  
				}        
			     //ajaxComplete			   
			    },//success
			   error: function(data, status, req){
				 $('#login_response').html("Error"+ req);	
			  }// error			  
			});    
			// -- End AJAX Call --
			return false;			
	};// -- End getRoleList --
		
	/**
	 * Get the list of employees matching the provided parameters. 
	 * to process the returned soap result.
	 */
	this.getEmployeeList = function (sOrg, sUser, sPass){
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 	
		$.support.cors = true;	
		
		var soapBody =
			[ '<?xml version="1.0" encoding="utf-8"?>'
			,  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ser=\"http://www.login.absentiemanager.nl/service2\">"
			,  "<soapenv:Header/>"
			,   '<soapenv:Body>'
			,     '<ser:GetEmployeeList>'
			,       '<ser:login>'
			,         '<ser:Organization>'+sOrg+'</ser:Organization>'
			,         '<ser:Username>'+sUser+'</ser:Username>'
			,         '<ser:Password>'+sPass+'</ser:Password>'			
			,       '</ser:login>'
			,        '<ser:filter></ser:filter>'			
			,     '</ser:GetEmployeeList>'
			,   '</soapenv:Body>'
			, '</soapenv:Envelope>'
			].join('');		
	
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.Service2.cls",	
			async: false,	
			cache: false,			
			data: soapBody,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/service2/AMS.Service2.GetEmployeeList'
		   },
			success: function(data, status, req){ 
				 	
					if(status == "success") {  // LOGIN OK? 							
						if($.xml2json(data).Body.GetEmployeeListResponse.GetEmployeeListResult.errorSpecified == 'true'){						
							$('#login_response').html("Error");
						} else {	
						
						   var getEmp = $.xml2json(data).Body.GetEmployeeListResponse.GetEmployeeListResult.employees.TypedEmployeeList;	
						   if (!jQuery.isArray(getEmp)) getEmp = [getEmp];						
					
												
							store.set("sGetEmpIDStorageKey", getEmp[0].ID);
							store.set("sGetEmpCodeStorageKey", getEmp[0].empid);
							store.set("sGetLastNameStorageKey", getEmp[0].lastName);						
							store.set("sGetFirstNameStorageKey", getEmp[0].firstName);
							store.set("sGetInitialsStorageKey", getEmp[0].initials);
							store.set("sGetBirthdateStorageKey", getEmp[0].birthdate);
							store.set("sGetDepartmentNameStorageKey", getEmp[0].departmentName);
							store.set("sGetManagerNameStorageKey", getEmp[0].managerName); 
							store.set("sGetDisplayNameStorageKey", getEmp[0].displayName);
							store.set("sGetLastSickDateStorageKey", getEmp[0].lastSickDate);
							store.set("sGetCurrentSickDateStorageKey", getEmp[0].currentSickDate);
							
							store.set("sGetSickPercentageStorageKey", getEmp[0].sickPercentage);
							
							if(getEmp[0].gender == "M"){
								store.set("sGetGenderStorageKey","Man");
							} else {
								store.set("sGetGenderStorageKey","Vrouw");
							}	
							
							if(getEmp[0].isManager == "true"){
								store.set("sGetIsManagerStorageKey","Ja");
							} else {
								store.set("sGetIsManagerStorageKey","Nee");
							}	
							
							if(getEmp[0].sickStatus == "true"){
								store.set("sGetSickStatusStorageKey","Ja");
							} else {
								store.set("sGetSickStatusStorageKey","Nee");
							}				
						
							//store.set("sGetGenderStorageKey", getEmp[0].gender);
							store.set("sGetFunctionIdStorageKey", getEmp[0].functionId);
							store.set("sGetFunctionNameStorageKey", getEmp[0].functionName);
							store.set("sGetNumberOfSickdaysStorageKey", getEmp[0].numberOfSickdays);
							store.set("sGetSickFrequencyStorageKey", getEmp[0].sickFrequency);
							store.set("sGetNickNameStorageKey", getEmp[0].nickName);
							store.set("sGetEmploymentStatusStorageKey", getEmp[0].employmentStatus);
							store.set("sGetPrefixStorageKey", getEmp[0].prefix);
							store.set("sGetSofiNumberStorageKey", getEmp[0].sofiNumber);		
							
							store.set("sGetPhotoUrlStorageKey", getEmp[0].photoUrl);
														 		   
							store.set("AbsEmployeeListStorageKey", getEmp);		
												 
							localStorage.setItem("storage_LoggedOut_am_emp",false);								
							store.set("session_Org_am_emp", window.btoa(unescape(encodeURIComponent( sOrg )))); 
							store.set("session_User_am_emp",window.btoa(unescape(encodeURIComponent( sUser ))));
							store.set("session_Pass_am_emp",window.btoa(unescape(encodeURIComponent( sPass ))));	 
							store.set("session_eLanguage",'1');						
							var login_response = '<div id="logged_in">' +
							'<div style="text-align: center; margin-left: 10px; background-color: #65b0f3;border-radius: 8px;padding:10px;color:#fff">' + 						
							'<img  align="middle"  src="images/ajax-loader.gif"><br/>' +						
							"U bent succesvol ingelogd! <br /> Een moment geduld aub - bezig met laden...</div>"; 
							
							$('#loginform').hide();
						
							$('#login_response').html(login_response);				
							setTimeout(function() {			
								window.location.href =  baseURL+'#/dashboard';	
							}, 4000);		
						}	
					} else {  // ERROR? 
						$('#loginform').show(); 				
						$('#login_response').html(status);
					}        
			     //ajaxComplete			   
			    },//success
			   error: function(data, status, req){
			    $('#login_response').html(req.responseText + " " + status);	
				$('#loginform').show(); 		
			  }// error			  
			});    
			// -- End AJAX Call --
			return false;
	  };  

	this.getEmployeeDetails= function (sOrg, sUser, sPass, empId){ 
	   if (sessionStorage["AbsEmployeeData"]) {  
			var empData = JSON.parse(sessionStorage["AbsEmployeeData"].toString()); 				
				store.set("sGetEmpData_Id_StorageKey", empData[0].Id);
				store.set("sGetEmpData_Code_StorageKey", empData[0].Code);
				store.set("sGetEmpData_Initials_StorageKey", empData[0].Initials);
				store.set("sGetEmpData_Title_StorageKey", empData[0].Title);
				store.set("sGetEmpData_Prefix_StorageKey", empData[0].Prefix);
				store.set("sGetEmpData_Firstname_StorageKey", empData[0].Firstname);	
				store.set("sGetEmpData_Lastname_StorageKey", empData[0].Lastname);
				store.set("sGetEmpData_Street_StorageKey", empData[0].Street);
				store.set("sGetEmpData_Housenr_StorageKey", empData[0].Housenr);	
				store.set("sGetEmpData_Housenrsuffix_StorageKey", empData[0].Housenrsuffix);
				store.set("sGetEmpData_Postalcode_StorageKey", empData[0].Postalcode);
				store.set("sGetEmpData_City_StorageKey", empData[0].City);	
				store.set("sGetEmpData_Address_StorageKey", empData[0].Address);
				store.set("sGetEmpData_Birthdate_StorageKey", empData[0].Birthdate);
				store.set("sGetEmpData_Telephonenr_StorageKey", empData[0].Telephonenr);	
				store.set("sGetEmpData_WorkTelephonenr_StorageKey", empData[0].WorkTelephonenr);
				
				if(empData[0].gender == "0"){
					store.set("sGetEmpData_Gender_StorageKey","Man");
				} else {
					store.set("sGetEmpData_Gender_StorageKey","Vrouw");
				}						
				store.set("sGetEmpData_Sofinr_StorageKey", empData[0].Sofinr);	
				store.set("sGetEmpData_Email_StorageKey", empData[0].Email);
				store.set("sGetEmpData_EmailSecondary_StorageKey", empData[0].EmailSecondary);
				store.set("sGetEmpData_Startdate_StorageKey", empData[0].Startdate);	
				store.set("sGetEmpData_Department_Id_StorageKey", empData[0].Department_Id);
				store.set("sGetEmpData_DepartmentName_StorageKey", empData[0].DepartmentName);
				store.set("sGetEmpData_Company_Id_StorageKey", empData[0].Company_Id);
				store.set("sGetEmpData_CompanyName_StorageKey", empData[0].CompanyName);
				store.set("sGetEmpData_Function_Id_StorageKey", empData[0].Function_Id);
				store.set("sGetEmpData_FunctionName_StorageKey", empData[0].FunctionName);
				store.set("sGetEmpData_Location_Id_StorageKey", empData[0].Location_Id);
				store.set("sGetEmpData_LocationName_StorageKey", empData[0].LocationName);
				store.set("sGetEmpData_Maritalstatus_id_StorageKey", empData[0].Maritalstatus_id);
				store.set("sGetEmpData_Salutation_StorageKey", empData[0].Salutation);
				store.set("sGetEmpData_Clamourname_StorageKey", empData[0].Clamourname);
				store.set("sGetEmpData_Faxnr_StorageKey", empData[0].Faxnr);						
				store.set("sGetEmpData_Country_StorageKey", empData[0].Country);
				store.set("sGetEmpData_Hoursperweek_StorageKey", empData[0].Hoursperweek);
				store.set("sGetEmpData_Enddate_StorageKey", empData[0].Enddate);
				store.set("sGetEmpData_External_ref_StorageKey", empData[0].External_ref);
				store.set("sGetEmpData_Spouse_StorageKey", empData[0].Spouse);	
				store.set("sGetEmpData_Nationality_StorageKey", empData[0].Nationality);
				store.set("sGetEmpData_NickName_StorageKey", empData[0].NickName);
				store.set("sGetEmpData_DisplayName_StorageKey", empData[0].DisplayName);
				store.set("sGetEmpData_Partner_prefix_StorageKey", empData[0].Partner_prefix);
				store.set("sGetEmpData_Partner_firstname_StorageKey", empData[0].Partner_firstname);
				store.set("sGetEmpData_Partner_lastname_StorageKey", empData[0].Partner_lastname);
				store.set("sGetEmpData_displayname_code_StorageKey", empData[0].displayname_code);
				store.set("sGetEmpData_Hours_monday_StorageKey", empData[0].Hours_monday);
				store.set("sGetEmpData_Hours_tuesday_StorageKey", empData[0].Hours_tuesday);
				store.set("sGetEmpData_Hours_wednesday_StorageKey", empData[0].Hours_wednesday);												
				store.set("sGetEmpData_Hours_thursday_StorageKey", empData[0].Hours_thursday);
				store.set("sGetEmpData_Hours_friday_StorageKey", empData[0].Hours_friday);
				store.set("sGetEmpData_Hours_saturday_StorageKey", empData[0].Hours_saturday);
				store.set("sGetEmpData_Hours_sunday_StorageKey", empData[0].Hours_sunday);
				store.set("sGetEmpData_EndReason_StorageKey", empData[0].EndReason);
				store.set("sGetEmpData_EndTemporaryContract_StorageKey", empData[0].EndTemporaryContract);
				store.set("sGetEmpData_Mobilenr_StorageKey", empData[0].Mobilenr);
				store.set("sGetEmpData_Salary_StorageKey", empData[0].Salary);
				store.set("sGetEmpData_is_manager_StorageKey", empData[0].is_manager);
				store.set("sGetEmpData_manager_id_StorageKey", empData[0].manager_id);				
				store.set("sGetEmpData_manager2_id_StorageKey", empData[0].manager2_id);
				store.set("sGetEmpData_manager3_id_StorageKey", empData[0].manager3_id);
				store.set("sGetEmpData_Manager2Active_StorageKey", empData[0].Manager2Active);
				store.set("sGetEmpData_Manager3Active_StorageKey", empData[0].Manager3Active);
				store.set("sGetEmpData_Permanent_Employment_StorageKey", empData[0].Permanent_Employment);
				store.set("sGetEmpData_Emergency_Contact_StorageKey", empData[0].Emergency_Contact);
				store.set("sGetEmpData_Emergency_PhoneNr_StorageKey", empData[0].Emergency_PhoneNr);
				store.set("sGetEmpData_ContractType_StorageKey", empData[0].ContractType);
				
				var verzDataList = JSON.parse(sessionStorage["AbsEmployeeVerzData"].toString()), sTable ='';		
				if (!jQuery.isArray(verzDataList)) verzDataList = [verzDataList];	
				if (typeof(verzDataList) !== "undefined"){											
					if (verzDataList !== undefined){	
						$.each(verzDataList, function(key, val){	
							 var eDate = (typeof(val.endDate)=== 'undefined') ? "---" : val.endDate;								
							sTable += "<table class='table table-striped''><tr><td>"+ val.startDate +"</td><td>"+ eDate +"</td></tr></table>";								
						});
						$('#SickHistoryList').html(sTable);   
					} else {
					  $('#SickHistoryList').html('');					
					}
				}		
					
		} else {	  
	        restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
			var sTable ='', xml = '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:ser="http://www.login.absentiemanager.nl/service2">'+
			'<soapenv:Header/>'+
			'<soapenv:Body>'+
			'<ser:GetEmployeeData>'+		
			'<ser:login>'+
			'<ser:Organization>'+sOrg+'</ser:Organization>'+	
			'<ser:Username>'+sUser+'</ser:Username>'+	
			'<ser:Password>'+sPass+'</ser:Password>'+				
			'</ser:login>'+				
			'<ser:id>'+empId+'</ser:id>'+	//125630
			'</ser:GetEmployeeData>'+
			'</soapenv:Body></soapenv:Envelope>';		
			$.ajax({  
				type: "POST",
					url: restURL+"AMS.Service2.cls",	
					async: false,	
					cache: false,			
					data: xml,			
					contentType: 'text/xml; charset=utf-8',
				headers: {		
					SOAPAction: 'http://www.login.absentiemanager.nl/service2/AMS.Service2.GetEmployeeData'
				},
				success: function(data, status, req){ 		
					if(status == "success") {  // LOGIN OK? 			
						if($.xml2json(data).Body.GetEmployeeDataResponse.GetEmployeeDataResult.errorSpecified == 'true'){						
							$('#login_response').html("Oops");
						} else {	
						
						 var empData =  $.xml2json(data).Body.GetEmployeeDataResponse.GetEmployeeDataResult.data;
						 var verzData =  $.xml2json(data).Body.GetEmployeeDataResponse.GetEmployeeDataResult.sickHistory;
						  
						if (!jQuery.isArray(empData)) empData = [empData];																					
					    store.set("AbsEmployeeData", empData);
						 
						store.set("sGetEmpData_Id_StorageKey", empData[0].Id);
						store.set("sGetEmpData_Code_StorageKey", empData[0].Code);
						store.set("sGetEmpData_Initials_StorageKey", empData[0].Initials);
						store.set("sGetEmpData_Title_StorageKey", empData[0].Title);
						store.set("sGetEmpData_Prefix_StorageKey", empData[0].Prefix);
						store.set("sGetEmpData_Firstname_StorageKey", empData[0].Firstname);	
						store.set("sGetEmpData_Lastname_StorageKey", empData[0].Lastname);
						store.set("sGetEmpData_Street_StorageKey", empData[0].Street);
						store.set("sGetEmpData_Housenr_StorageKey", empData[0].Housenr);	
						store.set("sGetEmpData_Housenrsuffix_StorageKey", empData[0].Housenrsuffix);
						store.set("sGetEmpData_Postalcode_StorageKey", empData[0].Postalcode);
						store.set("sGetEmpData_City_StorageKey", empData[0].City);	
						store.set("sGetEmpData_Address_StorageKey", empData[0].Address);
						store.set("sGetEmpData_Birthdate_StorageKey", empData[0].Birthdate);
						store.set("sGetEmpData_Telephonenr_StorageKey", empData[0].Telephonenr);	
						store.set("sGetEmpData_WorkTelephonenr_StorageKey", empData[0].WorkTelephonenr);
						
						if(empData[0].gender == "0"){
							store.set("sGetEmpData_Gender_StorageKey","Man");
						} else {
							store.set("sGetEmpData_Gender_StorageKey","Vrouw");
						}						
						store.set("sGetEmpData_Sofinr_StorageKey", empData[0].Sofinr);	
						store.set("sGetEmpData_Email_StorageKey", empData[0].Email);
						store.set("sGetEmpData_EmailSecondary_StorageKey", empData[0].EmailSecondary);
						store.set("sGetEmpData_Startdate_StorageKey", empData[0].Startdate);	
						store.set("sGetEmpData_Department_Id_StorageKey", empData[0].Department_Id);
						store.set("sGetEmpData_DepartmentName_StorageKey", empData[0].DepartmentName);
						store.set("sGetEmpData_Company_Id_StorageKey", empData[0].Company_Id);
						store.set("sGetEmpData_CompanyName_StorageKey", empData[0].CompanyName);
						store.set("sGetEmpData_Function_Id_StorageKey", empData[0].Function_Id);
						store.set("sGetEmpData_FunctionName_StorageKey", empData[0].FunctionName);
						store.set("sGetEmpData_Location_Id_StorageKey", empData[0].Location_Id);
						store.set("sGetEmpData_LocationName_StorageKey", empData[0].LocationName);
						store.set("sGetEmpData_Maritalstatus_id_StorageKey", empData[0].Maritalstatus_id);
						store.set("sGetEmpData_Salutation_StorageKey", empData[0].Salutation);
						store.set("sGetEmpData_Clamourname_StorageKey", empData[0].Clamourname);
						store.set("sGetEmpData_Faxnr_StorageKey", empData[0].Faxnr);						
						store.set("sGetEmpData_Country_StorageKey", empData[0].Country);
						store.set("sGetEmpData_Hoursperweek_StorageKey", empData[0].Hoursperweek);
						store.set("sGetEmpData_Enddate_StorageKey", empData[0].Enddate);
						store.set("sGetEmpData_External_ref_StorageKey", empData[0].External_ref);
						store.set("sGetEmpData_Spouse_StorageKey", empData[0].Spouse);	
						store.set("sGetEmpData_Nationality_StorageKey", empData[0].Nationality);
						store.set("sGetEmpData_NickName_StorageKey", empData[0].NickName);
						store.set("sGetEmpData_DisplayName_StorageKey", empData[0].DisplayName);
						store.set("sGetEmpData_Partner_prefix_StorageKey", empData[0].Partner_prefix);
						store.set("sGetEmpData_Partner_firstname_StorageKey", empData[0].Partner_firstname);
						store.set("sGetEmpData_Partner_lastname_StorageKey", empData[0].Partner_lastname);
						store.set("sGetEmpData_displayname_code_StorageKey", empData[0].displayname_code);
						store.set("sGetEmpData_Hours_monday_StorageKey", empData[0].Hours_monday);
						store.set("sGetEmpData_Hours_tuesday_StorageKey", empData[0].Hours_tuesday);
						store.set("sGetEmpData_Hours_wednesday_StorageKey", empData[0].Hours_wednesday);												
						store.set("sGetEmpData_Hours_thursday_StorageKey", empData[0].Hours_thursday);
						store.set("sGetEmpData_Hours_friday_StorageKey", empData[0].Hours_friday);
						store.set("sGetEmpData_Hours_saturday_StorageKey", empData[0].Hours_saturday);
						store.set("sGetEmpData_Hours_sunday_StorageKey", empData[0].Hours_sunday);
						store.set("sGetEmpData_EndReason_StorageKey", empData[0].EndReason);
						store.set("sGetEmpData_EndTemporaryContract_StorageKey", empData[0].EndTemporaryContract);
						store.set("sGetEmpData_Mobilenr_StorageKey", empData[0].Mobilenr);
						store.set("sGetEmpData_Salary_StorageKey", empData[0].Salary);
						store.set("sGetEmpData_is_manager_StorageKey", empData[0].is_manager);
						store.set("sGetEmpData_manager_id_StorageKey", empData[0].manager_id);						
						store.set("sGetEmpData_manager2_id_StorageKey", empData[0].manager2_id);
						store.set("sGetEmpData_manager3_id_StorageKey", empData[0].manager3_id);
						store.set("sGetEmpData_Manager2Active_StorageKey", empData[0].Manager2Active);
						store.set("sGetEmpData_Manager3Active_StorageKey", empData[0].Manager3Active);
						store.set("sGetEmpData_Permanent_Employment_StorageKey", empData[0].Permanent_Employment);
						store.set("sGetEmpData_Emergency_Contact_StorageKey", empData[0].Emergency_Contact);
						store.set("sGetEmpData_Emergency_PhoneNr_StorageKey", empData[0].Emergency_PhoneNr);
						store.set("sGetEmpData_ContractType_StorageKey", empData[0].ContractType);											
										
						if (typeof(verzData) !== "undefined"){											
							if (verzData.TypedSickHistoryList !== undefined){	 
								// If a single object is returned, wrap it in an array	
						        if (!jQuery.isArray(verzData.TypedSickHistoryList)) verzData.TypedSickHistoryList = [verzData.TypedSickHistoryList];						
						         store.set("AbsEmployeeVerzData", verzData.TypedSickHistoryList);													
								$.each(verzData.TypedSickHistoryList, function(key, val){	
								     var eDate = (typeof(val.endDate)=== 'undefined') ? "---" : val.endDate;								
									sTable += "<table class='table table-striped''><tr><td>"+ val.startDate +"</td><td>"+ eDate +"</td></tr></table>";								
								});
								$('#SickHistoryList').html(sTable);   
							} else {
							  $('#SickHistoryList').html('');					
							}
						}	
								
					 }
					} else {  // ERROR? 
						$('#login_response').html("Oops");  
					}        
					//ajaxComplete			   
				},//success
				error: function(data, status, req){
					$('#login_response').html("Oops:"+ req);	
				}// error		
			});				
			return sTable;
		}//end else
      };// -- End getEmployeeDetails --	
	  	
	 		
}






