var app = angular.module('myApp', [
    'ngRoute',
    'appControllers',
    'appFactories',
    'appDirectives'
]);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'user-list.html',
            controller: 'HomeCtrl'
        }).when('/details', {
            templateUrl: 'details.html',
            controller: 'DetailsCtrl'
        }).
        otherwise({
            redirectTo: '/home',
            controller: 'HomeCtrl'
        });
});

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    var selection = element[0].selectionStart;
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                    element[0].selectionStart = selection;
                    element[0].selectionEnd = selection;
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);
        }
    };
});
appDirectives.directive("limitTo", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function (e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

var appFactories = angular.module('appFactories', []);

appFactories.factory('userFactory', function ($http) {
    var baseUrl = 'http://localhost:9000/hospital';
    return {
        list: function (callback) {
            $http({
                method: 'GET',
                url: baseUrl.concat("/getPatientDetails"),
                cache: true
            }).success(callback);
        }, create: function (params, callback) {
            $http({
                method: 'POST',
                url: baseUrl.concat("/addPatientDetails"),
                data: params,
                cache: true
            }).success(callback).error(callback);
        }
    };
});



var appControllers = angular.module('appControllers', []);

appControllers.controller('HomeCtrl', function ($scope, $filter, userFactory, $location, $window, $rootScope) {
    
    $scope.getUserList = function () {
        userFactory.list(function (users) {
            $scope.users = users.data;
        });
    }

    $scope.getUserList();

    $scope.newUser = function () {
        var pathName = $window.location.pathname.split("/");
        pathName.forEach(element => {
            if (element == pathName[pathName.length - 1]) {
                pathName[pathName.length - 1] = "add.html#/details"
            }
        });
        var addPath = pathName.join("/");
        $window.location.href = addPath;
    };

});

appControllers.controller('DetailsCtrl', function ($scope, userFactory, $window, $rootScope) {
    $scope.submitStudnetForm = function (userDetails) {       

        if (userDetails) {
            console.log(userFactory.create(userDetails));
        }     

        var pathName = $window.location.pathname.split("/");
        pathName.forEach(element => {
            if (element == pathName[pathName.length - 1]) {
                pathName[pathName.length - 1] = "home.html#/home"
            }
        });
        var addPath = pathName.join("/");
        $window.location.href = addPath;

    }
});