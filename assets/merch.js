$('.preview').on('click', function () {
  event.preventDefault();

  var shirtID = $(event.target).parents('div.actions')[0].id;
  var imgSRC = $(event.target).parents('div.merch-item').children('img')[0].src;
  var $lightbox = $('#lightbox-wrapper')
  var $pvImg = $('#lightbox-img')

  // Show lightbox
  $pvImg.attr('src', imgSRC)
  $lightbox.fadeIn(200)
  // Hide lightbox on click
  $lightbox.on('click', function() {
    $lightbox.fadeOut(200)
  })
})

$('.purchase').click(function (e) {
  event.preventDefault();

  var shirtID = $(event.target).parents('div')[0].id;

})
