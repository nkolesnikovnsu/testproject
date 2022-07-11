Start Instruction:
Download/clone this repository to your machine
Download and run MYSQL server or other(you should confogure application.properties for your database), then create a database
Go to "src/main/resources" folder, open "application.properties" file and change name of database and port in first line
Change user and password in next two lines of "application.properties" file
In the root folder run "mvn spring-boot:run" command to launch backend part of application
Go to "frontend" folder and run "npm start" command to launch frontend part of application
Now you can open "localhost:3000" in your browser to use the app
Also you can use Postman or something like this to get a banner text at "localhost:8080/bid?category={yourcategory}"
(e.g. localhost:8080/bid?category=sport)
For authorised users besides CRUD operations you can find banners at "localhost:8080/category?name={wordtofind}"
You should registration or login like testing user or admin.
