/**
 * Created by Jayant Bhawal on 22-03-2016.
 */
harpoon.controller("dialogController", function ($scope, $mdDialog, $rootScope, firebaseRef, $firebaseObject, $firebaseAuth, $timeout) {
	var dialog = this;

	dialog.hide = function () {
		$mdDialog.hide();
	};
	dialog.cancel = function () {
		$mdDialog.cancel();
	};
	dialog.answer = function (answer) {
		$mdDialog.hide(answer);
	};

	var socialAuth = function (service) {
		firebaseRef.authWithOAuthPopup(service, function(error, authData) {
			console.log(error, authData);
		});
	};
	var anonAuth = function () {
		firebaseRef.authAnonymously(function (error, authData) {
			console.log(error, authData);
		}, {
			remember: "sessionOnly"
		});
	};

	dialog.signIn = function (service) {
		if (!firebaseRef.getAuth()) {
			if(service == "anonymous"){
				anonAuth();
			}
			else{
				socialAuth(service);
			}

			firebaseRef.onAuth(function (data) {
				$timeout(function () {
					$rootScope.auth = data;
					$mdDialog.hide();
					$scope.$apply();
				});
			});
		}

	};
});
