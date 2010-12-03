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
 * @constructor Create StoryView assistant
 * @param {String} story_title to display
 * @param {String} story_text to display
 */
function StoryViewAssistant(story_title, story_text) {

	this.story_title = story_title;
	this.story_text = story_text;
}

/**
 * Prepare StoryView for use
 */
StoryViewAssistant.prototype.setup = function() {

	// Populate story elements
	var title_element = this.controller.get("StoryView_story_title");
	var text_element = this.controller.get("StoryView_story_text");
	title_element.innerHTML = this.story_title;
	text_element.innerHTML = this.story_text;
};

/**
 * Prepare StoryView to be active scene
 * @param {Mojo.Event} event that invoked this function
 */
StoryViewAssistant.prototype.activate = function(event) {
	/*
	 * put in event handlers here that should only be in effect when this scene
	 * is active. For example, key handlers that are observing the document
	 */
};

/**
 * Prepare StoryView to become inactive
 * @param {Mojo.Event} event that invoked this function
 */
StoryViewAssistant.prototype.deactivate = function(event) {
	/*
	 * remove any event handlers you added in activate and do any other cleanup
	 * that should happen before this scene is popped or another scene is pushed
	 * on top
	 */
};

/**
 * Prepare StoryView for destruction
 * @param {Mojo.Event} event that invoked this function
 */
StoryViewAssistant.prototype.cleanup = function(event) {
	/*
	 * this function should do any cleanup needed before the scene is destroyed
	 * as a result of being popped off the scene stack
	 */
};
