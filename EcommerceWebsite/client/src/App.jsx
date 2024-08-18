import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAdminTrue, setIsAdminFalse, setIsLoggedInFalse, setIsLoggedInTrue } from "./features/counter/counterSlice";

import Layout from "./pages/layout/Layout";
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(()=>import("./pages/Contact"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const Policy = lazy(()=>import("./pages/Policy"))
const Cart = lazy(()=>import("./pages/Cart"))
const Login = lazy(()=>import("./pages/auth/Login"))
const Register = lazy(()=>import("./pages/auth/Register"))
const CreateProduct = lazy(()=>import('./pages/admin/CreateProduct'))
const Products = lazy(()=>import("./pages/Products"))
const Product = lazy(()=>import("./pages/Product"))
import ProtectedRoute from './components/ProtectedRoute'
const Profile = lazy(()=>import('./pages/Profile'))
const Dashboard = lazy(()=>import('./pages/admin/Dashboard'))
const Orders = lazy(()=>import('./pages/Orders')) 
const Settings = lazy(()=>import('./pages/Settings'))
const PaymentSuccess = lazy(()=>import("./pages/PaymentSuccess"))
import AdminRoute from "./components/AdminRoute";



function App() {
  const dispatch = useDispatch()

  const getCookie = (name) => {
    const cookies = document.cookie.split(';')
    const cookieValue = cookies.map((cookie) => {
      if (((cookie.split('='))[0]).trim() === name) {
        return (cookie.split('='))[1]
      }
    })
    return cookieValue
  }

  const checkCookieAndSetState = () => {
    if (document.cookie) {
      if ((getCookie('isLoggedIn'))[0] !== undefined) {
        dispatch(setIsLoggedInTrue())
      } else {
        dispatch(setIsLoggedInFalse())
        if ((localStorage.getItem('user'))) {
          localStorage.removeItem('user')
        }
      }

      if ((getCookie('isAdmin'))[1] !== undefined) {
        dispatch(setIsAdminTrue())
      } else {
        dispatch(setIsAdminFalse())
      }

    } else {
      dispatch(setIsLoggedInFalse())
      if ((localStorage.getItem('user'))) {
        localStorage.removeItem('user')
      }
    }
  }


  async function checkServerHealth() {
    try {
      const response = await fetch('/health');
      if (response.ok) {
        console.log('Server is healthy');
      } else {
        console.error('Server health check failed');
      }
    } catch (error) {
      console.error('Error during health check:', error);
    }
  }


  useEffect(() => {
    checkServerHealth();
    checkCookieAndSetState()
  }, [])
  return (
    <>
      <Toaster style={{ zIndex: 10000 }} />
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-product" element={
                <ProtectedRoute>
                  <AdminRoute>
                    <CreateProduct />
                  </AdminRoute>
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>}
              />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/payment-success" element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter >
      </Suspense>
    </>
  );
}

export default App;
