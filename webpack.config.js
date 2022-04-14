module.exports = {
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // the order of `use` is important!
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            }
        ]
    }
}
