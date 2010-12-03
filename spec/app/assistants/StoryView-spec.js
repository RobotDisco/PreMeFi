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

describe('story view', function() {
	var assistant;

	var story_title = "Fundamental Computer Science Open Problem solved.";
	var story_text = "P has been found to equal NP, holy crap!";

	beforeEach(function() {
		assistant = jasmine.webos.createStubSceneAssistant("StoryView",
				story_title, story_text);
		assistant.setup();
	});

	it('should display the provided story title and text', function() {
		expect(assistant.controller.get("StoryView_story_title").innerHTML)
				.toEqual(story_title);
		expect(assistant.controller.get("StoryView_story_text").innerHTML)
				.toEqual(story_text);
	});

	xit('should close when we perform a back-swipe', function() {

	});
});