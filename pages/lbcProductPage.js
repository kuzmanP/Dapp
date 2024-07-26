import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
    LBCProductForm,
    LBCProductTable,

} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const lbcProductPage = () => {
    const {
        createLBCProduct,
        getallLBCProductDB,
    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [createLBCProductModel, setCreateLBCProductModel] = useState(false);
    //DATA STATE VARIABLE
    const [allLBCProductdata, setallLBCProductdata] = useState([]);

    useEffect(() => {
        getallLBCProductDB().then((response) => {
            setallLBCProductdata(response);
        });
    }, [allLBCProductdata]);

    return (
        <>

            <LBCProductForm
                createLBCProductModel={createLBCProductModel}
                createLBCProduct={createLBCProduct}
                setCreateFarmerLBCModel={setCreateLBCProductModel}
            />
            <LBCProductTable
                setCreateLBCProductModel={setCreateLBCProductModel}
                allLBCProductdata={allLBCProductdata}
            />
        </>
    );
};

export default lbcProductPage;