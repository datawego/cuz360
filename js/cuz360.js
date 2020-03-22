
ga(function(tracker) {

	 var i;
	  var trackers = ga.getAll();
	  //console.log(trackers);

	  // Modify sendHitTask for all trackers
	  for (i = 0; i < trackers.length; i++) {
	    var tracker = trackers[i];
	    console.log(tracker);

	    // Set anonymizeIp as a fallback
	    //tracker.set('anonymizeIp', true); // with this, should get aip=1 for hits

	    // Modifies sendHitTask for tracker to send the request to a local ipproxy server, which passes it on to
	    // www.google-analytics.com/collect after ip anonymization
	    tracker.set('sendHitTask', function (model) {
	      var payload = model.get('hitPayload');
	      console.log(payload)

			//DOX.setEventName("GA-Visit Main Page")
			//DOX.logEvent(
			//	DOX.Builder.event()
			//	.setEventName("Visit")
			//	.setProperties(
			//		DOX.Builder.properties()
			//		.set("ga", payload)
		//)
		//	)
	    });
       }
	  // Modifies sendHitTask to hit ipproxy instead of http://www.google-analytics.com directly
  // tracker.set('sendHitTask', function(model) {
  //  payload = model.get('hitPayload');
  //  console.log(payload);

  //  xhr.send();
  //});


  });
