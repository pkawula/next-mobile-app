import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "~/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Product | Product[]>,
) {
	const { default: products } = await import("~/db/products.json");

	if (req.method === "GET") {
		const { id } = req.query;

		if (!id || typeof id !== "string") {
			res.status(404).end();
			return;
		}

		const product = products.find((p) => p.id.toString() === (id as string));

		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).end();
		}
	} else {
		res.status(405).end();
	}
}
