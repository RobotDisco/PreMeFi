/**
 * @constructor
 * @param title
 *            {String} Story title
 * @param story
 *            {String} Story body
 * @param url
 *            {String} Story URL
 * @returns {MetaEntry} Story object
 */
function MetaEntry(title, story, url) {
	this.title = title;
	this.story = story;
	this.url = url;
};