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
		expect(testStory).toEqual(new MetaEntry(TEST_TITLE, TEST_DESCRIPTION, TEST_URL));
		});

	it('should turn an <rss> entry into a list of stories', function() {
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