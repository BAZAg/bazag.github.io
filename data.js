(function (){
	var timestamp = Date.now().toString().slice(0, -3);
	var script=document.createElement("script");
			script.type="text/javascript";
			script.src="temp.js?" + timestamp;
			document.getElementsByTagName("main")[0].appendChild(script);
})();