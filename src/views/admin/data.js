

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";
import gh from "../../lg.png";


export default function Data() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");

    const [network, setnetwork] = useState("");
    const [productid, setproductid] = useState("");
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [refid,setrefid] = useState("");
    const [datass, setdatass]=useState([])
    const [number,setnumber] = useState("");
    const baseURL2 = "https://server.savebills.com.ng/api/auth/data";
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    function myNewFunction(sel) {
        // alert(sel.options[sel.selectedIndex].id);
        document.getElementById("po").value = (sel.options[sel.selectedIndex].id);
        document.getElementById("pk").value = (sel.options[sel.selectedIndex].text);
    }
    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const baseURL = "https://server.savebills.com.ng/api/auth/buydata";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setCollapseShow("hidden")
        setrefid("data"+Math.floor((Math.random() * 1000000000) + 1));

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

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "network"){
            setnetwork(value);
            handledata(value);
        }

        if(id === "number"){
            setnumber(value);
        }
        if(id === "productid"){
            setproductid(value);
            myNewFunction(this);
        }





    }


    const handleSubmit  = async () =>  {


        try {
            axios
                .post(baseURL, {

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
                        window.location.href = "/data";
                    });


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
                                <h6 className="text-blueGray-700 text-xl font-bold">Buy Data</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Data Bundle
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Network Information
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
                                            <select name="network" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={network} onChange = {(e) => handleInputChange(e)} id="network"
                                                    required="">

                                                <option>Select Network</option>
                                                <option value={"mtn-data"} >MTN</option>
                                                <option value={"glo-data"}>GLO</option>
                                                <option value={"etisalat-data"}>9MOBILE</option>
                                                <option value={"airtel-data"}>AIRTEL</option>
                                            </select>
                                        </div>


                                    </div>
                                    <div className="w-full ">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Select Dataplan
                                            </label>
                                            <select  name="productid" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                     value={productid} onChange = {(e) => handleInputChange(e)} id="productid" required>
                                                <option>Select Dataplan</option>
                                                {datass.map((datab) => (
                                                    <option value={datab.id} id={datab.tamount}>{datab.plan}--{datab.tamount}</option>
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
                                               Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={number} onChange = {(e) => handleInputChange(e)} id="number" required/>

                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Buy Now<span className="load loading"></span>
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
                                <p>You can use the codes below to check your Data Balance! </p>

                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info"> MTN [SME] *461*4# or
                                            *556#
                                        </li>
                                        <li className="list-group-item list-group-item-success">MTN [CG] *131*4# or
                                            *460*260#
                                        </li>
                                        <li className="list-group-item list-group-item-action">9mobile [Gifting] *228#
                                        </li>
                                        <li className="list-group-item list-group-item-secondary">Airtel *140#</li>
                                        <li className="list-group-item list-group-item-primary">Glo *127*0#</li>
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
