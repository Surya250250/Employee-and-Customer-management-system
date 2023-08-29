import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseurl } from "../shared";
import { useContext } from "react";
import { LoginContext } from "../App";



export default function Customer() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [notfound, setnotfound] = useState(false)
    const [customer, setcustomer] = useState()
    const [tempcustomer, settempcustomer] = useState();
    const [changed, setchanged] = useState(false)
    const [error, seterror] = useState()
    const location = useLocation()
    const [loggedIn, setloggedIn] = useContext(LoginContext)


    useEffect(() => {
        (async () => {
            const url = baseurl + 'api/customers/' + id;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                }
            });

            if (response.status === 404) {
                // Handle 404 response, for example:
                // navigate('/404')
                setnotfound(true);
            }
            else if (response.status >= 500) {
                throw new Error('something went wrong try again later')
            }
            else if (response.status === 401) {
                setloggedIn(false)
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,

                    },

                })
            }
            else {
                try {
                    const data = await response.json();
                    setcustomer(data.customer);
                    settempcustomer(data.customer)
                    seterror(undefined)
                } catch (e) {
                    seterror(e.message)
                    // Handle the error or set the customer data to an appropriate default value
                    // For example, setcustomer({});
                }
            }
        })();

    }, []);

    useEffect(() => {
        if (!customer) return
        try {
            compareCustomers(customer, tempcustomer)
        }
        catch {

        }
    }, [tempcustomer]);

    const deletecustomer = async () => {
        const url = baseurl + 'api/customers/' + id;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            });

            if (response.status === 200) {
                // Redirect to the /customers page after successful deletion
                navigate(-1);
            } else if (response.status === 401) {
                setloggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    },
                });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (e) {
            seterror(e.message);
        }
    };




    const updatecustomer = async (e) => {
        try {
            e.preventDefault()
            const url = baseurl + 'api/customers/' + customer.id;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify(tempcustomer)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setloggedIn(false)
                    navigate('/login')
                }
                else {
                    throw new Error('Something went wrong');
                }
            }

            const newdata = await response.json(); // Await for the JSON data
            setcustomer({ ...newdata.customer })
            settempcustomer({ ...newdata.customer })
            setchanged(false)
            seterror(undefined)
        } catch (e) {
            seterror(e.message)
        }
    };

    const compareCustomers = (customer, tempcustomer) => {
        const keys1 = Object.keys(customer);
        const keys2 = Object.keys(tempcustomer);



        for (const key of keys1) {
            if (customer[key] !== tempcustomer[key]) {
                return setchanged(true);
            }
        }

        return setchanged(false);


    }




    return (
        <>
            {notfound ? <p>The customer with id-{id} was not found</p> : null}


            {customer ? (
                <div className="p-3">
                    <form id="customer" className=" w-full max-w-sm " >

                        {/* ... other elements ... */}
                        <div className="md:flex md:items-center mb-6">
                            <div className="mb:w-1/4 px-3">
                                <label htmlFor="name"> Name </label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    value={tempcustomer.name}
                                    onChange={(e) => {
                                        settempcustomer({ ...tempcustomer, name: e.target.value });
                                        // compareCustomers(customer, tempcustomer);



                                    }}
                                />
                            </div>
                        </div>


                        <div className="md:flex md:items-center mb-6">
                            <div className="mb:w-1/4 px-2">
                                <label htmlFor="industry">Industry</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    id="industry"
                                    value={tempcustomer.industry}
                                    onChange={(e) => {
                                        settempcustomer({ ...tempcustomer, industry: e.target.value });
                                        // compareCustomers(customer, tempcustomer);


                                    }}
                                />
                            </div>
                        </div>


                        {changed ? (
                            <>

                                <div className="my-2">
                                    <button className="  mr-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                        form="customer"
                                        onClick={updatecustomer}>Save</button>


                                    <button className="  bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {

                                            settempcustomer({ ...customer })

                                        }}>Cancel</button>
                                </div>
                            </>
                        ) : null}
                        <div>
                            <button className=" bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                onClick={deletecustomer}>Delete</button>
                        </div>
                    </form>
                </div>
            ) : null}
            {error ? <p>{error}</p> : null}

            <br />
            <Link to="/customers"> <button className="  m-3 no-underline bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded">← Go back</button></Link>
        </>
    );
}
