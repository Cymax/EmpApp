define(function(require) {
  'use strict';
  var Backbone      = require('backbone'),
      _             = require('underscore'),
      loginTemplate  = require('text!../../html/login.html'),
      Layout        = require('view/layouts/loginLayout'),
	 
	  loginModel 			= Backbone.Model.extend(),
	 
	  loginCollection = Backbone.Collection.extend({
			model: loginModel,
			url: function(sOrg,sUser,sPass){
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
						   console.log(data);
					 //ajaxComplete			   
					},//success
				   error: function(data, status, req){
						
				  }// error			  
				});    
				// -- End AJAX Call --
				return false;					
			},
		
			parse: function (data) {
				var $xml = $(data);
		
				//return $xml.find('book').map(function () {
					//var bookTitle = $(this).find('name').text();
					//return {title: bookTitle};
				//}).get();
			},
		
			fetch: function (options) {
				//options = options || {};
				//options.dataType = "xml";
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
		});

	 
	  LoginPage = Backbone.View.extend({
		template: _.template(loginTemplate),
		initialize: function () {
        	thisView = this;
		    this.listenTo(this.collection, "sync", this.render);
		},	
		
		render: function() {
		   require(['jquery_validate','md5', 'store','wb_translate', 'xml2json','am_service'], function(){
				
		});//require   
	   
      this.$el.html(this.template(this));    
      return this;
    }
	
	
	
	
  });
  return Layout.extend({
    content: LoginPage
  });
});


