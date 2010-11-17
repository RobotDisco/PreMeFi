/** namespace */
var FeedProcessor = {};

/**
 * Generate a MetaStory from XML
 * 
 * @param input
 *            {Element} XML input
 * @returns The resulting story object
 * @type MetaEntry
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
 * @param {Element} input XML input
 * @returns A list of MetaEntry objects
 * @type [MetaEntry]
 */
FeedProcessor.processRSS = function(input) {
	var list = [];

	var items = input.getElementsByTagName('item');
	for ( var i = 0; i < items.length; ++i) {
		list[i] = FeedProcessor.processItem(items[i]);
	}

	return list;
};