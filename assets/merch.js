(function() {
  var $actionBar = $('#action-bar')
  var $itemCount = $('#item-count')

  // check for existing items in the cart;
  if(!localStorage.getItem('cart')){
    // initializing cart object
    var cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
  }else{
    // cart object exists
    var cart = JSON.parse(localStorage.getItem('cart'))
    $itemCount.text = cart.length
  }

  $('.thumbnail').on('click', function() {
    var shirtName = $(this).siblings('div.title')[0].textContent

    var href = `./purchase.html?shirt=${shirtName}`

    $('body').fadeOut(350, function () {
      window.location.href = href
    })
  })

})()
