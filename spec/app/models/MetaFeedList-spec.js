describe('MetaFeedList', function() {
	it('should provide me the previous index in this circular list', function() {
		expect(MetaFeedList.prev_index(0)).toEqual(MetaFeedList.length - 1);
		expect(MetaFeedList.prev_index(MetaFeedList.length - 1)).toEqual(MetaFeedList.length - 2);
	});
	
	it('should provide me the next index in this circular list', function() {
		expect(MetaFeedList.next_index(0)).toEqual(1);
		expect(MetaFeedList.next_index(MetaFeedList.length - 1)).toEqual(0);
	});
});