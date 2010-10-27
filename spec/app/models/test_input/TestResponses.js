var TestResponses = {
	failure : {
		status : 500,
		contentType : "text/html",
		responseText : "<html><body>Sorry, something terrible happened!</body></html>"
	},
	success : {
		status : 200,
		contentType : "application/rss+xml",
		responseText : "<rss>Feed goes here</rss>"
	},
	notXML : {
		status : 200,
		contentType : "text/plain",
		responseText : "I am not XML data!"
	}
};