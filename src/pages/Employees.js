
import '../App.css';
import { useState, useEffect } from 'react';
import Employee from '../Employee';
import { v4 as uuid } from "uuid";
import AddEmployee from '../AddEmoployee';
import EditEmployee from '../EditEmployee';
import Header from '../components/Header';
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseurl } from "../shared";

import { LoginContext } from "../App";



function Employees() {

    const [employees, setemployees] = useState([])
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            if (!loggedIn) { // Check if the user is logged in before making the fetch request
                navigate("/login");
                return;
            }

            try {
                const url = baseurl + "api/employees/";
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

                setemployees(data.employees);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const update = async (data) => {
        try {

            const url = baseurl + 'api/employees/' + data.id;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setLoggedIn(false)
                    navigate('/login')
                }
                else {
                    throw new Error('Something went wrong');
                }
            }

            const newdata = await response.json(); // Await for the JSON data



        } catch (e) {
            console.log(e.message)
        }
    };
    const newemployee = async (newname, newrole, newimg) => {
        const url = baseurl + "api/employees/";
        const data = { name: newname, role: newrole, img: newimg };

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
            setemployees([...employees, newdata.employee]);

        } catch (e) {
            console.log(e);
        }
    };



    const showEmployees = true;
    return (
        <div >

            {showEmployees ? (
                <>

                    <div className='flex flex-wrap justify-center'>
                        {employees.map((e) => {
                            const editEmployee = <EditEmployee
                                id={e.id}
                                name={e.name}
                                role={e.role}
                                img={e.img}
                                update={update} />



                            return (
                                <Employee key={e.id}
                                    id={e.id}
                                    name={e.name}
                                    img={e.img}
                                    role={e.role}
                                    editEmployee={editEmployee} />
                            )
                        }
                        )
                        }

                    </div>
                    <AddEmployee newemployee={newemployee} />

                </>
            ) :
                <h1> No employees to show</h1>
            }

        </div>
    );
}

export default Employees;
