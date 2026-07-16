import Invoice from "../models/Invoice.js";

export const checkInvoiceLimit = async (req, res) => {
  try {

    const { customerId } = req.params;

    const invoiceCount = await Invoice.count({
      where: {
        CustomerId: customerId
      }
    });

    if (invoiceCount >= 5) {
      return res.json({
        allowed: false,
        message: "You have reached the limit. Please subscribe to continue."
      });
    }

    return res.json({
      allowed: true,
      count: invoiceCount
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};