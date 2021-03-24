// Query function to implement card filtering based on selected category from dropdown
$(document).ready(function() {
  $('.list').click(function() {
    const value = $(this).attr('data-filter');
    if (value == 'all') {
      $('.itemBox').show('1000');
    } else {
      $('.itemBox').not('.' + value).hide('1000');
      $('.itemBox').filter('.' + value).show('1000');
      var size = "Upcoming Trainings (" + $('.itemBox').filter('.' + value).length + ")";
      document.getElementById("card-size").innerHTML = size;
    }
  })

  // Query function to make selected category active in dropdown
  $('.list').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  })
})

// Query fucntion to parse JSON data and display into cards
$(document).ready(function() {
  $.getJSON("sample.json", function(data) {
    var out = "";
    var size = "Upcoming Trainings (" + data.length + ")";
    $.each(data, function(key, value) {
      document.getElementById("card-size").innerHTML = size;
      var category = value.category;
      var output = category.split(" ").join("");
      out += '<div class="col-lg-4 d-flex border-0 align-items-stretch mb-5">';
      out += '<div class="card m-auto h-100 border-0 itemBox ' + output + ' cardData" style="width: 18rem;">';
      out += '<img src="Images/image' + key + '.jpg" alt="snb_logo" style="width: 18rem; height: 10rem;">';
      out += '<div class="card-body border-0">';
      out += '<h6 style="margin-top: 10px; margin-left: 0;">' + value.trainingName + '</h6>';
      out += '<p>' + value.trainer + '</p>';
      out += '<p><i class="far fa-clock"></i>' + " " + value.trainingDate + '</p>';
      out += '<p>' + value.trainingDescription + '</p>';
      out += '</div>';
      out += '<div class="d-flex mx-3 mb-2 justify-content-between"> <button type="button" class="btn btn-cards btn-success btn-sm" onclick="enrollBtn(' + key + ')" id="enrollbtn' + key + '" >Enroll</button>';
      out += '<button type="button" class="justify-content-end btn btn-cards btn_card btn-sm" onclick="openDetails(' + key + ')" data-toggle="modal" data-target="#detailModal">View Details</button> </div>';
      out += '</div>';
      out += '</div>';
    });
    $('#cardData').append(out);
  }).fail(function() {
    console.log("Error Occurred.");
  });
});

// Function to make enroll button disable after clicking on it
function enrollBtn(key) {
  $("#enrollModal").modal();
  if (key == 0) {
    $('#enrollbtn0').prop('disabled', true);
  } else if (key == 1) {
    $('#enrollbtn1').prop('disabled', true);
  } else if (key == 2) {
    $('#enrollbtn2').prop('disabled', true);
  }
}

// Function to display modal details from the selected key
function openDetails(key) {
  $.getJSON("sample.json", function(data) {
    for (var i = 0; i < 3; i++) {
      if (i == key) {
        document.getElementById("trainingHeading").innerHTML = data[i].trainingName;

        var trainingDesc = "<b>Description - </b>" + data[i].trainingDescription
        document.getElementById("trainingDescription").innerHTML = trainingDesc;

        var trainingDur = "<b>Training Duration - </b>" + data[i].trainingDate
        document.getElementById("trainingDuration").innerHTML = trainingDur;

        var assessDate = "<b>Assessment Date - </b>" + data[i].assessmentDate;
        document.getElementById("assessmentDate").innerHTML = assessDate;

        var cost = "<b>Description - </b>" + data[i].cost
        document.getElementById("cost").innerHTML = cost;
        $('#tableData').empty();
        var out1 = "";
        $.each(data[i].sessionDetails, function(key1, value1) {
          out1 += '<tr>'
          out1 += '<td>' + value1.sessionName + '</td>'
          out1 += '<td>' + value1.sessionDate + '</td>'
          out1 += '<td>' + value1.sessionTime + '</td>'
          out1 += '</tr>'
        });
        $('#tableData').append(out1);
      }
    }
  });
}
