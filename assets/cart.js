(function() {
  // TODO: pull cart data from localstorage, populate cart

  // Getting cart object
  var cart = JSON.parse(localStorage.getItem('cart')) || []

  // loop through and append a new row
  cart.forEach((item) => {
    let htmlSnippet = `
      <tr>
        <td><img src="${item.image}" alt="shirt img"></td>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>$${item.price}</td>
        <td><img src="assets/icons/trashcan.svg" class="delete" alt="Delete"></td>
      </tr>
    `
    $('#item-list').append(htmlSnippet)
  })


}())
