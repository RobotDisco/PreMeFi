/**
 * @constructor
 * @param {String} title Story title
 * @param {String} story Story body
 * @param {String} url Story URL
 */
function MetaEntry(title, story, url) {
	/** Story title */
	this.title = title;
	/** Story body */
	this.story = story;
	/** Story URL */
	this.url = url;
	/** A HTML-free truncated teaser of the story body */
	this.teaser = "";

	// Create a HTML-free teaser
	var tmp = document.createElement("DIV");
	tmp.innerHTML = this.story;
	this.teaser = tmp.textContent;
	delete tmp; // Explicitly delete, tmp is not a private variable
}