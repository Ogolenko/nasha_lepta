'use strict';

/**
 * @ngdoc overview
 * @name nashaLeptaApp
 * @description
 * # nashaLeptaApp
 *
 * Main module of the application.
 */
angular
  .module('nashaLeptaApp', [
    'ngResource',
    'ngRoute',
    'firebase',
    'ngCkeditor',
    'angularPicasa',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'ngSocial',
    'bootstrapLightbox'
  ])
  .config(function ($routeProvider) {
    for (var template in appRequestsRoutes.views){
      $routeProvider
        .when(
        '/' + appRequestsRoutes.views[template].url, {
          template: '<nl-article data="'+appRequestsRoutes.views[template].url+'" auth="auth"></nl-article>'
        }
      );
    }
    $routeProvider
      .when('/', {
        redirectTo: '/requests-window'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .config(function (LightboxProvider) {
    LightboxProvider.getImageUrl = function (imageUrl) {
      console.log('typeof imageUrl === String' + (typeof imageUrl === 'string'));
      if(typeof imageUrl === 'string'){
        return imageUrl;
      }
      console.log(imageUrl);
      return imageUrl.url;
    };
    LightboxProvider.templateUrl = 'templates/vendor/lightbox/pop-up-template.html';
  });
