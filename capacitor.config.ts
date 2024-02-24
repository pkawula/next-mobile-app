import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.example.app",
	appName: "next-mobile-app",
	webDir: "out",
	bundledWebRuntime: false,
	server: {
		androidScheme: "https",
		url: "192.168.1.100:3000",
		cleartext: true,
	},
};

export default config;
