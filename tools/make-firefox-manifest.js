#!/usr/bin/env node

const ROOTDIR = __dirname + '/../';
const manifestPath = ROOTDIR + 'manifest.json';

const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync(manifestPath));

manifest.applications = {
    gecko: {
        id: 'dont-track-me-youtube@fuflo',
    },
};

console.log(JSON.stringify(manifest, null, 4));
