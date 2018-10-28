var gulp        = require('gulp'); //Cria e move os arquivos js já copilados para pasta css
var browserSync = require('browser-sync').create(); //Cria um Brawser-Sinc para ele rodar o navegador em tempo real
var sass        = require('gulp-sass'); // Copila o Sass e o HTML

// Copilar o Sass
gulp.task('sass', function(){
    
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream()); 
    
});

//Mover JS para src/js
gulp.task('js', function(){
    
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 
                    'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});


// Servidor para olhar os HTML/SCSS
gulp.task('server', ['sass'], function(){
    
    browserSync.init({
        server: "./src"
    });
    
   gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
});

gulp.task('default', ['js', 'server']);

