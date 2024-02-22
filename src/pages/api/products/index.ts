import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "~/types";


export default async function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
    const { default: products } = await import("~/db/products.json")

    if (req.method === 'GET') {
        res.status(200).json(products);
    } else {
        res.status(405).end();
    }
}