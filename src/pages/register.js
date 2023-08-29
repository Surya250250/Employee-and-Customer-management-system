import { useState, useEffect, useContext } from "react"
import { baseurl } from "../shared"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginContext } from "../App"

export default function Register() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const [loggedIn, setloggedIn] = useContext(LoginContext)

    useEffect(() => {
        localStorage.clear()
        setloggedIn(false)
    })

    const login = async (e) => {
        e.preventDefault()
        const url = baseurl + "api/register"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            }

            ),


        })
        const data = await response.json()
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        console.log(localStorage.getItem('access'))
        setloggedIn(true)
        navigate(location.state?.previousUrl ? location.state.previousUrl : '/customers')


    }
    return (
        <form id="login" className=" w-full max-w-sm my-2" >

            {/* ... other elements ... */}
            <div className="md:flex md:items-center mb-6">
                <div className="mb:w-1/4 ">
                    <label htmlFor="username"> Username </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        className="ml-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setusername(e.target.value)

                        }}
                    />




                </div>



            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="mb:w-1/4 ">
                    <label htmlFor="email"> Email </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        className="ml-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value)

                        }}
                    />




                </div>



            </div>



            <div className="md:flex md:items-center mb-6">
                <div className="mb:w-1/4 ">
                    <label htmlFor="password">

                        Password</label>
                </div>
                <div className="md:w-3/4">
                    <input
                        className="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value)
                            // compareCustomers(customer, tempcustomer);


                        }}
                    />
                </div>
            </div>



            <>

                <div className="my-2">
                    <button className="  mr-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        form="login"
                        onClick={login}>Register</button>



                </div>
            </>



        </form>
    )
}