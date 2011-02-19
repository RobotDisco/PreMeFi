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

describe('MetaFeedList', function() {
	it('should provide me the previous index in this circular list', function() {
		expect(MetaFeedList.previous_index(0)).toEqual(MetaFeedList.length - 1);
		expect(MetaFeedList.previous_index(MetaFeedList.length - 1)).toEqual(MetaFeedList.length - 2);
	});
	
	it('should provide me the next index in this circular list', function() {
		expect(MetaFeedList.next_index(0)).toEqual(1);
		expect(MetaFeedList.next_index(MetaFeedList.length - 1)).toEqual(0);
	});
	
	describe('saving/loading', function() {
		var depot;
		var success_callback;
		
		beforeEach(function() {	
			runs(function() {
				success_callback = jasmine.createSpy('Depot Open Success Callback');
				depot = new Mojo.Depot({
						name: "unit_test_db",
						replace: true
					},
					success_callback,
					function() {});
			});
			
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "Depot create", 200);
		});
		
		it('should be able to save all feed content to the depot', function() {
			var feed_list;
			
			runs(function() {
				feed_list = new MyMetaFeedList([
				    FeedGenerator.generate_feed(3),
				    FeedGenerator.generate_feed(5),
				    FeedGenerator.generate_feed(2)
				]);
				spyOn(feed_list, 'toJSONObject').andCallThrough();
				spyOn(depot,'add').andCallThrough();
				success_callback = jasmine.createSpy('Depot add success callback');				

				feed_list.save(depot, success_callback);
			});
			
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "Depot add", 200);
			
			runs(function() {
				expect(feed_list.toJSONObject).toHaveBeenCalled();
				expect(depot.add).toHaveBeenCalledWith('feed_list',feed_list.toJSONObject(), jasmine.any(Function), jasmine.any(Function));				
			});
		});
		it('should be able to load all feed content from the depot', function() {
			var feed_list;
			var json_to_add;
			var JSON_AMOUNT1 = 3, JSON_AMOUNT2 = 5, JSON_AMOUNT3 = 2;
			
			runs(function() {
				json_to_add = [
				               FeedGenerator.generate_json(JSON_AMOUNT1).evalJSON(),
				               FeedGenerator.generate_json(JSON_AMOUNT2).evalJSON(),
				               FeedGenerator.generate_json(JSON_AMOUNT3).evalJSON()
				              ];
				success_callback = jasmine.createSpy("depot add success callback");
				depot.add('feed_list', json_to_add, success_callback, function() {});
			});
			
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "Depot add", 200);
			
			runs(function() {
				feed_list = new MyMetaFeedList([]);
				spyOn(MyMetaFeedList, 'fromJSON').andCallThrough();
				spyOn(depot, 'get').andCallThrough();
				success_callback = jasmine.createSpy("depot get success callback");
					
     			feed_list.load(depot, success_callback);
			});	                     			
				                     							
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "depot get", 200);
			
			runs(function() {
				expect(depot.get).toHaveBeenCalled();
				expect(MyMetaFeedList.fromJSON).toHaveBeenCalled();
				expect(feed_list.length).toEqual(json_to_add.length);
				expect(feed_list[0].m_list.length).toEqual(JSON_AMOUNT1);
				expect(feed_list[1].m_list.length).toEqual(JSON_AMOUNT2);
				expect(feed_list[2].m_list.length).toEqual(JSON_AMOUNT3);
			});
		});
		
		it('should restore a default list of feeds if we have no previously stored data', function() {
			var feed_list;
			
			// Note that we haven't pre-populated our depot with anything!
			
			runs(function() {
				feed_list = new MyMetaFeedList([]);
				spyOn(MyMetaFeedList, 'fromJSON');
				spyOn(MyMetaFeedList, 'getDefaultList');
				spyOn(depot, 'get').andCallThrough();
				success_callback = jasmine.createSpy("depot get success callback");
					
     			feed_list.load(depot, success_callback);
			});	                     			
				                     							
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "depot get", 200);
			
			runs(function() {
				expect(depot.get).toHaveBeenCalled();
				expect(MyMetaFeedList.fromJSON).not.toHaveBeenCalled();
				expect(MyMetaFeedList.getDefaultList).toHaveBeenCalled();
			});
		});
		
		afterEach(function() {
			runs(function() {
				success_callback = jasmine.createSpy('Depot removeAll success callback');
				depot.removeAll(success_callback, function() {});
			});
			waitsFor(function() {
				return success_callback.callCount > 0;
			}, "Depot removeAll", 200);
		});
	});
	describe('JSON', function() {
		it('should be able to populate a MetaFeedList from a JSON object', function() {
			var json_list = [
			    FeedGenerator.generate_json(5).evalJSON(),
			    FeedGenerator.generate_json(7).evalJSON(),
			    FeedGenerator.generate_json(4).evalJSON()
			];
			var feedlist = MyMetaFeedList.fromJSON(json_list);
			
			expect(feedlist.length).toEqual(json_list.length);
			for(var i = 0; i < feedlist.length; i++) {
				var my_feed = feedlist[i];
				var json_feed = json_list[i];
				
				expect(my_feed.m_title).toEqual(json_feed.title);
				expect(my_feed.m_url).toEqual(json_feed.url);
				expect(my_feed.m_list.length).toEqual(json_feed.items.length);
				for(var j = 0; j < my_feed.m_list.length; j++) {
					var my_entry = my_feed.m_list[j];
					var json_entry = json_feed.items[j];
					
					expect(my_entry.title).toEqual(json_entry.title);
					expect(my_entry.story).toEqual(json_entry.story);
					expect(my_entry.url).toEqual(json_entry.url);
					expect(my_entry.m_unread).toEqual(json_entry.unread);
					expect(my_entry.m_guid).toEqual(json_entry.guid);
				}
			}
		});
		it('should be able to represent itself as a JSON-compliant structure', function() {
			var feedlist = new MyMetaFeedList([
			    FeedGenerator.generate_feed(5),
			    FeedGenerator.generate_feed(7),
			    FeedGenerator.generate_feed(4)
			]);
			var json_list = feedlist.toJSONObject();
			
			//These expectation statements should be reversed, but meh I'm lazy
			expect(feedlist.length).toEqual(json_list.length);
			for(var i = 0; i < feedlist.length; i++) {
				var my_feed = feedlist[i];
				var json_feed = json_list[i];
				
				expect(my_feed.m_title).toEqual(json_feed.title);
				expect(my_feed.m_url).toEqual(json_feed.url);
				expect(my_feed.m_list.length).toEqual(json_feed.items.length);
				for(var j = 0; j < my_feed.m_list.length; j++) {
					var my_entry = my_feed.m_list[j];
					var json_entry = json_feed.items[j];
					
					expect(my_entry.title).toEqual(json_entry.title);
					expect(my_entry.story).toEqual(json_entry.story);
					expect(my_entry.url).toEqual(json_entry.url);
					expect(my_entry.m_unread).toEqual(json_entry.unread);
					expect(my_entry.m_guid).toEqual(json_entry.guid);
				}
			}
		});
	});
});