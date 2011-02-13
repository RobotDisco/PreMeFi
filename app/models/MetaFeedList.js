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

//TODO Rename this to MetaFeedList when I can refactor it
/**
 * @constructor
 * @param {[MetaFeed]} feed_list List of Metafilter Feeds to track.
 * @returns {MyMetaFeedList}
 */
function MyMetaFeedList(feed_list) {
	var arr = [];

	arr.push.apply(arr, feed_list);
	// Prototype injection, NOT EMCAScript 3 compliant!
	// Doing this because simply adding Array into the prototype chain is apparently not enough.
	// see http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection
	arr.__proto__ = MyMetaFeedList.prototype;
		
	return arr;
}

MyMetaFeedList.prototype = new Array;

/**
 * Give us the previous feed in this circular feed list
 * @param curr_index Index to decrement
 * @return Previous feed index
 * @type Number
 */
MyMetaFeedList.prototype.previous_index = function(curr_index) {
	var new_index = (curr_index - 1) % this.length;
	
	// Fix stupid Javascript's bug of leaving negative numbers
	// with negative modulos
	if(new_index < 0) {
		new_index += this.length;
	}
	return new_index;
};

/**
 * Give us the next feed in this circular feed list
 * @param curr_index Index to increment
 * @return Next feed index
 * @type Number
 */
MyMetaFeedList.prototype.next_index = function(curr_index) {
	return (curr_index + 1) % this.length;
};

/**
 * Return this MetaFeedList as a JSON-compliant object
 * @returns {Array}
 */
MyMetaFeedList.prototype.toJSONObject = function() {
	var object = [];
	for(var i = 0; i < this.length; i++) {
		object.push(this[i].toJSONObject());
	}
	
	return object;
};

/**
 * Return the MetaFeedList as a JSON string
 * @returns {String}
 */
MyMetaFeedList.prototype.toJSON = function() {
	return Array.toJSON(this.toJSONObject());
};

/**
 * Save feedlist data to the depot
 * @param depot Depot to save stuff too
 * @param success_callback (Optional) function to trigger on successful load.
 */
MyMetaFeedList.prototype.save = function(depot, success_callback) {
	if(success_callback === null) {
		success_callback = function() {};
	}

	depot.add('feed_list',
			this.toJSONObject(),
			success_callback,
			function(reason) {
				Mojo.Log.error("Failed to save feed data due to depot error " + reason);
			});
};

/**
 * Load feedlist data from depot
 * @param depot Depot containing feed data
 * @param success_callback (Optional) function to trigger on successful load.
 */
MyMetaFeedList.prototype.load = function(depot, success_callback) {
	if(success_callback === null) {
		success_callback = function() {};
	}
	
	depot.get('feed_list',
		function(object) {
			this.length = 0;
		    this.push.apply(this, MyMetaFeedList.fromJSON(object));
			success_callback(object);
		}.bind(this),
		function(reason) {
			Mojo.Log.error("Failed to load feed data due to depot error " + reason);
		});
};

//TODO move somewhere else, as this is a app-specific global now.
MetaFeedList = MyMetaFeedList([
	new MetaFeed("MetaFilter", "http://feeds.feedburner.com/Metafilter"),
	new MetaFeed("Ask MeFi", "http://feeds.feedburner.com/AskMetafilter"),
	new MetaFeed("MeFi Projects", "http://feeds.feedburner.com/mefi/Projects"),
	new MetaFeed("MeFi Music", "http://feeds.feedburner.com/mefi/Music"),
	new MetaFeed("MeFi Jobs", "http://feeds.feedburner.com/MeFi/Jobs"),
	new MetaFeed("MeFi IRL", "http://feeds.feedburner.com/MeFiIRL"),
	new MetaFeed("MetaTalk", "http://feeds.feedburner.com/MeFi/MetaTalk")
]);

/**
 * Convert a JSON structure into a MetaFeedList
 * @param json JSON representation of the feedlist
 * @returns {MetaFeedList} A MetaFeedList
 */
MyMetaFeedList.fromJSON = function (json) {
	var feedarray = json.map(MetaFeed.fromJSON);
	
	return new MyMetaFeedList(feedarray);
};