require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');


app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Sessions
app.use(session({
  secret: process.env.SECRET1, 
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/api/users', (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const addressesRouter = require("./routes/addresses");
const authRoutes = require('./routes/auth.js');
const paypalRouter = require('./routes/paypalInt.js');

const adminRoutes = require('./routes/admin/admin.js');
const adminProduct = require('./routes/admin/products.js');
const adminOrder = require('./routes/admin/orders');
const adminUser = require('./routes/admin/users');


app.use("/api/", authRoutes);
app.use("/api/", usersRouter);
app.use("/api/", productsRouter);
app.use("/api/", cartsRouter);
app.use("/api/", ordersRouter);
app.use("/api/", addressesRouter);
app.use("/api/", paypalRouter);

app.use("/api/admin", adminRoutes);
app.use('/api/admin', adminProduct);
app.use('/api/admin', adminOrder);
app.use('/api/admin', adminUser);

app.get('/', (req, res)=>{
  res.json({ message: 'API is running'})
});

app.use((err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!'})
})


app.get("/success", (req, res) => {
  res.send("Payment successful!");
});

app.get("/cancel", (req, res) => {
  res.send("Payment cancelled!");
});




PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port`));