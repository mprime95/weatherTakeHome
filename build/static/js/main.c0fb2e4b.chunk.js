(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],[,function(t,e,n){t.exports=n(2)},function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(3);r()((function(){r.a.get(n(4),(function(t){var e=t;function n(t){if(void 0===t.date||""===t.date)t.date="Date not available";else{var e=t.date.split(" "),n=new Date(e[0]);t.date=n.toUTCString().slice(0,n.toUTCString().length-12)+" "+e[1]+" "+e[2]}return void 0!==t.town&&""!==t.town||(t.town="Location not available"),void 0!==t.temperature&&""!==t.temperature||(t.temperature="--"),void 0!==t.weather&&""!==t.weather||(t.weather="Weather not available"),t}var a=function(){for(var t=function(t){for(var e=t.split("\n"),a=e[0].split(","),r=[],o=1;o<e.length;o++){var i={},u=e[o].split(",");if(u.length!==a.length)console.log("error: invalid format "+u);else{for(var c=0;c<a.length;c++)i[a[c]]=u[c];r.push(n(i))}}return r}(e),a=0;a<o.forcast.length;a++)t.push(n(o.forcast[a]));return t}();function i(t){for(var e=[],n=0;n<a.length;n++)e.includes(a[n][t])||e.push(a[n][t]);return e}var u=i("town"),c=i("date"),s=r()("#town"),l=r()("#date");function d(t,e){var n=function(t,e){for(var n=[],r=0;r<a.length;r++)a[r][t]===e&&n.push(a[r]);return n}(t,e),r="";if(document.getElementById("cardTitle").innerHTML=e,"town"===t)r="date";else{if("date"!==t)return"Error, search invalid";r="town"}var o=n.map((function(t){for(var e in t)return"<div class='weakly-weather-item'> <p class='mb-0'> "+t[r]+"</p> <p class='mb-0'>"+t.temperature+"</p> <p class='mb-0'> "+t.weather+"</p></div>"})).join("");document.getElementById("contents").innerHTML=o}s.empty(),l.empty(),r.a.each(u,(function(t,e){s.append(r()("<option></option>").attr("value",e).text(e))})),r.a.each(c,(function(t,e){l.append(r()("<option></option>").attr("value",e).text(e))})),document.querySelector("#town").addEventListener("change",(function(t){d("town",t.target.value)})),document.querySelector("#date").addEventListener("change",(function(t){d("date",t.target.value)})),d("town",a[0].town)}))}))},function(t){t.exports=JSON.parse('{"forcast":[{"date":"01/01/2020 12:00 AM","town":"Tyson\u2019s Corner","weather":"Cloudy"},{"date":"01/01/2020 12:00 AM","town":"Reston","weather":"Cloudy"},{"date":"01/01/2020 12:00 AM","town":"Fairfax","weather":"Rain"}]}')},function(t,e,n){t.exports=n.p+"static/media/data.29b318a3.csv"}],[[1,1,2]]]);
//# sourceMappingURL=main.c0fb2e4b.chunk.js.map