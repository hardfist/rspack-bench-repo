const { resolve } = require("path");
/** @type {import("webpack").Configuration} */
module.exports = {
	mode: 'production',
	target: ['node'],
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@internal": resolve(__dirname, "src/rome/internal"),
			// rome: resolve(__dirname, "src/rome/internal/virtual-packages/rome"),
		},
	},
	output: {
		hashFunction: "xxhash64",
	},
	optimization: {
		minimize: false,
	},
	experiments: {
		cacheUnaffected: true,
	},
	module: {
		unsafeCache: true,
		parser: {
			javascript: {
				exportsPresence: 'auto'
			}
		},
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'builtin:swc-loader',
					/** @type {import('@rspack/core').SwcLoaderOptions} */
					options: {
						jsc: {
							target: 'es2015',
							parser: {
								syntax: 'typescript',
								tsx: true,
							},
							transform: {
								react: {
									runtime: 'automatic',
									development: false,
									refresh: false,
								},
							},
						},
					}
				}
			},
		],
	},
};
if (require("webpack").version.startsWith("5")) {
	module.exports.ignoreWarnings = [
		{
			message: /export.+was not found|only default export is available soon/,
		},
	];
}