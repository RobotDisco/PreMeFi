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

describe('Stage Assistant', function() {
	var assistant;

	it('should load the feedview frame by default with the default feed', function() {
		
		runs(function() {
			assistant = new StageAssistant();
			assistant.controller = new jasmine.webos.StubStageController();
			spyOn(assistant.controller, 'pushScene');
			spyOn(assistant, 'depot_load_success').andCallThrough();

			assistant.setup();
		});
		waitsFor(function() {
			return assistant.depot_load_success.callCount > 0;
		}, "depot load callback", 200);

		runs(function() {
			expect(assistant.controller.pushScene).toHaveBeenCalledWith(
				'FeedView',
				0);
			
		});
	});
});

describe('MetaFeedList', function() {
	
	it('should be defined', function() {
		expect(MetaFeedList).toBeDefined();
		expect(MetaFeedList).toContain(jasmine.any(MetaFeed));
	});
	it('should be restored from a depot store upon startup', function() {
		var assistant;
		runs(function() {
			assistant = new StageAssistant();
			spyOn(MetaFeedList, 'load').andCallThrough();
			//spyOn(Mojo, 'Depot').andCallThrough();
			spyOn(assistant, 'depot_load_success').andCallThrough();
			
			assistant.setup();			
		});
		waitsFor(function() {
			return assistant.depot_load_success.callCount > 0;
		}, "'PreMeFi' depot load", 200);
		
		runs(function() {
			//expect(Mojo.Depot).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function), jasmine.any(Function));
			expect(assistant.depot_model.name).toEqual('PreMeFi');
			expect(assistant.depot_model.replace).toBeFalsy();
			//expect(MetaFeedList.load).toHaveBeenCalledWith(assistant.depot);
			expect(MetaFeedList.load).toHaveBeenCalled();
		});
	});
});
