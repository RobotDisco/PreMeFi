describe('Test XML Generators', function() {

	it('should generate a story item in RSS 2.0 XML', function() {
		var TEST_TITLE = "Test Story Title";
		var TEST_DESCRIPTION = "Test Story Description";
		var TEST_LINK = "http://testsite.com/story.html";

		var testRSS = TestFeedXML.generateItem(TEST_TITLE, TEST_DESCRIPTION,
				TEST_LINK);

		expect(testRSS.getElementsByTagName('title')[0].textContent).toEqual(
				TEST_TITLE);
		expect(testRSS.getElementsByTagName('description')[0].textContent)
				.toEqual(TEST_DESCRIPTION);
		expect(testRSS.getElementsByTagName('link')[0].textContent).toEqual(
				TEST_LINK);
	});

	it('should generate an feed in RSS 2.0 XML', function() {
		var TEST_TITLE = "Test Feed Title";
		var TEST_DESCRIPTION = "Test Feed Description";
		var TEST_LINK = "http://testsite.com";
		var NUM_ENTRIES = 10;

		spyOn(TestFeedXML, "generateItem").andCallThrough();

		var testRSS = TestFeedXML.generateFeed(TEST_TITLE, TEST_DESCRIPTION,
				TEST_LINK, NUM_ENTRIES);

		expect(testRSS.getElementsByTagName('title')[0].textContent).toEqual(
				TEST_TITLE);
		expect(testRSS.getElementsByTagName('description')[0].textContent)
				.toEqual(TEST_DESCRIPTION);
		expect(testRSS.getElementsByTagName('link')[0].textContent).toEqual(
				TEST_LINK);

		expect(TestFeedXML.generateItem.callCount).toEqual(NUM_ENTRIES);
	});

});