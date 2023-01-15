/*eslint-disable*/

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import   'load.css';

import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
  const baseURL1 = "https://server.savebills.com.ng/api/auth/signout";


  const [totaldeposit, setTotaldeposit] = useState("0");
  const [totalbill, setTotalbill] = useState("0");
  const [username, setusername] = useState("");
  const [balance, setBalance] = useState("0");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const [all, setall] = React.useState([]);
  let token=localStorage.getItem('dataKey');
  React.useEffect(() => {
    axios
        .get(baseURL, {
          // username:useCookies('username'),
          headers:{
            Authorization: `Bearer ${token}`
          },

        })
        .then(response => {
          setError("");
          setMessage(response);

          if (response.data.status ==="0"){
            window.location='login';
          }
          console.log(response.data);
          setusername(response.data.username);
          setName(response.data.username);
          setEmail(response.data.email);
          setBalance(response.data.wallet);
          setName(response.data.name);
          setTotalbill(response.data.totalbill);
          setTotaldeposit(response.data.totaldeposit);
          setall(response.data.bills);

          setMessage(response.data.message);


          setPost(response.data);
        });

  }, []);

  const handleSubmit  = async () =>  {

    try {
      axios
          .post(baseURL1)
          .then(response => {
            // setError("");
            // setMessage(response);

            if (response.data.status === "0") {
              // setError(response.data.message);


            }else{
              // setMessage(response.data.message);
              localStorage.removeItem('dataKey');
              // const [cookies, setCookie] = useCookies(response.data.username);
              swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
              }).then(function () {
                // Redirect the user
                window.location.href = "/";
              });
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      // setError("An error occured. Check your input and try again");
    }
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            {name}
          </Link>
          {/* User */}
          <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
            Logout
          </button>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    {username}
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Users Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/fund") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/fund"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/fund") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Fund Wallet
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/settings"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Profile
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/createlock") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/createlock"
                >
                  <i
                    className={
                      "fas fa-money-bill mr-2 text-sm " +
                      (window.location.href.indexOf("/createlock") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Create Lock Wallet
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/addlock") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/addlock"
                >
                  <i
                    className={
                      "fas fa-money-bill mr-2 text-sm " +
                      (window.location.href.indexOf("/addlock") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Add To Savelock
                </Link>
              </li>


            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Product Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/airtime"
                >
                  <i className="fas fa-phone text-blueGray-400 mr-2 text-sm"></i>{" "}
               Buy Airtime
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/data"
                >
                  <i className="fas fa-mobile text-blueGray-400 mr-2 text-sm"></i>{" "}
               Buy Data
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/tv"
                >
                  <i className="fas fa-podcast text-blueGray-400 mr-2 text-sm"></i>{" "}
               Tv Subscription
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/elect"
                >
                  <i className="fas fa-power-off text-blueGray-400 mr-2 text-sm"></i>{" "}
               Electricity
                </Link>
              </li>

            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
             Transactions
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/deposit"
                >
                  <i className="fas fa-money-bill text-blueGray-400 mr-2 text-sm"></i>{" "}
                  All Deposit
                </Link>
              </li>

              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/purchase"
                >
                  <i className="fas fa-money-bill text-blueGray-400 mr-2 text-sm"></i>{" "}
                  All Purchase
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
