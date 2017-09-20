(function() {

  renderMerch()

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


})()

function renderMerch () {
  console.log('Rendering Merch');
  $merchList = $('#merch-list')
  $merchList.empty()

  var API_URL = 'http://localhost:5200'

  $.get(API_URL+'/api/merch', (merch) => {
    merch.forEach((item) => {
      var merchObject = `
      <div class="merch-item">
        <div class="thumbnail"><img src="assets/shirts/${item.imgUrl}.jpg" alt=""></div>
        <div class="title">${item.name}</div>
        <div class="cost">$${item.cost}</div>
      </div>
      `

      $merchList.append(merchObject)
    })

    addListeners()
  })
}

function addListeners() {
  // navigate to purchase page
  $('.thumbnail').on('click', function() {
    var shirtName = $(this).siblings('div.title')[0].textContent

    var href = `./purchase.html?shirt=${shirtName}`

    $('body').fadeOut(350, function () {
      window.location.href = href
    })
  })
}
