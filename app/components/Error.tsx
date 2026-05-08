"use client"

const Error = () => {
    const reload = () => {
        location.reload();
    }
    
    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-gray-500">
            <p className="font-semibold text-center">Our services are currently unavailable. <br/>Please try again later</p>
            <p onClick={() => reload()} className="underline cursor-pointer text-xs">Click here to reload</p>
        </div>
    )
}

export default Error;