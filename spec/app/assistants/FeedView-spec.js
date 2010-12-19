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

describe("Feed View", function(){    
    var assistant;
    
    beforeEach(function(){
        assistant = jasmine.webos.createStubSceneAssistant('FeedView', 0);
    });
    
    it('should set up list widget on startup', function(){
        spyOn(assistant.controller, 'setupWidget');
        
        assistant.setup();
        
        expect(assistant.controller.setupWidget).toHaveBeenCalledWith('story_list', assistant.list_widget_attributes, assistant.list_widget_model);
        expect(assistant.list_widget_model.items).toEqual(assistant.get_stories());
        expect(assistant.list_widget_attributes.itemTemplate).toEqual("FeedView/story_list");
    });
    
    it('should set the view menu on startup', function(){
		spyOn(assistant.controller, 'setupWidget');
		
		expect(assistant.view_menu_model.items[0].items).toContain({
			width: 200,
			label: assistant.get_feed().get_title()
		});
		expect(assistant.view_menu_model.items[0].items).toContain({
			icon: 'back',
			command: 'previous_feed'
		});
		expect(assistant.view_menu_model.items[0].items).toContain({
			icon: 'forward',
			command: 'next_feed'
		});
        
        assistant.setup();
        
		expect(assistant.controller.setupWidget).toHaveBeenCalledWith(Mojo.Menu.viewMenu, {}, assistant.view_menu_model);
    });
    it('should tell the feed to update on startup', function(){
        spyOn(assistant, 'update_feed');
        
        assistant.setup();
        
        expect(assistant.update_feed.callCount).toEqual(1);
    });
    it('should update the list model when the feed finishes updating', function(){
        spyOn(assistant.controller, 'modelChanged');
        
        assistant.considerForNotification({
            updating: false
        });
        
        expect(assistant.controller.modelChanged.callCount).toEqual(1);
        expect(assistant.controller.modelChanged).toHaveBeenCalledWith(assistant.list_widget_model, assistant);
    });
    xit('should update the feed when the refresh button is pressed', function(){
    });
    xit('should, on a successful update display a list of stories from the feed', function(){
    });
    xit('should display a story (by pushing the Story View) when a story is clicked', function(){
    });
    xit('should do nothing if the feed update failed', function(){
    });
    
    describe('.update_feed', function(){
    
        it('should update the feed', function(){
            spyOn(assistant.get_feed(), 'update');
            
            assistant.update_feed();
            
            expect(assistant.get_feed().update.callCount).toEqual(1);
        });
        
    });
    it('should set up a command menu with a refresh button', function(){
        spyOn(assistant.controller, 'setupWidget');
        assistant.setup();
        
        expect(assistant.command_menu_model.items).toContain({
			items: [{
				icon: "refresh",
            	command: "refresh_feed"
			}]
     	});
        expect(assistant.controller.setupWidget).toHaveBeenCalledWith(Mojo.Menu.commandMenu, jasmine.any(Object),assistant.command_menu_model);
    });
	it('should update the displayed feed when the refresh button is pressed', function() {
		spyOn(assistant, 'update_feed');
		
		assistant.handleCommand({
			type: Mojo.Event.command,
			command: 'refresh_feed'
		});
				
		expect(assistant.update_feed.callCount).toEqual(1);
	});
	it('should run unit tests when requested', function() {
		spyOn(assistant.controller.stageController, 'pushScene');
		spyOn(assistant.controller, 'setupWidget').andCallThrough();
		
		expect(assistant.app_menu_model.items).toContain({
			label: "Unit Tests...",
			command: 'launch_unit_tests'
		});
		
		assistant.setup();
		expect(assistant.controller.setupWidget).toHaveBeenCalledWith(Mojo.Menu.appMenu, jasmine.any(Object), assistant.app_menu_model);
		
		assistant.handleCommand({
			type: Mojo.Event.command,
			command: 'launch_unit_tests'
		});		
		expect(assistant.controller.stageController.pushScene).toHaveBeenCalledWith({
    		name: 'test',
    		sceneTemplate: '../../plugins/jasmine-webos/app/views/test/test-scene'
  		});
	});
	it('should launch a story when an item is pressed', function() {
		var TEST_TITLE = "Test Entry";
		var TEST_DESCRIPTION = "This is a Test Entry";
		var TEST_URL = "http://www.test.com";
		assistant.get_stories()[0] = new MetaEntry(TEST_TITLE, TEST_DESCRIPTION, TEST_URL);
		
		spyOn(assistant.controller.stageController, 'pushScene');
		spyOn(assistant.controller, 'listen');
		spyOn(assistant.controller, 'stopListening');
		
		assistant.setup();
		expect(assistant.controller.listen).toHaveBeenCalledWith('story_list', Mojo.Event.listTap, assistant.display_story_handler);
		
		assistant.display_story({
			item: assistant.get_stories()[0]
		});
		expect(assistant.controller.stageController.pushScene).toHaveBeenCalledWith("StoryView", assistant.get_stories()[0].title, assistant.get_stories()[0].story);
		
		assistant.cleanup();
		expect(assistant.controller.stopListening).toHaveBeenCalledWith("story_list", Mojo.Event.listTap, assistant.display_story_handler);
	});
		
	describe('.next_feed', function() {
		beforeEach(function() {
			assistant.setup();
		});
		
		it('should be assigned to the appropriate view_menu command', function() {
			spyOn(assistant, 'next_feed');
			
			assistant.handleCommand({
				type: Mojo.Event.command,
				command: 'next_feed'		
			});
			expect(assistant.next_feed.callCount).toEqual(1);
		});
		it('should select the next feed', function() {			
			var old_index = assistant.m_curr_index;
			
			assistant.next_feed();
			
			expect(old_index).toEqual(MetaFeedList.previous_index(assistant.m_curr_index));
		});
		it('should update the newly selected feed', function() {
			spyOn(assistant, 'update_feed');
			expect(assistant.update_feed).not.toHaveBeenCalled();
			
			assistant.next_feed();
			
			expect(assistant.update_feed.callCount).toEqual(1);
		});
		it('should update the view menu title element', function() { 
			var title_model = assistant.view_menu_model.items[0].items[1];
			var old_feed_title = title_model.label;
			
			spyOn(assistant, 'update_view_title').andCallThrough();
			
			assistant.next_feed();
			
			expect(title_model.label).not.toEqual(old_feed_title);
			expect(assistant.update_view_title).toHaveBeenCalled();
			expect(title_model.label).toEqual(MetaFeedList[assistant.m_curr_index].get_title());
		});
	});
	
	describe('.previous_feed', function() {
		beforeEach(function() {
			assistant.setup();
		});
		
		it('should be assigned to the appropriate view_menu command', function() {
			spyOn(assistant, 'previous_feed');
			
			assistant.handleCommand({
				type: Mojo.Event.command,
				command: 'previous_feed'		
			});
			expect(assistant.previous_feed.callCount).toEqual(1);
		});
		it('should select the previous feed', function() {			
			var old_index = assistant.m_curr_index;
			
			assistant.previous_feed();
			
			expect(old_index).toEqual(MetaFeedList.next_index(assistant.m_curr_index));
		});
		it('should update the newly selected feed', function() {
			spyOn(assistant, 'update_feed');
			expect(assistant.update_feed).not.toHaveBeenCalled();
			
			assistant.previous_feed();
			
			expect(assistant.update_feed.callCount).toEqual(1);
		});
		it('should update the view menu title element', function() { 
			var title_model = assistant.view_menu_model.items[0].items[1];
			var old_feed_title = title_model.label;
			
			spyOn(assistant, 'update_view_title').andCallThrough();
			
			assistant.previous_feed();
			
			expect(title_model.label).not.toEqual(old_feed_title);
			expect(assistant.update_view_title).toHaveBeenCalled();
			expect(title_model.label).toEqual(MetaFeedList[assistant.m_curr_index].get_title());
		});
	});
	describe('bolding new stories', function() {
		it('should output a CSS style iff the entry is unread', function() {			
			var entry = {}; // stub MetaEntry
			
			entry.m_unread = true;
			expect(assistant.unread_css("", entry)).toEqual("unread");
			
			entry.m_unread = false;
			expect(assistant.unread_css("", entry)).toEqual("");
		});
		it("should use MetaEntry's unread_css function to bold unread stories in the list", function() {
			expect(assistant.list_widget_attributes.formatters.m_unread).toEqual(assistant.unread_css);
		});
	});
});
	