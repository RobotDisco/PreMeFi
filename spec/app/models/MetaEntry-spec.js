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

describe( 'MetaEntry', function() {
	var TEST_TITLE = "Test Story";
	var TEST_STORY = "This is a <a href='http://www.test.com'>test</a> entry.";
	var TEST_URL = "http://www.metafilter.com/story.html";
	var TEST_GUID = "0";
			
	var entry;
			
	beforeEach(function() {
		entry = new MetaEntry(TEST_TITLE, TEST_STORY, TEST_URL, TEST_GUID);
	});
			
	it( 'should produce an HTML-free version of the text as a teaser', function() {
		expect(entry.teaser).toEqual("This is a test entry.");
	});
	
	it( 'should be clonable from a properly populated JSON object', function() {
		var object = {
				title: TEST_TITLE,
				story: TEST_STORY,
				url: TEST_URL,
				guid: TEST_GUID,
				unread: true
		};
		
		var from_json = MetaEntry.fromJSON(object);
		
		expect(entry.title).toEqual(from_json.title);
		expect(entry.story).toEqual(from_json.story);
		expect(entry.url).toEqual(from_json.url);
		expect(entry.m_unread).toEqual(from_json.m_unread);
		expect(entry.m_guid).toEqual(from_json.m_guid);
		expect(entry.teaser).toEqual(from_json.teaser);
	});
	it ('can be converted into a JSON-compliant string', function() {
		var json = entry.toJSONObject();
		
		expect(json.title).toEqual(entry.title);
		expect(json.story).toEqual(entry.story);
		// We do not preserve the JSON teaser, we re-generate it.
		expect(json.url).toEqual(entry.url);
		expect(json.unread).toEqual(entry.m_unread);
		expect(json.guid).toEqual(entry.m_guid);		
	});
});