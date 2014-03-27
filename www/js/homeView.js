var HomeView = function (adapter, template, listItemTemplate) {
	this.initialize = function () {
		// Define div wrapper for the view. It'll be used to attach events.
		this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName)
	}

	this.render = function () {
        // $('body').html(homeTpl());
        // $('.search-key').on('keyup', findByName);
		this.el.html(template());
		return this;
    }

    this.findByName = function () {
        adapter.findByName($('.search-key').val()).done(function (employees) {
            $('.employee-list').html(listItemTemplate(employees));
        });
    }

	this.initialize();
}