
   function isEmpty(str){
         
        if(typeof str == "undefined" || str == null || str == "")
            return true;
        else
            return false ;
    }

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
  
