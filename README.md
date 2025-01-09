# Ecommerce Applications

## Milestone 1: Project Overview
Create an e-commerce platform which has the following steps/functionalities :

1. An Authentication page to login into the user's profile.
2. The Product page which shows the product image along with the details of the product.
3. An order page which shows the cost and finalizes an order to be placed.
4. A payment gateway integrated with the platform to allow users for online mode of payment.

## Milestone 2 - Building the Login Page : Project Overview
The following steps had been taken to complete this milestone successfully :

1. Creation of two folders - Front_End and BackEnd and installing the required dependencies for each of them.
2. In Front_End a vite project named frontend was installed along with a CSS framework named Tailwind.
3. For initializing Tailwind, the required codes were added in the 'tailwind.config.js' and 'index.css' file.
4. For Front_End, the following command had been run :
    * npm create vite@latest frontend
    * cd frontend
    * npm install -D tailwindcss postcss autoprefixer
    * npx tailwindcss init -p
    * npm run dev
5. Inside the src folder, a new components folder was created which included 'login.jsx' and 'SignUp.jsx' under a sub-folder named 'authorization'.
6. Inside the 'login.jsx', the login page for the platform was coded and later imported inside 'App.jsx'.
7. In the BackEnd folder, node.js was initialised and all the required dependencies were installed. The installed dependencies include :
    * Mongoose
    * Express
    * Cors
    * Nodemon
8. Again in the BackEnd folder an additional 'src' folder was created which includes three additional folder named 'routes','middlewares' and 'controllers'.
9. The follwing commands were run for the BackEnd folder :
    * npm init
    * npm i expess cors nodemon mongoose

## Milestone 3 - Server Setup & Error Handling
Tasks :
* Setting up the Backend folder in a structured manner.
* Creating a database in MongoDB and connecting it to the server.
* Writing error handling code.

Steps taken to accomplish these tasks :
1. Inside src, create the 'config' directory. Add a file named '.env' inside it. This file should contain the MongoDB database url and PORT details.
2. Initialize the express application in the 'app.js; file.
3. Create another directory inside src named 'DB' and intialise a file 'Database.js' inside it. This would help us connect to ouor database using mongoose.
4.  Connect the databse to the server in the 'index.js' file.
5. Create a 'util' directory with the file named 'ErrorHandler.js'. This file would have the codes for handling all the errors.
   
## Milestone 4 - Creating User Controller & Setting up Multer
1. Created user.route file inside the routes directory for handling the routes.
2. Created user.controller inside controllers to check for existing users and creation of new ones.
3. Created multer file inside to help users upload files of different file types.
4. Export all the necessary files from each files and add the correct path wherever required.

## Milestone 5 - Building Sign up page and adding Form Validtaion
1. Created a signup page as part of the UI which helps create an account by taking in user details and a unique email.
2. The signup page and the login page in the 'components/authorization/' folder were updated with the required codes.
3. Added from validation to the sign up page to ensure the details entered are as per the requirements and the backend stores correct and clean data.
4. This was done by creating a new file named 'validation.js' which includes the code for the same.

## Milestone 7 - Adding email verfication and Password Hashing
1. Created two routes - one for signup and one for login.
2. Takes in user details identified mainly by their unique email and checks if the email exists in the database. If present, logs in directly.
3. If new user, stores the user details/credentials by creating a new user in the database and assigns a unique user_id for the same.
4. The password, before getting stored in the database, gets hashed with the help of libraries such as 'bcrypt.js'.
5. While logging in, crosschecks the unique email id in the database and also verifies if the passwords are similar.
6. If yes, then the authentication is done successfully otherwise throws an error and asks to signup first.

## Milestone 8 - Creating Card Component and Designing Homepage Layout
1. Developed a reusable card component to display product details such as name, image, and price. 
2. Designed a home page with flexbox or grid layout, promising a neat and structured display of the product cards.

## Milestone 9 - Created a Product Input Form
1. Allows users to add information about the products which can be dislayed along with the product in the products' homepage.
2. This was done by creating a new page called 'ProductEntryPage'and necessary code was written for the same.
2. Takes in both descryptive details as well as images of the products.

## Milesttone 10 - Created Endpoint for Updating DB
1. Created a product schema to get details of the product.
2. Using this schema, the product details are stored in the DB.
3. Also used cloudinary for initiating multer and store uploaded files in the 'temp-uploads' folder.

## Milestone 11 - Created Endpoint to fetch data from DB
1. The data which had been created earlier, are fetched from the database using get request.
2. After fetching this data, it is sent to the client-side.

## Milestone 12 - Fetched the data fromthe Database
1. Fetched the data which was posted in the database in the last milestone via an API call.
2. Passed on this fetched data to Product Card to display it in the frontend.

## Milestone 13 - Added Update Form
1. Added PUT route to update existing data.
2. Added a button to each product card in the UI with a functionality of opening a form which takes in the new data.
3. The new data gets updated in the database to that particular product data.
4. The product card now displays the new data.

## Milestone 14 - Added Delete Button
1. Added a delete route handler in the Backend.
2. Coded for a delete button in the frontend and connected the delete route to it.