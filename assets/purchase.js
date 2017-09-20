
(function() {

  // Get or establish cart
  var cart = JSON.parse(localStorage.getItem('cart')) || []
  localStorage.setItem('cart', JSON.stringify(cart))
  $('.item-count').text(cart.length)

  // parse url params
  var url = new URL(window.location.href)
  var shirt = url.searchParams.get('shirt')
  console.log(shirt);

  // set proper shirt image

  var API_URL = 'http://localhost:5200'
  var shirtData

  $.get(API_URL + `/api/merch/${shirt}`, (response) => {
    shirtData = response[0]
    $('img#thumbnail').attr('src', `./assets/shirts/${response[0].imgUrl}.jpg`)
  })

  // select size
  $('.size-button').on('click', function() {
    $('.size-button').removeClass('active')
    $(event.target).toggleClass('active')
  })

  // add to cart
  $('.addcart').on('click', function () {
    if($('.active').length > 0){
      var size = $('.size-button.active').text();

      shirtData['size'] = size

      addToCart(shirtData)
      $('.size-button').removeClass('active')
    }else{
      alert('Please select a size')
    }
  })

  $('.action-blob').on('click', function () {
    $('body').fadeOut(350, function () {
      window.location.href = './cart.html'
    })
  })



  function addToCart(item) {
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    $('.item-count').text(cart.length)
  }
}())
