"use strict";
const fs = require('fs');
const path = require('path');

var utils = {
    exists: function(file) {
        var fileExists;
        try {
            fileExists = fs.statSync(file);
        }
        catch (err) {
            fileExists = false;
        }
        return fileExists;
    },

    ensureDir: function(dir) {
        if (!utils.exists(dir)) {
            utils.ensureDir(path.dirname(dir));
            fs.mkdirSync(dir);
        }
    }
}

module.exports = utils;