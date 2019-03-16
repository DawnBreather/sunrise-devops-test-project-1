**dev environment** 	
// clone project
1. git clone git@gitlab.com:xlvcode/devops-part-one.git
2. cd dev-ops-part-one
// install curl
3. sudo apt install curl
//install PPA
4. cd ~
5. curl -sL https://deb.nodesource.com/setup_11.x -o nodesource_setup.sh
6. sudo bash nodesource_setup.sh
// install npm & node.js
7. sudo apt-get install nodejs // install node.js & npm
//install mongodb
8. sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
9. echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
10. sudo apt-get update
11. sudo apt-get install -y mongodb-org=4.0.0 mongodb-org-server=4.0.0 mongodb-org-shell=4.0.0 mongodb-org-mongos=4.0.0 mongodb-org-tools=4.0.0
12. echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
13. sudo service mongod start
//install dependencies for production mode.
14. sudo npm install
//run application
15. npm run demon


**Staging environment**
Тоже самое, что и production, только приложение ( пункт 15) запускается командой => 15. npm run test

**production environment**	
// install curl
1. sudo apt install curl
//install PPA
2. cd ~
3. curl -sL https://deb.nodesource.com/setup_11.x -o nodesource_setup.sh
4. sudo bash nodesource_setup.sh // install npm & node.js
5. sudo apt-get install nodejs // install node.js & npm
//install mongodb
6. sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
7. echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
8. sudo apt-get update
9. sudo apt-get install -y mongodb-org=4.0.0 mongodb-org-server=4.0.0 mongodb-org-shell=4.0.0 mongodb-org-mongos=4.0.0 mongodb-org-tools=4.0.0
10. echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
11. sudo service mongod start
//install dependencies for production mode.
12. sudo npm install —production
//intall PM2 (process manager) 
13. npm install -g pm2
14. pm2 start  ecosystem.config.js
// install NGINX
15. sudo apt-get update
16. sudo apt-get install nginx
17. sudo mv default /etc/nginx/sites-available/default 
18. sudo service nginx restart
