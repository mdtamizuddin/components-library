import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import RequireAdmin from '../../components/Hooks/RequireAdmin'
import api from '../Hooks/instance';
const Componentcard = ({ data }) => {
    const deleteComp = (id) => {
        const confirm = window.confirm("Are You Sure")
        if (confirm) {
            api.delete(`/api/development/${id}`)
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
                                {comp.title}
                            </h1>
                            {
                                comp.visitor > 10
                                &&
                                <p className="flex items-center p-3">
                                    <i className="fa-solid fa-eye mr-2"></i>
                                    {comp.visitor} Times
                                </p>
                            }

                            <div className='mt-5 max-h-80 overflow-hidden' dangerouslySetInnerHTML={createMarkup()}></div>
                            <div className="flex justify-between">
                                <Link href={`/get/read/${comp._id}`}>
                                    <button className="btn btn-primary btn-sm mt-4">
                                        Read More
                                    </button>
                                </Link>
                                <RequireAdmin>
                                    <Link href={`/edit/post/${comp._id}`}>
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