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
 * @param {String} title Story title
 * @param {String} story Story body
 * @param {String} url Story URL
 */
function MetaEntry(title, story, url, guid) {
	/** Story title */
	this.title = title;
	/** Story body */
	this.story = story;
	/** Story URL */
	this.url = url;
	/** A HTML-free truncated teaser of the story body */
	this.teaser = "";
	/** This entry is unread */
	this.m_unread = true;
	/** Story GUID */
	this.m_guid = guid;

	// Create a HTML-free teaser
	var tmp = document.createElement("DIV");
	tmp.innerHTML = this.story;
	this.teaser = tmp.textContent;
	delete tmp; // Explicitly delete, tmp is not a private variable
}

/**
 * Return a MetaEntry object from a JSON string
 * @param object object from JSON to be evaluated
 * @returns {MetaEntry}
 */
MetaEntry.fromJSON = function(object) {
	
	var entry = new MetaEntry(object.title, object.story, object.url, object.guid);
	entry.m_unread = object.unread;
	
	return entry;
};

/**
 * Returns a JSON-compliant structure representing this feed
 * @returns {Object} JSON-compliant object
 */
MetaEntry.prototype.toJSONObject = function() {
	var object = {};
	
	object.title = this.title;
	object.story = this.story;
	object.url = this.url;
	object.unread = this.m_unread;
	object.guid = this.m_guid;
	
	return object;
};

/**
 * Returns a JSON string representation of this feed
 * @returns {String} JSON-compliant string
 */
MetaEntry.prototype.toJSON = function() {
	return Object.toJSON(this.toJSONObject());
};