'use strict';

/**
 * @ngdoc directive
 * @name nashaLeptaApp.directive:nlArticle
 * @description
 * # nlArticle
 */
angular.module('nashaLeptaApp')
  .directive('nlArticle', ["$firebaseObject", "$sce", function ($firebaseObject, $sce) {
    return {
      templateUrl: 'templates/directives/nlarticle.html',
      restrict: 'E',
      scope :{
        data : '@',
        auth : '='
      },
      link: function postLink(scope, element, attrs) {
        var ref = new Firebase('https://boiling-fire-9518.firebaseio.com/'+ attrs.data);
        var receivedValue = $firebaseObject(ref);

        receivedValue.$loaded()
          .then(function(data) {
            /*special case for picasa album*/
            if(data.$value.indexOf('picasa=') < 0){
              scope.toShow =
                $sce.trustAsHtml(
                  data.$value
                )
              ;
              scope.toShowCompile=null;
            }else{
              scope.toShow=null;
              scope.toShowCompile=data.$value;
            }
/*to commit delete after*/
            scope.toEdit = data;
            //console.log(scope.toEdit);
          })
          .catch(function(error) {
            console.error("Error:", error);
          });

      }
      ,
      controller : 'UpdateTemplateCtrl'
    };
  }]);