// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./screens/home/HomeScreen";

// import BaseLayout from "./components/layout/BaseLayout";
// import AuthLayout from "./components/layout/AuthLayout";
// import { GlobalStyles } from "./styles/global/GlobalStyles";
// import SignIn from "./screens/auth/SignInScreen";
// import SignUp from "./screens/auth/SignUpScreen";
// import NotFound from "./screens/error/NotFoundScreen";
// import ProductDetails from "./screens/product/ProductDetailsScreen";
// import WishListScreen from "./screens/user/WishListScreen";
// import EditProductForm from "./components/product/EditProductForm";
// import CreateProduct from "./screens/user/CreateProduct";
// import FilterPage from "./components/product/ProductFilter";
// import ChatPage from "./screens/chat/ChatPage";
// import ProductListUser from "./components/product/ProductListUser";
// import ChatHistoryPage from "./screens/chat/ChatHistoryPage";
// import Footer from "./components/footer/Footer";
// // import AdminSignUp from "./screens/auth/AdminSignIn";
// import AdminSignIn from "./screens/auth/AdminSignIn";
// import Attend from "./components/admin/Attend.jsx";

// function App() {
//   return (
//     <Router>
//       <GlobalStyles />
//       <div className="app-container">
//         <div className="content-wrap">
//           <Routes>
//             <Route path="/" element={<BaseLayout />}>
//               <Route index element={<Home />} />
//               <Route path="/EditUserProduct/:editid" element={<EditProductForm />} />
//               <Route path="/wishlist" element={<WishListScreen />} />
//               <Route path="/NewProduct" element={<CreateProduct />} />
//               <Route path="/byCategory/:categoryName" element={<FilterPage />} />
//               <Route path="/product/details/:productId" element={<ProductDetails />} />
//               <Route path="/chat/:chatId" element={<ChatPage />} />
//               <Route path="/userProduct" element={<ProductListUser />} />
//               <Route path="/chats" element={<ChatHistoryPage />} />
//             </Route>
//             <Route path="/" element={<AuthLayout />}>
//               {/* <Route path="adminSign_up" element={<AdminSignUp/>}/> */}
//               <Route path="attend" element={<Attend/>}/>
//               <Route path="adminSign_in" element={<AdminSignIn/>}/>
//               <Route path="sign_in" element={<SignIn />} />
//               <Route path="sign_up" element={<SignUp />} />
//             </Route>
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home/HomeScreen";
import BaseLayout from "./components/layout/BaseLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { GlobalStyles } from "./styles/global/GlobalStyles";
import SignIn from "./screens/auth/SignInScreen";
import SignUp from "./screens/auth/SignUpScreen";
import NotFound from "./screens/error/NotFoundScreen";
import ProductDetails from "./screens/product/ProductDetailsScreen";
import WishListScreen from "./screens/user/WishListScreen";
import EditProductForm from "./components/product/EditProductForm";
import CreateProduct from "./screens/user/CreateProduct";
import FilterPage from "./components/product/ProductFilter";
import ChatPage from "./screens/chat/ChatPage";
import ProductListUser from "./components/product/ProductListUser";
import ChatHistoryPage from "./screens/chat/ChatHistoryPage";
import Footer from "./components/footer/Footer";
import AdminSignIn from "./screens/auth/AdminSignIn";
import Attend from "./components/admin/Attend";
import QRCodeScanner from "./components/admin/QRCodeScanner"
import QrCodeSee from "./components/admin/QrCodeSee"
import AdminSignUp from "./screens/auth/AdminSignUp"
function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="app-container">
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route path="EditUserProduct/:editid" element={<EditProductForm />} />
              <Route path="yourqr" element={<QrCodeSee/>}/>
              <Route path="attend" element={<Attend />} />
              <Route path="wishlist" element={<WishListScreen />} />
              <Route path="NewProduct" element={<CreateProduct />} />
              <Route path="byCategory/:categoryName" element={<FilterPage />} />
              <Route path="product/details/:productId" element={<ProductDetails />} />
              <Route path="chat/:chatId" element={<ChatPage />} />
              <Route path="userProduct" element={<ProductListUser />} />
              <Route path="chats" element={<ChatHistoryPage />} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              {/* <Route path="yourqr" element={<QrCodeSee/>}
              /> */}
              <Route path="scanqr" element={<QRCodeScanner/>}/>
              {/* <Route path="attend" element={<Attend />} /> */}
              <Route path="adminSign_in" element={<AdminSignIn />} />
              <Route path="adminSign_up" element={<AdminSignUp/>}/>
              <Route path="sign_in" element={<SignIn />} />
              <Route path="sign_up" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

