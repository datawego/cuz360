
   function isEmpty(str){
         
        if(typeof str == "undefined" || str == null || str == "")
            return true;
        else
            return false ;
    }

function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}

function CuzPlugIn(tracker) {
  // this.endpoint = (config.endpoint.substr(-1) != '/') ? config.endpoint + '/' : config.endpoint;
  this.endpoint = 'http://localhost:5001'
  var url = this.endpoint + '/collect'
	
  if (isEmpty(document.querySelector("meta[property='og:title']")) == false) {
      var n_title = document.querySelector("meta[property='og:title']").getAttribute("content");
      console.log(n_title);
      tracker.set('title', n_title);
  }
  
  var sendHitTask = 'sendHitTask';
  var originalSendHitTask = tracker.get(sendHitTask);
  tracker.set(sendHitTask, function(model) {
    var payload = model.get('hitPayload');
    //originalSendHitTask(model);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + payload, true);
    xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
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


  // Logs a list of all tracker names to the console.
function loadCuz360(){
//ga(function() {
  var trackers = ga.getAll();
  //console.log(JSON.stringify(ga.getAll()));
  trackers.forEach(function(tracker) {
    console.log(tracker.get('name'));
    if (isEmpty(document.querySelector("meta[property='og:title']")) == false) {
      var n_title = document.querySelector("meta[property='og:title']").getAttribute("content");
      console.log(n_title);
      tracker.set('title', n_title);
    }
    tracker.set('sendHitTask', function (model) {
	      var payload = model.get('hitPayload');
	      //console.log(payload)
      
            //CORS GET
            var url = 'http://localhost:5001/collect';
            var data = model.get('hitPayload');
            console.log('SENDING data to server on ' + url + ': ' + model.get('hitPayload'));
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + '?' + data, true);
            xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
            };
            xhr.send(null);
      
	    });
  });
//});
};
  
