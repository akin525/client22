import React, {useState} from "react";


// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "axios";
import swal from "sweetalert";
import gh from "../../lg.png";

export default function Createlock() {

    const [name, setname] = useState("");
    const [date, setdate] = useState("");
    const [tittle, settittle] = useState("");
    const [amount, setamount] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userid, setuserid] = useState("");
    const [refid,setrefid] = useState("");
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const baseURL ="https://server.savebills.com.ng/api/auth/createlock";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setrefid("lock"+Math.floor((Math.random() * 1000000000) + 1));
        axios
            .get(baseURL1, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                setuserid(response.data.id);
                if (response.data.status ==="0"){
                    window.location='login';
                }
                console.log(response.data);

            });

    }, []);

    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })

    console.log(baseURL);
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setname(value);
        }
        if(id === "amount"){
            setamount(value);
        }
        if(id === "date"){
            setdate(value);
        }
        if(id === "tittle"){
            settittle(value);
        }


    }
    const handleSubmit  = async () =>  {

        try {
            axios
                .post(baseURL, {
                    userId:userid,
                    amount:amount,
                    name:name,
                    tittle: tittle,
                    date:date,
                    refid:refid,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .then(response => {
                    setError("");
                    setMessage(response);

                    if (response.data.status === "0") {
                        setError(response.data.message);
                        swal({
                            title: "Ooops",
                            text: response.data.message,
                            icon: "error",
                            confirmButtonText: "OK",
                        })


                    }else{
                        setMessage(response.data.message);
                        swal({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function () {
                            // Redirect the user
                            window.location.href = "/dashboard";
                        });
                    }
                    // setPost(response.data);
                });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Create Safe-lock</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                   safe-lock
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-success">
                                    Save more money and get 10% increment per annual

                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Tittle
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={tittle} onChange = {(e) => handleInputChange(e)} id="tittle"

                                                required/>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
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

                                                value={amount} onChange = {(e) => handleInputChange(e)} id="amount"

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={name} onChange = {(e) => handleInputChange(e)} id="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Withdraw Date
                                            </label>
                                            <input
                                                type="date"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={date} onChange = {(e) => handleInputChange(e)} id="date"

                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={handleSubmit} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Save Now
                                </button>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                            </form>
                        </div>
                    </div>

                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="text-center mt-12">
                                <h4>Safe-lock Interest Rate for Each Lock</h4>

                                <ul className="list-group">

                                    <li className="list-group-item list-group-item-success">
                                        10% Rate Per Annual
                                    </li>
                                </ul>
                                <br></br>
                                <br></br>


                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
