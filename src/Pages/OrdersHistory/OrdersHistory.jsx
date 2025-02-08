import React, { useContext, useEffect, useState } from "react";
import { Authcont } from "../../Contexts/Authcontext";
import axios from "axios";
import OrderHisotrycard from "../../Components/Cards/OrderHisotrycard";
import Loading from "../../Components/Loading/loading";

export default function OrdersHistory() {
  const [OrderH, setOrderH] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const { UserId } = useContext(Authcont);

  useEffect(() => {
    if (UserId) {
      GetOrderHistory();
    }
  }, [UserId]);
  if (IsLoading) {
    return <Loading />;
  }
  function GetOrderHistory() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`)
      .then((OHC) => {
        setOrderH(OHC.data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {OrderH.map((OHC, index) => (
        <OrderHisotrycard key={index} item={OHC} />
      ))}
    </>
  );
}
