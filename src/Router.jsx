import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders'
import Landing from './pages/Landing/Landing';
import Auth from "./pages/Auth/Auth"
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'; 
const stripePromise = loadStripe(
  "pk_test_51OjQH9JlDbXPfixAPFQZii2EWqHsfdwZsXwwA02Xu2aRccilWhI31AbJrzq0IaWqm0wUma2eTxJbTu4KAy0ulc8O00cb0neMtG"
);


function Routing() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                
              msg={"you must log in to pay"}
              
                redirect={"payment"}
              >
                 <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
               </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must log in to access your orders"}
                redirect={"/Orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
}

export default Routing;



