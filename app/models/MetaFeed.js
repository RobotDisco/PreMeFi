/**
 * @constructor
 * 
 * @param feedTitle
 *            Free-text title of feed
 * @param feedURL
 *            URL for feed (RSS, not associated web page)
 * @returns {MetaFeed}
 */
function MetaFeed(feedTitle, feedURL) {
	this.feedTitle = feedTitle;
	this.feedURL = feedURL;
	this.list = [];
};

/**
 * @returns Feed Title
 */
MetaFeed.prototype.get_feed_title = function() {
	return this.feedTitle;
};

/**
 * Asychronously request the latest feed data from the feed URL.
 */
MetaFeed.prototype.update = function() {
	var request = new Ajax.Request(this.feedURL, {
		method : "get",
		onSuccess : this.updateSuccess.bind(this),
		onFailure : this.updateFailure.bind(this)
	});
};

/**
 * Ajax.Request failure handler
 * 
 * @param transport
 *            {Ajax.Response} response object
 */
MetaFeed.prototype.updateFailure = function(transport) {

};

/**
 * Ajax.Request success handler
 * 
 * @param transport
 *            {Ajax.Response} response object
 */
MetaFeed.prototype.updateSuccess = function(transport) {

	// Ensure that this is an RSS feed, even if not automatically parsed as one
	var xml_text = new DOMParser().parseFromString(transport.responseText,
			"text/xml");
	if (xml_text.getElementsByTagName("rss").length === 0) {
		Mojo.Log.warn("We did not get a valid RSS feed!");
	} else {
		this.processResponse(xml_text);
	}
};

/**
 * Parse the response's XML data into our story structures.
 * 
 * @param rss_string
 *            Response in RSS+XML format.
 */
MetaFeed.prototype.processResponse = function(rss_string) {
};