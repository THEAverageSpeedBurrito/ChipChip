(function() {

  // check for existing items in the cart;
  if(!localStorage.getItem('cart')){
    // initializing cart object
    var cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
  }else{
    // cart object exists
    var cart = JSON.parse(localStorage.getItem('cart'))
    $('.item-count').text(cart.length)
  }

  $('.action-blob').on('click', function () {
    $('body').fadeOut(350, function () {
      window.location.href = './cart.html'
    })
  })

  // navigate to purchase page
  $('.thumbnail').on('click', function() {
    var shirtName = $(this).siblings('div.title')[0].textContent

    var href = `./purchase.html?shirt=${shirtName}`

    $('body').fadeOut(350, function () {
      window.location.href = href
    })
  })

})()
