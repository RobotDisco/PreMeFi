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

/** Namespace for fake responses */
var TestResponses = {
	failure : {
		status : 500,
		contentType : "text/html",
		responseText : "<html><body>Sorry, something terrible happened!</body></html>"
	},
	success : {
		status : 200,
		contentType : "application/rss+xml",
		responseText : "<rss>Feed goes here</rss>"
	},
	notXML : {
		status : 200,
		contentType : "text/plain",
		responseText : "I am not XML data!"
	}
};