'use strict';
const str = `https://oauth.vk.com/blank.html
#access_token=60c09a879f6f938869aeb14953e574bd7fd3321eb7fe3c5511c4204f94e1f4af4be867f83adcf11c8eb2c&expires_in=0&user_id=1335894&state=vKauthorized`;

//const token = str.splice('#access_token=', '&');


const credMassive = str.match(/(\w+=[^\&]+)/g);
var credentials = {};

//for(let i = 0; i < credMassive.length; i++) {
//  var credential = credMassive[i].split('=');
//
//  credentials[credential[0]] = credential[1];
//}
console.log(credMassive);


