// It accept array of Objects. It remove duplicate entries based on identical name;


function removeDuplicate(data) {
	var newData = [];
	var keys = {};

	data.map(function (v, i) {


		if (keys[v.name] === undefined) {
			keys[v.name] = "";
			newData.push(v);
		}
	});

	return newData;
};

module.exports = {
	execute: function (data, next) {
		try {
			/*global.console.log = function () {
			 break;
			 };*/

			var data1 = removeDuplicate(req.data);
			next(data1);
		} catch (ex) {
			throw ex;
		}
	}
};