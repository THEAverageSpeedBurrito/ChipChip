
(function() {
  var shirts = {
    '1': {
      name: 'The Man',
      img: './assets/shirts/theman.jpg'
    },
    '2': {
      name: 'Priceless Shirt',
      img: './assets/shirts/pricelessshirt.jpg'
    },
    '3': {
      name: '3d heaven',
      img: './assets/shirts/3dheaven.jpg'
    }
  }


  var url = new URL(window.location.href)
  var shirtid = url.searchParams.get('shirtid')

  $('img#thumbnail').attr('src', shirts[shirtid].img)
  // page fade in effect
  $('body').hide().fadeIn(350);


  $('.size-button').on('click', function() {
    $('.size-button').removeClass('active')

    $(event.target).toggleClass('active')
  })

}())
