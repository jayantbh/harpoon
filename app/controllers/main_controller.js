/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon.controller("mainController", function ($scope) {
	var main = this;
	var _aces = [];

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
		_editor.container.style["height"] = window.innerHeight-128+"px";
	};
	var initializeEditors = function (_editor) {
		_aces.push(_editor);
		_editor.setAutoScrollEditorIntoView(true);
		resizeEditor(_editor);

		_editor.setOptions({
			fontSize: "14pt"
		});
	};

	$scope.formatEditor = function (_editor) {
		_ace = _editor;
		initializeEditors(_editor);
	};
	$scope.aceChanged = function (_editor) {
		console.log($scope.code);
	};
	$scope.jsonViewer = function (_editor) {
		_editor.setReadOnly(true);
		initializeEditors(_editor);
	};

	window.onresize = function () {
		_aces.forEach(function (ed, i) {
			resizeEditor(ed);
		});
	};
});
