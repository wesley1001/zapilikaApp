'use strict';
/*
 from task
 const CLIENT_ID = '7f056c5d59a146b3a68df85b477a6fd1';
 const CLIENT_SECRET = 'd3c7809e7e1647a690cf58c8fecc58dc';
 */

//mine test
const CLIENT_ID = 'a1b6b1319aa14170be7b44fdf1729ceb';
const CLIENT_SECRET = '383fa8c2034c43f3838eab4fb7576277';
const ACCESS_TOKEN = '192980099.467ede5.18e86b46b5c6475aab96be299f59b337';

export const ENDPOINTS = {
  searchUsers: (userName) => {return `https://api.instagram.com/v1/users/search?q=${userName}&access_token=${ACCESS_TOKEN}`},
  fetchRecentUserMedia: (userId) => {return `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${ACCESS_TOKEN}`;}
};