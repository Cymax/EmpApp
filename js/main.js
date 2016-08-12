define([], function() {
  'use strict';
  // Configure require.js paths and shims
  require.config({
    paths: {
		'text': 'libs/requirejs-text/text',
		'router': 'libs/requirejs-router/router',
		'backbone': 'libs/backbone/backbone',
		'underscore': 'libs/underscore/underscore',
		'jquery': 'libs/jquery/js/jquery-2.0.2.min',
		'bootstrap': 'libs/bootstrap/js/bootstrap.min',	 
		'jqueryui':  'libs/jqueryui/js/jquery-ui-1.10.3.min',
		'md5' :  'libs/md5',	
		'store':'libs/store',
		'underscore':'libs/underscore/underscore',
		'select2':'libs/select2/js/select2.min', 
		'datatables':'libs/datatables/jquery.dataTables.min',	
		'datatables_responsive':'libs/datatable-responsive/js/dataTables.responsive',		 
		'jquery_validate': 'libs/jquery/jquery.validate',	
		'pwstrength':'libs/bootstrap/js/pwstrength',	 	 
		'xml2json':'libs/jquery.xml2json', 
		
		'datatablesColVis':'libs/datatables/dataTables.colVis.min',
		'datatablesTools':'libs/datatables/dataTables.tableTools.min',
		'datatablesBootstrap':'libs/datatables/dataTables.bootstrap.min',
		'datatablesResponsive':'libs/datatables/dataTables.responsive.min',
		'dataTablesColumnFilter':'libs/datatables/jquery.dataTables.columnFilter',
		
		'highcharts':'https://login.workbee.eu/highcharts/js/highcharts',
		'highcharts-3d':'https://login.workbee.eu/highcharts/js/highcharts-3d',
		'highcharts-exporting':'https://login.workbee.eu/highcharts/js/modules/exporting',
		'highcharts-drilldown':'https://login.workbee.eu/highcharts/js/modules/drilldown',
		'highcharts-more':'https://login.workbee.eu/highcharts/js/highcharts-more',
		'highcharts-boost':'https://login.workbee.eu/highcharts/js/modules/boost',	
		
		'alasql':'libs/alasql',	
		
		'wb_translate':'lang/wbTranslate',
		'am_service':'am_services',
		
		'datatablesYadcf':'libs/datatables/jquery.dataTables.yadcf',
		'summernote':'libs/summernote/summernote',
		'summernote-nl':'libs/summernote/summernote-nl',
    },
	
	shim: {
		'jquery': {exports: '$'},
		'underscore': {	exports: '_'},
		'backbone': {deps: ['jquery', 'underscore'],exports: 'Backbone'	},
		'bootstrap': {deps: ['jquery','jqueryui']	},	
		'jqueryui': {deps: ['jquery']},
		'md5': {deps: ['jquery']},
		'select2': {deps: ['jquery']},
		'store': {deps: ['jquery']},
		'underscore': {deps: ['jquery']},		
		'datatables': {deps: ['jquery', 'bootstrap']},
		'datatables_responsive': {deps: ['jquery', 'datatables']},		
		'jquery_validate': {deps: ['jquery']},
		'pwstrength': {deps: ['jquery', 'bootstrap']},		
		'xml2json': {deps: ['jquery']},
		'wb_translate': {deps: ['jquery']},	
		'datatablesColVis': {deps: ['jquery','datatables','bootstrap']},	
		'datatablesTools': {deps: ['jquery','datatables','bootstrap']},	
		'datatablesBootstrap': {deps: ['jquery','datatables','bootstrap']},	
		'datatablesResponsive': {deps: ['jquery','datatables','bootstrap']},	
		
		'highcharts': {deps: ['jquery']},
		'highcharts-3d': {deps: ['jquery', 'highcharts']},
		'highcharts-exporting': {deps: ['jquery', 'highcharts']},
		'highcharts-drilldown': {deps: ['jquery', 'highcharts']},
		'highcharts-more': {deps: ['jquery', 'highcharts']},	
		'highcharts-boost': {deps: ['jquery', 'highcharts']},
		
		'alasql': {deps: ['jquery']},	
		'datatablesYadcf': {deps: ['jquery', 'datatables']},
		'summernote': {deps: ['jquery', 'bootstrap']},
		'summernote-nl': {deps: ['summernote']},
		
    }
	
  });
  // Load the router
  require(['router', 'jquery','store'], function(router, $) {
    // Keep track of the currently loaded view so we can run teardown before loading the new view
    var view;
    router
      .registerRoutes({      
		dashboard: { path: '/dashboard', moduleId: 'view/dashboardPage' },				
		privateMode: { path: '/privateMode', moduleId: 'view/privateModePage' },	
		login: { path: '/login', moduleId: 'view/loginPage' },			
		actionMonitor: { path: '/actionMonitor', moduleId: 'view/actionMonitorPage' },			
		documents: { path: '/documents', moduleId: 'view/documentsPage' },		
        meetingRequest: { path: '/meetingRequest', moduleId: 'view/meetingRequestPage' },
		makeDeclaration: { path: '/makeDeclaration', moduleId: 'view/makeDeclarationPage' },		
		notes: { path: '/notes', moduleId: 'view/notesPage' },	
		reintegration: { path: '/reintegration', moduleId: 'view/reintegrationPage' },		
		prevention: { path: '/prevention', moduleId: 'view/preventionPage' },
		wga: { path: '/wga', moduleId: 'view/wgaPage' },	
		work: { path: '/work', moduleId: 'view/workPage' },	
		notFound: { path: '*', moduleId: 'view/dashboardPage' }
      }).on('routeload', function onRouteLoad(View, routeArguments) {
        // When a route loads, render the view and attach it to the document
        if (view) {
          view.remove();
        }
        view = new View(null, routeArguments);
        view.render();
        $('body').append(view.el);
      }).init(); // Set up event handlers and trigger the initial page load
  });   
});


