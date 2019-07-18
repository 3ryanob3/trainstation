$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAeN4Ugc9K2Jdr44YhuL1HE0naqyicvBSA",
        authDomain: "erya-833f6.firebaseapp.com",
        databaseURL: "https://erya-833f6.firebaseio.com",
        projectId: "erya-833f6",
        storageBucket: "erya-833f6.appspot.com",
        messagingSenderId: "843649133939"
    };  
    firebase.initializeApp(config);
   

    var database = firebase.database();

    //  Button for adding Employees
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var firstTime = $("#start-input").val().trim();

        // Grabs user input
        var trainName = $("#train-input").val().trim();
        var trainDes = $("#destination-input").val().trim();
        var trainStart = moment().format(firstTime);
        console.log(trainStart)

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: trainDes,
            start: trainStart,

        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Alert
        // alert("Employee successfully added");

        // Clears all of the text-boxes
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");


        //  Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
        database.ref().on("child_added", function (childSnapshot, prevChildKey) {

            // console.log(childSnapshot.val());

            // Store everything into a variable.
            var trainName = childSnapshot.val().name;
            var trainDes = childSnapshot.val().destination;
            var trainStart = childSnapshot.val().start;



            // var trainStartMoment = moment.unix(trainStart).format("HH:mm");
            var trainStartMoment = moment().format("HH:mm");

            $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + 'empMonths' + "</td><td>" + 'math' + "</td><td>" + 'empBilled' + "</td></tr>");
        });

        var now = moment().format("HH:mm");




