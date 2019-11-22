$(() => {
  let id = location.search.substring(4);
  /* phoneData.forEach(e => {
        if(e.pID == id){

        }
    }) */
  let target = phoneData.find(e => {
    return e.pID == id;
  });
  $(".summary-price dd em").text(`${target.price}`);
});
