/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon.controller("mainController", function () {
	var main = this;

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
});
