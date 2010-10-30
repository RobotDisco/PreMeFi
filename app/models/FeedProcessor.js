var FeedProcessor = {}; // namespace

/**
 * Generate a MetaStory from XML
 * 
 * @param input
 *            {Element} XML input
 * @returns {MetaEntry} The resulting story object
 */
FeedProcessor.processItem = function(input) {

	var title = input.getElementsByTagName('title')[0].textContent;
	var story = input.getElementsByTagName('description')[0].textContent;
	var url = input.getElementsByTagName('link')[0].textContent;

	return new MetaEntry(title, story, url);
};

/**
 * Generate a MetaFeed from XML
 * 
 * @param input
 *            {Element} XML input
 * @returns {MetaFeed} The resulting feed object
 */
FeedProcessor.processRSS = function(input) {
	var feed_title = input.getElementsByTagName('title')[0];
	var feed_url = input.getElementsByTagName('link')[0];

	var feed = new MetaFeed(feed_title, feed_url);

	var items = input.getElementsByTagName('item');
	for ( var i = 0; i < items.length; ++i) {
		feed.list[i] = FeedProcessor.processItem(items[i]);
	}

	return feed;
};