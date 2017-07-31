$('.preview').click(function (e) {
  event.preventDefault();

  var shirtID = $(event.target).parents('div.actions')[0].id;

  var imgURL = $(event.target).parents('div.merch-item').children('img')[0].src;
  console.log(imgURL);

})

$('.purchase').click(function (e) {
  event.preventDefault();

  var shirtID = $(event.target).parents('div')[0].id;

})
