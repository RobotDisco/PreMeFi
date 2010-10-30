describe('MetaEntry', function() {

	it('should construct properly', function() {
		var TEST_TITLE = "Test Story";
		var TEST_STORY = "This is a test entry.";
		var TEST_URL = "http://www.metafilter.com/story.html";

		var entry = new MetaEntry(TEST_TITLE, TEST_STORY, TEST_URL);

		expect(entry.title).toEqual(TEST_TITLE);
		expect(entry.story).toEqual(TEST_STORY);
		expect(entry.url).toEqual(TEST_URL);
	});
});