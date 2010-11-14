function FeedViewAssistant(feed) {
	this.feed = feed;
	this.list_widget_model = {
		items : this.feed.list
	};
}

FeedViewAssistant.prototype.setup = function() {
	this.set_feed_title();
	this.update_feed();

	/* Setup widgets */
	this.controller.setupWidget('story_list', {
		hasNoWidgets : true,
		itemTemplate : "FeedView/story_list"
	}, this.list_widget_model);
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
};

FeedViewAssistant.prototype.considerForNotification = function(
		notification_message) {
	if (notification_message.updating === false) {
		this.list_widget_model.items = this.feed.list.slice(0);
		this.controller.modelChanged(this.list_widget_model, this);
	}
	return undefined;
};