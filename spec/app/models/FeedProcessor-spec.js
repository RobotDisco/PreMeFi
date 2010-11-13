describe('Feed Processor', function() {

	it('should turn an <item> entry into a MetaEntry', function() {
		var TEST_TITLE = 'Test Title';
		var TEST_DESCRIPTION = 'Lorum Ipsum';
		var TEST_URL = 'http://www.blort.com';

		var story_constructor = spyOn(window, 'MetaEntry').andCallThrough();

		var testXML = TestFeedXML.generateItem(TEST_TITLE, TEST_DESCRIPTION,
				TEST_URL);
		var testStory = FeedProcessor.processItem(testXML);

		expect(story_constructor.callCount).toEqual(1);
		expect(testStory).toEqual({
			title : TEST_TITLE,
			story : TEST_DESCRIPTION,
			url : TEST_URL
		});
	});

	it('should turn an <rss> entry into a MetaFeed', function() {
		spyOn(FeedProcessor, 'processItem').andCallThrough();

		var TEST_TITLE = "A Test Feed";
		var TEST_DESCRIPTION = "This is a Test Feed";
		var TEST_LINK = "This is a Test Link";

		var NUM_ENTRIES = 10;

		var testRSS = TestFeedXML.generateFeed(TEST_TITLE, TEST_DESCRIPTION,
				TEST_LINK, NUM_ENTRIES);
		var testList = FeedProcessor.processRSS(testRSS);

		expect(FeedProcessor.processItem.callCount).toEqual(NUM_ENTRIES);
		expect(testList.length).toEqual(NUM_ENTRIES);
		expect(testList).toContain(jasmine.any(MetaEntry));
	});
});