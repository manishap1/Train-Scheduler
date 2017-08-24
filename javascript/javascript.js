
var config = {
    apiKey: "AIzaSyBM-PWzS2QyyANtY8dpPDhHQVvJpB6XORo",
    authDomain: "train-b8b21.firebaseapp.com",
    databaseURL: "https://train-b8b21.firebaseio.com",
    projectId: "train-b8b21",
    storageBucket: "train-b8b21.appspot.com",
    messagingSenderId: "969803025055"
  };
   if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
 // firebase.initializeApp(config);
  var database = firebase.database();
  

   $("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
   var trainName = $("#trainName").val();
   var destination = $("#destination").val();
   var firstTime = $("#firstTime").val();
   var frequency = $("#frequency").val();

   //var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  
  // Creates local "temporary" object for holding employee data
  var newTrain = {
     trainName: trainName,
     dest : destination,
     time : firstTime,
     frequent : frequency
      

  };
  //upload data to the database
  database.ref().push(newTrain);

  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTime").val("");
  $("#frequency").val("");


  
    });
  


  //firebase event for adding train to the database and a row in the html when user adds an entry
   database.ref().on("child_added", function(childSnapshot,prevChildKey){
   console.log(childSnapshot.val());
   
//storing user input into variables
   var trainName =childSnapshot.val().trainName;
   var destination = childSnapshot.val().dest;
   var firstTime = childSnapshot.val().time;
   var frequency = childSnapshot.val().frequent;
   var nextTrain = childSnapshot.val().nextTrain; 


   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  
  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  $("#trainT").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
   frequency + "</td><td>" + firstTime +"</td><td>"+  tMinutesTillTrain+ "</td></tr>");
},
function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
  });

setInterval(function(){
    location.reload();
  }, 60000)

  

