module.exports = {
	include     : ['{src,dist}/**/*.{js,cjs,ts}'],
	exclude     : ['**/test/**', '**/*.test.*', 'dist/browser.js'],
	reporter    : ['lcov'],
	'temp-dir'  : `./tmp/coverage/nyc/tmp`,
	'report-dir': `./tmp/coverage/nyc/lcov`,
}
