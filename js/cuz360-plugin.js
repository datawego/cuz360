function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}

function CuzPlugIn(tracker, config) {
  this.endpoint = (config.endpoint.substr(-1) != '/') ? config.endpoint + '/' : config.endpoint;
  //this.endpoint = 'http://localhost:5001/'
  var url = this.endpoint + 'collect'
	
  var sendHitTask = 'sendHitTask';
  var originalSendHitTask = tracker.get(sendHitTask);
  tracker.set(sendHitTask, function(model) {
    var payload = model.get('hitPayload');
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
