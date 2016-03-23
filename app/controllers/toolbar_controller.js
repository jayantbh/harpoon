/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon.controller("toolbarController", function ($scope, $mdDialog, firebaseRef, $rootScope) {
	var tool = this;

	tool.entry = function (e) {
		$mdDialog.show({
			controller: "dialogController",
			controllerAs: "dialog",
			templateUrl: "views/components/entry_dialog.html",
			parent: angular.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true
		})
			.then(function(data) {
				console.log(data)
			}, function() {
				console.log("Dialog hidden.")
			});
	};

	tool.exit = function (e) {
		firebaseRef.unauth();
		$rootScope.auth = null;
	};

	tool.help = function (e) {
		$mdDialog.show({
			controller: "dialogController",
			controllerAs: "dialog",
			templateUrl: "views/components/help_dialog.html",
			parent: angular.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true
		});
	}
});
