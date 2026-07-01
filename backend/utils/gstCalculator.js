export const calculateGST = (items) => {
  let subTotal = 0;
  let gstTotal = 0;

  items.forEach((item) => {
    const total = item.quantity * item.price;
    const gst = (total * item.gstRate) / 100;

    subTotal += total;
    gstTotal += gst;
  });

  return {
    subTotal,
    gstTotal,
    grandTotal: subTotal + gstTotal,
  };
};