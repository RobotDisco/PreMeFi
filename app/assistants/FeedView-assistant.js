function FeedViewAssistant(feed){
    this.feed = feed;
    this.list_widget_model = {
        items: this.feed.list
    };
	this.app_menu_model = {
		items: [{
			label: "Unit Tests...",
			command: "launch_unit_tests"
		}]
	};
    this.command_menu_model = {
        items: [{
            items: []
        }, {
            items: [{
                icon: "refresh",
                command: "refresh_feed"
            }]
        }]
    };
}

FeedViewAssistant.prototype.setup = function(){
    this.set_feed_title();
    this.update_feed();
    
    /* Setup widgets */
    this.controller.setupWidget('story_list', {
        hasNoWidgets: true,
        itemTemplate: "FeedView/story_list"
    }, this.list_widget_model);
    this.controller.setupWidget(Mojo.Menu.commandMenu, {}, this.command_menu_model);
	this.controller.setupWidget(Mojo.Menu.appMenu, {}, this.app_menu_model);
	
	/* Event listeners */
	this.controller.listen(this.controller.get("story_list"), Mojo.Event.listTap, this.display_story.bindAsEventListener(this));
};

FeedViewAssistant.prototype.activate = function(event){
};

FeedViewAssistant.prototype.deactivate = function(event){
};

FeedViewAssistant.prototype.cleanup = function(event){
	/* Clean up event listeners */ 
	this.controller.stopListening(this.controller.get("story_list"), Mojo.Event.listTap, this.display_story.bindAsEventListener(this));
};

FeedViewAssistant.prototype.set_feed_title = function(){
    var title_element;
    
    title_element = this.controller.get("FeedView_title");
    title_element.innerHTML = this.feed.get_feed_title();
};

FeedViewAssistant.prototype.update_feed = function(){
    this.feed.update();
};

FeedViewAssistant.prototype.considerForNotification = function(notification_message){
    if (notification_message.updating === false) {
        this.list_widget_model.items = this.feed.list;
        this.controller.modelChanged(this.list_widget_model, this);
    }
    return undefined;
};

FeedViewAssistant.prototype.handleCommand = function(event){
    if (event.type === Mojo.Event.command) {
        switch (event.command) {
            case 'refresh_feed':
                this.feed.update();
                break;
			case 'launch_unit_tests':
				this.controller.stageController.pushScene({
					name: 'test',
    				sceneTemplate: '../../plugins/jasmine-webos/app/views/test/test-scene'
				});
				break;
        }
    }
};

FeedViewAssistant.prototype.display_story = function(event) {
	this.controller.stageController.pushScene("StoryView", event.item.title, event.item.story);
};
