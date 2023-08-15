// import
import { followerModel, userModel } from "../../database";

//package
import { Request, Response } from "express";
import { Types } from "mongoose";
import { apiResponse } from "../../common";
const ObjectId = Types.ObjectId
import axios from 'axios';
const appId = process.env.CASHFREE_AppID
const secretKey = process.env.CASHFREE_Secret_Key


function generateOrderID() {
    const prefix = 'order';
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000); // Adjust this as needed
    return `${prefix}_${timestamp}_${random}`;
}


export const cashFreeIntegration = async (req: Request, res: Response) => {
    try {

        const order_id = generateOrderID();

        const url = 'https://sandbox.cashfree.com/pg/orders';

        const headers = {
            'Content-Type': 'application/json',
            'x-api-version': '2022-09-01',
            'x-client-id': appId,
            'x-client-secret': secretKey
        };

        const data = {
            order_id: order_id,
            order_amount: 10.12,
            order_currency: 'INR',
            order_note: 'Additional order info',
            customer_details: {
                customer_id: '12345',
                customer_name: 'name',
                customer_email: 'care@cashfree.com',
                customer_phone: '9816512345'
            }
        };

        axios.post(url, data, { headers })
            .then(response => {
                console.log('Response:', response.data);
                return res.json(new apiResponse(200, 'order created successfully', { response: response.data }, {}))

            })
            .catch(error => {
                console.error('Error:', error);
                return res.send('error')
            });

    } catch (error) {
        console.log(error);
        return res.json(new apiResponse(500, 'Internal Server Error', {}, {}))
    }
}