import React, { useState } from 'react';
import PrimaryBtn from '../PrimaryBtn';
import IconHeading from '../../utils/IconHeading';
import { infoCircleIcon, supportIcon, mosaicLogo, reviewFinancial, downloadIcon } from '../../../../imagesPath';
import PriceCard from '../PriceCard';
import { fontMedium } from '../../utils/fontMedium';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const LoanFinance = () => {
  const [selectedLoan, setSelectedLoan] = useState('mosaic');
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);
  const selectedAppointment = useSelector(state => state.user.selectedAppointment);

  const loanOptions = [
    { id: 'mosaic', img: mosaicLogo, amount: 130.0 },
    { id: 'review_financial', img: reviewFinancial, amount: 246.0 },
  ];

  // Common payload for both buttons
  const getOrderPayload = () => ({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone_number: user?.phone,
    zip_code: user?.zip_code,
    city: user?.city,
    address: user?.address || '-',
    appointment_id: selectedAppointment?.appointmentId,
    contact_id: selectedAppointment?.contactId,
    loan_financed_amount: user?.utilityBill?.toString() || '0',
    monthly_utility_bill: user?.utilityBill?.toString() || '0',
    monthly_insurance_bill: user?.insuranceBill?.toString() || '0',
    finance_provider: selectedLoan,
  });

  // 🟢 Create and redirect to signature
  const handleContinue = async () => {
    try {
      const res = await createOrder(getOrderPayload()).unwrap();
      if (res?.success) {
        toast.success('Order created successfully.');
        navigate('/customer-signature');
      } else {
        toast.error('Failed to create order.');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Error creating order.');
    }
  };

  // 🟡 Create and send public URL (no redirect)
  const handleSendContract = async () => {
    try {
      const res = await createOrder(getOrderPayload()).unwrap();
      if (res?.success) {
        const url = res?.data?.public_url;
        if (url) {
          toast.success('Contract sent to user email!');
        } else {
          toast.warning('Order created but public URL missing.');
        }
      } else {
        toast.error('Failed to create and send contract.');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Error sending contract.');
    }
  };

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
      <div className="md:col-span-8 pr-2">
        <div className="flex justify-between items-center">
          <nav className="flex py-3 text-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center"><span className="font-medium text-sm text-base-50">Cart Items</span></li>
              <li className="inline-flex items-center"><span className="font-medium text-sm text-base-50">Customer Info</span></li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg width="8" height="8" fill="#D9D9D9"><circle cx="4" cy="4" r="4" /></svg>
                  <span className="ms-1 text-sm font-medium md:ms-2 text-base">Loan Finance</span>
                </div>
              </li>
            </ol>
          </nav>
          <PrimaryBtn className="bg-transparent px-[0] py-[0]">
            <span className="underline text-base-red text-[14px]">Skip</span>
          </PrimaryBtn>
        </div>

        <hr className="my-4" />
        <IconHeading className="lg:text-[16px] text-[12px]" primaryIcon={supportIcon} headingText="Loan Finance" secondaryIcon={infoCircleIcon} />

        <form className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loanOptions.map(option => (
              <div
                key={option.id}
                onClick={() => setSelectedLoan(option.id)}
                className={`border rounded-large p-5 cursor-pointer text-center transition-all duration-200 ${selectedLoan === option.id ? 'border-primary shadow-md' : 'border-gray-300'}`}
              >
                <div className="flex flex-col gap-3">
                  <img className={`mx-auto ${selectedLoan !== option.id ? 'grayscale' : ''}`} src={option.img} alt="loan-logo" />
                  <p className={`text-[14px] text-base-50 ${fontMedium}`}>New Monthly Payment</p>
                  <p className={`text-[24px] ${selectedLoan !== option.id ? 'text-base-50' : 'text-black'} font-Avenir font-extrabold`}>${option.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className="md:col-span-4 mt-6 md:mt-[40px]">
        <PriceCard />

        <div className="flex items-center justify-center gap-4">
          <PrimaryBtn className="mt-4 px-3" onClick={handleContinue} disabled={isLoading}>
            <span className="mx-auto">{isLoading ? 'Processing...' : 'Continue'}</span>
          </PrimaryBtn>
          <PrimaryBtn className="mt-4 px-3" onClick={handleSendContract} disabled={isLoading}>
            <span className="mx-auto">{isLoading ? 'Sending...' : 'Send Contract'}</span>
          </PrimaryBtn>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <PrimaryBtn className="px-[0] py-[0] bg-transparent" iconLeft={downloadIcon}>
            <span className="text-base-dark underline font-Avenir font-medium">Download this order</span>
          </PrimaryBtn>
          <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>PDF</span>
        </div>
      </div>
    </div>
  );
};

export default LoanFinance;
