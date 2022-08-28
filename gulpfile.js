const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
// npx autoprefixer --info - перевірити, які браузери вибрано та які властивості будуть префіксовані
// browserslist in package.json
const autoprefixer = require('gulp-autoprefixer'); 
const cleanCSS = require('gulp-clean-css'); 
const imagemin = require('gulp-imagemin'); // для require потрібна версія нижче 8
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
            notify: false
        }
    });
}

function styles() {
    return src(
        [
            'app/src/scss/index.scss',
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css')) 
        .pipe(autoprefixer({ 
            // overrideBrowserslist: ['last 5 versions'], // added browserslist in package.json
            flexbox: true,
            grid: true,

        }))
        .pipe(cleanCSS({specialComments: 0}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/dist/css')) 
        .pipe(browserSync.stream())
    }

function scripts() {
    return src([
        'app/src/js/index.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js')) 
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('app/dist/js/'))
    .pipe(browserSync.stream())
}

function images() {
	return src('app/src/img/**/*') 
        .pipe(changed('app/dist/img'))
		.pipe(imagemin()) 
		.pipe(dest('app/dist/img'))
		.pipe(browserSync.stream())
}

function startWatch() {
    watch(['app/src/**/*.js', '!app/src/**/*.min.js', '!app/src/**/*.js'], scripts)
    watch(['app/src/**/*.scss'], styles)
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts; 
exports.images = images; 

exports.default = parallel(styles, images, scripts, browsersync, startWatch);