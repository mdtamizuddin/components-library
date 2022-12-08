import Link from 'next/link';
import React from 'react'
import RequireAdmin from '../../components/Hooks/RequireAdmin'
const Componentcard = ({ data }) => {
    function singularize(word) {
        const endings = {
            ves: 'fe',
            ies: 'y',
            i: 'us',
            zes: '',
            ses: '',
            es: '',
            s: ''
        };
        return word.replace(
            new RegExp(`(${Object.keys(endings).join('|')})$`),
            r => endings[r]
        );
    }
    const deleteComp = (id) => {
        const confirm = window.confirm("Are You Sure")
        if (confirm) {
            api.delete(`/api/components/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Deleted")
                        window.location.reload()
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        }
    }
    return (
        <div>

            {
                data.map((comp) => {
                    function createMarkup() {
                        return { __html: comp.desc };
                    }
                    return (
                        <div key={comp._id} className="p-5 shadow mt-5">
                            <h1 className="text-2xl font-bold text-primary mb-3 capitalize">
                                {singularize(comp.category)}
                            </h1>
                            {
                                comp.visitor > 10
                                &&
                                <p className="flex items-center p-3">
                                    <i className="fa-solid fa-eye mr-2"></i>
                                    {comp.visitor} Times
                                </p>
                            }
                            {
                                comp.imgMobile
                                &&
                                <h2 className="hidden lg:block">Swithch to the mobile mode for preview of mobile navigation</h2>
                            }
                            <div className={` ${comp.imgMobile ? "lg:block hidden" : "block"}`}>
                                <h2 className="py-2 text-red-500 font-bold">
                                    Image Desktop View
                                </h2>
                                <img className="mx-auto max-h-[500px]" src={comp.img} />
                            </div>
                            <div className={` ${comp.imgMobile ? "lg:hidden block" : "hidden"}`}>
                                <h2 className="py-2 text-red-500 font-bold">
                                    Image Mobile View
                                </h2>
                                <img className="mx-auto max-h-[500px]" src={comp.imgMobile} />
                            </div>
                            <div className='mt-5 max-h-24 overflow-y-auto' dangerouslySetInnerHTML={createMarkup()}></div>
                            <div className='mt-3 flex'>
                                <div className="avatar">
                                    <div className="w-6  rounded-full">
                                        <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
                                    </div>
                                </div>
                                <p className='ml-2'>{comp.user ? comp?.user?.slice(0, 10) : 'Md Tamiz Uddin'} ...</p>
                            </div>
                            <div className="flex justify-between">
                                <Link href={`/get/${comp._id}`}>
                                    <button className="btn btn-primary btn-sm mt-4">
                                        Get Code
                                    </button>
                                </Link>
                                {
                                    comp.status !== 'ok' &&
                                    <button className="btn-xs btn">{comp.status}</button>
                                }
                                <RequireAdmin>
                                    <Link href={`/edit/${comp._id}`}>
                                        <button className="btn btn-success text-white btn-sm mt-4">
                                            Edit Component
                                        </button>
                                    </Link>
                                    <button onClick={() => deleteComp(comp._id)} className="btn btn-error text-white btn-sm mt-4">
                                        Delete
                                    </button>
                                </RequireAdmin>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Componentcard