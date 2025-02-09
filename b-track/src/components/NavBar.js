export default function NavBar() {
    return (
        <>
            <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
                <div className="flex-none hidden lg:flex">
                    <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>               
                    </svg>
                    </button>
                </div> 
                <div className="flex-1 hidden px-2 mx-2 lg:flex">
                    <span className="text-lg font-bold">
                            B-TRACK
                        </span>
                </div> 
                <div className="flex-none">
                    <div className="avatar">
                    <div className="rounded-full w-10 h-10 m-1">
                        <img src="https://i.pravatar.cc/500?img=32" alt=''/>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}