const StudentEnroll = ({ show, setShow }) => {
    return (
        <div className="mt-10 shadow p-5 bg-white">
            <form className="form-student-enrollment">
                <h2 className="text-xl pt-2 pb-4 text-gray-600 font-bold ">Student Enrollment</h2>
                <input
                    className="w-full"
                    required name="title" type="text" placeholder="Full Name" />
                <div className="grid lg:grid-cols-3 gap-3 mt-3">
                    <select >
                        <option value="1">1st Grade</option>
                        <option value="1">2nd Grade</option>
                        <option value="1">3rd Grade</option>
                        <option value="1">4th Grade</option>
                        <option value="1">5th Grade</option>
                    </select>
                    <select>
                        <option value="1">Physich</option>
                        <option value="1">Chemistry</option>
                        <option value="1">Biology</option>
                    </select>
                    <select >
                        <option value="1">AP Biology 101</option>
                        <option value="1">AP Biology 101</option>
                    </select>
                </div>
                <hr className="mt-20" />
                <h2 className="text-xl pt-2 mt-5 pb-10 text-gray-600 font-bold ">Student Roster</h2>

                <div className="flex items-center">
                    <select >
                        <option value="1">1st Grade</option>
                        <option value="1">2nd Grade</option>
                        <option value="1">3rd Grade</option>
                        <option value="1">4th Grade</option>
                        <option value="1">5th Grade</option>
                    </select>
                    <i className="fa-solid text-xl ml-5 mt-5 fa-screwdriver-wrench"></i>
                    <h4 className="mt-5 ml-4 font-bold">Filter</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress" />
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress 2" />
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress 3" />
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress4" />
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress 5" />
                    <input
                        className="w-full"
                        required name="title" type="text" placeholder="Adress 6" />
                </div>
                <button className="btn btn-primary mt-10 px-10">Assign Student</button>
            </form>
        </div>
    );
}

export default StudentEnroll;