(function() {
  console.log('Welcome to the admin dashboard');

  $('#orders-button, #merch-button').on('click', (event) => {
    console.clear()
    $('#orders, #merch').hide();
    let id = event.target.id.split('-')[0]
    $(`#${id}`).show()
    if(id === 'orders'){
      renderOrders()
    }else if(id === 'merch'){
      renderMerch()
    }
  })

}())

function renderOrders() {
  $('#orders-container').empty()

  var API_URL = 'https://chipchip-server.herokuapp.com'

  $.get(API_URL+'/api/orders/all', (orders) => {
    console.log(orders);
    let actionButtonText = 'Mark as Shipped'
    let inlineStyle = ''

    orders.forEach((order) => {
      if(order.shipped){
        actionButtonText = 'Update Tracking'
        inlineStyle = 'background-color: #1E992E'
      }else {
        actionButtonText = 'Mark as Shipped'
        inlineStyle = ''
      }

      let orderObject = `<div class="order">
        <div class="order-actions">
          <div class="ordernum">Order#: ${order.randomid}</div>
          <button class="addshipping" style="${inlineStyle}">${actionButtonText}</button>
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

    // Add event listeners to appended objects
    addListeners()
  })
}

// render mech in the merch-container
function renderMerch() {
  var $merchContainer = $('#merch-container')
  $merchContainer.empty()

  var API_URL = 'https://chipchip-server.herokuapp.com'

  $.get(API_URL+'/api/merch', (merch) => {
    console.log(merch);
    merch.forEach((item) => {
      var merchObject = `
      <div class="merch-item">
        <div class="thumbnail"><img src="assets/shirts/${item.imgUrl}.jpg" alt="${item.id}"></div>
        <div class="title">${item.name}</div>
        <div class="cost">$${item.cost}</div>
      </div>
      `

      $merchContainer.append(merchObject)
    })

    $('.thumbnail').on('click', function() {
      var shirtName = $(this).siblings('div.title')[0].textContent
      var cost = $(this).siblings('div.cost')[0].textContent.replace('$', '')
      var itemid = $(this).children()[0].alt
      console.log(itemid);
      var image = $(this).children()[0].src

      $('#merch-editor').slideDown(200)
      $('#edit-preview').attr('src', image)
      $('#edit-name').val(shirtName)
      $('#edit-cost').val(cost)

      $('#save-item').on('click', (event) => {

        var API_URL = 'https://chipchip-server.herokuapp.com'

        $.ajax({
          type: "POST",
          url: API_URL + '/api/merch/update',
          data: JSON.stringify({
            itemid: itemid,
            name: $('#edit-name').val(),
            cost: $('#edit-cost').val().replace('$', ' '),
          }),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            console.log(data, shirtName, itemid);
            $('#merch-editor').slideUp(200)
          },
          error: function (error) {
            console.log(error);
            alert('There was an error conencting to the API')
          }
        })
      })
    })
  })
}

// place all listeners here to be added synchronously after orders are rendered
function addListeners() {
  console.log('Adding listeners');

  var $lightbox = $('#lightbox-wrapper')

  // update shipping information
  $('.addshipping').on('click', (e) => {
    var ordernum = $(event.target).siblings('div.ordernum').text().split(' ')[1];

    $lightbox.fadeIn(300)

    // save order
    $('#save-order').on('click', (event) => {
      var trackingNum = $('#trknum').val()
      $('#trknum').val('')

      if(trackingNum){
        $.ajax({
          type: "POST",
          url: 'https://chipchip-server.herokuapp.com/api/orders/actions/shipped',
          data: JSON.stringify({
            orderNum: ordernum,
            trackingNum: trackingNum
          }),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            console.log('Order updated');
            $lightbox.fadeOut(300)
            renderOrders();
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
      $('#trknum').val('')
      $('#exit').off('click')
    })
  })
}
