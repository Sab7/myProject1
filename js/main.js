/** General Assembly Javascript Circuit July 2018 - Sabina Kayne **/

var a = 1;
var easingOption= "easeInOutQuad"; 

/*- Initialize Firebase ---------------------------------*/
var config = {
	apiKey: "AIzaSyB5SJuryx37t0tXSaX--SIsvxuAJ_-7euQ",
	authDomain: "restaurant-site-10786.firebaseapp.com",
	databaseURL: "https://restaurant-site-10786.firebaseio.com",
	projectId: "restaurant-site-10786",
	storageBucket: "restaurant-site-10786.appspot.com",
	messagingSenderId: "1083210863884"
};
firebase.initializeApp(config);

// create reservationData object which will be populated with user input
var database = firebase.database();
var reservationData = {}; 
/*-------------------------------------------------------*/

$(function() {
    $("#datepicker").datepicker();

    $("#to_reservations").click(function() {
		event.preventDefault();
		scrollToSection ("#section-reservations");	
    });

    $("#to_map").click(function() {
		event.preventDefault();
		scrollToSection ("#section-map");		
    });

	getReservations() ;

	$('.action-button').on('click', function () {
		event.preventDefault();
		var reservationData = {};

		if (!isValidData()) {
			return;
		}
		reservationData.name = $('#reservation-name').val();
		reservationData.day = $('#datepicker').val();
		  
		saveReservations (reservationData);
  		database.ref('reservations').push(reservationData);

		getReservations() ;

		clearInputData ();
	});

	$('.clear-button').on('click', function () {
		event.preventDefault();
		clearInputData ();
	});

	initMap();
});

/*-------------------------------------------------------*/
function isValidData() {
	$('.error-msg').text("");
	if($.trim($('#reservation-name').val()) == '') {
		$('.error-msg').text("Please enter your name");
		$('#reservation-name').focus();
		return false;
	}
	
	if($.trim($('#datepicker').val()) == '') {
		$('.error-msg').text("Please select a day");
		$('#datepicker').focus();
		return false;
	}
	return true;
}

function clearInputData (){
	$('#reservation-name').val('');
	$('#datepicker').val('');
}

/* create the initMap() function to be called when the Google Maps script has finished loading.  
add a map with the following latitude and longitude: lat: 40.8054491, lng: -73.9654415 
*/
function initMap() {
	if(!window.google) {
        $("#map").text("Google Maps didn't load");
        return;
    } 

  	var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 40.8054491, lng: -73.9654415},
	    zoom: 10,
	    zoomControl: true,
	    scrollwheel: false,
	    fullscreenControl: true
  	});

  	var marker = new google.maps.Marker({
       	position: {lat: 40.8054491, lng: -73.9654415},
        map: map,
        title: 'Monks Cafe'
	});
}

/* create the context object, 
get the html from the Handlebars template, 
compile the template, 
and then append the newly reservations to the table .reservations
*/

function saveReservations (reservationData) {
    var context = {
        name: reservationData.name, 
		day: reservationData.day 
    };
}

function scrollToSection (idName) {
	var offset1 =  $(idName).offset().top-calcScrollHeight();
	$('html, body').animate({scrollTop: offset1},{duration: 1500, easing: easingOption});	
}

function calcScrollHeight () {
	var h1 = 0;
	var h = $("header").height();
	var w = $("header").width();
	
	if (w < 1000) {
		h1 = 10;
	}
	h += 50; // section header
	return h+h1;
}

function getReservations () {
	database.ref ('reservations').on('value', function (results) {
	    var allReservations = results.val();
	    $('.existing-reservation').empty();

	    for (var n in allReservations) {
	    	var context = {
		        name: allReservations[n].name,
		        day: allReservations[n].day,
		        reservationId: n
	      	};
	    
	    	var source = $('#existing-reservation-template').html();
   			var template = Handlebars.compile(source);
    		var reservationListItem = template(context);
      
    		$('.existing-reservation').append(reservationListItem);
	    }
	});
}

