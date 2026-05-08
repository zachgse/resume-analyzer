import { Oval } from "react-loader-spinner"

const Loading = () => {
    return  (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-gray-500">
            <Oval visible={true}
                height="60"
                width="60"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="black" 
                secondaryColor="black" />
                Generating your resume ...
        </div>
    )
}

export default Loading;