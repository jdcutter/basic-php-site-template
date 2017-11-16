module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// this compiles your sass into css files
		sass: {
			dist: {
				files: {
					'src/assets/css/styles.css' : 'src/assets/scss/main.scss'
				}
			}
		},
		// Remove unused CSS from URLs (php, node, etc.)
		// (Note that`nonull` must be true, or else Grunt
		// removes remote paths that it can't find locally)
		uncss: {
		    dev: {
			    options: {
		            ignore: [
						/(#|\.)baguetteBox(-[a-zA-Z]+)?/,
						/\w\.in/,
						'.fade',
						'.collapse',
						'.collapsed',
						'.collapsing',
						/(#|\.)navbar(-[a-zA-Z]+)?/,
						/(#|\.)dropdown(-[a-zA-Z]+)?/,
						/(#|\.)(open)/,
						/disabled/,
						/\.no-js/,
						/\.defer/
					],
		            stylesheets : ['assets/css/styles.css']
		        },
		        files: [{
		            nonull: true,
		            src: ['http://localhost:9001/index.php', 'http://localhost:9001/folder/folder-test.php'],
		            dest: 'production/assets/css/styles.css'
		        }]
		    },
		    prod: {
			    options: {
		            ignore: [
						/(#|\.)baguetteBox(-[a-zA-Z]+)?/,
						/\w\.in/,
						'.fade',
						'.collapse',
						'.collapsed',
						'.collapsing',
						/(#|\.)navbar(-[a-zA-Z]+)?/,
						/(#|\.)dropdown(-[a-zA-Z]+)?/,
						/(#|\.)(open)/,
						/disabled/,
						/\.no-js/,
						/\.defer/
					],
		            stylesheets : ['assets/css/styles.min.css']
		        },
		        files: [{
		            nonull: true,
		            src: ['http://localhost:9001/index.php', 'http://localhost:9001/folder/folder-test.php'],
		            dest: 'production/assets/css/styles.min.css'
		        }]
		    }
		},
		// this takes your css file and minifies
		cssmin: {
			target: {
				files: {
					'production/assets/css/styles.min.css': ['src/assets/css/styles.css']
				}
			}
		},
		// this takes your main js file and minifies it to save weight
		uglify: {
			my_target: {
				files: {
					'production/assets/js/main.min.js': ['src/assets/js/vendor/*.js', 'src/assets/js/main.js']
				}
			}
		},
		// this optimizes your images for when you are ready to release your website
	    imagemin: {                          
			dynamic: {
				options: {
					optimizationLevel: 7
				},                    
				files: [{
					expand: true,                  
					cwd: 'src/assets/imgs/',                   
					src: ['**/*.{png,jpg,gif}'],   
					dest: 'production/assets/imgs/'
				}]
			}
		},
		clean: {
			// this removes the 'production' folder that is output during grunt tasks below
			production: ['production/'],
			// this removes the "_includes" folder from being included in your 'production' folder
			includes: ['production/_includes/'],
			// this removes the "scss" folder from 'production/assets/' after 'grunt dev' is run
			scss: ['production/assets/scss/']
		},
		// this copies over all fonts and favicons into your 'production' folder
		copy: {
			fonts: {
				expand: true,
				cwd: 'src/assets/fonts',
				src: ['*.{svg,eot,ttf,woff,woff2,otf}'],
				dest: 'production/assets/fonts'
			},
			favicons: {
				expand: true,
				cwd: 'src/',
				src: ['*.{png,ico}'],
				dest: 'production'
			},
			devAssets: {
				expand: true,
				cwd: 'src/assets/',
				src: ['**/*'],
				dest: 'production/assets/'
			},
			phpFiles: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.php'],
				dest: 'production/'
			}
		},
		// when making a release, this updates/removes .css and .js filepaths
		replace: {
			// updates files paths
			updatePaths: {
				src: ['production/**/*.php'],
				overwrite: true,
				replacements: [{
					// updates css path to reflect .min.css in '_includes/header.php'
					from: 	/styles.css/g,
					to:		'styles.min.css'
				},
				{
					// updates js path to reflect .min.js in '_includes/footer.php'
					from: 	/main.js/g,
					to: 	'main.min.js'
				},
				{
					// removes modernizer file path in '_includes/header.php'
					from: 	'<script src="<?php echo $ROOT; ?>assets/js/vendor/modernizr-2.6.2.min.js"></script>',
					to: 	''
				},
				{
					// removes boostrap file path in '_includes/footer.php'
					from: 	'<script src="<?php echo $ROOT; ?>assets/js/vendor/bootstrap.min.js"></script>',
					to: 	''
				}]
			}
		},
		// this is a local server for development purposes
	    php: {
	        dist: {
	            options: {
	                hostname: '127.0.0.1',
	                port: 9000,
	                base: 'src', // Project root 
	                keepalive: false,
	                open: false
	            }
	        },
	        production: {
	            options: {
	                hostname: '127.0.0.1',
	                port: 9001,
	                base: 'production', // Project root 
	                keepalive: true,
	                open: true
	            }
	        }
	    },
	    // syncs the above server when there is a change made to styles.css
		browserSync: {
			dist: {
				bsFiles: {
					src: [
						'./src/assets/css/styles.css',
						'./src/**/*.php'
					]
				},
				options: {
					proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
	                watchTask: true,
	                open: true
				}
			}
		},
		// this watches for any changes within SASS
		watch: {
			css: {
				files: 'src/assets/scss/**/*.scss',
				tasks: ['sass']
			}
		}
	});
	
	// loadNpmTasks bring in required grunt modules for use within this file
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-browser-sync');
	
	// These are registered task you can run within terminal
	// 'Default' grunt task runs 'serve' task
	grunt.registerTask('default', ['dev']);
	// Runs a local php server with browserSync
	grunt.registerTask('dev', ['php:dist', 'browserSync', 'watch']);
	// This is for debugging production assets before minifying/compressing files
	grunt.registerTask('build', ['clean:production', 'sass', 'copy', 'clean:scss', 'php:production']);
	// This is when you are ready to push to production. Includes minifying CSS and JS, optimizing images and updates file paths for .min.xxx extensions
	grunt.registerTask('release', ['clean:production', 'sass', 'cssmin', 'imagemin', 'uglify', 'copyFontsFavs', 'copy:phpFiles', 'replace', 'php:production']);
	// Used with the 'build' and 'release' tasks to copy fonts and favicons
	grunt.registerTask('copyFontsFavs', ['copy:fonts', 'copy:favicons']);
	
}