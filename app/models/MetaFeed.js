function MetaFeed(feedTitle, feedURL) {
	this.feedTitle = feedTitle;
	this.feedURL = feedURL;
};

MetaFeed.prototype.get_feed_title = function() {
	Mojo.Log.info("Executed get_feed_title()");
	return this.feedTitle;
};

MetaFeed.prototype.update = function() {

};