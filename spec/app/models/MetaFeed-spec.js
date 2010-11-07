describe(
		"MetaFeed",
		function() {
			var feedTitle, feedURL, feed;

			feedTitle = "test";
			feedURL = "http://www.blort.com";

			beforeEach(function() {
				feed = new MetaFeed(feedTitle, feedURL);
			});

			it("should populate the appropriate fields upon construction",
					function() {
						expect(feed.feedTitle).toEqual(feedTitle);
						expect(feed.feedURL).toEqual(feedURL);
					});

			it("should have a working feed title getter", function() {
				expect(feed.get_feed_title()).toEqual(feed.feedTitle);
			});

			describe(
					'when updating',
					function() {
						var request;

						it("creates an AJAX request", function() {
							spyOn(Ajax, "Request");

							feed.update();

							expect(Ajax.Request).toHaveBeenCalledWith(
									feed.feedURL, jasmine.any(Object));
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

						it(
								'will not success content that is not an RSS 2.0 feed',
								function() {
									spyOn(FeedProcessor, "processRSS");

									feed.update();
									request = AjaxRequests.activeRequest();
									request.response(TestResponses.notXML);

									expect(FeedProcessor.processRSS).not
											.toHaveBeenCalled();
								});

						it('processes the feed on a successful request',
								function() {
									spyOn(FeedProcessor, "processRSS");

									feed.update();
									request = AjaxRequests.activeRequest();
									request.response(TestResponses.success);

									expect(FeedProcessor.processRSS)
											.toHaveBeenCalled();
								});

						xit(
								'send notification when we start and stop updating',
								function() {
									spyOn(Mojo.Controller.getAppController,
											'sendToNotificationChain');

									feed.update();

									expect(
											Mojo.Controller.getAppController().sendToNotificationChain.callCount)
											.toEqual(2);
									expect(
											Mojo.Controller.getAppController().sendToNotificationChain)
											.toHaveBeenCalledWith({
												updating : true
											});
									expect(
											Mojo.Controller.AppController.sendToNotificationChain)
											.toHaveBeenCalledWith({
												updating : false
											});
								});
					});
		});