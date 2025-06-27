import React from 'react';
import { useSelector } from 'react-redux';
import EstimatedPriceCard from '../utils/EstimatedPriceCard';

const PriceCard = ({ total, loanFinance = 0 }) => {
  // If total prop not supplied, sum the cart
  const cartSum = useSelector((s) =>
    s.user.cart.reduce((sum, it) => sum + (Number(it.price) || 0), 0)
  );

  return (
    <EstimatedPriceCard
      subtotal={total ?? cartSum}
      loanFinance={loanFinance}
    />
  );
};

export default PriceCard;
