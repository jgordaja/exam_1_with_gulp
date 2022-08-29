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
// const critical = require('generate'); // critical css

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
            notify: false
        }
    });
}

function styles() {
    return src([
        'app/src/lazyframe/lazyframe.css',
        'app/src/scss/index.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css')) 
        .pipe(autoprefixer({ 
            // overrideBrowserslist: ['last 5 versions'], // added browserslist in package.json
            // станні 5 версій УСІХ браузерів (and dead), якими користуються більше 0.5% користувачів
            flexbox: true,
            grid: true, 
        }))
        .pipe(cleanCSS({specialComments: 0}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/dist/css')) 
        .pipe(browserSync.stream())
} 

// сгенерувала критичні стилі окремо, потім скопіювала і вставила їх в <head>
function criticalStyles() {
    return src(['app/src/scss/critical.scss'])
        .pipe(sass().on('error', sass.logError)) 
        .pipe(autoprefixer({ 
            flexbox: true,
            grid: true, 
        }))
        .pipe(cleanCSS({specialComments: 0})) 
        .pipe(dest('app/dist/css')) 
}    

// спробувала, не сподобалось
// gulp critical
// critical.generate({
//     inline: true,
//     base: 'app/',
//     src: 'index.html',
//     css: ['dist/scss/index.scss'], 
//     target: {
//         html: 'index-critical.html',
//         css: 'dist/css/critical.css',
//         },
//     width: 1300,
//     height: 900,
// }); 

function scripts() {
    return src([ 
        'app/src/lazyframe/lazyframe.min.js',
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
    watch(['app/src/**/*.js', '!app/dist/**/*.min.js', '!app/dist/**/*.js'], scripts)
    watch(['app/src/**/*.scss'], styles)
}

exports.browsersync = browsersync; 
exports.criticalStyles = criticalStyles;
exports.styles = styles;
exports.scripts = scripts; 
exports.images = images; 

exports.default = parallel(criticalStyles, styles, images, scripts, browsersync, startWatch);