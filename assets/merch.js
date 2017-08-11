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
    var shirtName = event.target.value
    console.log(shirtName);



    // var href = `./purchase.html?shirtid=${shirtName}`

    // page fade out effect
    // $('body').fadeOut(350, function () {
    //   window.location.href = href;
    // })

  })

})()
