$(document).ready(function () {
  var $today = $("#today");
  var notes = getNotes();
  var interval = setInterval(setTime, 07);

  updateBackground();
  renderNotes();

  // Displays Current Day "today" in header
  function setTime() {
    var date = moment().format("dddd, MMMM Do YYYY");
    $today.innerHTML = date;
    $("#today").text(date);
  }

  // Saves written data into local storage

  $(".saveBtn").on("click", function (e) {
    e.preventDefault();
    var val = $(this)
    .siblings(".description")
    .val();
    var hour = $(this)
    .siblings(".description")
    .attr("id");
    notes[hour] = val;

    localStorage.setItem("notes", JSON.stringify(notes));
  });

  $(".clear").on("click", function (e) {
    e.preventDefault();
    $(".description").val(" ");
    var notes = {};
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  // Retrieving data from local storage, converting notes to stringify

  function getNotes() {
    var notes = localStorage.getItem("notes");
    if (notes) {
      notes = JSON.parse(notes);
    } else {
      notes = {};
    }
    return notes;
  }

  // looping
  function renderNotes() {
    for (var key in notes) {
      $("#" + key).val(notes[key]);
    }
  }

  //  Past, present, future functions to page
  function updateBackground() {
    var currentHour = moment().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).children(".description").attr("id"));
      $(this)
        // remove classes
        .removeClass("present")
        .removeClass("past")
        .removeClass("future");

      if (blockHour === currentHour) {
        $(this).addClass("present");
      }
      if (blockHour < currentHour) {
        $(this).addClass("past");
      }
      if (blockHour > currentHour) {
        $(this).addClass("future");
      }
    });
  }
});
