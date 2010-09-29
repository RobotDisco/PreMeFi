describe('story view', function() {
	var assistant;

	var story_title = "Fundamental Computer Science Open Problem solved.";
	var story_text = "P has been found to equal NP, holy crap!";

	beforeEach(function() {
		assistant = jasmine.webos.createStubSceneAssistant("StoryView",
				story_title, story_text);
		assistant.setup();
	});

	it('should display the provided story title and text', function() {
		expect(assistant.controller.get("StoryView_story_title").innerHTML)
				.toEqual(story_title);
		expect(assistant.controller.get("StoryView_story_text").innerHTML)
				.toEqual(story_text);
	});

	xit('should close when we perform a back-swipe', function() {

	});
});