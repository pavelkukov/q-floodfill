const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
    return {
        mode: 'production',
        entry: {
            'index.bundle': './src/index.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'q-floodfill',
            umdNamedDefine: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)?$/,
                    use: ['babel-loader', 'awesome-typescript-loader'],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    include: /\.bundle\.js$/,
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    terserOptions: {
                        keep_classnames: false,
                        mangle: true,
                        compress: false,
                        keep_fnames: false,
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    }
}
