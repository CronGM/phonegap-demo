var JSONPAdapter = function() {

    this.initialize = function(data) {
        url = "data/employees.json";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id, dataType: "json"});
    }

    this.findByName = function(searchKey) {
        return $.ajax({url: url + "?name=" + searchKey, dataType: "json"});
    }

    var url;

}