var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

 var onSuccess = function(position) {
   localStorage.setItem('lat', position.coords.latitude.toString()); // Pass a key name and its value to add or update that key.
   localStorage.setItem('long', position.coords.longitude.toString());
   var divTarget = document.getElementById('mylocation');
     divTarget.innerHTML =  position.coords.latitude + " " + position.coords.longitude;
 };

 // onError Callback receives a PositionError object
 //
 function onError(error) {
     alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
 }

 navigator.geolocation.getCurrentPosition(onSuccess, onError);
