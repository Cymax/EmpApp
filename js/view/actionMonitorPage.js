define(function(require) {
  'use strict';
  var $ = require('jquery'),
	Backbone = require('backbone'),
	_    = require('underscore'),
	actionMonitorTemplate  = require('text!../../html/actionMonitor.html'),
	Layout        = require('view/layouts/dashboardLayout'),
	v1   =         require('jqueryui'),
	v2   =         require('bootstrap'),
	v3   =         require('jquery_validate'),
	v4   =         require('md5'),
	v6   =         require('wb_translate');
	
  var ActionMonitorPage = Backbone.View.extend({
    template: _.template(actionMonitorTemplate),
    render: function() {			 
			 	renderTranslations();		  
	
      this.$el.html(this.template(this));    
      return this;
    }
  });
  return Layout.extend({
    content: ActionMonitorPage
  });
});


