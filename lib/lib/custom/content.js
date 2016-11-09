'use strict';

var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports = '# Introduction\n' + fs.readFileSync('./content/01-introduction.md', 'utf8') + '\n' + '# Users\n' + fs.readFileSync('./content/02-users.md', 'utf8') + '\n' + '# Organization\n' + fs.readFileSync('./content/03-organization.md', 'utf8') + '\n' + '# Project\n' + fs.readFileSync('./content/04-project.md', 'utf8') + '\n' + '# Questionnaires\n' + fs.readFileSync('./content/05-questionnaires.md', 'utf8') + '\n' + '# Records\n' + fs.readFileSync('./content/06-records.md', 'utf8') + '\n' + '# Resources\n' + fs.readFileSync('./content/07-resources.md', 'utf8') + '\n';