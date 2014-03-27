// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var adapter = new MemoryAdapter();
    var homeTpl = Handlebars.compile($('#home-tpl').html());
    var employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());
    var employeeTpl = Handlebars.compile($('#employee-tpl').html());

    var detailsURL = /^#employees\/(\d{1,})/;

    adapter.initialize().done(function () {
        // console.log("Data adapter initialized");
        // renderHomeView();

        // $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
        route();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // $('.search-key').on('keyup', findByName);
    // $('.help-btn').on('click', function() {
    //     alert("Some help here...")
    // });

    document.addEventListener('deviceready', function () {

        FastClick.attach(document.body);

        // Override default HTML alert if plugin is installed
        if (navigator.notification) {
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        };
    }, false);

    $(window).on('hashchange', route)


    /* ---------------------------------- Local Functions ---------------------------------- */
    // Moved to homeView.js

    function route () {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
            return;
        };
        var match = hash.match(detailsURL);
        if (match ) {
            adapter.findById(Number(match[1])).done(function (employee) {  
                $('body').html(new EmployeeView(adapter, employeeTpl, employee).render().el);
            })
        }
    }

}());