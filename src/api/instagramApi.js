'use strict';

const ACCESS_TOKEN = '192980099.467ede5.18e86b46b5c6475aab96be299f59b337';

export const ENDPOINTS = {
  searchUsers: (userName) => {return `https://api.instagram.com/v1/users/search?q=${userName}&access_token=${ACCESS_TOKEN}`},
  fetchRecentUserMedia: (userId) => {return `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${ACCESS_TOKEN}`;}
};