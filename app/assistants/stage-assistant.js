/**
 * @constructor Create stage assistant
 */
function StageAssistant() {
	/* this is the creator function for your stage assistant object */
	this.DEFAULT_FEED_TITLE = 'MetaFilter';
	this.DEFAULT_FEED_URL = 'http://feeds.feedburner.com/Metafilter';
}

/**
 * Prepare stage assistant for use
 */
StageAssistant.prototype.setup = function() {
	/*
	 * this function is for setup tasks that have to happen when the stage is
	 * first created
	 */
	this.controller.pushScene('FeedView', MetaFeedList[0]);
};
