describe(
		"Feed View",
		function() {
			var TEST_TITLE = "test title";
			var TEST_DESCRIPTION = "A test feed";
			var TEST_URL = "http://www.test.com/feed";

			var feed, assistant;

			beforeEach(function() {

				feed = new MetaFeed(TEST_TITLE, TEST_URL);
				assistant = jasmine.webos.createStubSceneAssistant('FeedView',
						feed);
			});

			it('should set the feed title in the view menu on startup',
					function() {
						spyOn(assistant, 'set_feed_title');

						assistant.setup();

						expect(assistant.set_feed_title.callCount).toEqual(1);
					});
			it('should tell the feed to update on startup', function() {
				spyOn(assistant, 'update_feed');

				assistant.setup();

				expect(assistant.update_feed.callCount).toEqual(1);
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

			describe(
					'.set_feed_title',
					function() {
						it('should get the title from the supplied feed',
								function() {
									spyOn(feed, 'get_feed_title');

									assistant.set_feed_title();

									expect(feed.get_feed_title.callCount)
											.toEqual(1);
								});
						it(
								'should return the feed title',
								function() {
									assistant.set_feed_title();

									expect(
											assistant.controller
													.get('FeedView_title').innerHTML)
											.toEqual(TEST_TITLE);
								});
					});

			describe('.update_feed', function() {

				it('should update the feed', function() {
					spyOn(feed, 'update');

					assistant.update_feed();

					expect(feed.update.callCount).toEqual(1);
				});

				it('should refresh the widget', function() {
					spyOn(assistant.controller, 'modelChanged');

					assistant.update_feed();

					expect(assistant.controller.modelChanged.callCount)
							.toEqual(1);
					expect(assistant.controller.modelChanged)
							.toHaveBeenCalledWith(assistant.list_widget_model,
									assistant);
				});
			});
		});