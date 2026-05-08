const Footer = () => {
    return (
        <div className="absolute bottom-2 text-gray-500 flex items-center justify-center w-full">
            <p className="text-xs font-semibold">Developed and built by Zach Estrella {new Date().getFullYear()} ©</p>
        </div>
    )
}

export default Footer;