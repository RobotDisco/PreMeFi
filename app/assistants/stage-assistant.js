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
 * @constructor Create stage assistant
 */
function StageAssistant() {
	/* this is the creator function for your stage assistant object */
	this.DEFAULT_FEED_TITLE = 'MetaFilter';
	this.DEFAULT_FEED_URL = 'http://feeds.feedburner.com/Metafilter';
}

/**
 * Prepare stage assistant for use
 */
StageAssistant.prototype.setup = function() {
	/*
	 * this function is for setup tasks that have to happen when the stage is
	 * first created
	 */
	this.controller.pushScene('FeedView', 0);
};
