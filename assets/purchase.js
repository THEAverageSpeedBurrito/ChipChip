
(function() {
  var shirts = {
    'The Man': {
      img: './assets/shirts/theman.jpg'
    },
    'Priceless Shirt': {
      img: './assets/shirts/pricelessshirt.jpg'
    },
    '3d Heaven': {
      img: './assets/shirts/3dheaven.jpg'
    }
  }

  // Get or establish cart
  var cart = JSON.parse(localStorage.getItem('cart')) || []
  localStorage.setItem('cart', JSON.stringify(cart))
  $('.item-count').text(cart.length)

  // parse url params
  var url = new URL(window.location.href)
  var shirt = url.searchParams.get('shirt')
  console.log(shirt);

  // set proper shirt image
  $('img#thumbnail').attr('src', shirts[shirt].img)
  // page fade in effect
  $('body').hide().fadeIn(350);

  // select size
  $('.size-button').on('click', function() {
    $('.size-button').removeClass('active')
    $(event.target).toggleClass('active')
  })

  // add to cart
  $('.addcart').on('click', function () {
    if($('.active').length > 0){
      var size = $('.size-button.active').text();

      var newItem = {
        name: shirt,
        size: size
      }
      addToCart(newItem)

    }else{
      alert('Please select a size')
    }
  })



  function addToCart(item) {
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    $('.item-count').text(cart.length)
  }
}())
