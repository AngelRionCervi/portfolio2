const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/bundle.js",
    },
    devServer: {
        port: 8088,
        contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
