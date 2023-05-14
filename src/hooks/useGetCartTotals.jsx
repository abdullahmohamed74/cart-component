const useGetCartTotals = (cart) => {
  // let totalAmount = 0;
  // let totalPrice = 0;

  // cart.forEach((item) => {
  //   const { price, amount } = item;

  //   totalAmount += amount;
  //   totalPrice += amount * price;
  // });

  const cartArray = [...cart.values()];

  // using reduce() method to calculate totalPrice, totalAmount in one step
  const [totalPrice, totalAmount] = cartArray.reduce(
    (acc, item) => {
      const { price, amount } = item;
      return [acc[0] + amount * price, acc[1] + amount];
    },
    [0, 0]
  );

  return { totalPrice, totalAmount };
};
export default useGetCartTotals;
