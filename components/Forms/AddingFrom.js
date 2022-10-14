const AddingFrom = () => {
    const formSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className='filter-shadow shadow w-full bg-white p-6 mt-10 rounded-lg'>
            <div className="flex justify-end">
                <select className="p-3 bg-transparent">
                    <option value="student">Add Student</option>
                    <option value="teacher">Add Teacher</option>
                    <option value="instractor">Add Instractor</option>
                </select>
            </div>
            <h6 className="text-xl font-bold text-gray-600 my-5">Basic Information</h6>
            <form className="" onSubmit={formSubmit}>
                <div className="adding-form">
                    <input required name="title" type="text" placeholder="Title" />
                    <input required name="firstName" type="text" placeholder="First Name" />
                    <input required name="lastName" type="text" placeholder="Last Name" />
                    <input required name="email" type="email" placeholder="Email ID" />
                    <input required name="phone" type="number" placeholder="Phone Number" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary px-10 mt-10">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddingFrom;