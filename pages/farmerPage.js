import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT
import {
  FarmerTable,
  FormFarmer,
 
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const farmerPage = () => {
  const {
    createFarmerCBC,
    getAllShipment,
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createFarmerCBCModel, setcreateFarmerCBCModel] = useState(false);
  //DATA STATE VARIABLE
  const [allFarmersdata, setallFarmersdata] = useState([]);

  useEffect(() => {
    getAllFarmer().then((response) => {
        setallFarmersdata(response);
    });
  }, [allFarmersdata]);

  return (
    <>
      <FormFarmer
        createShipmentModel={createFarmerCBCModel}
        createFarmerCBC={createFarmerCBC}
        setcreateFarmerCBCModel={setcreateFarmerCBCModel}
      /> 
        <FarmerTable
        setcreateFarmerCBCModel={setcreateFarmerCBCModel}
        allFarmersdata={allFarmersdata}
      />
    </>
  );
};

export default farmerPage;