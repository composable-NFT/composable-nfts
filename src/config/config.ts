import {
	getDefaultConfig,
	Chain,
} from '@rainbow-me/rainbowkit';

const Morph = {
	id: 2710,
	name: 'Morph Testnet',
	iconBackground: '#fff',
	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://rpc-testnet.morphl2.io'] },
	},
	blockExplorers: {
		default: { name: 'MorphExplorer', url: 'https://explorer-testnet.morphl2.io' },
	},
} as const satisfies Chain;
export const config = getDefaultConfig({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains: [Morph],
});