"use strict";
const minifier = require('html-minifier');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, "source");

if (process.argv.length == 3) {
    let file = process.argv[2];
    let filePath = path.join(currentDir, file);
    htmlToTypescript(filePath,
            path.join(path.dirname(filePath), `${path.basename(file, path.extname(file))}.ts`),
            sourceDir);
} else {
    var files = glob.sync("**/*.@(template|demo.template).html", { cwd: sourceDir });
    for (var file of files) {
        let filePath = path.join(sourceDir, file);
        htmlToTypescript(filePath,
            path.join(path.dirname(filePath), `${path.basename(file, path.extname(file))}.ts`),
            sourceDir);
    }
}

function htmlToTypescript(source, target, baseDir) {
    var html = fs.readFileSync(source, {encoding: 'utf-8'});

    if (!source.toLowerCase().endsWith("-demo.template.html")) {
        html = minifier.minify(html, {
            collapseWhitespace: true,
            conservativeCollapse: true
        });
    }

    var tsHtml = html.replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\"]/g, '\\"');
    var tsPath = path.relative(baseDir, source).replace(/\\/g, '/');
    var commonPath = buildReferencePath(path.dirname(source), "common");
    var ts = `import * as main from "${commonPath}/main";
        main.module.run(["$templateCache", $templateCache => $templateCache.put('${tsPath}', "${tsHtml}")]);`;
    fs.writeFileSync(target, ts);
    console.log(`Converted ${source} -> ${target}`);
}

function buildReferencePath(sourceDir, reference) {
    if (utils.exists(path.join(sourceDir, reference))) {
        return reference;
    } else {
        return '../' + buildReferencePath(path.dirname(sourceDir), reference);
    }
}