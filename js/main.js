/** General Assembly Javascript Circuit July 2018 - Sabina Kayne **/

var n = 1;

$(function() {
    $("#datepicker").datepicker();
});

$('.action-button').on('click', function () {
	event.preventDefault();
	var reservationData = {};

	if (!isValidData()) {
		return;
	}
	reservationData.name = $('#reservation-name').val();
	reservationData.day = $('#datepicker').val();
	  
	saveReservations (n, reservationData);
	n++;
	clearInputData ();
});

$('.clear-button').on('click', function () {
	event.preventDefault();
	clearInputData ();
});

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
/*
create the initMap() function to be called when the Google Maps script has finished loading.  
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

initMap();

function saveReservations (n, reservationData) {
    /*
    create the context object,
    get the html from the Handlebars template, 	
    compile the template, and then append the newly reservations to the table .reservations:
    */
    var context = {
        reservationId: n,
        name: reservationData.name,// = $('#reservation-name').val();
		day: reservationData.day// = $('#datepicker').val();
    };
   	var source = $('#existing-reservation-template').html();
   	var template = Handlebars.compile(source);
    var reservationListItem = template(context);
      
    $('.existing-reservation').append(reservationListItem);
}
