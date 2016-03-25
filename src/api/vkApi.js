'use strict';
export const AUTHORIZATION_PROCESSED_URL = 'https://oauth.vk.com/blank.html#';
const CLIENT_ID = '5343670';
const ROOT_API_URL = 'https://api.vk.com/method/';

export const ERRORS = {
  authDenied: {type: 'authDenied', message: 'авторизация отменена'},
  authError: {type: 'authError', message: 'ошибка авторизации'},
  shareDefaultError: {type: 'shareDefaultError', message: 'не удалось зашарить фото'}
};

function VkEventsEmmiter() {
  this.events = {};
}

VkEventsEmmiter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

VkEventsEmmiter.prototype.emit = function (type, props) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener(props);
    });
  }
};

export const VK_EVENTS = {
  AUTHORIZATION_SUCCESS: 'AUTHORIZATION_SUCCESS',
  AUTHORIZATION_DENIED: 'AUTHORIZATION_DENIED'
};
export var vkEmitter = new VkEventsEmmiter();

export const ENDPOINTS = {
  authorize: () => {
    return `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall,photos,offline&response_type=token&v=5.45`;
  },
  getUploadServer: (access_token, user_id) => {
    return `${ROOT_API_URL}photos.getWallUploadServer?user_id=${user_id}&access_token=${access_token}`
  },
  saveWallPhoto: (server, photo, hash, user_id, access_token) => {
    return `${ROOT_API_URL}photos.saveWallPhoto?server=${server}&photo=${photo}&hash=${hash}&user_id=${user_id}&access_token=${access_token}`
  },
  wallPost: (owner_id, message, photo_id, access_token) => {
    return `${ROOT_API_URL}wall.post?owner_id=${owner_id}&message=${message}&attachments=${photo_id}&access_token=${access_token}`
  },
  getPostUrl: (post_id, user_id) => {
    return `https://vk.com/id${user_id}?w=wall${user_id}_${post_id}%2Fall`
  }
};

export function parseTokenUrl(url) {
  const credMassive = url.match(/(\w+=[^\&]+)/g);
  var credentials = {};

  for (let i = 0; i < credMassive.length; i++) {
    var credential = credMassive[i].split('=');
    credentials[credential[0]] = credential[1];
  }

  return credentials;
}

const getUploadServer = (access_token, user_id) => {
  return fetch(ENDPOINTS.getUploadServer(access_token, user_id))
    .then((response) => response.json())
    .then((resp) => {
      if (resp.error) {
        return Promise.reject(ERRORS.authError);
      } else {
        return Promise.resolve(resp.response.upload_url);
      }
    })
};

const uploadPhoto = (uploadUrl, photoUri) => {
  var photoFile = {
    uri: photoUri,
    type: 'image/png',
    name: 'photo.png'
  };

  var body = new FormData();
  body.append('photo', photoFile);

  return fetch(uploadUrl, {
    method: 'post',
    body: body
  }).then((response) => response.json())
    .then((res) => {
      if (res.error) {
        return Promise.reject(ERRORS.shareDefaultError)
      } else {
        return Promise.resolve(res);
      }
    });
};

function saveWallPhoto(server, photo, hash, user_id, access_token) {
  return fetch(ENDPOINTS.saveWallPhoto(server, photo, hash, user_id, access_token))
    .then((response) => response.json())
    .then((res) => {
      if (res.error) {
        return Promise.reject(ERRORS.shareDefaultError)
      } else {
        return Promise.resolve(res.response[0]);//res return array of saved photos, since we save only one -> get first element of array
      }
    });
}

function wallPost(owner_id, message, photo_id, access_token) {
  return fetch(ENDPOINTS.wallPost(owner_id, message, photo_id, access_token))
    .then((response) => response.json())
    .then((res) => {
      if (res.error) {
        return Promise.reject(ERRORS.shareDefaultError)
      } else {
        return Promise.resolve(ENDPOINTS.getPostUrl(res.response.post_id, owner_id));
      }
    });
}

export function sharePhoto(photoUri, credentials) {
  return getUploadServer(credentials.access_token, credentials.user_id)
    .then((uploadUrl) => {
      return uploadPhoto(uploadUrl, photoUri)
        .then((uploadResult) => {
          return saveWallPhoto(uploadResult.server, uploadResult.photo, uploadResult.hash, credentials.user_id, credentials.access_token)
            .then((res) => {
                return wallPost(res.owner_id, '#zapilika #appkode', res.id, credentials.access_token)
              }
            );
        });
    });
}


