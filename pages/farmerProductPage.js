import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
    FarmerProductTable,
    FarmerProductForm,

} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const farmerProductPage = () => {
    const {
        createFarmerProduct,
        getallFarmerProductDB,
    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [createFarmerProductModel, setCreateFarmerProductModel] = useState(false);
    //DATA STATE VARIABLE
    const [allFarmerProductdata, setallFarmerProductdata] = useState([]);

    useEffect(() => {
        getallFarmerProductDB().then((response) => {
            setallFarmerProductdata(response);
        });
    }, [allFarmerProductdata]);

    return (
        <>

            <FarmerProductForm
                createFarmerProductModel={createFarmerProductModel}
                createFarmerProduct={createFarmerProduct}
                setCreateFarmerProductModel={setCreateFarmerProductModel}
            />

            <FarmerProductTable
                setCreateFarmerProductModel={setCreateFarmerProductModel}
                allFarmerProductdata={allFarmerProductdata}
            />
        </>
    );
};

export default farmerProductPage;