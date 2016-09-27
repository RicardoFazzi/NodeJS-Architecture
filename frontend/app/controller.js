define(["bootbox"], function(bootbox) {
	var constructor = {};
	constructor.init = function (module) {
		module.controller("IndexStateCtrl", ["$state", "$http",
			function ($state, $http) {
				if ($http.defaults.headers.common['x-access-token'] != undefined)
					$state.go("home");
			}]);
	};
	return constructor;
});