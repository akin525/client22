import React, {useEffect, useState} from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "axios";
import swal from "sweetalert";

export default function Settings() {
    const [amount, setamount] = useState("");
    const [id, setid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userid, setuserid] = useState("");
    const [loading, setloading]=useState(false);
    const baseURL = "https://server.savebills.com.ng/api/auth/addlock";
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";

    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
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

    const handleInputChange = (e) => {
        const {id , value} = e.target;


        if(id === "amount"){
            setamount(value);
        }
        if(id === "id"){
            setid(value);
        }





    }

    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const handleSubmit  = async () =>  {
        setloading(true);

        try {
            axios
                .post(baseURL, {

                    userId:userid,
                    amount:amount,
                    id:id,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setError("");
                setMessage(response);
                setloading(false);
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/addlock";
                    });


                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/addlock";
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
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const referValue = searchParams.get('id');
        setid(referValue);
    }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          {/*<CardSettings />*/}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Safe-lock</h6>
                        <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add Money
                        </button>
                    </div>
                </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Safe-lock Information
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
                            <input
                                type="hidden"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={id} onChange = {(e) => handleInputChange(e)} id="id" required/>

                        </div>
                    </div>
                    <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                        Add money<span className="load loading"></span>
                    </button>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                </form>
            </div>
        </div>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
