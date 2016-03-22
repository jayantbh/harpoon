/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon.controller("mainController", function ($scope, $http) {
	var main = this;
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
		_editor.container.style["height"] = window.innerHeight - (document.querySelector("md-toolbar").getBoundingClientRect().height)*2 + "px";
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
			$http.post("/generate", {template:$scope.code})
				.then(function (data) {
						console.log(data.data);
						$scope.result = JSON.stringify(data.data,null,'\t');
					},
					function (err) {
						console.error(err);
					}
				)
		}
	};

	main.saveTemplate = function () {
		//do something
	};

	main.copyToClipboard = function () {
		//do something
	};

	window.onresize = function () {
		_aces.forEach(function (ed, i) {
			resizeEditor(ed);
		});
	};
});
