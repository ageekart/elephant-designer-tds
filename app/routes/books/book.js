import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params)	{
		return this.store.findRecord('book', params.book_id);
	},

	setupController: function(controller, model){
		controller.set('book', model);
	},

	actions: {
		deleteBook: function(book) {
			var _this = this;
			book.destroyRecord().then(function() {
				_this.transitionTo('books');
			});
		}
	}
});