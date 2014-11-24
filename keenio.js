var request = require('request');
var writeKey = process.env.keenio_write_key;
var projectId = process.env.keenio_project_id;

module.exports = {
  log: function(yo){
    request.post({
      url: 'https://api.keen.io/3.0/projects/'+projectId+'/events/yos?api_key='+writeKey,
      json: yo
    });
  }
}