//  PreMeFi - A MetaFilter viewer for Palm's WebOS
//  Copyright (C) 2011  Gaelan D'costa <gdcosta@gmail.com>
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

var FeedGenerator = {}; //namespace

FeedGenerator.TEST_TITLE = "Test Feed";
FeedGenerator.TEST_URL = "http://testfeed.com/feed.rss";

/**
 * Generate a JSON string
 * @param {Integer} num_entries Number of stories to generate in the feed
 * @type String
 * @returns A string containing MetaFeed data in JSON
 */
FeedGenerator.generate_json = function(num_entries) {
	var object = {};
	object.title = FeedGenerator.TEST_TITLE;
	object.url = FeedGenerator.TEST_URL;
	object.items = [];
	
	for(var i = 0; i < num_entries; i++) {
		var item = {};
		
		item.title = FeedGenerator.feed_title(i);
		item.story = FeedGenerator.feed_story(i);
		item.url = FeedGenerator.feed_url(i);
		item.unread = true;
		item.guid = FeedGenerator.feed_guid(i);
		
		object.items.shift(item);
	}
	
	return Object.toJSON(object);
};

/**
 * Generate a test feed manually, via Javascript constructors
 * @param {Integer} num_entries Number of stories to generate in the test feed
 * @type MetaFeed
 * @returns A auto-generated Metafeed for testing purposes 
 */
FeedGenerator.generate_feed = function(num_entries) {
	
	var feed = new MetaFeed(FeedGenerator.TEST_TITLE, FeedGenerator.TEST_URL);
	
	for(var i = 0; i < num_entries; ++i) {
		var entry = new MetaEntry(
				FeedGenerator.feed_title(i),
				FeedGenerator.feed_story(i),
				FeedGenerator.feed_url(i),
				FeedGenerator.feed_guid(i));
		
		feed.m_list.shift(entry);
	}
	
	return feed;
};

/**
 *	Return template string for a story's title
 *	@param {integer} this is the nth story in the feed
 *	@type String 
 */
FeedGenerator.feed_title = function(entry_number) {
	return "Test Entry " + entry_number;
};

/**
 * Return templated string for a story's body
 * @param {integer} this is the nth story in the feed
 * @type String
 */
FeedGenerator.feed_story = function(entry_number) {
	return "This is a test story for entry " + entry_number + ".";
};


/**
 * Return templated string for a story's url
 * @param {integer} this is the nth story in the feed
 * @type String
 */
FeedGenerator.feed_url = function(entry_number) {
	return "http://testfeed.com/teststory" + entry_number + ".html";
};

/**
 * Return templated story guid
 * param {integer} this is the nth story in the feed
 * @type Integer
 */
FeedGenerator.feed_guid = function(entry_number) {
	return entry_number;
};