/**
 * Created by Jayant Bhawal on 23-03-2016.
 */
harpoon.filter('keylength', function(){
	return function(input){
		if(!angular.isObject(input)){
			return 0;
		}
		return Object.keys(input).length;
	}
});
