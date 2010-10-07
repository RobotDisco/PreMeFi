function MetaFeed(feedTitle, feedURL) {
	this.feedTitle = feedTitle;
	this.feedURL = feedURL;
	this.list = [];
};

MetaFeed.prototype.get_feed_title = function() {
	Mojo.Log.info("Executed get_feed_title()");
	return this.feedTitle;
};

MetaFeed.prototype.update = function() {
	var request = new Ajax.Request(this.feedURL, {
		method : "get",
		evalJSON : false,
		onSuccess : this.updateSuccess.bind(this),
		onFailure : this.updateFailure.bind(this)
	});
};

MetaFeed.prototype.updateFailure = function(transport) {

};

MetaFeed.prototype.updateSuccess = function(transport) {

};