/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  };
}

exports.distance = function calculateDistance(loc1String, loc2String){
  // strings expected as "latitude;longitude"
  // "42.360091;-71.09415999999999"
  var lat1 = +loc1String.split(';')[0];
  var lon1 = +loc1String.split(';')[1];
  var lat2 = +loc2String.split(';')[0];
  var lon2 = +loc2String.split(';')[1];

  var distance = Math.sqrt(Math.pow(lat2-lat1,2) + Math.pow(lon2-lon1,2));

  return distance; // returned in km
};
