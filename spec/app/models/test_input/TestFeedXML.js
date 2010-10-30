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

TestFeedXML.generateFeed = function(title, description, link, num_entries) {
	var rss_entry = document.createElement('rss');
	rss_entry.setAttribute('version', '2.0');

	var channel_entry = document.createElement('channel');

	var title_entry = document.createElement('title');
	title_entry.appendChild(document.createTextNode(title));
	channel_entry.appendChild(title_entry);

	var description_entry = document.createElement('description');
	description_entry.appendChild(document.createTextNode(description));
	channel_entry.appendChild(description_entry);

	var link_entry = document.createElement('link');
	link_entry.appendChild(document.createTextNode(link));
	channel_entry.appendChild(link_entry);

	for ( var i = 0; i < num_entries; ++i) {
		var item_entry = TestFeedXML.generateItem("test story " + num_entries,
				"This is test story " + num_entries,
				'http://www.metafilter.com/test' + num_entries + '.html');
		channel_entry.appendChild(item_entry);
	}

	rss_entry.appendChild(channel_entry);
	return rss_entry;
};