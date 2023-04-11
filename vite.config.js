import { defineConfig } from 'vite'
import path from 'path'
import pkg from './package.json';
import svgLoader from 'vite-svg-loader'

const name = pkg.pluginName;
const pluginName = name.charAt(0).toUpperCase() + name.slice(1);
const commondData = {
	_PLUGIN_NAME_: `"${ pluginName }"`
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ svgLoader ],
	define: commondData,
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/main.js'),
			name: pluginName,
			fileName: (format) => `plugin.${format}.js`
		}
	},
	server: {
		open: '/dev/index.html',
	},
});