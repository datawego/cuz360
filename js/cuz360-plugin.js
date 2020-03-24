// start of plugIn
var convertQueryStringToBody = function (query) {
    var body = {};
    var arr = query.split('&');
    for(var i=0; i<arr.length; i++){
        var elem = arr[i].split('=');
        body[elem[0]] = decodeURIComponent(elem[1]);
    }
    return body;
};
function getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length;i++){
			var c = ca[i];
			while(c.charAt(0)==' ') c = c.substring(1);
			if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
}
function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}
function CuzPlugIn(tracker, config) {
	  if (typeof config.endpoint == 'undefined' || config.endpoint == null || config.endpoint == "") {
	  	this.endpoint = '//localhost:5001/'
	  } else {
	  	this.endpoint = (config.endpoint.substr(-1) != '/') ? config.endpoint + '/' : config.endpoint;
	  }
	  var sendOriginal = false;
	  if (typeof config.sendOriginal != 'undefined'){
	  	sendOriginal = config.sendOriginal;
	  }
	  //this.endpoint = 'http://localhost:5001/'
	  var url = this.endpoint + 'collect?trackerId=' + tracker.get('trackingId');

	  var vid = '__utmb=' + getCookie('__utmb');
	  //document.referrer;
	  var addvals = 'et=' + (new Date()).getTime() + '&' + vid;

		
	  var sendHitTask = 'sendHitTask';
	  var originalSendHitTask = tracker.get(sendHitTask);

	  tracker.set(sendHitTask, function(model) {
	  		if (sendOriginal == true){
	  			originalSendHitTask(model);
	  		}

	  		var payload = model.get('hitPayload');
		    payload = payload + '&' + addvals;

            var data = convertQueryStringToBody(payload);
            //console.log('POSTING data to server on ' + url + ': ' + data);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                //console.log('Data sent to ' + url);
            };
            xhr.send(JSON.stringify(data));

		    
	  });
}

function providePlugin() {
  var ga = getGA();
  if (typeof ga == 'function') {
    ga('provide', 'cuzPlugIn', CuzPlugIn);
  }
}
providePlugin();
//end of plugin
