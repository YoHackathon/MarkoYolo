/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}

exports.distance = function(loc1String, loc2String){
  // strings expected as "latitude;longitude"
  // "42.360091;-71.09415999999999"
  var lat1 = +loc1String.split(';')[0];
  var lon1 = +loc1String.split(';')[1];
  var lat2 = +loc2String.split(';')[0];
  var lon2 = +loc2String.split(';')[1];

  // calculator logic
  var R = 6371; // km
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var distance = R * c;

  return distance; // returned in km

}


