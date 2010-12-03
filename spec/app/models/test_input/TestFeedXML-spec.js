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