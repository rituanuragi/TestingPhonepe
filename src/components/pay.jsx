import React, { useState } from 'react';
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';
import { withRouter } from 'react-router-dom';

const Pay = () => {
  
    const [data, setData] = useState({});

  
    const handleFormData = (e) => {
        const dd = { ...data, [e.target.name]: e.target.value };
        setData(dd);
    };

    // Function to handle payment submission
    const makePayment = async (e) => {
        e.preventDefault(); 

        const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);
        // const merchantUserId = 'MUID-' + uuidv4().toString(36).slice(-6);

        // Construct payload for payment request
        const payload = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionid,
            merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            amount:  10000, 
            redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
            mobileNumber: '9999999999', // Use entered mobile or default to 9999999999
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        // Convert payload to JSON string
        const dataPayload = JSON.stringify(payload);
        console.log(payload);
        const dataBase64= Buffer.from(dataPayload).toString("base64");
        console.log(dataBase64);
        // Generate checksum
        // const checksum = sha256(dataPayload).toString();
        
        const fullURL =
        dataBase64 + "/pg/v1/pay" + process.env.SALT_KEY;
       const dataSha256 = sha256(fullURL);

      const checksum = dataSha256 + "###" + process.env.SALT_INDEX;
      console.log("c====",checksum);
      };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={makePayment}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value="ritu"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleFormData(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="Mobile"
                            value="9693042535"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Mobile
                        </label>
                        <div className="mt-2">
                            <input
                                id="Mobile"
                                name="mobile"
                                type="text"
                                value="999999999"
                                autoComplete="Mobile"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleFormData(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="Amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Amount
                        </label>
                        <div className="mt-2">
                            <input
                                id="Amount"
                                name="amount"
                                type="text"
                                value="10"
                                autoComplete="Amount"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleFormData(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="MUID"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            MUID
                        </label>
                        <div className="mt-2">
                            <input
                                id="MUID"
                                name="muid"
                                value="nuid-909090"
                                type="text"
                                autoComplete="MUID"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => handleFormData(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                              onClick={(e) => makePayment(e)}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Pay;
