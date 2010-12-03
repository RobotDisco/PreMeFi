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