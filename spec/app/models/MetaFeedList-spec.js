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

		xit('should be able to load and save all feed content to the depot', function() {
			var depot = new Mojo.Depot('test_metastore');
			var test_feeds1 = makeMetaFeedList([
					 new MetaFeed('test feed 1', 'http://test1'),
			         new MetaFeed('test feed 2', 'http://test2')
					 ]);
			test_feeds1.save(depot);
			
			var test_feeds2 = loadMetaFeedList(depot);
			
			// FeedLists should be the same length
			expect(test_feeds1.length).toEqual(test_feeds2.length);
			for(var i = 0; i < test_feeds1.length; ++i) {
				//test name
				//test description
				//test url
				//test feed length
				for(var j = 0; j < test_feeds1[i].length; ++j) {
					//test entry title
					//test entry url
					//test entry body
					//test entry teaser
					//test entry m_unread
					//test entry m_guid
				}
			}
		});	
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
			var feedlist = makeMetaFeedList([
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