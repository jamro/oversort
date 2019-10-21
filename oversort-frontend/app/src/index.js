import $ from 'jquery';

$( document ).ready(function() {
  console.log("App ready");
  $('#submit').click(() => {
    let data = $('#inputData').val();
    data = data.split("\n");
    data = JSON.stringify(data);
    $.get('./api/sorted?array=' + data, (response) => {
      response = response.join("\n");
      $('#inputData').val(response);
    })
  })
});
