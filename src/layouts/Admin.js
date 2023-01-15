import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Modal from "components/Modal/modal.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Airtime from "views/admin/airtime.js";
import Data from "views/admin/data.js";
import fund from "views/admin/fund.js";
import Tv from "views/admin/tv.js";
import Elect from "views/admin/elect.js";
import Deposit from "views/admin/deposit.js";
import Purchase from "views/admin/purchase.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Createlock from "views/admin/createlock.js";
import Addlock from "views/admin/addlock.js";
import Add from "views/admin/add.js";
import Bank from "views/admin/withdraw.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <Modal />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/airtime" exact component={Airtime} />
            <Route path="/fund" exact component={fund} />
            <Route path="/data" exact component={Data} />
            <Route path="/tv" exact component={Tv} />
            <Route path="/elect" exact component={Elect} />
            <Route path="/deposit" exact component={Deposit} />
            <Route path="/purchase" exact component={Purchase} />
            <Route path="/profile" exact component={Settings} />
            <Route path="/createlock" exact component={Createlock} />
            <Route path="/addlock" exact component={Addlock} />
            <Route path="/add" exact component={Add} />
            <Route path="/withdraw" exact component={Bank} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
