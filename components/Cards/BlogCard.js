import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import RequireAdmin from '../../components/Hooks/RequireAdmin'
import api from '../Hooks/instance';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

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
                 
                    return (
                        <div key={comp._id} className="p-5 shadow mt-5">
                            <h1 className="text-2xl font-bold text-primary mb-3 capitalize">
                                {comp.title}
                            </h1>
                            {
                                comp.visitor > 10
                                &&
                                <p className="flex items-center p-3">
                                    <i class="fa-solid fa-download mr-2"></i>
                                    {comp.visitor} Times
                                </p>
                            }

                            <div className='mt-5 max-h-80 overflow-hidden'>
                                <CodeMirror
                                    value={comp.desc}
                                    height="auto"
                                    theme={oneDark}
                                    extensions={[javascript({ jsx: true })]}
                                    onChange={(value, viewUpdate) => {
                                        setCode(value)
                                    }}
                                />
                            </div>
                            <div className='mt-3 flex'>
                                <div className="avatar">
                                    <div className="w-6  rounded-full">
                                        <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
                                    </div>
                                </div>
                                <p className='ml-2'>{comp?.user?.slice(0, 10)} ...</p>
                            </div>
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

