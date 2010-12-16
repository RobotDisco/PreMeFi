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

/**
 * @constructor
 * @param {String} title Story title
 * @param {String} story Story body
 * @param {String} url Story URL
 */
function MetaEntry(title, story, url) {
	/** Story title */
	this.title = title;
	/** Story body */
	this.story = story;
	/** Story URL */
	this.url = url;
	/** A HTML-free truncated teaser of the story body */
	this.teaser = "";
	/** This entry is unread */
	this.m_unread = false;

	// Create a HTML-free teaser
	var tmp = document.createElement("DIV");
	tmp.innerHTML = this.story;
	this.teaser = tmp.textContent;
	delete tmp; // Explicitly delete, tmp is not a private variable
}

/**
 * Spit out the CSS output determined by an entry's unread status
 * @return the appropriate CSS classname
 * @type {String} 
 */
MetaEntry.prototype.unread_css = function() {
	if (this.m_unread == true) {
		return "unread";
	} else {
		return "";
	}
};