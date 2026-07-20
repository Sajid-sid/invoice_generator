import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Create_invoice.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function CreateInvoice() {
  const [company, setCompany] = useState({
  companyName: "",
  gstin: "",
  pan: "",
  phone: "",
  address: "",
  state: "",
  stateCode: "",
  logo: null
});


const [invoiceDetails, setInvoiceDetails] = useState({
  invoiceNo: "",
  invoiceDate: "",
  transportMode: "",
  vehicleNo: "",
  placeOfSupply: "",
  dateOfSupply: "",
  reverseCharge: "No"
});

const [billTo, setBillTo] = useState({
  name: "",
  gstin: "",
  pan: "",
  address: "",
  state: "",
  stateCode: ""
});

const [shipTo, setShipTo] = useState({
  name: "",
  gstin: "",
  pan: "",
  address: "",
  state: "",
  stateCode: ""
});

const [bankDetails, setBankDetails] = useState({
  bankName: "",
  accountNo: "",
  ifsc: "",
  branch: ""
});
const isIntraState =
  company.state.trim().toLowerCase() ===
  billTo.state.trim().toLowerCase();
 const categories = [
  { name: "Mobile Phones", hsn: "8517", gst: 18 },
  { name: "Mobile Chargers", hsn: "8504", gst: 18 },
  { name: "Earphones / Headphones", hsn: "8518", gst: 18 },
  { name: "Laptops & Computers", hsn: "8471", gst: 18 },
  { name: "Computer Accessories", hsn: "8473", gst: 18 },
  { name: "Printers", hsn: "8443", gst: 18 },
  { name: "LED Bulbs", hsn: "8539", gst: 12 },
  { name: "LED TVs", hsn: "8528", gst: 18 },
  { name: "Refrigerators", hsn: "8418", gst: 18 },
  { name: "Washing Machines", hsn: "8450", gst: 18 },
  { name: "Air Conditioners", hsn: "8415", gst: 28 },
  { name: "Fans", hsn: "8414", gst: 18 },
  { name: "Furniture", hsn: "9401", gst: 18 },
  { name: "Office Chairs", hsn: "9401", gst: 18 },
  { name: "Tables & Desks", hsn: "9403", gst: 18 },
  { name: "Apparel / Garments", hsn: "6100", gst: 5 },
  { name: "Footwear", hsn: "6400", gst: 18 },
  { name: "School Uniforms", hsn: "6200", gst: 5 },
  { name: "Artificial Jewellery", hsn: "7117", gst: 3 },
  { name: "Gold Jewellery", hsn: "7113", gst: 3 },
  { name: "Silver Jewellery", hsn: "7113", gst: 3 },
  { name: "Watches", hsn: "9102", gst: 18 },
  { name: "Cosmetics", hsn: "3304", gst: 18 },
  { name: "Perfumes", hsn: "3303", gst: 18 },
  { name: "Hair Oil", hsn: "3305", gst: 18 },
  { name: "Soap", hsn: "3401", gst: 18 },
  { name: "Shampoo", hsn: "3305", gst: 18 },
  { name: "Books (Printed)", hsn: "4901", gst: 0 },
  { name: "Notebooks", hsn: "4820", gst: 12 },
  { name: "Pens & Pencils", hsn: "9608", gst: 18 },
  { name: "Stationery", hsn: "4820", gst: 12 },
  { name: "Toys", hsn: "9503", gst: 12 },
  { name: "Sports Goods", hsn: "9506", gst: 12 },
  { name: "Bicycles", hsn: "8712", gst: 12 },
  { name: "Kitchen Utensils (Steel)", hsn: "7323", gst: 12 },
  { name: "Plastic Household Items", hsn: "3924", gst: 18 },
  { name: "Cookware", hsn: "7615", gst: 18 },
  { name: "Packaged Food", hsn: "2106", gst: 5 },
  { name: "Tea", hsn: "0902", gst: 5 },
  { name: "Coffee", hsn: "0901", gst: 5 },
  { name: "Milk", hsn: "0401", gst: 0 },
  { name: "Bottled Water", hsn: "2201", gst: 18 },
  { name: "Medicines", hsn: "3004", gst: 12 },
  { name: "Medical Equipment", hsn: "9018", gst: 12 },
  { name: "Automobile Parts", hsn: "8708", gst: 28 },
  { name: "Tyres", hsn: "4011", gst: 28 },
  { name: "Paints", hsn: "3208", gst: 18 },
  { name: "Cement", hsn: "2523", gst: 28 },
  { name: "Consulting Services", hsn: "9983", gst: 18 },
  { name: "Software Services", hsn: "9983", gst: 18 },
  { name: "Restaurant Services", hsn: "9963", gst: 5 },
  { name: "Transport Services", hsn: "9965", gst: 5 }
];
  const [customer, setCustomer] = useState({
    
    customerName: "",
    gstin: "",
    address: ""
  });

  const [items, setItems] = useState([
    {
      category: "",
      hsn: "",
      itemName: "",
      quantity: 1,
      price: 0,
      gst: 0
    }
  ]);

  const handleCompanyChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };
  const handleCategoryChange = (index, value) => {
    const selectedCategory = categories.find(
      (cat) => cat.name === value
    );

    const updatedItems = [...items];

    updatedItems[index].category = value;
    updatedItems[index].hsn = selectedCategory?.hsn || "";
    updatedItems[index].gst = selectedCategory?.gst || 0;

    setItems(updatedItems);
  };

  const handleLogoUpload = (e) => {
    if (e.target.files[0]) {
      setCompany({
        ...company,
        logo: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        category: "",
        hsn: "",
        itemName: "",
        quantity: 1,
        price: 0,
        gst: 0
      }
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let gstAmount = 0;

    items.forEach((item) => {
      const amount =
        Number(item.quantity) *
        Number(item.price);

      subtotal += amount;

      gstAmount +=
        amount * (Number(item.gst) / 100);
    });

    return {
      subtotal,
      gstAmount,
      grandTotal: subtotal + gstAmount
    };
  };

  const totals = calculateTotals();
  const checkInvoiceLimit = async () => {

  try {

    const response = await fetch(
      `http://localhost:5000/api/invoices/invoice-limit/${customer.customerId}`
    );

    const data = await response.json();

    console.log("LIMIT RESPONSE:", data);


    if(!data.allowed){

      alert(data.message);

      return false;
    }


    return true;


  } catch(error){

    console.log(error);

    alert("Unable to check invoice limit");

    return false;
  }

};
const saveInvoice = async () => {

  try {

    const token = localStorage.getItem("token");


    const cgstAmount = isIntraState 
      ? totals.gstAmount / 2 
      : 0;

    const sgstAmount = isIntraState 
      ? totals.gstAmount / 2 
      : 0;

    const igstAmount = !isIntraState
      ? totals.gstAmount
      : 0;


    const payload = {

      invoiceNumber: invoiceDetails.invoiceNo,

      CustomerId: customer.customerId,


      // Company details
      companyName: company.companyName,
      companyGST: company.gstin,
      companyAddress: company.address,


      // GST details
      subTotal: totals.subtotal,

      cgst: cgstAmount,

      sgst: sgstAmount,

      igst: igstAmount,

      gstTotal: totals.gstAmount,

      grandTotal: totals.grandTotal,


      items: items.map((item)=>({

        name:item.itemName,

        hsnCode:item.hsn,

        quantity:Number(item.quantity),

        price:Number(item.price),

        gstRate:Number(item.gst)

      }))

    };


    console.log("Sending Invoice Payload:", payload);


    const response = await fetch(
      "http://localhost:5000/api/invoices/create",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(payload)
      }
    );


    const data = await response.json();

    console.log("API RESPONSE:", data);


    if(!response.ok){

      alert(data.message || "Invoice creation failed");

      return false;

    }


    alert("Invoice saved successfully");

    return true;


  } catch(error){

    console.log("SAVE INVOICE ERROR:", error);

    alert("Unable to save invoice");

    return false;

  }

};
const generateInvoice = () => {
  const doc = new jsPDF();

  // Logo
  if (company.logo) {
    doc.addImage(company.logo, "PNG", 10, 10, 25, 25);
  }

  // Company Header
  doc.setFontSize(18);
  doc.text(company.companyName || "COMPANY NAME", 105, 15, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.text(company.address, 105, 22, {
    align: "center",
  });

  doc.text(
    `GSTIN: ${company.gstin}   
     PAN: ${company.pan}`,
    105,
    28,
    { align: "center" }
  );

  doc.line(10, 35, 200, 35);

  // TAX INVOICE TITLE
  doc.setFontSize(14);
  doc.text("TAX INVOICE", 105, 45, {
    align: "center",
  });

  // Invoice Details
  doc.setFontSize(10);

  doc.text(
    `Invoice No : ${invoiceDetails.invoiceNo}`,
    10,
    55
  );

  doc.text(
    `Invoice Date : ${invoiceDetails.invoiceDate}`,
    10,
    62
  );

  doc.text(
    `Transport Mode : ${invoiceDetails.transportMode}`,
    110,
    55
  );

  doc.text(
    `Vehicle No : ${invoiceDetails.vehicleNo}`,
    110,
    62
  );

  doc.text(
    `Place Of Supply : ${invoiceDetails.placeOfSupply}`,
    110,
    69
  );

  doc.line(10, 75, 200, 75);

  // Bill To
  doc.setFontSize(11);
  doc.text("Bill To", 10, 83);

  doc.setFontSize(10);
  doc.text(`Name : ${billTo.name}`, 10, 90);
  doc.text(`GSTIN : ${billTo.gstin}`, 10, 97);
  doc.text(`PAN : ${billTo.pan}`, 10, 104);
  doc.text(`Address : ${billTo.address}`, 10, 111);

  // Ship To
  doc.setFontSize(11);
  doc.text("Ship To", 110, 83);

  doc.setFontSize(10);
  doc.text(`Name : ${shipTo.name}`, 110, 90);
  doc.text(`GSTIN : ${shipTo.gstin}`, 110, 97);
  doc.text(`PAN : ${shipTo.pan}`, 110, 104);
  doc.text(`Address : ${shipTo.address}`, 110, 111);

  // Table Data
const tableData = items.map((item, index) => {
  const amount =
    Number(item.quantity) * Number(item.price);

  const gstAmount =
    amount * (Number(item.gst) / 100);

  if (isIntraState) {
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return [
      index + 1,
      item.category || "-",
      item.itemName || "-",
      item.hsn || "-",
      item.quantity,
      Number(item.price).toFixed(2),
      amount.toFixed(2),
      `${item.gst / 2}%`,
      cgst.toFixed(2),
      `${item.gst / 2}%`,
      sgst.toFixed(2),
    ];
  }

  return [
    index + 1,
    item.category || "-",
    item.itemName || "-",
    item.hsn || "-",
    item.quantity,
    Number(item.price).toFixed(2),
    amount.toFixed(2),
    `${item.gst}%`,
    gstAmount.toFixed(2),
  ];
});

 autoTable(doc, {
  startY: 120,
head: [
  isIntraState
    ? [
        "S.No",
        "Category",
        "Product Name",
        "HSN/SAC",
        "Qty",
        "Rate",
        "Amount",
        "CGST %",
        "CGST Amt",
        "SGST %",
        "SGST Amt",
      ]
    : [
        "S.No",
        "Category",
        "Product Name",
        "HSN/SAC",
        "Qty",
        "Rate",
        "Amount",
        "IGST %",
        "IGST Amt",
      ]
],
  body: tableData,
  theme: "grid",
  styles: {
    fontSize: 7,
    cellPadding: 2,
  },
  headStyles: {
    fillColor: [41, 128, 185],
  },
  columnStyles: {
    0: { cellWidth: 10 }, // S.No
    1: { cellWidth: 25 }, // Category
    2: { cellWidth: 35 }, // Product Name
    3: { cellWidth: 18 }, // HSN
    4: { cellWidth: 12 }, // Qty
    5: { cellWidth: 18 }, // Rate
    6: { cellWidth: 20 }, // Amount
    7: { cellWidth: 15 }, // CGST %
    8: { cellWidth: 20 }, // CGST Amt
    9: { cellWidth: 15 }, // SGST %
    10: { cellWidth: 20 }, // SGST Amt
  },
});

  const finalY = doc.lastAutoTable.finalY + 10;

const cgstTotal = isIntraState
  ? totals.gstAmount / 2
  : 0;

const sgstTotal = isIntraState
  ? totals.gstAmount / 2
  : 0;

const igstTotal = !isIntraState
  ? totals.gstAmount
  : 0;
 // Totals Section
doc.setFontSize(10);

doc.text(
  `Subtotal : Rs. ${totals.subtotal.toFixed(2)}`,
  130,
  finalY
);

if (isIntraState) {
  doc.text(
    `CGST : Rs. ${cgstTotal.toFixed(2)}`,
    130,
    finalY + 8
  );

  doc.text(
    `SGST : Rs. ${sgstTotal.toFixed(2)}`,
    130,
    finalY + 16
  );
} else {
  doc.text(
    `IGST : Rs. ${igstTotal.toFixed(2)}`,
    130,
    finalY + 8
  );
}

doc.setFontSize(12);

doc.text(
  `Grand Total : Rs. ${totals.grandTotal.toFixed(2)}`,
  130,
  finalY + 26
);

// Horizontal Line
doc.line(
  10,
  finalY + 35,
  200,
  finalY + 35
);

// Bank Details Section
doc.setFontSize(11);
doc.text(
  "Bank Details",
  10,
  finalY + 50
);



doc.setFont(undefined, "normal");
doc.setFontSize(10);

const bankY = finalY + 60;

doc.text(
  `Bank Name : ${bankDetails.bankName || "N/A"}`,
  10,
  bankY
);

doc.text(
  `Account No : ${bankDetails.accountNo || "N/A"}`,
  10,
  bankY + 8
);

doc.text(
  `IFSC Code : ${bankDetails.ifsc || "N/A"}`,
  10,
  bankY + 16
);

doc.text(
  `Branch : ${bankDetails.branch || "N/A"}`,
  10,
  bankY + 24
);
// Signature Section
doc.text(
  "Authorized Signatory",
  140,
  finalY + 90
)
console.log(bankDetails);
  doc.save(
    `Invoice-${invoiceDetails.invoiceNo || Date.now()}.pdf`
  );
};

  return (
    <>
      <Navbar />

      <div className="invoice-layout">
        <Sidebar />

        <div className="invoice-content">
          <h1>Create Your GST Invoice in Less than 2 Minutes 
            (Add invoice details, customize & download invoice)</h1>

          <div className="section">
           <div className="section">
  <h2>Company Details</h2>

  <input
    type="text"
    name="companyName"
    placeholder="Company Name"
    value={company.companyName}
    onChange={handleCompanyChange}
  />

  <input
    type="text"
    name="gstin"
    placeholder="GSTIN"
    value={company.gstin}
    onChange={handleCompanyChange}
  />

  <input
    type="text"
    name="pan"
    placeholder="PAN Number"
    value={company.pan}
    onChange={handleCompanyChange}
  />

  <input
    type="text"
    name="phone"
    placeholder="Phone Number"
    value={company.phone}
    onChange={handleCompanyChange}
  />

  <input
    type="text"
    name="state"
    placeholder="State"
    value={company.state}
    onChange={handleCompanyChange}
  />

  <input
    type="text"
    name="stateCode"
    placeholder="State Code"
    value={company.stateCode}
    onChange={handleCompanyChange}
  />

  <textarea
    name="address"
    placeholder="Company Address"
    value={company.address}
    onChange={handleCompanyChange}
  />

  <input
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
  />
</div>
          </div>


          
          
<div className="section">
<input
 type="number"
 placeholder="Customer ID"
 value={customer.customerId}
 onChange={(e)=>
   setCustomer({
     ...customer,
     customerId:e.target.value
   })
 }
/>
  <h2>Invoice Details</h2>

  <input
    type="text"
    placeholder="Invoice Number"
    value={invoiceDetails.invoiceNo}
    onChange={(e) =>
      setInvoiceDetails({
        ...invoiceDetails,
        invoiceNo: e.target.value
      })
    }
  />

  <input
    type="date"
    value={invoiceDetails.invoiceDate}
    onChange={(e) =>
      setInvoiceDetails({
        ...invoiceDetails,
        invoiceDate: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="Transport Mode"
    value={invoiceDetails.transportMode}
    onChange={(e) =>
      setInvoiceDetails({
        ...invoiceDetails,
        transportMode: e.target.value
      })
    }
  />


  <input
    type="text"
    placeholder="Vehicle Number"
    value={invoiceDetails.vehicleNo}
    onChange={(e) =>
      setInvoiceDetails({
        ...invoiceDetails,
        vehicleNo: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="Place Of Supply"
    value={invoiceDetails.placeOfSupply}
    onChange={(e) =>
      setInvoiceDetails({
        ...invoiceDetails,
        placeOfSupply: e.target.value
      })
    }
  />
  <input
  type="date"
  value={invoiceDetails.dateOfSupply}
  onChange={(e) =>
    setInvoiceDetails({
      ...invoiceDetails,
      dateOfSupply: e.target.value
    })
  }
/>

            <button onClick={addItem}>
              Add Item
            </button>

<div className="section">
  <h2>Bill To</h2>

  <input
    type="text"
    placeholder="Customer Name"
    value={billTo.name}
    onChange={(e) =>
      setBillTo({
        ...billTo,
        name: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="GSTIN"
    value={billTo.gstin}
    onChange={(e) =>
      setBillTo({
        ...billTo,
        gstin: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="PAN Number"
    value={billTo.pan}
    onChange={(e) =>
      setBillTo({
        ...billTo,
        pan: e.target.value
      })
    }
  />

  <textarea
    placeholder="Address"
    value={billTo.address}
    onChange={(e) =>
      setBillTo({
        ...billTo,
        address: e.target.value
      })
    }
  />
  <input
  type="text"
  placeholder="State"
  value={billTo.state}
  onChange={(e) =>
    setBillTo({
      ...billTo,
      state: e.target.value
    })
  }
/>
</div>

<div className="section">
  <h2>Ship To</h2>

  <input
    type="text"
    placeholder="Consignee Name"
    value={shipTo.name}
    onChange={(e) =>
      setShipTo({
        ...shipTo,
        name: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="GSTIN"
    value={shipTo.gstin}
    onChange={(e) =>
      setShipTo({
        ...shipTo,
        gstin: e.target.value
      })
    }
  />

  <textarea
    placeholder="Address"
    value={shipTo.address}
    onChange={(e) =>
      setShipTo({
        ...shipTo,
        address: e.target.value
      })
    }
  />
</div>
<div className="section">
  <h2>Bank Details</h2>

 <input
  type="text"
  placeholder="Bank Name"
  value={bankDetails.bankName}
  onChange={(e) =>
    setBankDetails({
      ...bankDetails,
      bankName: e.target.value,
    })
  }
/>

<input
  type="text"
  placeholder="Account Number"
  value={bankDetails.accountNo}
  onChange={(e) =>
    setBankDetails({
      ...bankDetails,
      accountNo: e.target.value,
    })
  }
/>

<input
  type="text"
  placeholder="IFSC Code"
  value={bankDetails.ifsc}
  onChange={(e) =>
    setBankDetails({
      ...bankDetails,
      ifsc: e.target.value,
    })
  }
/>

<input
  type="text"
  placeholder="Branch"
  value={bankDetails.branch}
  onChange={(e) =>
    setBankDetails({
      ...bankDetails,
      branch: e.target.value,
    })
  }
/>
</div>
           <div className="table-wrapper">
  <table className="invoice-table">
             <thead>
<tr>
  <th>S.No</th>
  <th>Product</th>
  <th>HSN/SAC</th>
  <th>Qty</th>
  <th>Rate</th>
  <th>Amount</th>

  {isIntraState ? (
    <>
      <th>CGST %</th>
      <th>CGST Amt</th>
      <th>SGST %</th>
      <th>SGST Amt</th>
    </>
  ) : (
    <>
      <th>IGST %</th>
      <th>IGST Amt</th>
    </>
  )}

  <th>Action</th>
</tr>
</thead>

            <tbody>
  {items.map((item, index) => {
    const amount =
      Number(item.quantity) *
      Number(item.price);

    const cgst =
      amount * (item.gst / 2 / 100);

    const sgst =
      amount * (item.gst / 2 / 100);

    return (
      <tr key={index}>
        <td>{index + 1}</td>
<td>
  <select
    value={item.category}
    onChange={(e) =>
      handleCategoryChange(index, e.target.value)
    }
  >
    <option value="">Select Category</option>

    {categories.map((cat) => (
      <option key={cat.name} value={cat.name}>
        {cat.name}
      </option>
    ))}
  </select>

  <input
    type="text"
    placeholder="Product Name"
    value={item.itemName}
    onChange={(e) =>
      handleItemChange(
        index,
        "itemName",
        e.target.value
      )
    }
  />
</td>

        <td>{item.hsn}</td>

        <td>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(
                index,
                "quantity",
                e.target.value
              )
            }
          />
        </td>

        <td>
          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              handleItemChange(
                index,
                "price",
                e.target.value
              )
            }
          />
        </td>

        <td>{amount.toFixed(2)}</td>

        <td>{item.gst / 2}%</td>

        <td>{cgst.toFixed(2)}</td>

        <td>{item.gst / 2}%</td>

        <td>{sgst.toFixed(2)}</td>

        <td>
          <button
            onClick={() =>
              removeItem(index)
            }
          >
            Remove
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
             </table>
</div>
          </div>

          <div className="section invoice-preview">
            <h2>Invoice Preview</h2>

         <div className="company-header">
  {company.logo && (
    <img
      src={company.logo}
      alt="Company Logo"
      className="company-logo"
    />
  )}

  <div className="company-info">
    <h2>{company.companyName}</h2>
    <p>GSTIN: {company.gstin}</p>
    <p>{company.address}</p>
  </div>
</div>

            <h3>{company.companyName}</h3>
            <p>GSTIN: {company.gstin}</p>
            <p>{company.address}</p>

            <hr />

           <h4>Bill To</h4>

<p>{billTo.name}</p>
<p>GSTIN: {billTo.gstin}</p>
<p>{billTo.address}</p>

<hr />

<h4>Ship To</h4>

<p>{shipTo.name}</p>
<p>GSTIN: {shipTo.gstin}</p>
<p>{shipTo.address}</p>

           
            <hr />

            <h3>
              Subtotal: ₹{totals.subtotal}
            </h3>

            <h3>
              GST: ₹{totals.gstAmount}
            </h3>

            <h2>
              Grand Total: ₹
              {totals.grandTotal}
            </h2>

<button
  className="generate-btn"
  onClick={async()=>{

    const saved = await saveInvoice();

    if(!saved){
      return;
    }

    generateInvoice();

  }}
>
  Generate Invoice PDF
</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;