describe(
		"Feed View",
		function() {
			var assistant, feed;

			beforeEach(function() {
				feed = jasmine.createSpyObj("MetaFeed", [ "get_feed_title" ]);
				assistant = jasmine.webos.createStubSceneAssistant("FeedView",
						feed);
			});

			it('should display the feed title in the view menu', function() {
				//Want to also test internal interactions of set_feed_title()
				spyOn(assistant, "set_feed_title").andCallThrough();

				assistant.setup();

				expect(assistant.set_feed_title).toHaveBeenCalled();
				expect(assistant.feed.get_feed_title).toHaveBeenCalled();

			});

			xit('should tell the feed to update on startup', function() {

			});

			xit('should update the feed when the refresh button is pressed',
					function() {

					});

			xit(
					'should, on a successful update display a list of stories from the feed',
					function() {

					});

			xit(
					'should display a story (by pushing the Story View) when a story is clicked',
					function() {

					});

			xit('should do nothing if the feed update failed', function() {

			});

		});