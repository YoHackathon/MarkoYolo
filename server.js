/* post /yo/
curl -H "Content-Type: application/json" -d '{"username":"MLUBY","api_token":"e95c427dcf979105509476f7b676f2d049904484"}' http://api.justyo.co/yo/
*/

var yo = {
  api_token: 'api_token',
  username: 'recipients_username',
  link: 'optional_link',
  // XOR
  location: 'optional_lat,long'
};

/* POST https://api.justyo.co/yoall/ {api_token: 'api_token', link: 'link'}
curl -H "Content-Type: application/json" -d '{"api_token":"e95c427dcf979105509476f7b676f2d049904484"}' http://api.justyo.co/yoall/
*/

var yoall = {
  api_token: 'api_token',
  link: 'optional_link',
};
