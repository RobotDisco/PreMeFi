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
 * @constructor Create FeedView assistant
 * @param {MetaFeed}
 *            feed to list
 */
function FeedViewAssistant(feed_index) {
	this.feed = MetaFeedList[feed_index];
	
	this.list_widget_model = {
		items : this.feed.list
	};
	this.app_menu_model = {
		items : [ {
			label : "Unit Tests...",
			command : "launch_unit_tests"
		} ]
	};
	this.command_menu_model = {
		items : [ {
			items : []
		}, {
			items : [ {
				icon : "refresh",
				command : "refresh_feed"
			} ]
		} ]
	};
	this.view_menu_model = {
		items : [ {
			items : [ {
				icon : 'back',
				command : 'previous_feed'
			}, {
				width : 200,
				label : this.feed.feedTitle
			}, {
				icon : 'forward',
				command : 'next_feed'
			} ]
		} ]
	};
}

/**
 * Prepare FeedView assistant for use
 */
FeedViewAssistant.prototype.setup = function() {
	this.update_feed();

	/* Setup widgets */
	this.controller.setupWidget('story_list', {
		hasNoWidgets : true,
		itemTemplate : "FeedView/story_list"
	}, this.list_widget_model);
	this.controller.setupWidget(Mojo.Menu.appMenu, {}, this.app_menu_model);
	this.controller.setupWidget(Mojo.Menu.commandMenu, {},
			this.command_menu_model);
	this.controller.setupWidget(Mojo.Menu.viewMenu, {}, this.view_menu_model);

	/* Event listeners */
	this.display_story_handler = this.display_story.bindAsEventListener(this);
	this.controller.listen("story_list", Mojo.Event.listTap,
			this.display_story_handler);
};

/**
 * Ready FeedView assistant to be active scene
 * 
 * @param {Mojo.Event}
 *            event that invoked this function
 */
FeedViewAssistant.prototype.activate = function(event) {
};

/**
 * Set FeedView assistant to become inactive
 * 
 * @param {Mojo.Event}
 *            event that invoked this function
 */
FeedViewAssistant.prototype.deactivate = function(event) {
};

/**
 * Prepare FeedView assistant to be destroyed
 * 
 * @param {Mojo.Event}
 *            event that invoked this function
 */
FeedViewAssistant.prototype.cleanup = function(event) {
	/* Clean up event listeners */
	this.controller.stopListening("story_list", Mojo.Event.listTap,
			this.display_story_handler);
};

/**
 * Tell the feed to update itself from its URL
 */
FeedViewAssistant.prototype.update_feed = function() {
	this.feed.update();
};

/**
 * Handle notifications from the command chain
 * 
 * @param {Object}
 *            notification_message
 */
FeedViewAssistant.prototype.considerForNotification = function(
		notification_message) {
	if (notification_message.updating === false) {
		this.list_widget_model.items = this.feed.list;
		this.controller.modelChanged(this.list_widget_model, this);
	}
	return undefined;
};

/**
 * Handle selections from the scene menus
 * 
 * @param {Mojo.Event}
 *            event that invoked this function
 */
FeedViewAssistant.prototype.handleCommand = function(event) {
	if (event.type === Mojo.Event.command) {
		switch (event.command) {
		case 'refresh_feed':
			this.feed.update();
			break;
		case 'launch_unit_tests':
			this.controller.stageController
					.pushScene({
						name : 'test',
						sceneTemplate : '../../plugins/jasmine-webos/app/views/test/test-scene'
					});
			break;
		}
	}
};

/**
 * Event handler for when a message is selected from the feed list
 * 
 * @param {Mojo.Event.listTap}
 *            event that invoked this handler
 */
FeedViewAssistant.prototype.display_story = function(event) {
	this.controller.stageController.pushScene("StoryView", event.item.title,
			event.item.story);
};
