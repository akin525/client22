import React, {useState} from "react";
// components
import axios from "axios";
import swal from "sweetalert";
export default function CardSettings() {

  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [userid, setuserid] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setemail]=useState([])
  const [number,setnumber] = useState("");
  const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";

  const btns = document.querySelectorAll('button');
  btns.forEach((items)=>{
    items.addEventListener('click',(evt)=>{
      evt.target.classList.add('activeLoading');
    })
  })
  const baseURL = "https://server.savebills.com.ng/api/auth/profile";
  let token=localStorage.getItem('dataKey');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

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
          setusername(response.data.username);
          setname(response.data.name);
          setemail(response.data.email);
          setnumber(response.data.phone);
          setLoading(false);
          console.log(response.data);

        });

  }, [token]);

  const handleInputChange = (e) => {
    const {id , value} = e.target;

    if(id === "name"){
      setname(value);
    }

    if(id === "number"){
      setnumber(value);
    }
    if(id === "email"){
      setemail(value);
    }





  }


  const handleSubmit  = async () =>  {
    try {
      setLoading(true);

      axios
          .post(baseURL, {

            userId:userid,
            name:name,
            number:number,
            email:email,
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
            // window.location.href = "/data";
          });


        }else{
          setMessage(response.data.message);
          setLoading(false);

          // const [cookies, setCookie] = useCookies(response.data.username);
          swal({
            title: "Success",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(function () {
            // Redirect the user
            window.location.href = "/settings";
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
      {loading ? <div className="loader-container">
            <div className="spinner"/>
          </div> :
          <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">My Account</h6>
                <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={username} onChange={(e) => handleInputChange(e)} id="username"

                          readOnly/>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                          value={email} onChange={(e) => handleInputChange(e)} id="email"

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
                          value={name} onChange={(e) => handleInputChange(e)} id="name"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
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
                          value={number} onChange={(e) => handleInputChange(e)} id="number"

                      />
                    </div>
                  </div>
                </div>
                <button type="button" onClick={handleSubmit}
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Update Profile<span className="load loading"></span>
                </button>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>

              </form>
            </div>
          </div>
      }
    </>
  );
}
