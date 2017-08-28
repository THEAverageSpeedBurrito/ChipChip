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

    // insert elements for each item in cart
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

    // update general info about cart
    $('#count').text(`${cartList.length} Item(s)`)
    $('#total').text(`$${totalCost}`)

    // delete functionality
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
      var paymentInfo = {
        cnum: $('#cnum').val(),
        cvc: $('#cvc').val(),
        expm: $('#expm').val(),
        expy: $('#expy').val()
      }

      // perform final error checking
      if(!checkInput(userInfo, ['fname', 'lname', 'email'])){
        alert('Some personal information is missing or incorrect')
        return
      }
      if(!checkInput(shippingInfo, ['address', 'city', 'state', 'country', 'zip'])){
        alert('Some shipping information is missing or incorrect')
        return
      }
      if(!checkInput(paymentInfo, ['cnum', 'cvc', 'expm', 'expy'])){
        alert('Some payment information is missing or incorrect')
        return
      }

      // Fade in loading disk
      $('.checkout, #order-info').slideUp(300, function() {
        $('#loading-disk').show()
      });

      // TODO: Encode Credit card info and add some funky stuff ;)
      var orderObject = {
        cnum: paymentInfo.cnum,
        expm: paymentInfo.expm,
        expy: paymentInfo.expy,
        cvc: paymentInfo.cvc,
        userInfo: userInfo,
        shippingInfo: shippingInfo,
        itemlist: JSON.stringify(cart),
        cost: totalCost
      }


      // Make payment request
      var API_URL = 'http://localhost:5200/api/payment/submit'
      $.ajax({
        type: "POST",
        url: API_URL,
        data: JSON.stringify(orderObject),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          console.log("Payment Successful", data);
          $('#loading-disk').hide()
        },
        error: function (error) {
          console.log(error);
          alert('There was an error with your payment information. Please confirm and try again')
          $('#loading-disk').hide()
          $('.checkout, #order-info').slideDown(300);
        }
      })


    }else if(cart.length !== 0){
      // if cart is valid
      $('#order-info').slideDown(400)
      // change button text and purpose
      $(event.target).text('submit order')
    }else{
      // if cart is invalid
      alert('There are no items in your cart')
    }
  })


  // form active error checking
  checkNum('cvc', 4)
  checkNum('expy', 2)
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

  // Checks to see that all required information is present
  function checkInput (object, keys) {
    for(let i = 0; i < keys.length; i++) {
      if(object[keys[i]] === ''){
        console.log('invalid');
        return false
      }
    }
    return true
  }


}())
