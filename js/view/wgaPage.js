define(function(require) {
  'use strict';
  var Backbone      = require('backbone'),
      _             = require('underscore'),
      wgaTemplate  = require('text!../../html/wga.html'),
      Layout        = require('view/layouts/dashboardLayout');

  var wgaPage = Backbone.View.extend({
    template: _.template(wgaTemplate),
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
    content: wgaPage
  });
});


