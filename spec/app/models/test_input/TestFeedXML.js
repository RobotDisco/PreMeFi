//  PreMeFi - A MetaFilter viewer for Palm's WebOS
//  Copyright (C) 2010  Gaelan D'costa <gdcosta@gmail.com>
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

/** namespace */
var TestFeedXML = {};

/**
 * Generate necessary RSS data for an <item> XML node
 * @param {String} title to generate XML for
 * @param {String} story to generate XML for
 * @param {String} link to generate XML for
 * @returns XML DOM node for an <item> object
 * @type {Element}
 */
TestFeedXML.generateItem = function(title, story, link, guid) {
	var item = document.createElement('item');

	var title_element = document.createElement('title');
	title_element.appendChild(document.createTextNode(title));

	var story_element = document.createElement('description');
	story_element.appendChild(document.createTextNode(story));

	var link_element = document.createElement('link');
	link_element.appendChild(document.createTextNode(link));
	
	var guid_element = document.createElement('guid');
	guid_element.setAttribute('isPermaLink', 'true');
	guid_element.appendChild(document.createTextNode(guid));

	item.appendChild(title_element);
	item.appendChild(story_element);
	item.appendChild(link_element);
	item.appendChild(guid_element);

	return item;
};

/**
 * Generate RSS feed
 * @param {String} title to generate RSS for
 * @param {String} description to generate RSS for
 * @param {String} link to generate RSS for
 * @param {Number} num_entries to generate RSS for
 * @returns root RSS DOM node
 * @type {Element}
 * @requires TestFeedXML.generateItem to generate DOM nodes for individual items 
 */
TestFeedXML.generateFeed = function(title, description, link, num_entries) {
	var feed_xml = document.implementation.createDocument(null,"rss",null);
	var rss_entry = feed_xml.documentElement;
	rss_entry.setAttribute('xmlns:dc','http://purl.org/dc/elements/1.1/');
	rss_entry.setAttribute('xmlns:admin', 'http://webns.net/mvcb/');
	rss_entry.setAttribute('xmlns:content', 'http://purl.org/rss/1.0/modules/content/');
	rss_entry.setAttribute('xmlns:rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#');
	rss_entry.setAttribute('xmlns:wfw', 'http://wellformedweb.org/CommentAPI/');
	rss_entry.setAttribute('xmlns:feedburner', 'http://rssnamespace.org/feedburner/ext/1.0');
	rss_entry.setAttribute('version', '2.0');

	var channel_entry = feed_xml.createElement('channel');

	var title_entry = feed_xml.createElement('title');
	title_entry.appendChild(feed_xml.createTextNode(title));
	channel_entry.appendChild(title_entry);

	var description_entry = feed_xml.createElement('description');
	description_entry.appendChild(feed_xml.createTextNode(description));
	channel_entry.appendChild(description_entry);

	var link_entry = feed_xml.createElement('link');
	link_entry.appendChild(feed_xml.createTextNode(link));
	channel_entry.appendChild(link_entry);

	// Have to create in reverse order because
	// feed items are listed in reverse chronological order
	for ( var i = num_entries; i > 0; --i) {
		var item_entry = TestFeedXML.generateItem("test story " + i,
				"This is test story " + i,
				'http://www.metafilter.com/test' + i + '.html',
				i);		
		channel_entry.appendChild(item_entry);
	}

	rss_entry.appendChild(channel_entry);
	return feed_xml;
};

TestFeedXML.generateRSS = function(title, description, link, num_entries) {
	return new XMLSerializer().serializeToString(TestFeedXML.generateFeed(title, description, link, num_entries));
};