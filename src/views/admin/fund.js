

import React, {useState} from "react";
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
    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const [account_number, setaccount_number] = useState("0");
    const [account_number1, setaccount_number1] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [account_name1, setaccount_name1] = useState("0");
    const [amount, setamount] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
                setName(response.data.username);
                setaccount_number(response.data.account_number);
                setaccount_number1(response.data.account_number1);
                setaccount_name(response.data.account_name);
                setaccount_name1(response.data.account_name1);

                setMessage(response.data.message);

                setLoading(false);
            });

    }, []);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "amount"){
            setamount(value);
        }
    }
    const handleSubmit  = async () =>  {

        // html: "<h6>Account Number:"+account_number+"</h6><br><h6>Account Name:</h6>"+account_name+"</h6>",
                if (amount <= 3500) {
                    swal({
                        title: "Fund With",
                        text:"Account Number:"+account_number1+" || Account Name:"+account_name1+" || Bank Name: VFD Microfinance Bank",
                        icon: "success",
                        confirmButtonText: "OK",
                    })


                }else {
                    swal({
                        title: "Fund With",
                        text:"Account Number:"+account_number1+" || Account Name:"+account_name1+" || Bank Name: VFD Microfinance Bank",
                        icon: "success",
                        confirmButtonText: "OK",
                    })

                }
    }




    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-white text-xl font-semibold">Fund Wallet</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Funding Method
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Amount
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={amount} onChange = {(e) => handleInputChange(e)} id="amount" required/>

                                        </div>
                                    </div>
                                </div>
                                <button type="button"  onClick={handleSubmit} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Fund Now<span className="load loading"></span>
                                </button>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
