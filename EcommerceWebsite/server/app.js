import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Stripe from 'stripe';
import axios from 'axios'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.router.js'
import productRoute from './routes/product.router.js'
import categoryRoute from './routes/category.router.js'
import paymentRoute from './routes/payment.router.js'
import contactRoute from './routes/Contact.router.js'

//rest object
const app = express()

// axiso Instance
const axiosInstance = axios.create({
  withCredentials: true,
})

axiosInstance.defaults.headers.common["Content-Type"] = "application/json"
axiosInstance.defaults.headers.common["Accept"] = "application/json"

export { axiosInstance }

// Stripe Configuration
export const stripe = new Stripe('sk_test_51PgYpnRtcqBN7ORDLscBdSc0gG2rapdeGFBoIBnNqjH4KCKwg1VYgZ2kChpMydGDeF8sZVTm6j48r3MBiiIpO9hS00zjVh6BT9');


//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: 'include',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
}))
app.use(express.json())
app.use(express.static("public"))
app.use(morgan('dev'))
app.use(cookieParser())

// app.options('/health', cors());

//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/contact', contactRoute)


// HealthCheck endpoint config
// app.get('/health', (req, res) => {
//   try {
//     res.set('Cache-Control', 'no-store');
//     return res.status(200).send('OK');
//   } catch (error) {
//     res.set('Cache-Control', 'no-store');
//     res.status(500).send('Error');
//   }
// });

export { app }