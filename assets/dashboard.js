(function() {
  console.log('Welcome to the admin dashboard');

  $('.addshipping').on('click', (e) => {
    var ordernum = $(event.target).siblings('div.ordernum').text().split(' ')[1];
    console.log(ordernum);
  })
}())
