"use strict";
const sass = require('node-sass');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, "source");

var files = glob.sync("**/*.scss", { cwd: sourceDir, ignore: '**/_*.scss' });
for (var file of files) {
    let filePath = path.join(sourceDir, file);
    sassCompileFile(filePath,
        path.join(path.dirname(filePath),
        `${path.basename(file, path.extname(file))}.css`));
}

function sassCompileFile(source, target) {
    sass.render({
        file: source
    }, function(err, result) {
        if (err) {
            throw Error(`Failed to compile SCSS file (${source}): ${err}`);
        }
        else {
            fs.writeFile(target, result.css, function(err) {
                if (err) {
                    throw Error(`Cannot save file (${target}): ${err}`);
                }
                console.log(`Compiled ${source} -> ${target}`);
            });
        }
    });
}