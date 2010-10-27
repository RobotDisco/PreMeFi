describe('Feed Processor', function() {

	it('should turn an <item> entry into a MetaStory', function() {
		var TEST_TITLE = 'Test Title';
		var TEST_DESCRIPTION = 'Lorum Ipsum';
		var TEST_URL = 'http://www.blort.com';

		var story_constructor = spyOn(window, 'MetaStory').andCallThrough();

		var testXML = TestFeedXML.generateItem(TEST_TITLE, TEST_DESCRIPTION,
				TEST_URL);
		var testStory = FeedProcessor.processItem(testXML);

		expect(story_constructor).toHaveBeenCalled();
		expect(testStory).toEqual({
			title : TEST_TITLE,
			story : TEST_DESCRIPTION,
			url : TEST_URL
		});
	});
});