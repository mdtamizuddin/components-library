import Link from 'next/link'
import React from 'react'

const Tutorials = () => {
    return (
        <div className='w-full'>
            <h1 className='text-center text-4xl font-bold text-secondary'>Development Sortcuts</h1>

            <div style={{
                backgroundImage: `url(https://coursework.vschool.io/content/images/2017/08/react-banner.png)`,
                backgroundPosition: "center",
                backgroundSize: "contain"
            }} className="card card-overlay h-28 mt-10 shadow">
                <Link href={'/tutorial/react'}>
                    <div className="overlay  justify-center items-center h-full bg-slate-700 cursor-pointer">
                        <h2 className='text-xl text-primary z-50'>Click Here For Explore</h2>
                    </div>
                </Link>
            </div>

            <div style={{
                backgroundImage: `url(https://camo.githubusercontent.com/54d64f1260052c96ce70c540bd64ee83edbe865aa765941bbc012821744fe265/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67)`,
                backgroundPosition: "center",
                backgroundSize: "contain"
            }} className="card card-overlay h-28 mt-10 shadow">
                <Link href={'/tutorial/next'}>
                    <div className="overlay  justify-center items-center h-full bg-slate-700 cursor-pointer">
                        <h2 className='text-xl text-primary z-50'>Click Here For Explore</h2>
                    </div>
                </Link>
            </div>
            <div style={{
                backgroundImage: `url(https://coursework.vschool.io/content/images/2017/12/Image-result-for-node-modules-photo-banner.png)`,
                backgroundPosition: "center",
                backgroundSize: "contain"
            }} className="card card-overlay h-28 mt-10 shadow">
                <Link href={'/tutorial/node'}>
                    <div className="overlay  justify-center items-center h-full bg-slate-700 cursor-pointer">
                        <h2 className='text-xl text-primary z-50'>Click Here For Explore</h2>
                    </div>
                </Link>
            </div>
            <div style={{
                backgroundImage: `url(https://miro.medium.com/max/1200/0*lnZCYRC1q9yWePxF.png)`,
                backgroundPosition: "center",
                backgroundSize: "contain"
            }} className="card card-overlay h-28 mt-10 shadow">
                <Link href={'/tutorial/mongodb'}>
                    <div className="overlay  justify-center items-center h-full bg-slate-700 cursor-pointer">
                        <h2 className='text-xl text-primary z-50'>Click Here For Explore</h2>
                    </div>
                </Link>
            </div>
            <div style={{
                backgroundImage: `url(https://miro.medium.com/max/1050/1*acfAKaDI7uv5GyFnJmiPhA.png)`,
                backgroundPosition: "center",
                backgroundSize: "contain"
            }} className="card card-overlay h-28 mt-10 shadow">
                <Link href={'/tutorial/mongoose'}>
                    <div className="overlay  justify-center items-center h-full bg-slate-700 cursor-pointer">
                        <h2 className='text-xl text-primary z-50'>Click Here For Explore</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Tutorials