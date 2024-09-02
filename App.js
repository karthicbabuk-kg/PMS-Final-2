require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // For storing sessions in MySQL
const path = require('path');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/companyRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const groupRouter = require('./routes/groupRoutes');
const customerDoc = require('./routes/customerDocRoutes');
const masterdataRoutes = require('./routes/masterdataRoutes');
const executiveRoute = require('./routes/executiveRoutes');
const addTaskRoute = require('./routes/taskRoutes');
const taskRoutes = require('./routes/extaskRoutes');
const productRoutes = require('./routes/products');
const db = require('./models/db')


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

// Set up session store
const sessionStore = new MySQLStore({}, db.pool); // Assuming you have pool configured

// Session middleware
app.use(session({
    key: 'Process Management',
    secret: 'your_secret_key', // Use a strong secret key
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour session expiry
        httpOnly: true, // Helps mitigate XSS attacks
    }
}));

// Routes
app.use('/products', productRoutes);
app.use('/tasks', taskRoutes);
app.use('/addTask', addTaskRoute);
app.use('/executive', executiveRoute);
app.use('/master', masterdataRoutes);
app.use('/customer', customerDoc);
app.use('/groups', groupRouter);
app.use('/customers', customerRoutes);
app.use('/employee', employeeRoutes);
app.use('/company', companyRoutes);
app.use('/', authRoutes);

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/dashboard-counts', async (req, res) => {
    try {
      const [companyCount] = await db.query('SELECT COUNT(*) AS count FROM company');
      const [employeeCount] = await db.query('SELECT COUNT(*) AS count FROM employee');
      const [groupCount] = await db.query(`SELECT COUNT(*) AS count FROM \`groups\` `);
      const [customerCount] = await db.query('SELECT COUNT(*) AS count FROM customer');
      const [customerDocCount] = await db.query('SELECT COUNT(*) AS count FROM customer_documents');
  
      res.json({
        companyCount: companyCount[0].count,
        employeeCount: employeeCount[0].count,
        groupCount: groupCount[0].count,
        customerCount: customerCount[0].count,
        customerDocCount: customerDocCount[0].count,
      });
    } catch (err) {
      console.error('Error fetching counts:', err);
      res.status(500).send('Server Error');
    }
  });


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
