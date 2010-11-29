describe('Stage Assistant', function() {
	var assistant;

	it('should load the feedview frame by default with the default feed',
			function() {
				assistant = new StageAssistant();
				assistant.controller = new jasmine.webos.StubStageController();
				spyOn(assistant.controller, 'pushScene');

				assistant.setup();
				expect(assistant.controller.pushScene).toHaveBeenCalledWith(
						'FeedView',
						MetaFeedList[0]);
			});

});

describe('MetaFeedList', function() {
	
	it('should be defined', function() {
		expect(MetaFeedList).toBeDefined();
		expect(MetaFeedList).toContain(jasmine.any(MetaFeed));
	});
});
