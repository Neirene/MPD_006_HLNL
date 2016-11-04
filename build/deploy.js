"use strict";
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, "source");
const distDir = path.join(currentDir, "dist");

var files = glob.sync("**/*.@(scss|css|js|d.ts)", { cwd: sourceDir });

for (var file of files) {
    deployFile(path.join(sourceDir, file), path.join(distDir, file));
}

deployConfig();
deployIndexHtml();

function deployFile(source, target) {
    utils.ensureDir(path.dirname(target));
    
    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        console.log(`Cannot read file (${source}): ${err}`);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        console.log(`Cannot write file (${target}): ${err}`);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        console.log(`Deployed ${target}`);
    }
}

function deployConfig() {
    let packageJson = fs.readFileSync(path.join(currentDir, 'package.json'), {encoding: 'utf-8'});
    let packageConfig = JSON.parse(packageJson);
    let properties = ["name", "version", "description", "dependencies"];

    deployTargetConfig(packageConfig, "package", properties);
    deployTargetConfig(packageConfig, "bower", properties);
}

function deployTargetConfig(packageConfig, target, properties) {
    let targetJson = fs.readFileSync(path.join(currentDir, `dist_configuration/${target}.json`), {encoding: 'utf-8'});
    let targetConfig = JSON.parse(targetJson);

    applySettings(packageConfig, targetConfig, properties);

    fs.writeFileSync(path.join(distDir, `${target}.json`), JSON.stringify(targetConfig, null, 2),  {encoding: 'utf-8'});
}

function applySettings(fromJson, toJson, properties) {
    for (let property of properties) {
        toJson[property] = fromJson[property];
    }
}

function deployIndexHtml() {
    let html = fs.readFileSync(path.join(currentDir, 'index.html'), {encoding: 'utf-8'});
    html = html.replace(/((\shref|src)\s*=\s*['"]?)dist\//g, '$1').replace(/((\shref|src)\s*=\s*['"]?)node_modules\//g, '$1../');
    fs.writeFileSync(path.join(distDir, 'index.html'), html,  {encoding: 'utf-8'});
}