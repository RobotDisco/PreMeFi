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

});