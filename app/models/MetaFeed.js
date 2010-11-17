/**
 * @constructor
 * 
 * @param {String} feedTitle
 *            Free-text title of feed
 * @param {String} feedURL
 *            URL for feed (RSS, not associated web page)
 */
function MetaFeed(feedTitle, feedURL) {
	/** Feed Title */
	this.feedTitle = feedTitle;
	/** Feed URL */
	this.feedURL = feedURL;
	/** List of stories in feed */
	this.list = [];
}

/**
 * @returns Feed Title
 * @type String
 */
MetaFeed.prototype.get_feed_title = function() {
	return this.feedTitle;
};

/**
 * Asychronously request the latest feed data from the feed URL.
 */
MetaFeed.prototype.update = function() {

	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : true
	});
	var request = new Ajax.Request(this.feedURL, {
		method : "get",
		onSuccess : this.updateSuccess.bind(this),
		onFailure : this.updateFailure.bind(this)
	});
};

/**
 * Ajax.Request failure handler
 * 
 * @param {Ajax.Response} transport response object
 */
MetaFeed.prototype.updateFailure = function(transport) {
	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : false
	});
	Mojo.Log.warn("Our update failed :(");
};

/**
 * Ajax.Request success handler
 * 
 * @param {Ajax.Response} transport response object
 */
MetaFeed.prototype.updateSuccess = function(transport) {

	// Ensure that this is an RSS feed, even if not automatically parsed as one
	var xml_text = new DOMParser().parseFromString(transport.responseText,
			"text/xml");
	if (xml_text.getElementsByTagName("rss").length === 0) {
		Mojo.Log.warn("We did not get a valid RSS feed!");
	} else {
		this.list = FeedProcessor.processRSS(xml_text);
	}
	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : false
	});
};