#!/usr/bin/env node

var ROOTDIR = __dirname + '/../';
var manifestPath = ROOTDIR + 'manifest.json';

var fs = require('fs');
var manifest = JSON.parse(fs.readFileSync(manifestPath));

console.assert(Array.isArray(manifest.content_scripts));
console.assert(Array.isArray(manifest.content_scripts[0].matches));

manifest.content_scripts[0].matches = [
  "*://*.youtube.com/*",
  "*://*.youtu.be/*"
];

console.log('Overwriting ' + manifestPath);
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4) + '\n');
