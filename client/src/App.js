import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Pages
import HomePage from "./pages/HomePage";
import SneakerPage from "./pages/SneakerPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditScreen";
import SneakerListPage from "./pages/SneakerListPage";
import SneakerEditPage from "./pages/SneakerEditPage";
import OrderListPage from "./pages/OrderListPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/sneaker/:id" component={SneakerPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route exact path="/admin/sneakerlist" component={SneakerListPage} />
          <Route
            exact
            path="/admin/sneakerlist/:pageNumber"
            component={SneakerListPage}
          />
          <Route path="/admin/sneaker/:id/edit" component={SneakerEditPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route exact path="/search/:keyword" component={HomePage} />
          <Route path="/page/:pageNumber" component={HomePage} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
          />
          <Route exact path="/" component={HomePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
