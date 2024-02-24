import { useRouter } from "next/router";
import { addToCart, useGetProductQuery } from "~/store";
import { NextPageWithLayout } from "../_app";
import Layout from "~/Layout";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const ProductPage: NextPageWithLayout = () => {
	const {
		query: { id },
	} = useRouter();
	const { isLoading, isError, data } = useGetProductQuery(id as string);

	const dispatch = useDispatch();

	const addToCartAction = useCallback(() => dispatch(addToCart(data!)), [dispatch, data]);

	return (
		<div className="w-full bg-slate-600 p-2 max-w-screen-xl mx-auto">
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error :</p>}
			{data && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_1fr_1fr] gap-4">
					<div className="w-[320px] h-[400px] overflow-hidden">
						<img
							src={data.picture}
							alt={data.name}
							width={320}
							height={400}
							className="aspect-[3/4]"
						/>
					</div>
					<h1>{data.name}</h1>
					<div>
						<h2>Buy now</h2>
						<p>Price: ${data.price}</p>
						<button className="bg-red-600 hover:bg-red-700 py-2 px-4" onClick={addToCartAction}>
							Buy now
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

ProductPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ProductPage;
