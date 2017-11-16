# basic-php-site-template

This is a basic php site template where you want to use global elements for easier development, but nothing much outside of that.

Please follow the steps below to get set up and running.

### How do I get set up? ###

- Ensure that you have grunt, sass, node.js and php-cgi installed on your machine. If you do not, please follow the instructions contained within the links below:
    - Grunt - https://gruntjs.com/installing-grunt
    - SASS - http://sass-lang.com/install
    - Node.js - https://nodejs.org/en/download/
    - NPM - http://blog.npmjs.org/post/85484771375/how-to-install-npm

- Run "npm install" within terminal. This will install all packages associated with this build contained within the "package.json" file. More information on NPM can be found here https://docs.npmjs.com/getting-started/what-is-npm.

- Associated grunt tasks within this build:

"grunt" - This runs the 'grunt dev' task below.

"grunt dev" - This launches a local server that has browserSync attached to negate having to refresh your browser. 'Watch' task is also launched to compile SASS as you edit your styles.

"grunt build" - This is for debugging your output PHP, CSS and JS when in development. Once run all files will be within the 'production' folder.
    
    To run the uncss task for build:
        - run 'grunt build' to intiate the local server 
        - open a new terminal window and run 'grunt uncss:dev'

"grunt release" - This will make your website ready for release by compressing your images and minifying your CSS and JS. Once you have run 'grunt release', please follow the steps below to strip out any unused CSS from your main CSS file.

    To run the uncss task for release:
        - run 'grunt release' to intiate the local server 
        - open a new terminal window and run 'grunt uncss:prod'

### Comments for after set up.  ###

- If your site structure contains a folder heierarchy, you will need to update the "$ROOT" php varible on line 5 to ensure you're bringing in the correct files. See line 5 within both "index.php" and "folder/folder-test.php" for an example.
