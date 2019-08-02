$(document).ready(function () {
    // Initialize Firebase
    
    
    var firebaseConfig = {
        apiKey: "AIzaSyD3VUf8U5hiucMgLk40HBctNKmVYI0RB0M",
        authDomain: "train-d6dca.firebaseapp.com",
        databaseURL: "https://train-d6dca.firebaseio.com",
        projectId: "train-d6dca",
        storageBucket: "",
        messagingSenderId: "637292608712",
        appId: "1:637292608712:web:0209cc4878f76b42"
      }; 
      firebase.initializeApp(firebaseConfig);
    
    
   

    var database = firebase.database();

    //  add train
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        
        // Grabs user input
        var trainName = $("#train-input").val().trim();
        var trainDes = $("#destination-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
        var trainTime = $("#time-input").val().trim();
        
        console.log(trainTime)

        // Creates Object for train data 
        var newTrain = {
            name: trainName,
            destination: trainDes,
            frequency: trainFrequency,
            start: trainTime,

        };

        // Push train data to data base
        database.ref().push(newTrain);

        
        

        // Clears all of the text-boxes
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#time-input").val("");

    });
        //  Create Firebase event 
        database.ref().on("child_added", function (childSnapshot) {

         

            // Store everything into a variable.
            var trainName = childSnapshot.val().name;
            var trainDes = childSnapshot.val().destination;
            var trainFrequency = childSnapshot.val().frequency;
            var trainTime = childSnapshot.val().time;



          // use moment to get tran times  
        var trainTimeConverter = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(trainTimeConverter);
        



        var diffTime = moment().diff(moment(trainTimeConverter), "minutes");
        var timeApart = diffTime % trainFrequency;
        var minutesArrival = trainFrequency - timeApart;
        var timeArrival = moment().add(minutesArrival, "m").form("LT");

        //Create new row
        var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestinantion),
        $("<td>").text(trainFrequency + " min"),
        $("<td>").text(minutesArrival + " min"),
        $("<td>").text(timeArrival)
        
        
        );

        
        //Here append new row to the table
        $("#schedule-table > tbody").append(newRow);

    });
});


    
