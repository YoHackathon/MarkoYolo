/** Converts numeric degrees to radians */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

exports.distance = function calculateDistance(loc1String, loc2String){
  // strings expected as "latitude;longitude"
  // "42.360091;-71.09415999999999"
  var lat1 = +loc1String.split(';')[0];
  var lon1 = +loc1String.split(';')[1];
  var lat2 = +loc2String.split(';')[0];
  var lon2 = +loc2String.split(';')[1];

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var distance = R * c; // Distance in km
  return distance; // Distance in km
};
