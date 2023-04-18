import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import ProfileSettings from './pages/AccountSettings/ProfileSettings';
import ResetPassword from './pages/AccountSettings/ResetPassword';
import DeleteAccount from './pages/AccountSettings/DeleteAccount';

import SellerCenter from './pages/SellerCenter/SellerCenter';
import Slogin from './pages/SellerCenter/S_Login';
import Sregister from './pages/SellerCenter/S_Register';

import SellerManagement from './pages/SellerManagement/SellerManagement';
import Delete from './pages/SellerManagement/Delete';
import Dashboard from './pages/SellerManagement/Dashboard';
import GeneralInfo from './pages/SellerManagement/GeneralInfo';
import MyArtworks from './pages/SellerManagement/MyArtworks';

import Subscription from './pages/Subscription/Subscription';
import SubscriptionSuccess from './pages/Subscription/Success';
import Articles from './pages/Subscription/Articles';
import SellerSubscription from './pages/Subscription/SellerSubscription';
import SellerArticles from './pages/Subscription/SellerArticles';

const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/accountsettings" element={<AccountSettings />} >
                        <Route index element={<Navigate to={'profile'} />} />
                        <Route path="profile" element={<ProfileSettings />} />
                        <Route path="delete" element={<DeleteAccount />} />
                        <Route path="resetPwd" element={<ResetPassword />} />
                        <Route path="articles" element={<Articles />} />
                    </Route>
                    <Route path="/sellerAuth" element={<SellerCenter />} >
                        <Route index element={<Navigate to={'login'} />}/>
                        <Route path="login" element={<Slogin />}/>
                        <Route path="register" element={<Sregister />} />
                    </Route>
                    <Route path="/sellerCenter" element={<SellerManagement />} >
                        <Route index element={<Navigate to={'dashboard'} />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="addartwork" element={<MyArtworks/>} />
                        <Route path="generalInfo" element={<GeneralInfo />} />
                        <Route path="delete" element={<Delete />} />
                        <Route path="articles" element={<SellerArticles />} />
                    </Route>
                    {/* subscription route */}
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/sellersubscription" element={<SellerSubscription />} />
                    <Route path="/subscriptionsuccess" element={<SubscriptionSuccess />} />
                    {/* <Route path="/articles" element={<Articles />} /> */}
                </Routes>
            </BrowserRouter>
    );
}

export default App;