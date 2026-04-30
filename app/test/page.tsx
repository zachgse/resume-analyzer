"use client"
import React from "react";

const PageTest = () => {
    const [dragging,setDragging] = React.useState<boolean>(false);

    const handleDrop = (e:React.DragEvent) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            console.log("Dropped file:", file);
        }
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="lg:w-3/5 md:w-4/5 w-full grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-4 md:p-0 p-4">
                <div className="flex flex-col space-y-4">
                    <div className="w-full flex items-start gap-4">
                        <div className="w-1/5">
                            <p className="break-words">Job Title</p>
                        </div>
                        <div className="w-4/5">
                            <input type="text" className="w-full h-12 border border-gray-300 rounded-lg p-4"/>
                        </div>
                    </div>
                    <div className="w-full flex items-start gap-4">
                        <div className="w-1/5">
                            <p className="break-words">Location</p>
                            {/* countries API */}
                        </div>
                        <div className="w-4/5">
                            <input type="text" className="w-full h-12 border border-gray-300 rounded-lg p-4"/>
                        </div>
                    </div>
                    <div className="w-full flex items-start gap-4">
                        <div className="w-1/5">
                            <p className="break-words">Job Description</p>
                        </div>
                        <div className="w-4/5">
                            <textarea className="w-full h-96 border border-gray-300 rounded-lg p-4 overflow-y-auto"/>
                        </div>
                    </div>
                </div>
                {/* study drag files */}
                <div className="flex flex-col gap-4">
                    <div
                        onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        className={`w-full md:h-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg transition 
                        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                    >
                        <label className="cursor-pointer text-gray-500 text-center">
                        <p className="font-medium">
                            {dragging ? "Drop your resume here" : "Drag your resume here"}
                        </p>
                        <p className="text-sm">or click to upload</p>

                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => console.log(e.target.files ? e.target.files[0] : "test")}
                        />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-500 w-fit h-12 rounded-lg text-white text-sm px-8 cursor-pointer hover:opacity-80">
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTest;