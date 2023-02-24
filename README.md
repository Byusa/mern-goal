# mern-goal


# MERN Stack

1. Set up the Project folder
    1. Mkdir mern-goal
    2. Cd mean-goal
        1. Mkdir backend
            1. Make life sever.js
    3. In mean-goal
        1. Npm init
            1. Change entry point to be
                1. server.js
        2. Add .gitignore
            1. .env
            2. node_modules
        3. Npm I express
2.


# MERN Stack ( MongoDB)
1. Created an account with email
2. Connect with the mongosdb shell
3. Install mongoshon Browser
4. Collections (tables)
    1. Collection of objects [Json obj]
    2. Create collection (db name and collection (tables))
5. Connect
    1. Choose …. Compass
        1. Copy the connection string
    2. Click on connectOn Software
6.  Open the compass software
7. New connection
    1. mongodb+srv://byusa:<password>@cluster0.gnh445e.mongodb.net/test
8. Back to the browser
9. Connect
    1. Connect your application
        1. Copy that string too
10. In .env add this
    1. mongodb+srv://byusa:<password>@cluster0.gnh445e.mongodb.net/?retryWrites=true&w=majority
11.


# MERN Stack (JWT)
1. Code
    1. Routes
        1. userRoutes.js
            1. route.post(‘/login’, registerUser)
            2. route.post(‘/login’, loginUser)
            3. route.get(‘/me’, protect, getMe)
        2. goalRoutes.js (protect those api too)
            1. In this case you need to a token to do CRUD operations
    2. Controllers
        1. userController.js
            1. registerUser
            2. loginUser
            3. getMe
    3. Models
        1. goalModel.js
    4. Config
    5. Middleware
        1. authmiddlerware
            1. protect
    6. Severs.js
        1. app.use('/api/users', require('./routes/userRoutes'))
2. Packages to install
    1. npm i bcryptjs
    2. npm i jsonwebtoken
