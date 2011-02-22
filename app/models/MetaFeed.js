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

/**
 * @constructor
 * 
 * @param {String} feedTitle
 *            Free-text title of feed
 * @param {String} feedURL
 *            URL for feed (RSS, not associated web page)
 */
function MetaFeed(feedTitle, feedURL) {
	/** Feed Title */
	this.m_title = feedTitle;
	/** Feed URL */
	this.m_url = feedURL;
	/** List of stories in feed. Note that stories should be stored
	 *  in reverse chronological order.
	 */
	this.m_list = [];
}

/**
 * Asychronously request the latest feed data from the feed URL.
 */
MetaFeed.prototype.update = function() {

	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : true
	});
	var request = new Ajax.Request(this.m_url, {
		method : "get",
		onSuccess : this.updateSuccess.bind(this),
		onFailure : this.updateFailure.bind(this)
	});
};

/**
 * Ajax.Request failure handler
 * 
 * @param {Ajax.Response} transport response object
 */
MetaFeed.prototype.updateFailure = function(transport) {
	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : false
	});
	Mojo.Log.warn("Our update failed :(");
};

/**
 * Ajax.Request success handler
 * 
 * @param {Ajax.Response} transport response object
 */
MetaFeed.prototype.updateSuccess = function(transport) {

	// Ensure that this is an RSS feed, even if not automatically parsed as one
	var xml_text = new DOMParser().parseFromString(transport.responseText,
			"text/xml");
	if (xml_text.getElementsByTagName("rss").length === 0) {
		Mojo.Log.warn("We did not get a valid RSS feed!");
	} else {
		var new_list = FeedProcessor.processRSS(xml_text);
		this.merge(new_list);
		//this.m_list = FeedProcessor.processRSS(xml_text);
	}
	
	Mojo.Controller.getAppController().sendToNotificationChain({
		updating : false
	});
	MetaFeedList.save(MetaFeedList.depot);
};

/**
 * Feed title getter
 * @returns Feed title
 * @type String
 */
MetaFeed.prototype.get_title = function() {
	return this.m_title;
};

/**
 * Merge processed RSS list into feed object.
 * @param {MetaFeed} new_list List to merge into feed.
 */
MetaFeed.prototype.merge = function(new_list) {
	// The lists are in reverse chronological order, but we want
	// to iterate such that earlier entries are added before later
	// entries (if they aren't already on the feed)
	new_list.reverse();
	
	for(var i = 0; i < new_list.length; i++) {
		var new_feed = new_list[i];
		var matched = false;
		for(var j = 0; j < this.m_list.length; j++) {
			var old_feed = this.m_list[j];
			if(old_feed.m_guid === new_feed.m_guid) {
				matched = true;
			}
		}
		if(matched === false) {
			this.m_list.unshift(new_list[i]);
		}
	}
};

/**
 * Create a MetaFeed object from a JSON-compliant structure
 * @param {Object} JSON-compliant source object
 * @returns {MetaFeed} The resulting MetaFeed populated with information from the JSON object
 */
MetaFeed.fromJSON = function (object) {
	
	var feed = new MetaFeed(object.title, object.url);
	for(var i = 0; i < object.items.length; ++i) {
		var entry = MetaEntry.fromJSON(object.items[i]);
		feed.m_list.push(entry);
	}
	
	return feed;
};

/**
 * Create a JSON structure from a MetaFeed
 * @returns {Object} a JSON-structure containing the feed's data
 */
MetaFeed.prototype.toJSONObject = function() {
	var object = {};
	
	object.title = this.m_title;
	object.url = this.m_url;
	object.items = [];
	for(var i = 0; i < this.m_list.length; i++) {
		object.items.push(this.m_list[i].toJSONObject());
	}
	
	return object;
};

/**
 * Returns a JSON string from a MetaFeed
 * @returns {String} A JSON object
 */
MetaFeed.prototype.toJSON = function() {
	return Object.toJSON(this.toJSONObject());
};