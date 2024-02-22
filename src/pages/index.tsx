import { Inter } from "next/font/google";
import { addToCart, useGetProductsQuery } from "~/store";
import Link from "next/link";
import Layout from "~/Layout";
import { NextPageWithLayout } from "./_app";
import { useDispatch } from "react-redux";
import { Product } from "~/types";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = ()=> {
  const { data, isLoading, isError } = useGetProductsQuery();

  const dispatch = useDispatch();

  const add = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart(product));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {isLoading && <p>Loading products...</p>}
      {isError && <p>Error loading products...</p>}
      {data?.length === 0 && <p>No products found...</p>}
      {data && data.length > 0 && <div className="flex gap-4 flex-wrap max-w-screen-xl mx-auto my-4 px-2">
        {data.map(({ id, name, picture, price}) => <Link href={`/product/${id}`} key={id} className="flex flex-col gap-1 rounded-md max-w-[320px]">
          <div className="rounded-md aspect-[3/4] object-cover">
            <img src={picture} alt={name} width={320} height={400} className="aspect-[3/4]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">Price: ${price}</p>
          <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => add(e, {id, name, picture, price})}>
                Buy now
              </button>
          </div>

        </Link>)}
        </div>}
    </main>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;