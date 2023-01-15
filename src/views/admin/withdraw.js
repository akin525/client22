

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";


export default function Tv() {
    const [network, setnetwork] = useState("");
    const [productid, setproductid] = useState("");
    const [name, setname] = useState("");
    const [po, setpo] = useState("");
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [refid,setrefid] = useState("");
    const [datass, setdatass]=useState([]);
    const [bank, setbank]=useState([]);
    const [amount, setamount]=useState("");
    const [number,setnumber] = useState("");
    const baseURL2 = "https://server.savebills.com.ng/api/auth/bank";
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const baseURL = "https://server.savebills.com.ng/api/auth/verify";
    const baseURL3 = "https://server.savebills.com.ng/api/auth/with";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setrefid("withdraw"+Math.floor((Math.random() * 1000000000) + 1));

        axios
            .get(baseURL2, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },
            })
            .then(response => {
                setError("");
                setbank(response.data.data);
                // console.log(response.data.data);

            });

    }, [token]);

    const handledata  = async (selected) =>  {


        try {

            axios
                .get(baseURL1, {
                    // username:useCookies('username'),
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                })
                .then(response => {
                    setError("");
                    setMessage(response);

                    console.log(response.data);
                    setuserid(response.data.id);

                });

        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }

    const handleverify  = async (vertv) =>  {
        setname("Validating Account Number.......");
        try {
            axios
                .post(baseURL, {
                    bank:network,
                    number:vertv,
                } )
                .then(response => {
                    setError("");
                    setname(response.data.responseBody.accountName);

                    if (response.data.status === "0") {
                        setError(response.data);



                    }else{
                        setMessage(response.data.message);
                        // const [cookies, setCookie] = useCookies(response.data.username);


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

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(e.target.id === "network"){
            handledata(value);
            setnetwork(value);
            setpo(e.target.options[e.target.selectedIndex].text);


        }
        if(id === "name"){
            setnetwork(value);
        }

        if(id === "number"){
            setnumber(value);
            if (value.length>=10) {
                handleverify(value);
            }
        }
        if(id === "amount"){
            setamount(value);
        }





    }
    const handleSubmit  = async () =>  {

        try {
            axios.post(baseURL3, {
                    userId:userid,
                    bank: po,
                    code: network,
                    name:name,
                    amount: amount,
                    number: number,
                    refid: refid
                },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setError("");
                setMessage(response);
                console.log("response");
                console.log(response);
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/withdraw";
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
                                <h6 className="text-blueGray-700 text-xl font-bold">Withdraw</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Safe-lock Withdraw
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">

                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                            Select Bank
                                            </label>
                                            <select name="network"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    onChange = {(e) => handleInputChange(e)} id="network"
                                                    required>
                                                <option>Select Bank</option>
                                                {bank.map((datab) => (
                                                <option id={datab['name']} value={datab['code']}>{datab['name']}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <input type="hidden" name="po" className="text-success form-control" value={po}
                                               onChange = {(e) => handleInputChange(e)} id="po"

                                               placeholder="Amount"  readOnly/>
                                    </div>
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Account Number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={number} onChange = {(e) => handleInputChange(e)} id="number"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Account Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={name} onChange = {(e) => handleInputChange(e)} id="namer"
                                            readOnly/>
                                        </div>
                                    </div>

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
                                {name === "" || name === "Validating IUC Number......."?<div></div>: <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Submit<span className="load loading"></span>
                                </button>}
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
