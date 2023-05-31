import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider"

export default function GuestLayout() {
    const { userToken } = useStateContext();
    if (userToken) {
        return <Navigate to='/' />
    }

    return (

        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-3xl  text-yellow-900 font-bold text-center">OKGO</h1>
                </div>
                <Outlet />
            </div>
        </>


    )
}
