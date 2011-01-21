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
		'MetaEntry',
		function() {
			var TEST_TITLE = "Test Story";
			var TEST_STORY = "This is a <a href='http://www.test.com'>test</a> entry.";
			var TEST_URL = "http://www.metafilter.com/story.html";
			var TEST_GUID = "0";
			
			var entry;
			
			beforeEach(function() {
				entry = new MetaEntry(TEST_TITLE, TEST_STORY, TEST_URL, TEST_GUID);
			});
			
			it(
					'should produce an HTML-free version of the text as a teaser',
					function() {
						expect(entry.teaser).toEqual("This is a test entry.");
					}
			);
		});