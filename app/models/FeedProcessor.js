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
var FeedProcessor = {};

/**
 * Generate a MetaStory from XML
 * 
 * @param input
 *            {Element} XML input
 * @returns The resulting story object
 * @type MetaEntry
 */
FeedProcessor.processItem = function(input) {

	var title = input.getElementsByTagName('title')[0].textContent;
	var story = input.getElementsByTagName('description')[0].textContent;
	var url = input.getElementsByTagName('link')[0].textContent;
	var guid = input.getElementsByTagName('guid')[0].textContent;

	return new MetaEntry(title, story, url, guid);
};

/**
 * Generate a MetaFeed from XML
 *
 * @param {Element} input XML input
 * @returns A list of MetaEntry objects
 * @type [MetaEntry]
 */
FeedProcessor.processRSS = function(input) {
	var list = [];

	var items = input.getElementsByTagName('item');
	for ( var i = 0; i < items.length; ++i) {
		list[i] = FeedProcessor.processItem(items[i]);
	}

	return list;
};