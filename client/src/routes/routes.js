import { Navigate } from "react-router-dom";

import Auth from "../pages/Auth/Auth";
import Sidebar from "../components/Sidebar/Sidebar";

import NewIn from "../pages/NewIn/NewIn";
import Sale from "../pages/Sale";
import ArtGallery from "../pages/ArtGallery"; 
import Discover from "../pages/Discover";

import Category1 from "../pages/NewIn/Category1";
import Category2 from "../pages/NewIn/Category2";
import Category3 from "../pages/NewIn/Category3";
import Category4 from "../pages/NewIn/Category4";

export default [
    {
        path: "/auth",
        element: <Auth/>
    },
    {
        path: "/newin",
        element: <NewIn/>,
        children: [
            {
                path: "category1",
                element: <Category1/>
            },
            {
                path: "category2",
                element: <Category2/>
            },
            {
                path: "category3",
                element: <Category3/>
            },
            {
                path: "category4",
                element: <Category4/>
            },
            {
                path: "/newin",
                element: <Navigate to='Category1'/>
            },
        ]
    },
    {
        path: "/sale",
        element: <Sale/>
    },
    {
        path: "/artgallery",
        element: <ArtGallery/>
    },
    {
        path: "/discover",
        element: <Discover/>
    },
    {
        path: "/",
        element: <Navigate to="newin"/>
    },
]

