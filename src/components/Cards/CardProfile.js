import React, {useState} from "react";
import as from 'assets/img/team-2-800x800.jpg';
import axios from "axios";
import gh from 'lg.png'

// components

export default function CardProfile() {
  const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";

  const [totaldeposit, setTotaldeposit] = useState("0");
  const [totalbill, setTotalbill] = useState("0");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("0");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [account_number, setaccount_number] = useState("0");
  const [account_name, setaccount_name] = useState("0");
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const [all, setall] = React.useState([]);
  let token=localStorage.getItem('dataKey');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

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
          setName(response.data.username);
          setEmail(response.data.email);
          setBalance(response.data.wallet);
          setName(response.data.name);
          setTotalbill(response.data.totalbill);
          setTotaldeposit(response.data.totaldeposit);
          setall(response.data.bills);
          setaccount_number(response.data.account_number1);
          setaccount_name(response.data.account_name1);

          setMessage(response.data.message);
          setLoading(false);


          setPost(response.data);
        });

  }, []);
  return (
    <>
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
          {loading ? <div className="loader-container">
                <div className="spinner"/>
              </div> :
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
                  {email}
                </div>
                {/*<div className="mb-2 text-blueGray-600 mt-10">*/}
                {/*  <i className="fas fa-wallet mr-2 text-lg text-blueGray-400"></i>*/}
                {/*  Account Name: {account_name}*/}
                {/*</div>*/}
                {/*<div className="mb-2 text-blueGray-600">*/}
                {/*  <i className="fas fa-wallet mr-2 text-lg text-blueGray-400"></i>*/}
                {/*  Account Number: {account_number}*/}
                {/*</div>*/}
              </div>
          }
        </div>
      </div>
    </>
  );
}
