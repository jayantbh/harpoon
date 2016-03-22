/**
 * Created by Jayant Bhawal on 20-03-2016.
 */
harpoon
	.constant('firebaseRef', new Firebase('https://harpoon.firebaseio.com'))
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('deep-purple')
			.accentPalette('blue')
			.warnPalette('red')
			.backgroundPalette('grey');
	})
	.run(function ($rootScope,firebaseRef) {
		$rootScope.auth = firebaseRef.getAuth();
	});
