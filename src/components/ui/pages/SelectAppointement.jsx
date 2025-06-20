import React, { useEffect, useState } from 'react';
import Image from '../../utils/Image';
import { loginBanner, logo } from '../../../../imagesPath';
import { useGetAppointmentsQuery } from '../../../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAppointment } from '../../../features/slices/userSlice.js.js';
import PrimaryBtn from '../PrimaryBtn.jsx';
import LongBarSkeltion from '../../utils/longBarSkeltion.jsx';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SelectAppointment = () => {
    const { data, isLoading, isError } = useGetAppointmentsQuery();
    const appointments = data?.data?.events || [];

    const selectedAppointment = useSelector((state) => state.user.selectedAppointment);
    const [selectedId, setSelectedId] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Filter logic
    useEffect(() => {
        const [start, end] = selectedDateRange;

        const filtered = appointments.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(searchTitle.toLowerCase());
            const date = new Date(item.startTime);
            const inRange = (!start || !end) || (date >= start && date <= end);
            return titleMatch && inRange;
        });

        setFilteredAppointments(filtered);
    }, [appointments, searchTitle, selectedDateRange]);

    const handleSelect = (selectedOption) => {
        setSelectedId(selectedOption?.value || '');
        const selected = appointments.find((a) => a.id === selectedOption?.value);
        dispatch(setSelectedAppointment(selected));
    };

    const handleProceed = () => {
        if (selectedAppointment) {
            navigate('/home');
        }
    };

    const handleResetFilters = () => {
        setSearchTitle('');
        setSelectedDateRange([null, null]);
        setFilteredAppointments(appointments);
        setSelectedId('');
    };

    const options = filteredAppointments.map((item) => ({
        value: item.id,
        label: `${item.title} – ${new Date(item.startTime).toLocaleString()}`,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-white overflow-hidden min-h-screen">
            {/* Left Banner */}
            <div className="hidden md:block md:col-span-6">
                <Image img={loginBanner} className="md:h-[600px] ms-auto" />
            </div>

            {/* Right Form Section */}
            <div className="col-span-1 md:col-span-6">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="font-Avenir font-bold text-[28px] text-blue-900 mb-1">
                        Select your Appointment
                    </h1>

                    {/* Filters */}
                    <PrimaryBtn
                        onClick={handleResetFilters}
                        className="border border-secondary px-4 w-full"
                    >
                        <span className='mx-auto'>Reset Filters</span>
                    </PrimaryBtn>
                    <div className="grid grid-cols-2 gap-4 items-end w-full">
                        <input
                            type="text"
                            placeholder="🔍 Search by title..."
                            className="border border-secondary px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-0"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />

                        <DatePicker
                            selectsRange
                            startDate={selectedDateRange[0]}
                            endDate={selectedDateRange[1]}
                            onChange={(update) => setSelectedDateRange(update)}
                            isClearable
                            className="border border-secondary px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-0"
                            placeholderText="📅 Select date range"
                        />

                        <div></div>


                    </div>

                    {/* Appointment Dropdown */}
                    <div className="w-full">
                        <label htmlFor="appointment" className="block mb-3 font-Avenir font-medium text-gray-700 text-[16px]">
                            Please select an Appointment.
                        </label>

                        {isLoading ? (
                            <LongBarSkeltion />
                        ) : isError ? (
                            <p className="text-red-500">Failed to load appointments</p>
                        ) : (
                            <Select
                                id="appointment"
                                options={options}
                                isSearchable
                                value={options.find((opt) => opt.value === selectedId) || null}
                                onChange={handleSelect}
                                placeholder="Search and select an appointment..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        )}
                    </div>

                    {/* Proceed Button */}
                    <PrimaryBtn
                        className="w-full bg-primary"
                        onClick={handleProceed}
                        disabled={!selectedId}
                    >
                        <span className="mx-auto">Select Appointment</span>
                    </PrimaryBtn>
                </div>
            </div>
        </div>
    );
};

export default SelectAppointment;
