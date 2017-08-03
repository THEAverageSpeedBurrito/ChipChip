(function() {

  sizeButtons = $('.size-button')
  // console.log(sizeButtons);

  $('.size-button').on('click', function() {
    $('.size-button').removeClass('active')

    $(event.target).toggleClass('active')
  })

}())
