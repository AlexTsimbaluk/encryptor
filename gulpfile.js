
var gulp = require('gulp'),
	babel = require("gulp-babel"),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	browserSync = require('browser-sync')
;

gulp.task('browser-sync', function() {
	'use strict';
	browserSync({
		server: {
			baseDir: 'src'
		},
		port: 	9999,
		notify: false,
		ghostMode: false
	});
});

gulp.task('less', function() {
	'use strict';
	return gulp.src('src/less/main.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/css/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('utils', function() {
	'use strict';
	return gulp.src('src/libs/utils/layout.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/libs/utils/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('_bootstrap-material', function() {
	'use strict';
	return gulp.src('src/libs/bootstrap-material-design-master/less/bootstrap-material-design.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/libs/libs/bootstrap-material-design-master/dist/css'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	'use strict';
	return gulp.src([
				'src/js/encryptor.js'
			])
			.pipe(babel())
			.pipe(concat('app.js'))
			.pipe(gulp.dest('src/js'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function() {
	'use strict';
	return gulp.src('src/js/app.js')
			.pipe(rename('app.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('src/js'));
});

gulp.task('watch', ['browser-sync'], function() {
	'use strict';
	gulp.watch('src/*.html', browserSync.reload);

    gulp.watch(
    	[
    		'src/js/encryptor.js'
    	],
    	// ['js', 'js-min']
    	['js']
	);
	
	gulp.watch([
			'src/less/*.less',
			'src/libs/bootstrap-material-design-master/less/*.less'
		], ['less']);
	

	gulp.watch('src/libs/utils/*.less', ['utils']);
});

gulp.task('default', ['watch']);

