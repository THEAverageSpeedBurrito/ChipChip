(function() {
  // TODO: pull cart data from localstorage, populate cart

  // Getting cart object
  var cart = JSON.parse(localStorage.getItem('cart')) || []

  // Render cart
  renderCart(cart)


  function renderCart(cartList) {
    $('#item-list').empty()

    cartList.forEach((item) => {
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

    $('.delete').on('click', function() {
      var index = event.target.getAttribute('value');

      cart.splice(index, 1)
      renderCart(cart)
      localStorage.setItem('cart', JSON.stringify(cart))
    })
  }


}())
