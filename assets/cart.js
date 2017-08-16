(function() {
  // fade in effect
  $('body').hide().fadeIn(350)

  // Getting cart object
  var cart = JSON.parse(localStorage.getItem('cart')) || []
  var totalCost = 0;

  // Render cart
  renderCart(cart)

  function renderCart(cartList) {
    $('#item-list').empty()
    totalCost = 0

    cartList.forEach((item) => {
      totalCost += item.price;

      let htmlSnippet = `
        <tr>
          <td><img src="${item.image}" alt="shirt img"></td>
          <td>${item.name}</td>
          <td>${item.size}</td>
          <td>$${item.price}</td>
          <td><img src="assets/icons/trashcan.svg" class="delete" alt="Delete" value="${cartList.indexOf(item)}"></td>
        </tr>
      `
      $('#item-list').append(htmlSnippet)

    })

    $('#count').text(`${cartList.length} Item(s)`)
    $('#total').text(`$${totalCost}`)

    $('.delete').on('click', function() {
      var index = event.target.getAttribute('value');

      cart.splice(index, 1)
      renderCart(cart)
      localStorage.setItem('cart', JSON.stringify(cart))
    })
  }

  // perform checkout operation
  $('.checkout').on('click', function () {
    if($('#order-info').is(':visible')){
      // TODO: Error checking on provided information
      // TODO: promise for payment completion
    }else{
      $('#order-info').fadeIn(200)
      $(event.target).text('submit order')
    }
  })


}())
