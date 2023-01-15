

import React, {useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ig from 'images.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const refer1="http://savebills.com.ng/auth/register?refer=";


    const [totaldeposit, setTotaldeposit] = useState("0");
    const [totalbill, setTotalbill] = useState("0");
    const [allock, setallock] = useState("0");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("0");
    const [bonus, setbonus] = useState("0");
    const [account_number, setaccount_number] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [post, setPost] =useState(null);
    const [all, setall] = useState([]);
    const refer = `${refer1}${name}`;
    let token=localStorage.getItem('dataKey');
    React.useEffect(() => {
        setLoading(true);
        axios
            .get(baseURL, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);

                if (response.data.status ==="0"){
                    window.location='auth/login';
                }
                console.log(response.data);
                setusername(response.data.username);
                setName(response.data.username);
                setEmail(response.data.email);
                setBalance(response.data.wallet);
                setTotalbill(response.data.totalbill);
                setTotaldeposit(response.data.totaldeposit);
                setall(response.data.bills);
                setallock(response.data.allock);
                setaccount_number(response.data.account_number);
                setaccount_name(response.data.account_name);
                setbonus(response.data.referbonus);

                setMessage(response.data.message);


                setPost(response.data);
                setLoading(false);
            });

    }, []);
    const profile= ()=>{
        try {
            {
                if(token && token.login)
                {
                    this.setState({login:true, token:token})
                }else {
                    window.location='login.js';
                }
            }

        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }

    }
    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert(copyText.value);
    }
    const a= {
        margin: 5,

    };
    const ul={
        listStyleType:'square',
    };
    return (
    <>

        <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Wallet
                                </h5>
                                <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{balance.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className=
                                        "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                >
                                    <i className="fa fa-wallet"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">

                            <span className="whitespace-nowrap">Wallet Balance</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                               Bonus
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{bonus.toLocaleString()}
                                </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className=
                                    "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                            >
                                <i className="fa fa-wallet"></i>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">

                        <span className="whitespace-nowrap">Your Total Bonus</span>
                    </p>
                </div>
            </div>
            </div>
            {/*<div className="w-full lg:w-6/12 xl:w-3/12 px-4">*/}
            {/*    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">*/}
            {/*    <div className="flex-auto p-4">*/}
            {/*        <div className="flex flex-wrap">*/}
            {/*            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">*/}
            {/*                <h5 className="text-blueGray-400 uppercase font-bold text-xs">*/}
            {/*                    Bills*/}
            {/*                </h5>*/}
            {/*                <span className="font-semibold text-xl text-blueGray-700">*/}
            {/*                                   ₦{totalbill.toLocaleString()}*/}
            {/*                    </span>*/}
            {/*            </div>*/}
            {/*            <div className="relative w-auto pl-4 flex-initial">*/}
            {/*                <div*/}
            {/*                    className=*/}
            {/*                        "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"*/}
            {/*                >*/}
            {/*                    <i className="fa fa-wallet"></i>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <p className="text-sm text-blueGray-400 mt-4">*/}

            {/*            <span className="whitespace-nowrap">Total Bills</span>*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Safe-lock
                                </h5>
                                <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{allock.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className=
                                        "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                >
                                    <i className="fa fa-wallet"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">

                            <span className="whitespace-nowrap">Total Safe-lock</span>
                        </p>

                        {/*<Link*/}
                        {/*        className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2"*/}
                        {/* to="/withdraw"*/}
                        {/*>*/}

                        {/*    Withdraw*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body form-row">
                <h6>Your Referal Link</h6>
                <input id="myInput" type="text" className="form-control"
                       value={refer}/>
                    <button className="btn btn-info" onClick={myFunction}>Copy Referal Link</button>
            </div>
        </div>
        <br></br>
        <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
            {loading? <div className="loader-container">
                <div className="spinner"/>
            </div> : <CardLineChart balance = {balance} totaldeposit ={totaldeposit} totalbill = {totalbill} allock = {allock} />}
        </div>
        {/*<div className="w-full xl:w-4/12 px-4">*/}
        {/*    <CardBarChart />*/}
        {/*</div>*/}
      </div>
      {/*<div className="flex flex-wrap mt-4">*/}
      {/*  <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">*/}
      {/*    <CardPageVisits />*/}
      {/*  </div>*/}
      {/*  <div className="w-full xl:w-4/12 px-4">*/}
      {/*    <CardSocialTraffic />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
