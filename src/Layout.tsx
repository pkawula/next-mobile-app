import { useSelector } from "react-redux";
import { getCartProducts } from "./store";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const products = useSelector(getCartProducts);

	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-row-reverse items-center p-4 bg-slate-800">
				Items in cart: {products.length}
			</header>
			{children}
		</div>
	);
}
