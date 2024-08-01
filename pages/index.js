import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
  Table,
  Form,
  FormFarmer,
  FormLBC,
  FarmerProductForm,
  LBCProductForm,
  QCCForm,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const Index = () => {
  const {
    currentUser,
    createShipment,
    createFarmerProduct,
    createLBCProduct,
    createQCC,
    registerFarmer,
    registerLBC,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [createFarmerProductModel, setCreateFarmerProductModel] = useState(false);
  const [createLBCProductModel, setCreateLBCProductModel] = useState(false);
  const [createQCCModel, setCreateQCCModel] = useState(false);
  const [registerFarmerModel, setRegisterFarmerModel] = useState(false);
  const [registerLBCModel, setRegisterLBCModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  //DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState([]);

  useEffect(() => {
    getAllShipment().then((response) => {
      setallShipmentsdata(response);
    });
  }, [getAllShipment]);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <FarmerProductForm
        createFarmerProductModel={createFarmerProductModel}
        createFarmerProduct={createFarmerProduct}
        setCreateFarmerProductModel={setCreateFarmerProductModel}
      />
      <LBCProductForm
        createLBCProductModel={createLBCProductModel}
        createLBCProduct={createLBCProduct}
        setCreateFarmerLBCModel={setCreateLBCProductModel}
      />
      <QCCForm
        createQCCModel={createQCCModel}
        createQCC={createQCC}
        setCreateQCCModel={setCreateQCCModel}
      />
      <FormFarmer
        registerFarmerModel={registerFarmerModel}
        registerFarmer={registerFarmer}
        setRegisterFarmerModel={setRegisterFarmerModel}
      />
      <FormLBC
        registerLBCModel={registerLBCModel}
        registerLBC={registerLBC}
        setRegisterLBCModel={setRegisterLBCModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
};

export default Index;