define(function(require) {
  'use strict';
  var Backbone      = require('backbone'),
      _             = require('underscore'),
      notesTemplate  =  require('text!../../html/notes.html'),
      Layout        = require('view/layouts/dashboardLayout');

  var notesPage = Backbone.View.extend({
    template: _.template(notesTemplate),
    render: function() {
	  	  require(['jquery','jqueryui','bootstrap','jquery_validate','md5', 'store','wb_translate','summernote','summernote-nl'], function($){ 		
		 
		  $(function(){				 
			 	renderTranslations();				
	      });//ready
		  
		  $(function() {
			$('.summernote').summernote({
			  height: 100,
			  codemirror: { // codemirror options
				mode: 'text/html',
				htmlMode: true,
				lineNumbers: true,
				theme: 'monokai'
			  }
			});
			
			
			
			 $('#showHideDate').hide();		
			
			 $(document).on("click", '#actie_maken', function (e) {							 
				if ($('#actie_maken').prop('checked')===true) {											
					 $('#showHideDate').show();
				} else if ($('#actie_maken').prop('checked')===false) {
					 $('#showHideDate').hide();					
				}				
			});					
			
			
			
			
			
			
			
			
			
			
			
			
			
		  });
		  
	   });//require
      this.$el.html(this.template(this));    
      return this;
    }
  });
  return Layout.extend({
    content: notesPage
  });
});
/**
 * AMS Web service notes interface. 
 * @author Kinfu Assefa
 */				
var absNotesService = new absNotesServices();

function absNotesServices(){	
	this.processSuccess = function(data, status, req) {
		if (status == "success"){
			$("#response").text($(req.responseXML).find("HelloResult").text());
		}l
	};		
	this.processError = function(data, status, req) {
		$("#response").html(req.responseText + " " + status);
	};  
     /**
	 * get motes list
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.GetNoteList = function(sOrg, sUser, sPass, sType, sEmpId,sNoteId){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 				
		var soapBody =
			[ '<?xml version="1.0" encoding="utf-8"?>'
			,  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:not=\"http://www.login.absentiemanager.nl/noteService\">"
			,  "<soapenv:Header/>"
			,   '<soapenv:Body>'
			,     '<not:GetNoteList>'
			,       '<not:login>'
			,         '<not:Organization>'+sOrg+'</not:Organization>'
			,         '<not:Username>'+sUser+'</not:Username>'
			,         '<not:Password>'+sPass+'</not:Password>'			
			,       '</not:login>'
			,       '<not:type>'+sType+'</not:type>'//P
			,       '<not:filter>'
			,         '<not:employeeId>'+sEmpId+'</not:employeeId>'
			,         '<not:verslagId>'+sNoteId+'</not:verslagId>'				
			,       '</not:filter>'			
			,     '</not:GetNoteList>'
			,   '</soapenv:Body>'
			, '</soapenv:Envelope>'
			].join('');		
	
		  $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: soapBody,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.GetNoteList'
			},
		   success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.GetNoteListResponse.GetNoteListResult.errorSpecified == 'false'){
									
			  } else {				
				var nList = $.xml2json(data).Body.GetNoteListResponse.GetNoteListResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				//console.log(req.responseText + " " + status);		 
			}
		});   
		
	};
	/** end GetNoteList	
    /**
	 * get motes
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.GetNote = function(sOrg, sUser, sPass, sType, sId){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 				
		var soapBody =
			[ '<?xml version="1.0" encoding="utf-8"?>'
			,  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:not=\"http://www.login.absentiemanager.nl/noteService\">"
			,  "<soapenv:Header/>"
			,   '<soapenv:Body>'
			,     '<not:GetNote>'
			,       '<not:login>'
			,         '<not:Organization>'+sOrg+'</not:Organization>'
			,         '<not:Username>'+sUser+'</not:Username>'
			,         '<not:Password>'+sPass+'</not:Password>'			
			,       '</not:login>'
			,       '<not:type>'+sType+'</not:type>'//R,M,P	
			,       '<not:id>'+sId+'</not:id>'		
			,     '</not:GetNote>'
			,   '</soapenv:Body>'
			, '</soapenv:Envelope>'
			].join('');		
	
		  $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: soapBody,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.GetNote'
			},
		   success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.GetNoteResponse.GetNoteResult.errorSpecified == 'false'){
									
			  } else {				
				var nList = $.xml2json(data).Body.GetNoteResponse.GetNoteResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){
			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				//console.log(req.responseText + " " + status);
		 }
		});   
		
	};	
	 /** end GetNote	
    /**
	 * get Attachment
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.GetAttachment = function(sOrg, sUser, sPass, sType, sId,attNr){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 				
		var soapBody =
			[ '<?xml version="1.0" encoding="utf-8"?>'
			,  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:not=\"http://www.login.absentiemanager.nl/noteService\">"
			,  "<soapenv:Header/>"
			,   '<soapenv:Body>'
			,     '<not:GetAttachment>'
			,       '<not:login>'
			,         '<not:Organization>'+sOrg+'</not:Organization>'
			,         '<not:Username>'+sUser+'</not:Username>'
			,         '<not:Password>'+sPass+'</not:Password>'			
			,       '</not:login>'
			,       '<not:type>'+sType+'</not:type>'
			,       '<not:id>'+sId+'</not:id>'	
			,       '<not:attachmentNumber>'+attNr+'</not:attachmentNumber>'			
			,     '</not:GetAttachment>'
			,   '</soapenv:Body>'
			, '</soapenv:Envelope>'
			].join('');		
	
		  $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: soapBody,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.GetAttachment'
			},
		   success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.GetAttachmentResponse.GetAttachmentResult.errorSpecified == 'false'){
									
			  } else {				
				var nList = $.xml2json(data).Body.GetAttachmentResponse.GetAttachmentResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){
			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				//console.log(req.responseText + " " + status);
		 }
		});   
		
	};	
	 /** end GetNote 	 	 
	 /**
	 * InsertNote
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.InsertNote = function(sOrg, sUser, sPass, sType,empID){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:not="http://www.login.absentiemanager.nl/noteService">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:InsertNote>'+		
			'<not:login>'+
			'<not:Organization>'+sOrg+'</not:Organization>'+	
			'<not:Username>'+sUser+'</not:Username>'+	
			'<not:Password>'+sPass+'</not:Password>'+				
			'</not:login>'+				
		    '<not:note>'+
	    '      	<not:id></ser:id>'+
	    '      	<not:noteType>'+sType+'</not:noteType>'+
	    '      	<not:employeeId>'+empID+'</not:employeeId>';		    
				($("#verslagId").val() && $("verslagId").val()!=null)? xml+='<not:verslagId>'+$("#verslagId").val()+'</not:verslagId>' : xml+='<not:verslagId></not:verslagId>';
				($("#note").val() && $("note").val()!=null)? xml+='<not:note>'+$("#note").val()+'</not:note>': xml+='<not:note></not:note>';
				($("#date").val() && $("date").val()!=null) ? xml+='<not:date>'+$("#date").val()+'</not:date>': xml+='<not:date></not:date>';
				($("#description").val() && $("description").val()!=null) ? xml+='<not:description>'+$("#description").val()+'</not:description>':xml+='<not:description></not:description>';
				($("#completed").val() && $("completed").val()!=null)? xml+='<not:completed>'+$("#completed").val()+'</not:completed>': xml+='<not:completed></not:completed>';
				($("#time").val() && $("time").val()!=null)? xml+='<not:time>'+$("#completed").val()+'</not:time>': xml+='<not:time></not:time>';
				($("#duration").val() && $("duration").val()!=null)? xml+='<not:duration>'+$("#duration").val()+'</not:duration>': xml+='<not:duration></not:duration>';  
				($("#responsibleperson").val() && $("responsibleperson").val()!=null)? xml+='<not:responsibleperson>'+$("#responsibleperson").val()+'</not:responsibleperson>': xml+='<not:responsibleperson></not:responsibleperson>';
				($("#type").val() && $("type").val()!=null)? xml+='<not:type>'+$("#type").val()+'</not:type>': xml+='<not:type></not:type>';
				($("#owner").val() && $("owner").val()!=null)? xml+='<not:owner>'+$("#owner").val()+'</not:owner>':  xml+='<not:owner></not:owner>';
				($("#rdonly").val() && $("rdonly").val()!=null)? xml+='<not:rdonly>'+$("#rdonly").val()+'</not:rdonly>': xml+='<not:rdonly></not:rdonly>';
				($("#private").val() && $("private").val()!=null)? xml+='<not:private>'+$("#private").val()+'</not:private>': xml+='<not:private></not:private>';	
				($("#followUpDate").val() && $("followUpDate").val()!=null)? xml+='<not:followUpDate>'+$("#followUpDate").val()+'</not:followUpDate>': xml+='<not:followUpDate></not:followUpDate>';
				($("#followUpDescription").val() && $("followUpDescription").val()!=null)? xml+='<not:followUpDescription>'+$("#followUpDescription").val()+'</not:followUpDescription>':xml+='<not:followUpDescription></not:followUpDescription>';
				($("#followUpTime").val() && $("followUpTime").val()!=null)? xml+='<not:followUpTime>'+$("#followUpTime").val()+'</not:followUpTime>': xml+='<not:followUpTime></not:followUpTime>';
				($("#followUpDuration").val() && $("followUpDuration").val()!=null)? xml+='<not:followUpDuration>'+$("#followUpDuration").val()+'</not:followUpDuration>': xml+='<not:followUpDuration></not:followUpDuration>';
				($("#followUpCompleted").val() && $("followUpCompleted").val()!=null)? xml+='<not:followUpCompleted>'+$("#followUpCompleted").val()+'</not:followUpCompleted>': xml+='<not:followUpCompleted></not:followUpCompleted>';		
				($("#followRPerson").val() && $("followRPerson").val()!=null)? xml+='<not:followRPerson>'+$("#followRPerson").val()+'</not:followRPerson>':xml+='<not:followRPerson></not:followRPerson>';
				($("#attachment1Url").val() && $("attachment1Url").val()!=null)? xml+='<not:attachment1Url>'+$("#attachment1Url").val()+'</not:attachment1Url>':xml+='<not:attachment1Url></not:attachment1Url>';
				($("#attachment2Url").val() && $("attachment2Url").val()!=null)? xml+='<not:attachment2Url>'+$("#attachment2Url").val()+'</not:attachment2Url>': xml+='<not:attachment2Url></not:attachment2Url>';
				($("#attachment3Url").val() && $("attachment3Url").val()!=null)? xml+='<not:attachment3Url>'+$("#attachment3Url").val()+'</not:attachment3Url>': xml+='<not:attachment3Url></not:attachment3Url>';
				($("#attachment4Url").val() && $("attachment4Url").val()!=null)? xml+='<not:attachment4Url>'+$("#attachment4Url").val()+'</not:attachment4Url>': xml+='<not:attachment4Url></not:attachment4Url>';
		 xml+='</ser:note>'+
	    '</ser:InsertNote>'+
		'</soapenv:Body></soapenv:Envelope>';			
		  $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.InsertNote'
			},
		   success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.InsertNoteResponse.InsertNoteResult.errorSpecified == 'false'){
									
			  } else {				
				var nList = $.xml2json(data).Body.InsertNoteResponse.InsertNoteResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){
			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
				//console.log(req.responseText + " " + status);
		 }
		});  	
	};		
	 /** end InsertNote
	 /**
	 * UpdateNote
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.UpdateNote = function(sOrg, sUser, sPass, sType,empID, noteID){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:not="http://www.login.absentiemanager.nl/noteService">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:UpdateNote>'+		
			'<not:login>'+
			'<not:Organization>'+sOrg+'</not:Organization>'+	
			'<not:Username>'+sUser+'</not:Username>'+	
			'<not:Password>'+sPass+'</not:Password>'+				
			'</not:login>'+				
		    '<not:note>'+
	    '      	<not:id>'+noteID+'</ser:id>'+
	    '      	<not:noteType>'+sType+'</not:noteType>'+
	    '      	<not:employeeId>'+empID+'</not:employeeId>';		    
				($("#verslagId").val() && $("verslagId").val()!=null)? xml+='<not:verslagId>'+$("#verslagId").val()+'</not:verslagId>' : xml+='<not:verslagId></not:verslagId>';
				($("#note").val() && $("note").val()!=null)? xml+='<not:note>'+$("#note").val()+'</not:note>': xml+='<not:note></not:note>';
				($("#date").val() && $("date").val()!=null) ? xml+='<not:date>'+$("#date").val()+'</not:date>': xml+='<not:date></not:date>';
				($("#description").val() && $("description").val()!=null) ? xml+='<not:description>'+$("#description").val()+'</not:description>':xml+='<not:description></not:description>';
				($("#completed").val() && $("completed").val()!=null)? xml+='<not:completed>'+$("#completed").val()+'</not:completed>': xml+='<not:completed></not:completed>';
				($("#time").val() && $("time").val()!=null)? xml+='<not:time>'+$("#completed").val()+'</not:time>': xml+='<not:time></not:time>';
				($("#duration").val() && $("duration").val()!=null)? xml+='<not:duration>'+$("#duration").val()+'</not:duration>': xml+='<not:duration></not:duration>';  
				($("#responsibleperson").val() && $("responsibleperson").val()!=null)? xml+='<not:responsibleperson>'+$("#responsibleperson").val()+'</not:responsibleperson>': xml+='<not:responsibleperson></not:responsibleperson>';
				($("#type").val() && $("type").val()!=null)? xml+='<not:type>'+$("#type").val()+'</not:type>': xml+='<not:type></not:type>';
				($("#owner").val() && $("owner").val()!=null)? xml+='<not:owner>'+$("#owner").val()+'</not:owner>':  xml+='<not:owner></not:owner>';
				($("#rdonly").val() && $("rdonly").val()!=null)? xml+='<not:rdonly>'+$("#rdonly").val()+'</not:rdonly>': xml+='<not:rdonly></not:rdonly>';
				($("#private").val() && $("private").val()!=null)? xml+='<not:private>'+$("#private").val()+'</not:private>': xml+='<not:private></not:private>';	
				($("#followUpDate").val() && $("followUpDate").val()!=null)? xml+='<not:followUpDate>'+$("#followUpDate").val()+'</not:followUpDate>': xml+='<not:followUpDate></not:followUpDate>';
				($("#followUpDescription").val() && $("followUpDescription").val()!=null)? xml+='<not:followUpDescription>'+$("#followUpDescription").val()+'</not:followUpDescription>':xml+='<not:followUpDescription></not:followUpDescription>';
				($("#followUpTime").val() && $("followUpTime").val()!=null)? xml+='<not:followUpTime>'+$("#followUpTime").val()+'</not:followUpTime>': xml+='<not:followUpTime></not:followUpTime>';
				($("#followUpDuration").val() && $("followUpDuration").val()!=null)? xml+='<not:followUpDuration>'+$("#followUpDuration").val()+'</not:followUpDuration>': xml+='<not:followUpDuration></not:followUpDuration>';
				($("#followUpCompleted").val() && $("followUpCompleted").val()!=null)? xml+='<not:followUpCompleted>'+$("#followUpCompleted").val()+'</not:followUpCompleted>': xml+='<not:followUpCompleted></not:followUpCompleted>';		
				($("#followRPerson").val() && $("followRPerson").val()!=null)? xml+='<not:followRPerson>'+$("#followRPerson").val()+'</not:followRPerson>':xml+='<not:followRPerson></not:followRPerson>';
				($("#attachment1Url").val() && $("attachment1Url").val()!=null)? xml+='<not:attachment1Url>'+$("#attachment1Url").val()+'</not:attachment1Url>':xml+='<not:attachment1Url></not:attachment1Url>';
				($("#attachment2Url").val() && $("attachment2Url").val()!=null)? xml+='<not:attachment2Url>'+$("#attachment2Url").val()+'</not:attachment2Url>': xml+='<not:attachment2Url></not:attachment2Url>';
				($("#attachment3Url").val() && $("attachment3Url").val()!=null)? xml+='<not:attachment3Url>'+$("#attachment3Url").val()+'</not:attachment3Url>': xml+='<not:attachment3Url></not:attachment3Url>';
				($("#attachment4Url").val() && $("attachment4Url").val()!=null)? xml+='<not:attachment4Url>'+$("#attachment4Url").val()+'</not:attachment4Url>': xml+='<not:attachment4Url></not:attachment4Url>';
		 xml+='</ser:note>'+
	    '</ser:UpdateNote>'+
		'</soapenv:Body></soapenv:Envelope>';	
				
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.UpdateNote'
			},
		    success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.UpdateNoteResponse.UpdateNoteResult.errorSpecified == 'false'){									
			  
			  } else {				
				var nList = $.xml2json(data).Body.UpdateNoteResponse.UpdateNoteResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
			}
		});   		
	};		
	 /** end UpdateNote
	 /**
	 * InsertAttachment
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.InsertAttachment = function(sOrg, sUser, sPass, sType,nID, noteID, attachmentNumber){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:not="http://www.login.absentiemanager.nl/noteService">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:InsertAttachment>'+		
			'<not:login>'+
			'<not:Organization>'+sOrg+'</not:Organization>'+	
			'<not:Username>'+sUser+'</not:Username>'+	
			'<not:Password>'+sPass+'</not:Password>'+				
			'</not:login>'+	
			'<not:type>'+sType+'</ser:type>'+
	        '<not:id>'+nID+'</not:id>'+	
			'<not:attachmentNumber>'+attachmentNumber+'</not:attachmentNumber>'+			
		    '<not:attachment>'+	        
				($("#Id").val() && $("Id").val()!=null)? xml+='<not:Id>'+$("#Id").val()+'</not:Id>' : xml+='<not:Id></not:Id>';
				($("#NoteType").val() && $("NoteType").val()!=null)? xml+='<not:NoteType>'+$("#NoteType").val()+'</not:NoteType>': xml+='<not:NoteType></not:NoteType>';				
				($("#EmployeeId").val() && $("EmployeeId").val()!=null)? xml+='<not:EmployeeId>'+$("#EmployeeId").val()+'</not:EmployeeId>': xml+='<not:EmployeeId></not:EmployeeId>';
				($("#AttachmentNumber").val() && $("AttachmentNumber").val()!=null)? xml+='<not:AttachmentNumber>'+$("#AttachmentNumber").val()+'</not:AttachmentNumber>': xml+='<not:AttachmentNumber></not:AttachmentNumber>';
			    ($("#AttachmentValid").val() && $("AttachmentValid").val()!=null)? xml+='<not:AttachmentValid>'+$("#AttachmentValid").val()+'</not:AttachmentValid>' : xml+='<not:AttachmentValid></not:AttachmentValid>';
				($("#AttachmentSize").val() && $("AttachmentSize").val()!=null)? xml+='<not:AttachmentSize>'+$("#AttachmentSize").val()+'</not:AttachmentSize>' : xml+='<not:AttachmentSize></not:AttachmentSize>';
				($("#AttachmentContentType").val() && $("AttachmentContentType").val()!=null)? xml+='<not:AttachmentContentType>'+$("#AttachmentContentType").val()+'</not:AttachmentContentType>' : xml+='<not:AttachmentContentType></not:AttachmentContentType>';
		        ($("#AttachmentFileName").val() && $("AttachmentFileName").val()!=null)? xml+='<not:AttachmentFileName>'+$("#AttachmentFileName").val()+'</not:AttachmentFileName>' : xml+='<not:AttachmentFileName></not:AttachmentFileName>';
		        ($("#AttachmentData").val() && $("AttachmentData").val()!=null)? xml+='<not:AttachmentData>'+$("#AttachmentData").val()+'</not:AttachmentData>' : xml+='<not:AttachmentData></not:AttachmentData>';
		       
		 xml+='</ser:attachment>'+
	    '</ser:InsertAttachment>'+
		'</soapenv:Body></soapenv:Envelope>';	
				
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.InsertAttachment'
			},
		    success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.InsertAttachmentResponse.InsertAttachmentResult.errorSpecified == 'false'){									
			  
			  } else {				
				var nList = $.xml2json(data).Body.InsertAttachmentResponse.InsertAttachmentResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
			}
		});   		
	};	
	 /** end UpdateNote
	 /**
	 * DeleteNote
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	 */	
	this.DeleteNote = function(sOrg, sUser, sPass, sType, sType, noteID){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:not="http://www.login.absentiemanager.nl/noteService">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:DeleteNote>'+		
			'<not:login>'+
			'<not:Organization>'+sOrg+'</not:Organization>'+	
			'<not:Username>'+sUser+'</not:Username>'+	
			'<not:Password>'+sPass+'</not:Password>'+				
			'</not:login>'+				
			($("#type").val() && $("type").val()!=null)? xml+='<not:type>'+$("#type").val()+'</not:type>' : xml+='<not:type></not:type>';
			($("#id").val() && $("id").val()!=null)? xml+='<not:id>'+$("#id").val()+'</not:id>' : xml+='<not:id></not:id>';			
	    '</ser:DeleteNote>'+
		'</soapenv:Body></soapenv:Envelope>';	
				
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.DeleteNote'
			},
		    success: function(data, status, req){			
			if (status == "success"){  
			  if($.xml2json(data).Body.DeleteNoteResponse.DeleteNoteResult.errorSpecified == 'false'){									
			  
			  } else {				
				var nList = $.xml2json(data).Body.DeleteNoteResponse.DeleteNoteResult.errorSpecified;
			  }				
			}
		   },
		   error: function(data, status, req){			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
			}
		});   		
	};/** end DeleteNote
	/**
	 * DeleteAttachment
	 * xmlhttp.onreadystatechange=callback(data);
	 * @param form
	*/	
	this.DeleteAttachment = function(sOrg, sUser, sPass, sType, sType, noteID){		
		restURL = (sessionStorage.amsserviceURL==undefined) ? restURL : switchAmsservicet(sessionStorage.amsserviceURL); 		
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:not="http://www.login.absentiemanager.nl/noteService">'+
		'<soapenv:Header/>'+
		'<soapenv:Body>'+
		'<ser:DeleteAttachment>'+		
			'<not:login>'+
			'<not:Organization>'+sOrg+'</not:Organization>'+	
			'<not:Username>'+sUser+'</not:Username>'+	
			'<not:Password>'+sPass+'</not:Password>'+				
			'</not:login>'+				
			($("#type").val() && $("type").val()!=null)? xml+='<not:type>'+$("#type").val()+'</not:type>' : xml+='<not:type></not:type>';
			($("#id").val() && $("id").val()!=null)? xml+='<not:id>'+$("#id").val()+'</not:id>' : xml+='<not:id></not:id>';	
			($("#attachmentNumber").val() && $("attachmentNumber").val()!=null)? xml+='<not:attachmentNumber>'+$("#attachmentNumber").val()+'</not:attachmentNumber>' : xml+='<not:attachmentNumber></not:attachmentNumber>';			
	    '</ser:DeleteAttachment>'+
		'</soapenv:Body></soapenv:Envelope>';	
						
		 $.ajax({  
			type: "POST",
			url: restURL+"AMS.NoteService.cls",	
			async: false,	
			cache: false,			
			data: xml,			
			contentType: 'text/xml; charset=utf-8',
			headers: {		
				SOAPAction: 'http://www.login.absentiemanager.nl/noteService/AMS.NoteService.DeleteAttachment'
			},
		    success: function(data, status, req){			
				if (status == "success"){  
					  if($.xml2json(data).Body.DeleteAttachmentResponse.DeleteAttachmentResult.errorSpecified == 'false'){						  
					  } else {						  				
						var nList = $.xml2json(data).Body.DeleteAttachmentResponse.DeleteAttachmentResult.errorSpecified;					
					 }				
				}
		   },
		   error: function(data, status, req){			
				$('#login_response').html("Oops...: "+  req.responseText + " " + status).css({"color": "rgb(255, 0, 0)","border": "1px solid #251f1","padding": "5px", "font-size": "14px", "background-color": "#fff", "width": "15%", "margin": "10px", "border-radius": "10px"});
			}
		});   		
	};/** end DeleteAttachment **/	
}