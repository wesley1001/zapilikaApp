'use strict';
import Vk from 'react-native-vksdk';

const ROOT_API_URL = 'https://api.vk.com/method/';
export const ENDPOINTS = {
  getUploadServer: (access_token, user_id) => {
    return `${ROOT_API_URL}photos.getWallUploadServer?user_id=${user_id}&access_token=${access_token}`
  },
  saveWallPhoto: (server, photo, hash, user_id, access_token) => {
    return `${ROOT_API_URL}photos.saveWallPhoto?server=${server}&photo=${photo}&hash=${hash}&user_id=${user_id}&access_token=${access_token}`
  },
  wallPost: (owner_id, message,photo_id, access_token) => {
    return `${ROOT_API_URL}wall.post?owner_id=${owner_id}&message=${message}&attachments=${photo_id}&access_token=${access_token}`
  }
};

const getUploadServer = (access_token, user_id) => {
  return fetch(ENDPOINTS.getUploadServer(access_token, user_id))
    .then((response) => response.json())
    .then((resp) => resp.response.upload_url)
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
  }).then((response) => response.json());
};

function saveWallPhoto(server, photo, hash, user_id, access_token) {
  return fetch(ENDPOINTS.saveWallPhoto(server, photo, hash, user_id, access_token))
    .then((response) => response.json())
    .then((res) => res.response[0]);
}

function wallPost(owner_id, message,photo_id,access_token) {
  return fetch(ENDPOINTS.wallPost(owner_id,message,photo_id,access_token))
  .then((res) => res.text());
}

//todo add handlingErrors
//todo Provide auth for ios9 +
export  function sharePhoto(photoUri) {
  Vk.authorize().then((result) => {
    //2 get upload server
    getUploadServer(result.credentials.token, result.credentials.userId)
      .then((uploadUrl) => {
        uploadPhoto(uploadUrl, photoUri)
          .then((uploadResult) => {
            saveWallPhoto(uploadResult.server, uploadResult.photo, uploadResult.hash, result.credentials.userId, result.credentials.token)
              .then((resp) => {
                  wallPost(resp.owner_id, '#zapilika #appkode', resp.id, result.credentials.token)
                    .then((message) => console.log(message));
                }
              );
          });
      });

  }, (error) => {
    alert('ошибка авторизации!')
  });
}