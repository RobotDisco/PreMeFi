function FeedViewAssistant(feed) {
	this.feed = feed;
}

FeedViewAssistant.prototype.setup = function() {
	this.set_feed_title();
	this.update_feed();

	/* Setup widgets */
	this.controller.setupWidget('story_list', {
		hasNoWidgets : true,
		itemTemplate : "views/FeedView/story_list.html"
	}, this.list_widget_model = {
		items : this.feed.list
	});
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

FeedViewAssistant.prototype.update_feed = function() {
	this.feed.update();
	this.controller.modelChanged(this.list_widget_model, this);
};