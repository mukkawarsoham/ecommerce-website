import react, { useState, useEffect } from "react"
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import HomePageOwner from "./homepageOwner";
import HomePageUser from "./homepageUser";
import { useNavigate } from 'react-router-dom';
import HomeDetails from "./homedetails";

const Home = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const role = user?.role;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!userInfo) {
    //         navigate("/login")
    //     }
    // })

    return (
        <>
            <>
                <Header />
                {(user == null) && <HomeDetails />}
                {(user && role == "owner") && <HomePageOwner />}
                {(user && role == "user") && <HomePageUser />}
                <Footer />
            </>
        </>
    )
}

export default Home;

