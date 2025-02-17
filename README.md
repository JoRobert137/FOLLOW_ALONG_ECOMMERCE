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

## Milestone 10 - Created Endpoint for Updating DB
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

## Milestone 15 - Added Navbar
1. Created a navbar as part of the UI to contain various pages and functionalities for different purposes.
2. Also added the diiferent route links used to the Navbar along with it.

## MIlestone 16 - Created Product Info Page
1. Created a separate file named SingleProductPage in the FrontEnd to show the details of a single product when clicked upon that product card.
2. On clicking, Fetches the data and shows in the single product page in a manner which it is written.
3. Multiple images can be seen by using the leftArrow and rightArrow functions.
4. The images also have the Modal feature where the background goes dark while viewing the image.

## Milestone 17 - Added Cart Components
1. Created a cart Schema.
2. Updated cart route to visit cart page.
3. Created cart controller to control any updation in cart.

## Milestone 18 - Cart Data Route Added
1. Added the route necessary for fetching and updating cart data.

## Milestone 19 - Created Cart UI
1. Created a Cart UI in the frontend.
2. Added and fetched cart details of a specific user after they log in.

## Milestone 20 - Added Profile Component
1. Created a backedn endpoint to send user data.
2. Created a UI page in the frontend to display the user profile.
3. Added a link for the profile page in the navbar.
4. This page displays all the details of the user.
5. For address, it displays "No address found" .

## Milestone 21 - Created Address Form
1. Created a file named AddressCard.jsx under the components folder.
2. Cretaed a form which uses useState and updates the address of the user.

## Milestone 22 - Added Endpoint for adding User Address
1. Coded the backend endpoint for adding addresses for users.
2. User authentication for adding address done by sending the token as a param while posting.
3. Once the address is added, the same is fetched and displayed in the Profile Page under Adresses.

## Milestone 23 - Select Address Page Added
1. Created a page to choose address after adding products to cart.
2. The page displays all the address stored in the user data.
3. Added the backend code to fetch the previously existing data and display in the 'select-address' page.

## Milestone24 - Created Order Confirmation Page
1. Created a page to check the products which were already added to cart.
2. It also displays the total cost of all the products which are to be ordered.

## Milestone 25 - Added Endpoint for receiving products details.
1. Created a product model/schema for storing the data of the items which are to be orderd.
2. Created a product controller for handling the porcess of checking if the products exists or not.
3. different prodicts can be added to the same address.
4. Also added a mailing system to retrieve the id of the user.

## Milestone 26 - Added Endpoint for Receiving User Mails.
1.  Created an user endpoint for receving mails from the user's end.
2. This mail allows us the retrive the user_id from the database.
3. Using the id, all the orders placed from the user's side can be fetched.

## Milestone 27 - Created Orders Page.
1. Created an 'Orders' page to display all the user's orders.
2. This page is connected to the the endpoint created in the previous milestone.
3. Also added orders page to the navbar for easy navigation.

## Milestone 28 - Created Cancel Button.
1. Created a cancel button for every order in the user's order page.
2. Created a backend endpoint to handle deleting the order.
3. Entire process iso carried out using the user id and the order id.
4. If order already cancelled, then button won't be displayed.

## Milestone 29 & 30 - Integrated Payment Gateway.
1. A Razorpay account was created, and access to the Razorpay Developer Dashboard was obtained.  
2. On the order confirmation page, two payment options of online payment was added.  
3. When clicked on the confirm order button, the payment gateway would open and allow the user to make an online payment for the same.

### Milestone 31 - Implemented Global State Management.
1. Use Redux to store and manage the user's email across the application.  
2. Ensure components can access and update global state efficiently without prop drilling.  
3. Structure the application to handle state management in a scalable and organized manner using Redux.