
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
      console.log('true');
    }else{
      alert('Please select a size')
    }
  })

}())
