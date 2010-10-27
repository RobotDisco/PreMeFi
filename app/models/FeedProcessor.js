var FeedProcessor = {}; // namespace

/**
 * Generate a MetaStory from XML
 * 
 * @param input
 *            {Element} XML input
 * @returns {MetaStory} The resulting story object
 */
FeedProcessor.processItem = function(input) {

	var title = input.getElementsByTagName('title')[0].textContent;
	var story = input.getElementsByTagName('description')[0].textContent;
	var url = input.getElementsByTagName('link')[0].textContent;

	return new MetaStory(title, story, url);
};