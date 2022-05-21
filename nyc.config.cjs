module.exports = {
	include     : ['{src,dist/node}/**/*.{js,cjs,ts}'],
	exclude     : ['**/test/**', '**/*.test.*', 'dist/browser.js'],
	reporter    : ['json'],
	'temp-dir'  : `./tmp/coverage/tmp`,
	'report-dir': `./tmp/coverage/mocha/json`,
}
