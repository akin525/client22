import React, {useEffect, useState} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Dashboard({color}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [datass, setdatass]=useState([])
    const [datass1, setdatass1]=useState([])
    const [amount,setamount] = useState("");

    const baseURL2 = "https://server.savebills.com.ng/api/auth/allock";
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";

    const baseURL = "https://server.savebills.com.ng/api/auth/buydata";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {

        axios
            .get(baseURL2, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                console.log(setMessage);
                setuserid(response.data.id);
                setdatass(response.data.lock);
                setdatass1(response.data.interest);
                // if (response.data.status ==="0"){
                //     window.location='/auth';
                // }
                console.log(response.data);

            });

    }, [token]);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "id"){
            setid(value);
        }

        if(id === "amount"){
            setamount(value);
        }

    }




    // const handleSubmit  = async () =>  {
    //
    //
    //     try {
    //         axios
    //             .post(baseURL, {
    //
    //                 userId:userid,
    //                 id:productid,
    //                 number:number,
    //                 refid:refid,
    //             },{
    //                 headers:{
    //                     Authorization: `Bearer ${token}`
    //                 },
    //
    //             }).then(response => {
    //             setError("");
    //             setMessage(response);
    //             console.log("response");
    //             console.log(response);
    //             if (response.data.status === "0") {
    //                 setError(response.data.message);
    //                 swal({
    //                     title: "Fail",
    //                     text: response.data.message,
    //                     icon: "error",
    //                     confirmButtonText: "OK",
    //                 }).then(function () {
    //                     // Redirect the user
    //                     window.location.href = "/data";
    //                 });
    //
    //
    //             }else{
    //                 setMessage(response.data.message);
    //                 swal({
    //                     title: "Success",
    //                     text: response.data.message,
    //                     icon: "success",
    //                     confirmButtonText: "OK",
    //                 }).then(function () {
    //                     // Redirect the user
    //                     window.location.href = "/dashboard";
    //                 });
    //             }
    //         });
    //     }catch (e) {
    //         console.log(e);
    //         console.log("e.data");
    //         console.log(e.data);
    //         setError("An error occured. Check your input and try again");
    //     }
    // }


    return(
        <>
            {loading ? <div className="loader-container">
                    <div className="spinner"/>
                </div> :
                <div className="flex flex-wrap">
                    {datass.map((datab) => (
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-3">
                            <div
                                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-wrap">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                {datab.tittle}
                                            </h5>
                                            <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{parseFloat(datab.balance).toFixed(2)}
                                </span>
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <div
                                                className=
                                                    "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                            >
                                                <i className="fa fa-wallet"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-blueGray-400 mt-4">

                                        <span className="whitespace-nowrap">Withdraw Date: {datab.date}</span>
                                    </p>
                                    {datab.status == "1" ?
                                        <button
                                            className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2 mb-4"
                                            style={{margin: "20px"}}>
                                            Running
                                        </button> : true}
                                    {datab.status == "0" ?
                                        <Link
                                                className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2"
                                     to="/withdraw" style={{margin: "20px"}}
                                    >

                                        Withdraw
                                    </Link>:true}
                                    {datab.status == "1" ?

                                        <button onClick={() => window.location.href='/add?id=' + datab.id}
                                                className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2">
                                            Add Money
                                        </button> : true}


                                </div>

                            </div>


                        </div>
                    ))}
                </div>
            }

            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                        }
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                            "font-semibold text-lg " +
                                            (color === "light" ? "text-blueGray-700" : "text-white")
                                        }
                                    >
                                      My Interest
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}

                            {loading ? <div className="loader-container">
                                    <div className="spinner"/>
                                </div> :
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                    <tr>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Username
                                        </th>


                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Profit
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Date
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        ></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {datass1.map((datab1) => (
                                        <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                <span
                                                    className={
                                                        "ml-3 font-bold " +
                                                        +(color === "light" ? "text-blueGray-600" : "text-white")
                                                    }
                                                >
                   {datab1.username}
                  </span>
                                            </th>


                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab1.profit}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab1.createdAt}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}