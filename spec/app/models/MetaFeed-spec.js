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

describe( "MetaFeed", function() {
	var feedTitle, feedURL, feed;

	feedTitle = "test";
	feedURL = "http://www.blort.com";

	beforeEach(function() {
		feed = new MetaFeed(feedTitle, feedURL);
	});

	it("should populate the appropriate fields upon construction",
			function() {
				expect(feed.m_title).toEqual(feedTitle);
				expect(feed.m_url).toEqual(feedURL);
			});
	it("should have a getter for the feed title", function() {
		expect(feed.get_title()).toEqual(feed.m_title);
	});

	describe('when updating', function() {
		var request;

		it("creates an AJAX request", function() {
			spyOn(Ajax, "Request");

			feed.update();

			expect(Ajax.Request).toHaveBeenCalledWith(
					feed.m_url, jasmine.any(Object));
		});

		it('calls the failure callback upon request failure',
				function() {
					spyOn(feed, "updateSuccess");
					spyOn(feed, "updateFailure");

					feed.update();
					request = AjaxRequests.activeRequest();
					request.response(TestResponses.failure);

					expect(feed.updateSuccess).not
							.toHaveBeenCalled();
					expect(feed.updateFailure)
							.toHaveBeenCalled();
				});

		it('calls the success callback on request success',
				function() {
					spyOn(feed, "updateSuccess");
					spyOn(feed, "updateFailure");

					feed.update();
					request = AjaxRequests.activeRequest();
					request.response(TestResponses.success);

					expect(feed.updateSuccess)
							.toHaveBeenCalled();
					expect(feed.updateFailure).not
							.toHaveBeenCalled();
				});
		it('saves the feed to the depot after updating', function() {
			runs(function() {
				spyOn(feed, 'updateSuccess').andCallThrough();
				spyOn(MetaFeedList,'save');
				
				feed.update();
				request = AjaxRequests.activeRequest();
				request.response(TestResponses.success);
			});
			
			waitsFor(function() {
				return feed.updateSuccess.callCount > 0;
			}, 'feed update success', 200);
			
			runs(function() {
				expect(MetaFeedList.save).toHaveBeenCalled();
			});
		});

		it('will not success content that is not an RSS 2.0 feed', function() {
			spyOn(FeedProcessor, "processRSS");

			feed.update();
			request = AjaxRequests.activeRequest();
			request.response(TestResponses.notXML);

			expect(FeedProcessor.processRSS).not.toHaveBeenCalled();
		});

		it('processes the feed on a successful request', function() {
			spyOn(FeedProcessor, "processRSS");

			feed.update();
			request = AjaxRequests.activeRequest();
			request.response(TestResponses.success);

			expect(FeedProcessor.processRSS).toHaveBeenCalled();
		});

		xit('send notification when we start and stop updating', function() {
			spyOn(Mojo.Controller.getAppController,
					'sendToNotificationChain');

			feed.update();

			expect(Mojo.Controller.getAppController().sendToNotificationChain.callCount).toEqual(2);
			expect(Mojo.Controller.getAppController().sendToNotificationChain).toHaveBeenCalledWith({
				updating : true
			});
			expect(Mojo.Controller.AppController.sendToNotificationChain).toHaveBeenCalledWith({
				updating : false
			});
		});
		it('should not re-bold an already-read entry', function() {
			var TEST_TITLE = "A Test Feed";
			var TEST_DESCRIPTION = "This is a Test Feed";
			var TEST_LINK = "This is a Test Link";

			var NUM_ENTRIES = 3;

			// Initial state, unread feeds
			feed.update();
			request = AjaxRequests.activeRequest();
			request.response(TestFeedXML.generateRSS(TEST_TITLE, TEST_DESCRIPTION, TEST_LINK, NUM_ENTRIES));
			for ( var i = 0; i < feed.m_list.length; i++) {
				expect(feed.m_list[i].m_unread).toEqual(true);
			}

			// "Read" an entry
			feed.m_list[0].m_unread = false;

			// Update feeds, add new entry
			feed.update();
			request = AjaxRequests.activeRequest();
			request.response(TestFeedXML.generateRSS(TEST_TITLE, TEST_DESCRIPTION, TEST_LINK, NUM_ENTRIES + 1));

			// New feed should be unread, read feed
			// should remain read
			expect(feed.m_list[0].m_unread).toEqual(true); // new entry
			expect(feed.m_list[1].m_unread).toEqual(false); // old 0th entry
		});
	});
	it('should be generatable from a JSON object', function() {
		var NUM_ENTRIES = 5;
		var json_string = FeedGenerator.generate_json(NUM_ENTRIES);
		
		var from_json = MetaFeed.fromJSON(json_string.evalJSON());
		var hand_rolled = FeedGenerator.generate_feed(NUM_ENTRIES);
		
		expect(from_json.m_title).toEqual(hand_rolled.m_title);
		expect(from_json.m_url).toEqual(hand_rolled.m_url);
		expect(from_json.m_list.length).toEqual(hand_rolled.m_list.length);
		// Don't really need to test each entry, given that we have a entry unit test for this.
		for(var i = 0; i < from_json.m_list.length; ++i) {
			expect(from_json.m_list[i].title).toEqual(hand_rolled.m_list[i].title);
			expect(from_json.m_list[i].story).toEqual(hand_rolled.m_list[i].story);
			expect(from_json.m_list[i].teaser).toEqual(hand_rolled.m_list[i].teaser);
			expect(from_json.m_list[i].url).toEqual(hand_rolled.m_list[i].url);
			expect(from_json.m_list[i].m_guid).toEqual(hand_rolled.m_list[i].m_guid);
			expect(from_json.m_list[i].m_unread).toEqual(hand_rolled.m_list[i].m_unread);
		}
	});
	it('can be converted into a JSON object', function() {
		var NUM_ENTRIES = 5;
		var feed = FeedGenerator.generate_feed(NUM_ENTRIES);
		var json = feed.toJSONObject();
		
		expect(json.title).toEqual(feed.m_title);
		expect(json.url).toEqual(feed.m_url);
		expect(json.items.length).toEqual(feed.m_list.length);
		
		// Don't really need to test each entry, given that we have an entry unit test for this.
		// Ensuring order is preserved is nice, though.
		for(var i = 0; i < feed.m_list.length; ++i) {
			expect(json.items[i].title).toEqual(feed.m_list[i].title);
			expect(json.items[i].story).toEqual(feed.m_list[i].story);
			// Teaser is not contained within json object
			expect(json.items[i].url).toEqual(feed.m_list[i].url);
			expect(json.items[i].guid).toEqual(feed.m_list[i].m_guid);
			expect(json.items[i].unread).toEqual(feed.m_list[i].m_unread);
		}
	});
});