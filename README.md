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


