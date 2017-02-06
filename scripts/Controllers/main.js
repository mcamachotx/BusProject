/**
 * Created by Miguel on 5/11/2016.
 */
(function mainStageController()
{
    "use strict";
    angular
    .module('BusApp')
    .controller('MainController', MainController)

    MainController.$inject = ['$scope'];
    
    function MainController($scope)
    {
        var rendererOptions = {
            draggable: true
        };
        var directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions);
        var directionsService3 = new google.maps.DirectionsService();
        var image = '../images/greenflag.png';

        /**
         * Data for the markers consisting of a name, a LatLng and a zIndex for
         * the order in which these markers should display on top of each
         * other.
         */

        var paradas = [
            ['Parada 1: Palacio de Justicia ', 25.43491, -101.003909, 4],
            ['Parada 2: Plaza de las Ciudades Hermanas', 25.4335329, -100.9982797, 5],
            ['Parada 3: Coss esquina con N. Bravo', 25.4315689, -100.992861, 3],
            ['Parada 4: Coss y Dionisio García', 25.4304553, -100.989761, 2],
            ['Parada 5: Coss y La Llave', 25.428573, -100.985201, 1],
            ['Parada 6: Coss y Nazario Ortiz', 25.427761, -100.982802, 6],
            ['Parada 7: Reforma pasando calle Magisterio', 25.4267452, -100.9802131, 7],
            ['Parada 8: Reforma pasando Walmart', 25.425683, -100.9789483, 8],
            ['Parada 9: Reforma y Calle de la Escuela', 25.426923, -100.970346, 9],
            ['Parada 10: Blvd. Fundadores y Cristobal Pereas', 25.4283208, -100.9594456, 10],
            ['Parada 11: Blvd. Fundadores pasando Blvd. Morelos', 25.4293429, -100.9523992, 11],
            ['Parada 12: Blvd. Fundadores pasando calle 17', 25.4301141, -100.9462101, 12],
            ['Parada 13: Blvd. Fundadores y Solidaridad', 25.4317650, -100.9350683, 13],
            ['Parada 14: Blvd. Fundadores pasando Blvd. Colosio', 25.4328636, -100.926775, 14],
            ['Parada 15: Blvd. Fundadores y calle a Loma Linda', 25.4347321, -100.9156045, 15],
            ['Parada 16: Universidad Autónoma de Coahuila Campus Arteaga', 25.4441632, -100.8600588, 16],
            ['Parada 17: Centro de Gobierno', 25.4357938, -100.9142495, 17],
            ['Parada 18: Blvd. Fundadores y Calle Manantiales', 25.4328159, -100.9333627, 18],
            ['Parada 19: Blvd. Fundadores y Calle de los Cerritos', 25.4319938, -100.9393356, 19],
            ['Parada 20: Blvd. Fundadores y Lindero del Sauz', 25.4308509, -100.946995, 20],
            ['Parada 21: Blvd. Fundadores antes de Eulalio Gutiérrez ', 25.429745, -100.955444, 21],
            ['Parada 22: Blvd. Fundadores antes de Las Azucenas ', 25.429281, -100.9597574, 22],
            ['Parada 23: Reforma antes de 10 de Mayo ', 25.427713, -100.9715865, 23],
            ['Parada 24: Coss en la Alberca Olímpica ', 25.427831, -100.982508, 24],
            ['Parada 25: Coss y Dionisio García ', 25.430552, -100.9896291, 25],
            ['Parada 26: Coss antes de Candela ', 25.4339199, -100.9986444, 26],
            ['Palacio de Justicia ', 25.434551, -101.003809, 27],
            ['Plaza de las Ciudades Hermanas', 25.433190, -100.998277, 28],
            ['Plaza del Congreso', 25.432598, -100.996035, 29],
            ['Alberca Olímpica ', 25.427825, -100.9818284, 30],
            ['Walmart', 25.425402, -100.980233, 31],
            ['Distribuidor Vial', 25.427330, -100.969893, 32],
            ['Centro de Gobierno', 25.437278, -100.915209, 33]
        ];

        $scope.initialize = initialize;
        $scope.calcRoute = calcRoute;
        $scope.terrainButton = terrainButton;
        $scope.hybridButton = hybridButton;
        $scope.roadMapButton = roadMapButton;
        $scope.satelliteButton = satelliteButton;
        $scope.trafficButton = trafficButton;
        $scope.bicycleButton = bicycleButton;
        $scope.transitButton = transitButton;
        $scope.busStops = [];

        function initialize() {
            var pos;
            var infoWindow;
            var flightPlanCoordinates;
            var flightPath;
            var backPlanCoordinates;
            var backPath;
            var control;
            var mapOptions;
            var i;

            mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(25.43491, -101.003909),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
            $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            control = document.getElementById('control');
            $scope.map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
            // Try HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                        pos = new google.maps.LatLng(position.coords.latitude,
                            position.coords.longitude);

                        infoWindow = new google.maps.InfoWindow({
                            map: $scope.map,
                            position: pos,
                            content: 'Estás aquí.'
                        });


                        $scope.greenMarker = new google.maps.Marker({
                            position: pos,
                            map: $scope.map,
                            icon: image
                        });

                        google.maps.event.addListener($scope.greenMarker, 'click', function () {
                            infowindow.open($scope.map, $scope.greenMarker);
                        });


                        $scope.map.setCenter(pos);

                        setMarkers($scope.map, paradas);

                        flightPlanCoordinates = [
                            new google.maps.LatLng(25.43491, -101.003909),
                            new google.maps.LatLng(25.4335329, -100.9982797),
                            new google.maps.LatLng(25.4315689, -100.992861),
                            new google.maps.LatLng(25.4304553, -100.989761),
                            new google.maps.LatLng(25.428573, -100.985201),
                            new google.maps.LatLng(25.427761, -100.982802),
                            new google.maps.LatLng(25.4267452, -100.9802131),
                            new google.maps.LatLng(25.425683, -100.9789483),
                            new google.maps.LatLng(25.426923, -100.970346),
                            new google.maps.LatLng(25.4283208, -100.9594456),
                            new google.maps.LatLng(25.4293429, -100.9523992),
                            new google.maps.LatLng(25.4301141, -100.9462101),
                            new google.maps.LatLng(25.4317650, -100.9350683),
                            new google.maps.LatLng(25.4328636, -100.926775),
                            new google.maps.LatLng(25.4347321, -100.9156045),
                            new google.maps.LatLng(25.4441632, -100.8600588)
                        ];
                        flightPath = new google.maps.Polyline({
                            path: flightPlanCoordinates,
                            geodesic: true,
                            strokeColor: '#9900FF',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                        });

                        flightPath.setMap($scope.map);

                        backPlanCoordinates = [
                            new google.maps.LatLng(25.4339199, -100.9986444),
                            new google.maps.LatLng(25.430552, -100.9896291),
                            new google.maps.LatLng(25.427831, -100.982508),
                            new google.maps.LatLng(25.427713, -100.9715865),
                            new google.maps.LatLng(25.429281, -100.9597574),
                            new google.maps.LatLng(25.429745, -100.955444),
                            new google.maps.LatLng(25.4308509, -100.946995),
                            new google.maps.LatLng(25.4319938, -100.9393356),
                            new google.maps.LatLng(25.4328159, -100.9333627),
                            new google.maps.LatLng(25.4357938, -100.9142495),
                            new google.maps.LatLng(25.4441632, -100.86)

                        ];
                        backPath = new google.maps.Polyline({
                            path: backPlanCoordinates,
                            geodesic: true,
                            strokeColor: '#00FFFF',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                        });

                        backPath.setMap($scope.map);

                    },
                    function () {
                        handleNoGeolocation(true);
                    }
                );
            }
            else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }


            for (i = 0; i < paradas.length; i++) {
                $scope.busStops.push({
                    stopNumber: i + 1,
                    stopName: paradas[i][0],
                    latitude: paradas[i][1],
                    longitude: paradas[i][2],
                    number: paradas[i][3]
                });
            }

            directionsDisplay3.setMap($scope.map);
            directionsDisplay3.setPanel(document.getElementById('directionsPanel3'));

            google.maps.event.addListener(directionsDisplay3, 'directions_changed', function computeTotalDist() {
                computeTotalDistance(directionsDisplay3.getDirections());
            });

            calcRoute3();
        }

        function handleNoGeolocation(errorFlag) {
            var content;
            var options;
            //var infoWindow;

            if (errorFlag) {
                content = 'Error: El servicio de geolocalizacion falló.';
            }
            else {
                content = 'Error: Tu navegador no soporta geolocalizacion.';
            }

            options = {
                map: $scope.map,
                position: new google.maps.LatLng(25.4291791, -100.9907931),
                content: content
            };

            //infoWindow = new google.maps.InfoWindow(options);
            $scope.map.setCenter(options.position);
        }

        function setMarkers(map, locations) {
            var imageFlag;
            var shape;
            var parada;
            var pos;
            var marker;
            var i;

            imageFlag =
            {
                url: '../images/beachflag.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(20, 32),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            };

            // Shapes define the clickable region of the icon.
            // The type defines an HTML &lt;area&gt; element 'poly' which
            // traces out a polygon as a series of X,Y points. The final
            // coordinate closes the poly by connecting to the first
            // coordinate.
            shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };
            for (i = 0; i < locations.length; i++) {
                parada = locations[i];
                pos = new google.maps.LatLng(parada[1], parada[2]);
                marker = new google.maps.Marker({
                    position: pos,
                    map: $scope.map,
                    icon: imageFlag,
                    shape: shape,
                    title: parada[0],
                    zIndex: parada[3]
                });
            }
        }

        function calcRoute() {
            var directionsDisplay;
            var directionsService;
            var start;
            var end;
            var request;

            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap($scope.map);
            directionsDisplay.setPanel(document.getElementById("directionsPanel"));
            start = document.getElementById("start").value;
            end = document.getElementById("end").value;
            request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
                else {
                    alert("No se pudieron calcular las direcciones. Intenta de nuevo.");
                }
            });
        }

        <!--
        function calcRoute2() {

        var directionsService2 = new google.maps.DirectionsService();
        var directionsDisplay2;
        directionsDisplay2 = new google.maps.DirectionsRenderer();
        directionsDisplay2.setMap(map);
        directionsDisplay2.setPanel(document.getElementById('directions-panel2'));
        var start2 = document.getElementById("start2").value;
        var end2 = document.getElementById("end2").value;
        var request2 = {
        origin : start2,
        destination : end2,
        travelMode : google.maps.TravelMode.WALKING
        };
        directionsService2.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay2.setDirections(response);
        } else {
        alert("No se pudieron calcular las direcciones. Intenta de nuevo.");
        }
        });
        }
        -->
        function calcRoute3() {
            var request;
            request = {
                origin: 'Blvrd. Francisco Coss 1, Zona Centro, 25000 Saltillo,COAH, Mexico',
                destination: 'La Palma SN-S CENTRO DE REHABILITACION EN ADICCIONES, El Potrero, 25372 Arteaga, COAH, Mexico',
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService3.route(request, function someFunction(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay3.setDirections(response);
                }
            });
        }

        function computeTotalDistance(result) {
            var total;
            var myRoute;
            var i;

            total = 0;
            myRoute = result.routes[0];

            for (i = 0; i < myRoute.legs.length; i++) {
                total += myRoute.legs[i].distance.value;
            }

            total = total / 1000.0;
            document.getElementById('total').innerHTML = total + ' km';
        }

        function terrainButton()
        {
            $scope.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        }

        function hybridButton()
        {
            $scope.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }

        function roadMapButton()
        {
            $scope.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }

        function satelliteButton()
        {
            $scope.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        }

        function trafficButton()
        {
            var trafficLayer;
            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap($scope.map);
        }

        function bicycleButton()
        {
            var bicycleLayer;
            bicycleLayer = new google.maps.BicyclingLayer();
            bicycleLayer.setMap($scope.map);
        }

        function transitButton()
        {
            var transitLayer;
            transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap($scope.map);
        }
    }

})();