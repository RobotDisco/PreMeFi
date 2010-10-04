function FeedViewAssistant(feed) {
	this.feed = feed;
}

FeedViewAssistant.prototype.setup = function() {
	this.set_feed_title();
};

FeedViewAssistant.prototype.activate = function(event) {
};

FeedViewAssistant.prototype.deactivate = function(event) {
};

FeedViewAssistant.prototype.cleanup = function(event) {
};

FeedViewAssistant.prototype.set_feed_title = function() {
	var title_element;

	title_element = this.controller.get("FeedView_title");
	title_element.innerHTML = this.feed.get_feed_title();
};
