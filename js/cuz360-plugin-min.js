var convertQueryStringToBody=function(n){for(var t={},e=n.split("&"),i=0;i<e.length;i++){var o=e[i].split("=");t[o[0]]=decodeURIComponent(o[1])}return t};function getCookie(n){for(var t=n+"=",e=document.cookie.split(";"),i=0;i<e.length;i++){for(var o=e[i];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}function getGA(){return window[window.GoogleAnalyticsObject||"ga"]}function CuzPlugIn(n,t){void 0===t.endpoint||null==t.endpoint||""==t.endpoint?this.endpoint="//localhost:5001/":this.endpoint="/"!=t.endpoint.substr(-1)?t.endpoint+"/":t.endpoint;var e=!1;void 0!==t.sendOriginal&&(e=t.sendOriginal);var i=this.endpoint+"collect?trackerId="+n.get("trackingId"),o="__utmb="+getCookie("__utmb"),r="et="+(new Date).getTime()+"&"+o,d=n.get("sendHitTask");n.set("sendHitTask",function(n){1==e&&d(n);var t=n.get("hitPayload"),o=convertQueryStringToBody(t=t+"&"+r),u=new XMLHttpRequest;u.open("POST",i,!0),u.setRequestHeader("Content-Type","application/json"),u.onreadystatechange=function(){},u.send(JSON.stringify(o))})}function providePlugin(){var n=getGA();"function"==typeof n&&n("provide","cuzPlugIn",CuzPlugIn)}providePlugin();