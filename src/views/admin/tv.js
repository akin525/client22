

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";


export default function Tv() {
    const [network, setnetwork] = useState("");
    const [productid, setproductid] = useState("");
    const [name, setname] = useState("");
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [refid,setrefid] = useState("");
    const [datass, setdatass]=useState([])
    const [number,setnumber] = useState("");
    const baseURL2 = "https://server.savebills.com.ng/api/auth/tv";
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const baseURL = "https://server.savebills.com.ng/api/auth/verifytv";
    const baseURL3 = "https://server.savebills.com.ng/api/auth/buytv";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setrefid("tv"+Math.floor((Math.random() * 1000000000) + 1));

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
                setuserid(response.data.id);
                if (response.data.status ==="0"){
                    window.location='login';
                }
                console.log(response.data);

            });

    }, [token]);

    const handledata  = async (selected) =>  {


        try {
            axios
                .post(baseURL2, {
                    network:selected,
                } )
                .then(response => {
                    setError("");
                    setdatass(response.data);

                    if (response.data.status === "0") {
                        setError(response.data.message);



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

    const handleverify  = async (vertv) =>  {
        setname("Validating IUC Number.......");
        try {
            axios
                .post(baseURL, {
                    network:network,
                    number:vertv,
                } )
                .then(response => {
                    setError("");
                    setname(response.data.message);

                    if (response.data.status === "0") {
                        setError(response.data.message);



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

        if(id === "network"){
            setnetwork(value);
            handledata(value);
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
        if(id === "productid"){
            setproductid(value);
        }





    }

    const handleSubmit  = async () =>  {
        // console.log(name,username,email,number,password,confirmPassword);


        try {
            axios
                .post(baseURL3, {

                    userId:userid,
                    id:productid,
                    number:number,
                    refid:refid,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

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
                        window.location.href = "/tv";
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
                                <h6 className="text-blueGray-700 text-xl font-bold">Tv Cable</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Tv Subscriptions
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Tv Cable
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                            Select Network
                                            </label>
                                            <select name="id" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    onChange = {(e) => handleInputChange(e)} id="network"
                                                    required="">

                                                <option selected="">Select Tv-</option>
                                                <option value="dstv">DSTV</option>
                                                <option value="gotv">GOTV</option>
                                                <option value="startimes">STARTIMES</option>
                                                <option value="showmax">SHOWMAX</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                             Cable Plans
                                            </label>
                                            <select  name="productid" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                     value={productid} onChange = {(e) => handleInputChange(e)} id="productid" required>
                                                <option>Select Dataplan</option>
                                                {datass.map((datab) => (
                                                    <option value={datab.id} id={datab.tamount}>{datab.plan}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                IUC Number
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

                                </div>
                                {name === "" || name === "Validating IUC Number......."?<div></div>: <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Subscribe Now<span className="load loading"></span>
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
