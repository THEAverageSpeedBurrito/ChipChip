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

      var userInfo = {
        fname: $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val()
      }
      var shippingInfo = {
        address: $('#address').val(),
        apt: $('#apt').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        country: $('#country').val(),
        zip: $('#zip').val()
      }

      console.log(userInfo);
      console.log(shippingInfo);

      console.log('Submitting order');
    }else if(cart.length !== 0){
      $('#order-info').slideDown(400)
      $(event.target).text('submit order')
    }else{
      alert('There are no items in your cart')
    }
  })


  // form active error checking
  checkNum('cvc', 4)
  checkNum('expy', 4)
  checkNum('expm', 2)
  checkNum('cnum', 19)
  checkNum('zip')

  // Error checks for numbers at a specified length
  function checkNum (tag, len) {
    if(!len){len = Infinity}

    $(`#${tag}`).on('input', function () {
      let curText = event.target.value
      let newVal = parseInt(curText[curText.length - 1])
      if(isNaN(newVal) || curText.length > len){
        event.target.value = curText.substring(0, curText.length - 1)
      }
    })
  }


}())
