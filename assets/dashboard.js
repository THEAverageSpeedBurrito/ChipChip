(function() {
  console.log('Welcome to the admin dashboard');
  var $lightbox = $('#lightbox-wrapper')

  renderOrders()

  // update shipping information
  $('.addshipping').on('click', (e) => {
    var ordernum = $(event.target).siblings('div.ordernum').text().split(' ')[1];

    $lightbox.fadeIn(300)

    // save order
    $('#save-order').on('click', (event) => {
      var trackingNum = $('#trknum').val()

      if(trackingNum){
        $.ajax({
          type: "POST",
          url: 'http://localhost:5200/api/orders/actions/shipped',
          data: JSON.stringify({
            orderNum: ordernum,
            trackingNum: $('#trknum').val()
          }),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            console.log('Order updated');
            $lightbox.fadeOut(300)
          },
          error: function (error) {
            console.log(error);
          }
        })
      }else{
        alert('Enter a tracking number or else!!!')
      }


      $('#save-order').off('click')
    })

    // exit without saving
    $('#exit').on('click', (event) => {
      $lightbox.fadeOut(300)
      $('#exit').off('click')
    })

  })
}())

function renderOrders() {
  var API_URL = 'http://localhost:5200'

  $.get(API_URL+'/api/orders/all', (orders) => {
    console.log(orders);
    orders.forEach((order) => {
      let orderObject = `<div class="order">
        <div class="order-actions">
          <div class="ordernum">Order#: ${order.randomid}</div>
          <button class="addshipping">Mark as Shipped</button>
        </div>
        <div class="info">
          ${order.firstname} ${order.lastname}<br>
          ${order.address}<br>
          ${order.city} ${order.state}, ${order.zip}<br>
          ${order.email}
        </div>
        <div class="order-items">
          <ul id="${order.randomid}">
          </ul>
        </div>
      </div>`

      $('#orders-container').append(orderObject)

      orderItems = JSON.parse(order.itemlist)
      orderItems.forEach((item) => {
        $(`#${order.randomid}`).append(`<li>${item.name} - ${item.size}</li>`)
      })
    })
  })
}
