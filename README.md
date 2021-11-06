Prerequisits :
* make sure you have node installed in your system.

Steps to make it run : 
```
npm init -y
npm i express bcrypt
npm i --save-dev nodemon
npm i mongoose@5.1.5
```
1. Check .gitignore files, if these files are not created in your system, then this project will not run.
2. In package.json > inside "scripts"> create dependency => "devStart": "nodemon server.js"
