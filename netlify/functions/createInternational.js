const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
  region: process.env.AWS_REGION_,
});



const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

exports.handler = async (event) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const token = event.headers.authorization;
    const verified = jwt.verify(token, SECRET_KEY);
    const id = verified.id;
    const [users] = await connection.execute('SELECT * FROM USERS u JOIN USER_DATA ud ON u.uid = ud.uid WHERE u.uid =?', [id]);
    const user = users[0]
    const email = user.email;
    const {iid} = JSON.parse(event.body);
    const [shipments] = await connection.execute('SELECT * FROM INTERNATIONAL_SHIPMENTS WHERE iid = ? ', [iid]);
    const shipment = shipments[0];
    const [dockets] = await connection.execute('SELECT * FROM DOCKETS WHERE iid = ? ', [iid]);
    const [items] = await connection.execute('SELECT * FROM DOCKET_ITEMS WHERE iid = ? ', [iid]);
    const [warehouses] = await connection.execute('SELECT * FROM WAREHOUSES WHERE uid = ? AND wid = ?', [id, shipment.wid]);
    const warehouse = warehouses[0]
    const params = {
      Bucket: process.env.S3_BUCKET_NAME_,
      Key: user.aadhar_doc,
      Expires: 60*60*24*7,
    };

    let total_amount = 0;
    for (let i =0; i < items.length; i++) {
      total_amount += (parseFloat(items[i].rate)*parseFloat(items[i].quantity))
    }
    const downloadURL = await s3.getSignedUrlPromise('getObject', params);
      const req = {
        "tracking_no": `7DXPINT${iid}`,
        "origin_code": "IN",
        "customer_id"  : "181",
        "product_code": "NONDOX",
        "destination_code": shipment.consignee_country,
        "booking_date": shipment.invoice_date,
        "booking_time": shipment.invoice_time,
        "pcs": dockets.length,
        "shipment_value": total_amount,
        "shipment_value_currency": "INR",
        "actual_weight": shipment.actual_weight,
        "shipment_invoice_no": `7DXPINT${iid}`,
        "shipment_invoice_date": shipment.invoice_date,
        "shipment_content": shipment.contents,
        "new_docket_free_form_invoice": "0",
        "free_form_currency": "INR",
        "terms_of_trade": "FOB",
        "api_service_code": shipment.service_code,
        "shipper_name": warehouse.warehouseName,
        "shipper_company_name": user.businessName ,
        "shipper_contact_no": user.phone,
        "shipper_email": user.email,
        "shipper_address_line_1": warehouse.address,
       
        "shipper_city": user.city,
        "shipper_state": user.state,
        "shipper_country": "IN",
        "shipper_zip_code": warehouse.pin,
        "shipper_gstin_type": "Aadhaar Number",
        "shipper_gstin_no": user.aadhar_number,
        "consignee_name": shipment.consignee_name,
        "consignee_company_name": shipment.consignee_company_name,
        "consignee_contact_no": shipment.consignee_contact_no,
        "consignee_email": shipment.consignee_email,
        "consignee_address_line_1": shipment.consignee_address_1,
        "consignee_address_line_2": shipment.consignee_address_2,
        "consignee_address_line_3": shipment.consignee_address_3,
        "consignee_city": shipment.consignee_city,
        "consignee_state": shipment.consignee_state,
        "consignee_country": shipment.consignee_country,
        "consignee_zip_code": shipment.consignee_zip_code,
        "docket_items": [],
        "free_form_line_items": [],
        "kyc_details": [
              {
                "document_type": "Aadhaar Number",
                "document_no": user.aadhar_number,
                "document_name": "aadhaarDoc",
                "file_path": downloadURL
              }
        ],
        "multiple_invoice" : []
    }
     dockets.map((docket, index)=> {
      req.docket_items.push({
        "actual_weight": docket.docket_weight,
        "length": docket.length,
        "width": docket.breadth,
        "height": docket.height,
        "number_of_boxes": "1"
    })
     })
      items.map((item,index)=> {
        req.free_form_line_items.push({
          "total": (parseFloat(item.quantity)*parseFloat(item.rate)),
          "no_of_packages": item.quantity,
          "box_no": item.box_no,
          "rate": item.rate,
          "hscode": item.hscode,
          "description": item.description,
          "unit_of_measurement": item.unit,
          "unit_weight": item.unit_weight,
          "igst_amount": item.igst_amount
      })
      })

    const responseDta = await fetch(`https://online.flightgo.in/docket_api/create_docket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer NjEyMDMzMTJ3ZWxjb21lIHRvIGl0ZHNfMjQ=`
      },
      body : JSON.stringify(req)
    })
    const response = await responseDta.json()
    // if (response.success){
    //   await connection.beginTransaction();
    //   await connection.execute('UPDATE SHIPMENTS set serviceId = ?, categoryId = ?, awb = ? WHERE ord_id = ?', [serviceId, categoryId, response.packages[0].waybill ,order])
    //   await connection.execute('INSERT INTO SHIPMENT_REPORTS VALUES (?,?,?)',[refId,order,"SHIPPED"])
    //   if (shipment.pay_method != "topay"){
    //     await connection.execute('UPDATE WALLET SET balance = balance - ? WHERE uid = ?', [shipment.price, id]);
    //     await connection.execute('INSERT INTO EXPENSES (uid, expense_order, expense_cost) VALUES  (?,?,?)',[id, order, price])
    //   }
    //   await connection.commit();
    // }
    // else{
    //   await connection.execute('INSERT INTO SHIPMENT_REPORTS VALUES (?,?,?)',[refId,order,"FAILED"])
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({ success : false, message : response}),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //   };
    // }
    // let mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email, 
    //   subject: 'Shipment created successfully', 
    //   text: `Dear Merchant, \nYour shipment request for Order id : ${order} is successfully created at Delhivery Courier Service and the corresponding charge is deducted from your wallet.\nRegards,\n7dExpress`
    // };
    // await transporter.sendMail(mailOptions)
    return {
      statusCode: 200,
      body: JSON.stringify({req: req, response : response, success : true, user: user}),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };
    
    
  } catch (error) {
    return {
      statusCode: 504,
      body: JSON.stringify({response : error, success : false}),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };
  }  finally {
    connection.end()
  }
};
