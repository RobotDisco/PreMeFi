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
						expect(feed.m_title).toEqual(feedTitle);
						expect(feed.m_url).toEqual(feedURL);
					});
			it("should have a getter for the feed title", function() {
				expect(feed.get_title()).toEqual(feed.m_title);
			});

			describe(
					'when updating',
					function() {
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