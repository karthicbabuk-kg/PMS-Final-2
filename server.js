require('dotenv').config();
const express = require('express');
const session = require('express-session');

const path = require('path');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/companyRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const groupRouter = require('./routes/groupRoutes');
const customerDoc = require('./routes/customerDocRoutes');
const masterdataRoutes=require('./routes/masterdataRoutes');
const executiveRoute=require('./routes/executiveRoutes');
const addTaskRoute=require('./routes/taskRoutes');
const taskRoutes = require('./routes/extaskRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

// MySQL connection
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/tasks', taskRoutes);
app.use('/addTask',addTaskRoute );
app.use('/executive',executiveRoute );
app.use('/master', masterdataRoutes);
app.use('/customer', customerDoc);
app.use('/groups', groupRouter);
app.use('/customers', customerRoutes);
app.use('/employee', employeeRoutes);
app.use('/company', companyRoutes);
app.use('/', authRoutes);

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
