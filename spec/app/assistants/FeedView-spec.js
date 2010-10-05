describe(
		"Feed View",
		function() {
			var assistant, feed;

			beforeEach(function() {
				feed = jasmine.createSpyObj("MetaFeed", [ "get_feed_title",
						"update" ]);
				assistant = jasmine.webos.createStubSceneAssistant("FeedView",
						feed);
			});

			it(
					'should set the feed title in the view menu on startup',
					function() {
						var TEST_TITLE = "test title";
						spyOn(assistant, "set_feed_title").andCallThrough();
						assistant.feed.get_feed_title.andCallFake(function() {
							return TEST_TITLE;
						});

						assistant.setup();

						expect(assistant.set_feed_title).toHaveBeenCalled();
						expect(
								assistant.controller.get("FeedView_title").innerHTML)
								.toEqual(TEST_TITLE);
					});

			it('should tell the feed to update on startup', function() {
				assistant.setup();

				expect(assistant.feed.update).toHaveBeenCalled();
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

			describe('.set_feed_title', function() {
				it('should get the title from the supplied feed', function() {
					assistant.setup();

					expect(feed.get_feed_title).toHaveBeenCalled();
				});
			});
		});