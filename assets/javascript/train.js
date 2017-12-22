   

$( document ).ready(function() {
    updatePage();
});

  // Capture Button Click
    

$(".btn").on("click", function(event) {
  // prevent page from refreshing when form tries to submit itself
  event.preventDefault();

  // Capture user inputs and store them into variables
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var startTime = $("#startTime").val().trim();
  var frequency = $("#frequency").val().trim();




  //console.log(trainName)

  var trains = JSON.parse(localStorage.getItem("trains"));

  if(trains == null){
    trains = [];
  }

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: startTime,
    frequency: frequency
  };

  trains.push(newTrain);

  // Store all content into localStorage
  localStorage.setItem("trains", JSON.stringify(trains));

  $("#trainName").val("");
  $("#destination").val("");
  $("#startTime").val("");
  $("#frequency").val("");
  //refresh the screen
  updatePage();
  });


function updatePage(){
  var trains = JSON.parse(localStorage.getItem("trains"));

  if(trains == null){
    trains = [];
  }

  $("#train-table-body").empty();

  for (var i = 0; i < trains.length; i++) {

    var trainName = trains[i].trainName;
    var trainDestination = trains[i].destination;
    var firstTrain = trains[i].firstTrain;
    var frequency = trains[i].frequency;





    var tFrequency = parseInt(frequency);
    //console.log(firstTrain);
    //console.log(tFrequency);

    // Time is 3:30 AM
    var firstTime = parseInt(firstTrain);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
   // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIMEE: " + moment(nextTrain).format("hh:mm")); 
    nextTrain = moment(nextTrain).format("hh:mm");

    $('#train-table-body').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>"
      + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");    
  }
}