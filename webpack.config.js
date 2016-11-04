var webpack = require("webpack");
var glob = require("glob");

function expandGlobs(files) {
    var result = [];
    for (var file of files) {
        var resolved = glob.sync(file);
        console.log(`Webpack entries glob: ${file} => ${JSON.stringify(resolved)}`);
        Array.prototype.push.apply(result, resolved);
    }
    return result;
}

module.exports = {
    entry: {
        "dist/bundles/raet-ui": [
            "./dist/main/index.js"
        ],
        "dist/bundles/tests": expandGlobs([
            "./dist/**/*.spec.js"
        ]),
        "dist/demo/bundles/demo": expandGlobs([
            "./dist/demo/main/index.js"
        ])
    },
    output: {
        path: ".",
        filename: "[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "dist/bundles/raet-ui"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
}