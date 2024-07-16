import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
    FarmerTable,
    FormFarmer,

} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const farmerPage = () => {
    const {
        registerFarmer,
        getallFarmersDB,
    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [registerFarmerModel, setRegisterFarmerModel] = useState(false);
    //DATA STATE VARIABLE
    const [allFarmersdata, setallFarmersdata] = useState([]);

    useEffect(() => {
        getallFarmersDB().then((response) => {
            setallFarmersdata(response);
        });
    }, [allFarmersdata]);

    return (
        <>
            <FormFarmer
                registerFarmerModel={registerFarmerModel}
                registerFarmer={registerFarmer}
                setRegisterFarmerModel={setRegisterFarmerModel}
            />
            <FarmerTable
                setRegisterFarmerModel={setRegisterFarmerModel}
                allFarmersdata={allFarmersdata}
            />
        </>
    );
};

export default farmerPage;