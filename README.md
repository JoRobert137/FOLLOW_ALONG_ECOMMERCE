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
