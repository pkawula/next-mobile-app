import { useSelector } from "react-redux";
import { getCartProducts } from "./store";
import Link from "next/link";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const products = useSelector(getCartProducts);

	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-row-reverse items-center gap-4 p-4 bg-slate-800">
				Items in cart: {products.length}
				<Link href="/cart">View cart</Link>
				<Link href="/">Home</Link>
			</header>
			{children}
		</div>
	);
}
