import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseurl } from "../shared";
import Addcustomer from "./Addcustomer";
import { LoginContext } from "../App";

export default function Customers() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [customers, setCustomers] = useState([]); // Initialize with an empty array
    const navigate = useNavigate();

    const newcustomer = async (newname, newindustry) => {
        const url = baseurl + "api/customers/";
        const data = { name: newname, industry: newindustry };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const newdata = await response.json();
            console.log(newdata);
            setCustomers([...customers, newdata.customers]);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (!loggedIn) { // Check if the user is logged in before making the fetch request
                navigate("/login");
                return;
            }

            try {
                const url = baseurl + "api/customers/";
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });

                if (response.status === 401) {
                    setLoggedIn(false);
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                setCustomers(data.customers);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [loggedIn, navigate, setLoggedIn]);

    return (
        <>
            <h1 className="my-1">Here are our customers:</h1>

            {customers.map((e) => (
                <div className="my-2" key={e.id}>
                    <Link to={"/customers/" + e.id}>
                        <button className="no-underline bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded">
                            {e.name}
                        </button>
                    </Link>
                </div>
            ))}

            <Addcustomer newcustomer={newcustomer} />
        </>
    );
}
