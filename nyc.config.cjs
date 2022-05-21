module.exports = {
	include     : ['src/**/*.ts'],
	exclude     : ['**/test/**', '**/*.test.*', 'dist/browser.js'],
	reporter    : ['json'],
	'temp-dir'  : `./tmp/coverage/tmp`,
	'report-dir': `./tmp/coverage/mocha/json`,
}
