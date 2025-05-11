import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CombinedAuth from "./components/CombinedAuth";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Team from "./components/Team";
import About from "./components/About";
import Pricing from "./components/Pricing";

type MainPageProps = {
  isLoggedIn: boolean;
};

function MainPage({ isLoggedIn }: MainPageProps) {
  return (
    <>
      <Hero />
      <Product />
      <Team />
      <About />
      <Pricing isLoggedIn={isLoggedIn} />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/auth" element={<CombinedAuth setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
