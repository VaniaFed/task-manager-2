'use strict';

const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const sync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');

function html() {
	return src('src/**.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
		}))
		.pipe(dest('dist'));
}

function scss() {
	return src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(csso())
		.pipe(concat('main.css'))
		.pipe(dest('dist'));
}

function js() {
	return src('src/*.js')
		.pipe(dest('dist'));
}

function img() {
	return src('src/img**/**')
		.pipe(imageMin())
		.pipe(dest('dist'));
}

function svg() {
	return src('src/icons**/**')
		.pipe(imageMin())
		.pipe(dest('dist'));
}

function clear() {
	return del('dist');
}

function serve() {
	sync.init({
		server: './dist',
	});

	watch('src/**.html', series(html)).on('change', sync.reload);
	watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload);
	watch('src/**.js', series(js)).on('change', sync.reload);
}

exports.build = series(clear, scss, js, html, img, svg);
exports.serve = series(clear, scss, js, html, img, svg, serve);
exports.clear = clear;
