function domyrestcall(queryString) {
	var baseUrl = att_base_uri;
	var user = att_username;
	var password = att_pass;
	var httpMethod = "GET";
	var contentType = "application/json";
	var content = "application/json";
	var restHost = RESTHostManager.createHost("DynamicRequest");
	var transientHost = RESTHostManager.createTransientHostFrom(restHost);
	transientHost.url = baseUrl;
	
	if (user != null && user != "") {
		var authParams = ["Per User Session", user, password];
	    var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
	    transientHost.authentication = authenticationObject;
	}
	
	var requestUrl = baseUrl + queryString;
	//System.log("Request full URL: " + requestUrl);
	var request = transientHost.createRequest(httpMethod, queryString, content);
	request.contentType = contentType;
	
	var response;
	
	if (user != null && user != "") {
	    //System.log("Executing REST request with dynamic credentials: " + user);
	    //System.log("Query string: " + request.url);
	    //System.log("Base URL: " + request.host.url);
	    response = request.executeWithCredentials(user, password);
	} else {
	    response = request.execute();
	}
	
	//System.log("Content as string: " + response.contentAsString);
	
	statusCode = response.statusCode;
	statusCodeAttribute = statusCode;
	//System.log("Status code: " + statusCode);
	contentLength = response.contentLength;
	headers = response.getAllHeaders();
	contentAsString = response.contentAsString;
	//System.log("Content as string: " + contentAsString);
	var json = JSON.parse(contentAsString);
	return json
}

var apisplitstring = "json/v2"

var	query = "";
var parsedjson = "";

/*

	get array of targets
	
*/
	query = "/types/targets";
	parsedjson = domyrestcall(query);
	//System.log(parsedjson);
	var targets = parsedjson['targets']
	//System.log(targets);
	var arrayoftargets = new Array();
	for (var i = 0; i < targets.length; i++){
		System.log(i + " out of " + targets.length);
		query = (targets[i]['href']).split(apisplitstring)[1];
		System.log(query);
		parsedjson = domyrestcall(query);
		arrayoftargets.push(parsedjson);
		//System.log(arrayoftargets[0]);
		//throw "test done"
		System.sleep(200);
	}

/*

	get array of xenvs

*/
	query = "/types/xenvs";
	parsedjson = domyrestcall(query);
	System.log(parsedjson);
	//System.log(parsedjson);
	var xenvs = parsedjson['xenvs']
	//System.log(xenvs);
	var arrayofxenvs = new Array();
	for (var i = 0; i < xenvs.length; i++){
		System.log(i + " out of " + xenvs.length);
		query = (xenvs[i]['href']).split(apisplitstring)[1];
		System.log(query);
		parsedjson = domyrestcall(query);
		arrayofxenvs.push(parsedjson);
	//	System.log(arrayofxenvs[0]);
		//throw "test done"
		System.sleep(500);
	}

/*

	get array of xms
	
*/
	query = "/types/xms";
	parsedjson = domyrestcall(query);
	//System.log(parsedjson);
	var xms = parsedjson['xmss']
	//System.log(xmss);
	var arrayofxms = new Array();
	for (var i = 0; i < xms.length; i++){
		System.log(i + " out of " + xms.length);
		query = (xms[i]['href']).split(apisplitstring)[1];
		System.log(query);
		parsedjson = domyrestcall(query);
		arrayofxms.push(parsedjson);
		//System.log(arrayofxms[0]);
		//throw "test done"
		System.sleep(200);
	}

System.log("targets output:");
//parse target objects
for (var i = 0; i < arrayoftargets.length; i++){

	System.log("node: " + arrayoftargets[i]['content']['name']);
	System.log("iops: " + arrayoftargets[i]['content']['iops']);
	System.log("bw: " + arrayoftargets[i]['content']['bw']);
}

System.log("xenvs output:");
//parse xenvs objects
for (var i = 0; i < arrayofxenvs.length; i++){
	System.log("name: " + arrayofxenvs[i]['content']['name']);
	System.log("cpu-usage: " + arrayofxenvs[i]['content']['cpu-usage']);
}

System.log("xms output:");
//parse xms objects
for (var i = 0; i < arrayofxms.length; i++){
	System.log("ram-total: " + arrayofxms[i]['content']['ram-total']);
	System.log("ram-usage: " + arrayofxms[i]['content']['ram-usage']);
	System.log("memory-utilization-level: " + arrayofxms[i]['content']['memory-utilization-level']);
}
