const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Шлях до файлів SCSS
const scssPath = 'scss/style.scss';
const outputCSSPath = 'source/css';
const cssPath = 'source/css/style.css'

// Компіляція SCSS у CSS
function compileSCSS() {
    return src(scssPath, {allowEmpty: true})
        .pipe(sass().on('error', sass.logError)) // Компіляція SCSS
        .pipe(cleanCSS()) // Мінімізація CSS
        .pipe(rename('style.min.css')) // Зміна імені вихідного файлу
        .pipe(dest(outputCSSPath)); // Збереження в папці
}

function minCSS() {
    return src (cssPath)
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(rename('style.min.css'))
        .pipe(dest(outputCSSPath))
}

// Спостереження за змінами у SCSS
function watchSCSS() {
    watch('scss/**/*.scss', compileSCSS); // Відстежує всі файли в папці SCSS
}



// Експорт задач
exports.default = series(compileSCSS, minCSS, watchSCSS, );
