import React, { useState } from 'react';
import Image from '../../utils/Image';
import { loginBanner, logo } from '../../../../imagesPath';
import { useGetAppointmentsQuery } from '../../../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAppointment } from '../../../features/slices/userSlice.js';
import PrimaryBtn from '../PrimaryBtn.jsx';
import LongBarSkeltion from '../../utils/longBarSkeltion.jsx';

const SelectAppointment = () => {
    const { data, isLoading, isError } = useGetAppointmentsQuery();
    const appointments = data?.data?.events || [];
    const selectedAppointment = useSelector((state) => state.user.selectedAppointment);


    const [selectedId, setSelectedId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSelect = (e) => {
        const selectedItemId = e.target.value;
        setSelectedId(() => selectedItemId);
        const selected = appointments.find((a) => a.id === selectedId);
        dispatch(setSelectedAppointment(selected));
    };


    const handleProceed = () => {
        if (selectedAppointment) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-8 gap-10 bg-white">
            <div className="hidden md:flex md:col-span-4 items-center justify-end">
                <Image img={loginBanner} className="w-full h-full object-cover" />
            </div>

            <div className="col-span-1 md:col-span-4 relative flex items-center md:p-8">
                <img src={logo} alt="Logo" className="absolute top-12 left-8 w-32 md:w-36" />

                <div className="w-full max-w-md space-y-6 mt-20 lg:m-0 mx-auto lg:p-0 p-5">
                    <h1 className="font-Avenir font-bold text-[28px] text-blue-900 mb-1">
                        Select your Appointment
                    </h1>


                    <div className="w-full">
                        <label
                            htmlFor="appointment"
                            className="block mb-3 font-Avenir font-medium text-gray-700 text-[16px]">
                            Please select an Appointment.
                        </label>

                        {isLoading ? (
                            // <p className="text-gray-500">Loading appointments...</p>
                            <LongBarSkeltion />
                        ) : isError ? (
                            <p className="text-red-500">Failed to load appointments</p>
                        ) : (
                            <select
                                id="appointment"
                                required
                                value={selectedId}
                                onChange={handleSelect}
                                className="w-full border border-gray-300 rounded-large px-5 py-4 font-Avenir text-gray-700 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-md"
                            >
                                <option value="" disabled>
                                    Select a location
                                </option>
                                {appointments.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title} – {new Date(item.startTime).toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <PrimaryBtn
                            className='w-full bg-primary'
                            onClick={handleProceed}
                            disabled={!selectedId}
                        >
                            <span className='mx-auto'>Select Appointement</span>

                        </PrimaryBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectAppointment;
