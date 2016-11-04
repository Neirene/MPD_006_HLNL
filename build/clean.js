"use strict";
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, "source");

var files = glob.sync("**/*.@(css|js|d.ts|map|template.ts)", { ignore: "lib/**/*" , cwd: sourceDir });

for (var file of files) {
    fs.unlinkSync(path.join(sourceDir, file));
}