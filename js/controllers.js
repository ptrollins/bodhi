angular.module('fortum')


    .controller('HomeCtrl', function ($scope, Apps, $stateParams, $http) {
        
        $scope.thermo = 'img/thermo.png';
        $scope.dial = 'img/dial.png';
        $scope.cloud = 'img/cloud.png';

        // Power Usage
        $scope.powerUsed = 30;
        // Doughnut Chart Options
        var doughnutOptions = {
            cutoutPercentage : 70, //The percentage of the chart that we cut out of the middle.
            rotation: (.7*Math.PI),
            circumference: (0.8 *2 * Math.PI),
            animation: {
                animateScale: false,
                animateRotate: false
            }
        };
        // Doughnut Chart Data
        var doughnutData = [{
            data: [$scope.powerUsed, 100-$scope.powerUsed],
            backgroundColor: ['#1a433f','#ffffff'],
            borderColor: ['#1a433f','#51b497'],
            borderWidth: [40,20]
        }];
        //Get the context of the Doughnut Chart canvas element we want to select
        var ctx = document.getElementById("powerChart");
        // Create the Doughnut Chart
        var powerChart = new Chart(ctx,{
            type: 'doughnut',
            data: {
                labels: [],
                datasets: doughnutData
            },
            options: doughnutOptions
        });

        
        var isOn = false;
        $scope.lightIcon = 'img/off.png';
        $scope.lightOn = function (){
            window.plugins.flashlight.toggle();
            if (isOn) {
                isOn = false;
                $scope.lightIcon = 'img/off.png';
                $scope.powerUsed -= 10;
            }
            else {
                isOn = true;
                $scope.lightIcon = 'img/on.png';
                $scope.powerUsed += 10;
            }
            if ($scope.powerUsed <21){
                $scope.powerColor  = 'green';
            }else if ($scope.powerUsed >31){
                $scope.powerColor  = 'red';
            }
            else{
                $scope.powerColor  = 'yellow';
            }
            powerChart.segments[0].value = powerUsed;
            powerChart.update();
        };

        $scope.outletsUsed = 1;
        $scope.powerColor  = 'green';
        $scope.powerUp = function(){
            $scope.outletsUsed ++;
            $scope.powerUsed += 5;
            if ($scope.powerUsed <21){
                $scope.powerColor  = 'green';
            }else if ($scope.powerUsed >31){
                $scope.powerColor  = 'red';
            }
            else{
                $scope.powerColor  = 'yellow';
            }
            console.log($scope.powerUsed);
            //powerChart.config.data.datasets[0].data = [$scope.powerUsed, 1-$scope.powerUsed];
            powerChart.data.datasets[0].data=[$scope.powerUsed, 100-$scope.powerUsed];
            powerChart.update();
        };


        // var isOpen = false;
        // $scope.windowIcon = 'img/close.png';
        // $scope.windowOpen = function (){
        //     if (isOpen) {
        //         isOpen = false;
        //         $scope.windowIcon = 'img/close.png';
        //     }
        //     else {
        //         isOpen = true;
        //         $scope.windowIcon = 'img/open.png';
        //     }
        // };

        // $scope.calendar = Apps.getCalendar();
        // $scope.editCalendar = function(times){
        //
        //     return $scope.calendar;
        // };

        // Temperature
        $scope.temp = 20;
        var barOptions = {

        };
        var barData = [{
            data: [$scope.temp],
            backgroundColor: ['red'],
            borderColor: ['red']
        }];
        //Get the context of the Doughnut Chart canvas element we want to select
        var ctx1 = document.getElementById("tempChart").getContext("2d");
        // Create the Doughnut Chart
        var tempChart = new Chart(ctx1,{
            type: 'bar',
            data: {
                labels: [],
                datasets: barData
            },
            options: barOptions
        });

        $scope.unittype = 'C';
        $scope.setTempUnit = function(){
            if ($scope.unittype == 'F'){
                $scope.unittype = 'C';
                $scope.temp = temp - 273.15;
            }else{
                $scope.unittype = 'F';
                $scope.temp = temp * 9/5 - 459.67;
            }
        };

    })

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
