import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
    LBCTable,
    FormLBC,

} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const lbcPage = () => {
    const {
        registerLBC,
        getallLBCDB,
    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [registerLBCModel, setRegisterLBCModel] = useState(false);
    //DATA STATE VARIABLE
    const [allLBCdata, setallLBCdata] = useState([]);

    useEffect(() => {
        getallLBCDB().then((response) => {
            setallLBCdata(response);
        });
    }, [allLBCdata]);

    return (
        <>
            <FormLBC
                registerLBCModel={registerLBCModel}
                registerLBC={registerLBC}
                setRegisterLBCModel={setRegisterLBCModel}
            />
            <LBCTable
                setRegisterLBCModel={setRegisterLBCModel}
                allLBCdata={allLBCdata}
            />
        </>
    );
};

export default lbcPage;