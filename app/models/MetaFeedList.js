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

MetaFeedList = [
	new MetaFeed("MetaFilter", "http://feeds.feedburner.com/Metafilter"),
	new MetaFeed("Ask MeFi", "http://feeds.feedburner.com/AskMetafilter"),
	new MetaFeed("MeFi Projects", "http://feeds.feedburner.com/mefi/Projects"),
	new MetaFeed("MeFi Music", "http://feeds.feedburner.com/mefi/Music"),
	new MetaFeed("MeFi Jobs", "http://feeds.feedburner.com/MeFi/Jobs"),
	new MetaFeed("MeFi IRL", "http://feeds.feedburner.com/MeFiIRL"),
	new MetaFeed("MetaTalk", "http://feeds.feedburner.com/MeFi/MetaTalk")
];

/**
 * Give us the previous feed in this circular feed list
 * @param curr_index Index to decrement
 * @return Previous feed index
 * @type Number
 */
MetaFeedList.prev_index = function(curr_index) {
	var new_index = (curr_index - 1) % MetaFeedList.length;
	
	// Fix stupid Javascript's bug of leaving negative numbers
	// with negative modulos
	if(new_index < 0) {
		new_index += MetaFeedList.length;
	}
	return new_index;
};

/**
 * Give us the next feed in this circular feed list
 * @param curr_index Index to increment
 * @return Next feed index
 * @type Number
 */
MetaFeedList.next_index = function(curr_index) {
	return (curr_index + 1) % MetaFeedList.length;
};