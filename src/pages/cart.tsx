import { getCartProducts, removeFromCart } from "~/store";
import { NextPageWithLayout } from "./_app";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "~/types";
import Layout from "~/Layout";

const CartPage: NextPageWithLayout = () => {
	const products = useSelector(getCartProducts);

	const dispatch = useDispatch();
	const remove = (product: Product) => dispatch(removeFromCart(product));

	return (
		<div className="w-full max-w-screen-xl mx-auto p-2 rounded-lg bg-gray-700 space-y-4 my-10">
			{products.length > 0 &&
				products.map((product) => (
					<div key={product.id} className="text-lg">
						{product.name}{" "}
						<button onClick={() => remove(product)} className="p-2 bg-blue-900 rounded-lg">
							Remove
						</button>
					</div>
				))}
		</div>
	);
};

CartPage.getLayout = (page) => <Layout>{page}</Layout>;

export default CartPage;
