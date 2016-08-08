//constants

var baseURL,restURL, sUrl = window.location.pathname.split('/')[1],
	bLanguage = (window.navigator.userLanguage || window.navigator.language).substring(0, 2).toLowerCase();
	
	
function switchAmsservicet(service){   
	switch(service){  
		case "abs3demo": return "https://demo.absentiemanager.nl/abs3demo/";
		case "flynth": return "https://login.absentiemanager.nl/flynth/";
		case "abs": return "https://login.absentiemanager.nl/abs/";
		case "test": return "https://login.workbee.nl/loket/";
		case "flynthdemo": return "https://login.absentiemanager.nl/flynthdemo/";
		case "loket": return "https://login.absentiemanager.nl/loket/";
		default: return "https://login.absentiemanager.nl/abs/";     
	}
}	

if (sUrl == "wb"){
	baseURL = "http://localhost/wb/emp/";	
	restURL = "https://demo.absentiemanager.nl/abs3demo/"; 	
} else if (sUrl == "acc"){
	baseURL = "https://login.workbee.eu/acc/emp/";
	restURL = "https://demo.absentiemanager.nl/abs3demo/";  
} else {
    baseURL = "https://login.workbee.eu/emp/";
	restURL = "https://login.absentiemanager.nl/abs"; 	
}
//function to define and include required css files
function fncRequireCssFile(url,dev,ver,media) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	media ? link.media = media : '';
	link.href = url+"?bust=" + ((dev)? (new Date()).getTime(): ver);
	document.getElementsByTagName("head")[0].appendChild(link);
}	// end fncRequireCssFile
		
var _vers =  (new Date()).getTime(); 
//required css files	
fncRequireCssFile(baseURL+"js/libs/bootstrap/css/bootstrap.min.css", false, _vers, "screen","stylesheet","");	
fncRequireCssFile(baseURL+"css/font-awesome.min.css", false, _vers, "","stylesheet","");	
fncRequireCssFile(baseURL+"js/libs/jqueryui/css/jquery-ui.css", false, _vers, "","stylesheet","");
fncRequireCssFile(baseURL+"css/main.css", false, _vers, "","stylesheet","");	
fncRequireCssFile(baseURL+"css/pace.css", false, _vers, "","stylesheet","");
fncRequireCssFile(baseURL+"js/libs/bootstrap/css/bootstrap-responsive.css", false, _vers, "screen","stylesheet","");	


