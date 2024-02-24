import { getCartProducts, removeFromCart } from "~/store";
import { NextPageWithLayout } from "./_app";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "~/types";
import Layout from "~/Layout";

const CartPage: NextPageWithLayout = () => {
	const products = useSelector(getCartProducts);

	const dispatch = useDispatch();
	const remove = (product: Product & { quantity: number }) => dispatch(removeFromCart(product));

	return (
		<div className="w-full max-w-screen-xl mx-auto p-2 rounded-lg bg-gray-700 space-y-4 my-10 divide-y-2">
			{products.length === 0 && (
				<span className="text-lg p-4 rounded-lg bg-orange-100 text-orange-800 block">
					Cart is empty
				</span>
			)}
			{products.length > 0 &&
				products.map((product) => (
					<div key={product.id} className="text-lg">
						{product.name} <span>QTY: {product.quantity}</span>
						<button onClick={() => remove(product)} className="p-2 bg-blue-900 rounded-lg ml-4">
							Remove
						</button>
					</div>
				))}
		</div>
	);
};

CartPage.getLayout = (page) => <Layout>{page}</Layout>;

export default CartPage;
