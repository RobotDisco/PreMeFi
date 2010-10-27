var TestFeedXML = {}; // namespace

TestFeedXML.generateItem = function(title, story, link) {
	var item = document.createElement('item');

	var title_element = document.createElement('title');
	title_element.appendChild(document.createTextNode(title));

	var story_element = document.createElement('description');
	story_element.appendChild(document.createTextNode(story));

	var link_element = document.createElement('link');
	link_element.appendChild(document.createTextNode(link));

	item.appendChild(title_element);
	item.appendChild(story_element);
	item.appendChild(link_element);

	return item;
};