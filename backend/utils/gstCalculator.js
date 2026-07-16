export const calculateGST = (items) => {

  let subTotal = 0;
  let gstTotal = 0;


  items.forEach((item) => {

    const quantity = Number(item.quantity);
    const price = Number(item.price);
    const gstRate = Number(item.gstRate);


    const itemTotal = quantity * price;


    subTotal += itemTotal;


    const gstAmount =
      (itemTotal * gstRate) / 100;


    gstTotal += gstAmount;


  });


  const grandTotal =
    subTotal + gstTotal;


  return {
    subTotal,
    gstTotal,
    grandTotal
  };
};