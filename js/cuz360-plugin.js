
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
function getSessionId(){
	if windows.localStorage {
	   var stime = windows.localStorage.getItem('stime');
	   var sid = windows.localStorage.getItem('sid');
	   var now = new Date().getTime();
	   windows.localStorage.setItem('stime', now);
	   if stime != null {
	      var gap_min = (now - parseInt(stime)) / 1000 / 60;
	      if (gap_min > 30) {
		 windows.localStorage.setItem('sid', now);
		 return now;
	      }
	      return sid;
	   }
	   windows.localStorage.setItem('sid', now);
	   return now;
	}
	return null;
}

function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}

function CuzPlugIn(tracker, config) {
  this.endpoint = (config.endpoint.substr(-1) != '/') ? config.endpoint + '/' : config.endpoint;
  //this.endpoint = 'http://localhost:5001/'
  var url = this.endpoint + 'collect'
  var vid = '__utmb=' + getCookie('__utmb');
  //document.referrer;
  var addvals = 'et=' + (new Date()).getTime() + '&' + vid;
	
  var sendHitTask = 'sendHitTask';
  var originalSendHitTask = tracker.get(sendHitTask);
  tracker.set(sendHitTask, function(model) {
    var payload = model.get('hitPayload');
    payload = payload + '&' + addvals;
	    
    //originalSendHitTask(model);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + payload, true);
    xhr.onreadystatechange = function () {
                console.log('cuz data sent to ' + url);
    };
    xhr.send(null);
  });
}

function providePlugin() {
  var ga = getGA();
  if (typeof ga == 'function') {
    ga('provide', 'cuzPlugIn', CuzPlugIn);
  }
}
providePlugin();
