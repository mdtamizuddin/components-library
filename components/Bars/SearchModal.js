import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../Hooks/instance";

const SearhModal = ({ setShow }) => {
    const url = `/api/components/`;
    const [allComp, setComp] = useState([])
    const [searchRes, setRes] = useState("")
    const [searchResult, setResult] = useState([])
    useEffect(() => {
        if (searchRes) {
            const search = allComp.filter(comp => comp.desc.toLowerCase().includes(searchRes.toLowerCase()))
            setResult(search)
        }
        else {
            setResult([])
        }
    }, [searchRes])
    useEffect(() => {
        api.get(url).then((res) => {
            setComp(res.data)
        });
    }, [])
    return (
        <div>
            <div className="modal modal-open">
                <div className="modal-box flex flex-col  relative bg-slate-800">
                    <label
                        onClick={() => setShow(false)}
                        className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <section className="overflow-y-hidden flex  flex-col">
                        <div className="search-box ml-2 mt-4">
                            <input
                                onChange={(e) => {
                                    const text = e.target.value
                                    setRes(text)
                                }
                                }
                                type="text"
                                placeholder="Search"
                                className="focus:outline-primary"
                            />
                            <button>
                                <i className="fa-solid right-7 fa-magnifying-glass"></i>
                            </button>
                        </div>
                        {
                            searchResult.length > 0
                            &&
                            <p className="text-white">Result {searchResult.length}</p>
                        }
                        <div className="overflow-y-scroll h-[800px] mt-6">
                            {
                                searchResult
                                    .map((comp) => {
                                        function createMarkup() {
                                            return { __html: comp.desc };
                                        }
                                        return (
                                            <div key={comp._id} className="p-5 shadow mt-5 bg-white rounded-lg">
                                                <h1 className="text-2xl capitalize font-bold text-primary mb-3">
                                                    {comp.category}
                                                </h1>
                                                <img className="mx-auto max-h-[400px]" src={comp.img} />
                                                <div className="mt-4" dangerouslySetInnerHTML={createMarkup()}></div>
                                                <div className="flex justify-between">
                                                    <Link href={`/get/${comp._id}`}>
                                                        <button className="btn btn-primary btn-sm mt-4">
                                                            Get Code
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}
export default SearhModal