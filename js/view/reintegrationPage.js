define(function(require) {
  'use strict';
  var Backbone      = require('backbone'),
      _             = require('underscore'),
      reintegrationTemplate  = require('text!../../html/reintegration.html'),
      Layout        = require('view/layouts/dashboardLayout');
	  
  var reintegrationPage = Backbone.View.extend({
    template: _.template(reintegrationTemplate),
    render: function() {
	  	  require(['jquery','jqueryui','bootstrap','jquery_validate','md5', 'store','wb_translate'], function($){ 		
		 
		  $(function(){				 
			 	renderTranslations();
	      });//ready
		  
	   });//require
      this.$el.html(this.template(this));    
      return this;
    }
  });
  return Layout.extend({
    content: reintegrationPage
  });
});


