describe("MetaFeed", function() {
	var feedTitle, feedURL, feed;

	feedTitle = "test";
	feedURL = "http://www.blort.com";

	beforeEach(function() {
		feed = new MetaFeed(feedTitle, feedURL);
	});

	it("should populate the appropriate fields upon construction", function() {
		expect(feed.feedTitle).toEqual(feedTitle);
		expect(feed.feedURL).toEqual(feedURL);
	});

	it("should have a working feed title getter", function() {
		expect(feed.get_feed_title()).toEqual(feed.feedTitle);
	});

	it("creates an AJAX request when updating, with appropriate callbacks",
			function() {
				spyOn(Ajax, "Request");

				feed.update();
				expect(Ajax.Request).toHaveBeenCalledWith(feed.feedURL, {
					onSuccess : feed.updateSuccess.bind(feed),
					onFailure : feed.updateFailure.bind(feed),
					jasmine.any()
				});
			});

	it('calls the failure callback upon request failure', function() {
		var request;
		spyOn(feed, "updateSuccess");
		spyOn(feed, "updateFailure");

		feed.update();
		request = AjaxRequests.activeRequest();
		request.response({
			status : 500,
			contentType : "text/html",
			responseText : "Sorry, we hit an error"
		});

		expect(feed.updateSuccess).not.toHaveBeenCalled();
		expect(feed.updateFailure).toHaveBeenCalled();
	});

	it('calls the success callback on request success', function() {
		var request;
		spyOn(feed, "updateSuccess");
		spyOn(feed, "updateFailure");

		feed.update();
		request = AjaxRequests.activeRequest();
		request.response({
			status : 200,
			contentType : "text/html",
			responseText : "Feed goes here"
		});

		expect(feed.updateSuccess).toHaveBeenCalled();
		expect(feed.updateFailure).not.toHaveBeenCalled();
	});
});