/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon.controller("mainController", function ($scope, $http, firebaseRef, $mdToast, $timeout, $mdDialog, $rootScope) {
	var main = this;
	var auth = firebaseRef.getAuth();
	var _aces = [];
	$scope.code = "{\n\t\"users\": [\n\t{{#repeat 2}}\n\t{\n\t\t\"id\": {{@index}},\n\t\t\"name\": \"{{firstName}} {{lastName}}\",\n\t\t\"work\": \"{{company}}\",\n\t\t\"email\": \"{{email}}\",\n\t\t\"dob\": \"{{date '1900' '2000' 'DD/MM/YYYY'}}\",\n\t\t\"address\": \"{{int 1 100}} {{street}}\",\n\t\t\"city\": \"{{city}}\",\n\t\t\"optedin\": {{boolean}}\n\t}\n\t{{/repeat}}\n\t],\n\t\"images\": [\n\t{{#repeat 3}}\n\t\"img{{@index}}.png\"\n\t{{/repeat}}\n\t],\n\t\"coordinates\": {\n\t\"x\": {{float -50 50 \"0.00\"}},\n\t\"y\": {{float -25 25 \"0.00\"}}\n\t},\n\t\"price\": \"${{int 0 99999 '0,0'}}\"\n}";

	var savedSchemas = [
		{
			title: "UniAPI",
			createdOn: "5 days ago",
			size: "5 KBs",
			avatar: "https://randomuser.me/api/portraits/men/31.jpg"
		},
		{
			title: "AcadlyAPI",
			createdOn: "5 days ago",
			size: "8 KBs",
			avatar: "https://randomuser.me/api/portraits/women/3.jpg"
		},
		{
			title: "1mg Testing",
			createdOn: "5 days ago",
			size: "4 KBs",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg"
		},
		{
			title: "Harpoon Dummy",
			createdOn: "5 days ago",
			size: "1 KBs",
			avatar: "https://randomuser.me/api/portraits/women/1.jpg"
		},
		{
			title: "Acetone Hapi",
			createdOn: "5 days ago",
			size: "7 KBs",
			avatar: "https://randomuser.me/api/portraits/women/39.jpg"
		}
	];
	main.schemas = savedSchemas;

	var resizeEditor = function (_editor) {
		_editor.container.style["height"] = window.innerHeight - (document.querySelector("md-toolbar").getBoundingClientRect().height) * 2 + "px";
	};
	var initializeEditors = function (_editor) {
		_aces.push(_editor);
		_editor.setAutoScrollEditorIntoView(true);
		resizeEditor(_editor);

		_editor.session.setUseWorker(false);
		_editor.setOptions({
			fontSize: "12pt"
		});
	};

	$scope.formatEditor = function (_editor) {
		initializeEditors(_editor);
	};
	$scope.aceChanged = function (_editor) {
		console.log($scope.code);
	};
	$scope.jsonViewer = function (_editor) {
		_editor.setReadOnly(true);
		initializeEditors(_editor);
	};

	main.generate = function () {
		if ($scope.code && $scope.code.length) {
			console.log($scope.code);
			$http.post("/generate", {template: $scope.code})
				.then(function (data) {
						$scope.result = JSON.stringify(data.data, null, '\t');
						$mdToast.show(
							$mdToast.simple()
								.textContent('JSON generated.')
								.hideDelay(3000)
						);
					},
					function (err) {
						$mdToast.show(
							$mdToast.simple()
								.textContent('JSON could not be generated. Errors logged.')
								.hideDelay(3000)
						);
						console.error(err);
					}
				)
		}
	};

	main.saveTemplate = function (frm) {
		//do something
		frm.$setSubmitted();
		console.log(frm);
		if (frm.$valid) {
			var title = main.title;
			var code = $scope.code;
			var date = new Date().getTime();

			var saveTemplate = function () {
				firebaseRef.child("users/" + btoa(auth[auth.provider].email)).child("templates/" + title).set({
					title: title,
					code: code,
					date: date
				}, function (error) {
					if (error) {
						$mdToast.show(
							$mdToast.simple()
								.textContent('Data could not be saved. Errors logged.')
								.hideDelay(3000)
						);
						console.error(error);
					} else {
						$mdToast.show(
							$mdToast.simple()
								.textContent('Data saved successfully.')
								.hideDelay(3000)
						);
					}
				});
			};
			firebaseRef.child("users/" + btoa(auth[auth.provider].email) + "/templates/" + title).once('value', function (snap) {
				if (!snap.val()) {
					saveTemplate();
				}
				else {
					$mdToast.show(
						$mdToast.simple()
							.textContent('JSON template with same name exists. Overwrite?')
							.hideDelay(3000)
							.action('YES')
							.highlightAction(true)
						)
						.then(function (response) {
							if (response == "ok") {
								saveTemplate();
							}
						});
				}
			});
		}
	};

	main.copyToClipboard = function () {
		//do something
		console.log("Awaiting build.");
	};

	main.showCurrentTemplate = function(tpl){
		$timeout(function () {
			main.title = tpl.title;
			$scope.code = tpl.code;
		});
	};

	main.delete = function (title) {
		console.log("Deleting "+title);
		$timeout(function () {
			firebaseRef.child("users/" + btoa(auth[auth.provider].email) + "/templates/" + title).remove();
		});
	};

	main.showLink = function (e,tpl) {
		$rootScope.jsonTpl = tpl;
		$rootScope.jsonTpl.url = window.location.href+tpl.title;
		$rootScope.jsonTpl.email = btoa(auth[auth.provider].email);
		$mdDialog.show({
			controller: "dialogController",
			controllerAs: "dialog",
			templateUrl: "views/components/link_dialog.html",
			parent: angular.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true
		});
	};

	window.onresize = function () {
		_aces.forEach(function (ed, i) {
			resizeEditor(ed);
		});
	};

	function getTemplateData(auth) {
		if (auth) {
			var list = firebaseRef.child("users/" + btoa(auth[auth.provider].email) + "/templates/");
			var getTemplates = function (snapshot) {
				console.log(snapshot.val());
				$timeout(function () {
					main.templates = snapshot.val() || {};
				});
			};
			var getTemplatesError = function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			};

			list.once("value", getTemplates, getTemplatesError);
			list.on("value", getTemplates, getTemplatesError);
		}
	}

	firebaseRef.onAuth(function (auth) {
		getTemplateData(auth);
	});
});
