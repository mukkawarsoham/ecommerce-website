import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUS from './AboutUs/aboutus';
import Home from './pages/HomePage/home';
import Login from './Authentication/Login';
import OwnerLogin from './Authentication/OwnerLogin';
import SignUp from './Authentication/Signup';
import ResetPassword from './Authentication/Resetpassword';
import Verified from "./Authentication/Verified"
import VerifiedMail from './Authentication/VerifyMail';
import Buyer from './pages/Buyer/buyer';
import Sender from './pages/Sender/sender';
import Catalog from './pages/Catalogs/catalog';
import AddItem from './pages/AddItem/additem';
import AddToCart from './pages/AddtoCart/addtocart';
import Payment from './pages/Payment/payment';
import OwnerItems from './pages/OwnerItems/owneritems';
import NewOrders from './pages/OwnerOrders/neworders';
import AcceptedOrders from './pages/OwnerOrders/acceptedorder';
import RejectedOrders from './pages/OwnerOrders/rejectedorders';
import UserOrders from './pages/UserOrders/userorders';
import Congrats from './pages/Congrats/congrats';
import OwnerProfile from './pages/OwnerProfile/ownerProfile';
import UserProfile from './pages/UserProfile/userProfile';
import Notifications from './pages/Notifications/notification';
import Blogs from './Blogs/blogs';
import ContactUs from './ContactUs/contactus';
import VerifyEmailOnAccountCreation from './Authentication/verifymailonaccountcreation';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ownerlogin" element={<OwnerLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/verifymailonaccountcreation/:id/:token" element={<VerifyEmailOnAccountCreation />} />
        <Route path="/verify/:id" element={<Verified />} />
        <Route path="/verifymail/:id" element={<VerifiedMail />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/catalog/:id/:name" element={<Catalog />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/items" element={<OwnerItems />} />
        <Route path="/neworders" element={<NewOrders />} />
        <Route path="/acceptedorders" element={<AcceptedOrders />} />
        <Route path="/rejectedorders" element={<RejectedOrders />} />
        <Route path="/userorders" element={<UserOrders />} />
        <Route path="/congrats/:id" element={<Congrats />} />
        <Route path="/ownerprofile/:id" element={<OwnerProfile />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
        <Route path="/notification" element={<Notifications />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

