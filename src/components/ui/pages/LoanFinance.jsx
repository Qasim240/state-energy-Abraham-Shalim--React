/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PrimaryBtn from '../PrimaryBtn';
import IconHeading from '../../utils/IconHeading';
import {
  infoCircleIcon,
  supportIcon,
  mosaicLogo,
  reviewFinancial,
  downloadIcon,
} from '../../../../imagesPath';
import PriceCard from '../PriceCard';
import { fontMedium } from '../../utils/fontMedium';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useCreateOrderMutation,
  useGetFinanceAprOptionsQuery,
  useLazyCalculateFinancingAmountQuery,
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const LoanFinance = () => {
  const user = useSelector((s) => s.user.user);
  const selectedAppointment = useSelector((s) => s.user.selectedAppointment);

  const utilityBill = useSelector((s) => s.user.utilityBill);
  const insuranceBill = useSelector((s) => s.user.insuranceBill);





  /* APR list */
  const {
    data: aprData,
    isLoading: aprLoading,
    isError: aprError,
  } = useGetFinanceAprOptionsQuery();

  /* monthly-payment calculator */
  const [
    triggerCalc,
    { data: calcResp, isFetching: calcLoading },
  ] = useLazyCalculateFinancingAmountQuery();
  const paymentData = calcResp?.data ?? {}; // { mosaic_amount, renew_solar_amount }

  /* order creation */
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  /* ───── local state ───── */
  const [selectedLoan, setSelectedLoan] = useState('mosaic');
  const [selectedApr, setSelectedApr] = useState({
    mosaic: undefined,
    renew_solar: undefined,
  });

  /* trigger calculator whenever either APR is set */
  useEffect(() => {
    if (
      selectedApr.mosaic === undefined &&
      selectedApr.renew_solar === undefined
    )
      return;

    triggerCalc({
      mosaic_apr: selectedApr.mosaic ?? 0,
      renew_solar_apr: selectedApr.renew_solar ?? 0,
    });
  }, [selectedApr, triggerCalc]);

  const handleAprChange = (provider, apr) =>
    setSelectedApr((prev) => ({ ...prev, [provider]: parseFloat(apr) }));

  /* card data */
  const loanOptions = [
    {
      id: 'mosaic',
      img: mosaicLogo,
      amount: paymentData.mosaic_amount ?? 0,
    },
    {
      id: 'renew_solar',
      img: reviewFinancial,
      amount: paymentData.renew_solar_amount ?? 0,
    },
  ];

  /* build order payload */
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
    loan_financed_amount:
      paymentData?.[`${selectedLoan}_amount`]?.toString() || '0',
    monthly_utility_bill: user?.utilityBill?.toString() || '0',
    monthly_insurance_bill: user?.insuranceBill?.toString() || '0',
    finance_provider: selectedLoan,
    apr_selected: selectedApr[selectedLoan],
    monthly_utility_bill: utilityBill?.toString() || '0',
    monthly_insurance_bill: insuranceBill?.toString() || '0',
  });

  const tryCreateOrder = async (redirect) => {
    try {
      const res = await createOrder(getOrderPayload()).unwrap();
      if (res?.success) {
        toast.success('Order created successfully.');
        toast.success('Contract sent to user email!');
      } else {
        toast.error('Failed to create order.');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Error creating order.');
    }
  };

  /* ───── render ───── */
  if (aprLoading)
    return <p className="text-center py-10">Loading finance options…</p>;
  if (aprError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load APR options.
      </p>
    );

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
      {/* Left column */}
      <div className="md:col-span-8 pr-2">
        {/* <div className="flex justify-between items-center">
          <PrimaryBtn className="bg-transparent px-0 py-0 ms-auto">
            <span className="underline text-base-red text-[14px]">Skip</span>
          </PrimaryBtn>
        </div> */}

        <hr className="my-4" />
        <IconHeading
          className="lg:text-[16px] text-[12px]"
          primaryIcon={supportIcon}
          headingText="Loan Finance"
          secondaryIcon={infoCircleIcon}
        />

        {/* provider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {loanOptions.map((opt) => {
            const aprChosen = selectedApr[opt.id];
            const isActive = selectedLoan === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedLoan(opt.id)}
                className={`border rounded-large p-5 cursor-pointer transition-all duration-200 ${isActive ? 'border-primary shadow-md' : 'border-gray-300'
                  }`}
              >
                <div className="flex flex-col gap-4">
                  <img
                    className={`mx-auto ${isActive ? '' : 'grayscale'}`}
                    src={opt.img}
                    alt="loan-logo"
                  />

                  {/* APR dropdown */}
                  <select
                    className="border rounded px-2 py-1 text-center w-full text-sm"
                    value={aprChosen ?? ''}
                    onChange={(e) =>
                      handleAprChange(opt.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select APR
                    </option>
                    {(aprData?.data?.[opt.id] || []).map(({ apr }) => (
                      <option key={apr} value={apr}>
                        {apr}%
                      </option>
                    ))}
                  </select>

                  {/* monthly payment */}
                  <p
                    className={`text-[14px] text-base-50 ${fontMedium}`}
                  >
                    New Monthly Payment
                  </p>
                  <p
                    className={`text-[24px] ${isActive ? 'text-black' : 'text-base-50'
                      } font-Avenir font-extrabold`}
                  >
                    {calcLoading && aprChosen !== undefined
                      ? '…'
                      : `$${opt.amount.toFixed(2)}`}
                  </p>
                  {/* caption */}
                  <p className="text-xs text-gray-500">
                    APR&nbsp;
                    {aprChosen !== undefined ? `${aprChosen}%` : '—'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right column */}
      <div className="md:col-span-4 mt-6 md:mt-[40px]">
        <PriceCard
          loanFinance={paymentData?.[`${selectedLoan}_amount`] ?? 0}
        />

        {/* <div className="flex items-center justify-center gap-4"> */}
        <PrimaryBtn
          className="mt-4 px-3 w-full"
          onClick={() => tryCreateOrder(true)}
          disabled={orderLoading}
        >
          <span className='mx-auto'>  {orderLoading ? 'Processing…' : 'Send contract'}</span>
        </PrimaryBtn>

        {/* <PrimaryBtn
            className="mt-4 px-3"
            onClick={() => tryCreateOrder(false)}
            disabled={orderLoading}
          >
            {orderLoading ? 'Sending…' : 'Send Contract'}
          </PrimaryBtn> */}
        {/* </div> */}

        <div className="flex items-center justify-center gap-4 mt-4">
          <PrimaryBtn
            className="px-0 py-0 bg-transparent"
            iconLeft={downloadIcon}
          >
            <span className="text-base-dark underline font-Avenir font-medium">
              Download this order
            </span>
          </PrimaryBtn>
          <span
            className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}
          >
            PDF
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanFinance;
