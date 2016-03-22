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
		firebaseRef.onAuth(function(authData) {
			if (authData && !authData.anonymous) {
				// save the user's profile into the database so we can list users,
				// use them in Security and Firebase Rules, and show profiles

				firebaseRef.child('users/'+btoa(authData[authData.provider].email)).once('value', function(snap) {
					if(!snap.val()){
						firebaseRef.child("users").child(btoa(authData[authData.provider].email)).set({
							email: authData[authData.provider].email,
							name: getName(authData),
							image: authData[authData.provider].profileImageURL
						});
					}
				});
				console.log(getName(authData));
			}
		});

		function getName(authData) {
			switch(authData.provider) {
				case 'password':
					return authData.password.email.replace(/@.*/, '');
				default:
					return authData[authData.provider].displayName;
			}
		}
	});
