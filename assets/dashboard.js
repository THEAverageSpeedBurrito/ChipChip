(function() {
  console.log('Welcome to the admin dashboard');
  var $lightbox = $('#lightbox-wrapper')

  $('.addshipping').on('click', (e) => {
    var ordernum = $(event.target).siblings('div.ordernum').text().split(' ')[1];

    $lightbox.fadeIn(300)

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

    $('#exit').on('click', (event) => {
      $lightbox.fadeOut(300)
      $('#exit').off('click')
    })

  })
}())
