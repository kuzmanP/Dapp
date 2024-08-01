import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
    QCCTable,
    QCCForm,

} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const qccPage = () => {
    const {
        createQCC,
        getallQCCDB,
    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [createQCCModel, setCreateQCCModel] = useState(false);
    //DATA STATE VARIABLE
    const [allQCCdata, setallQCCdata] = useState([]);

    useEffect(() => {
        getallQCCDB().then((response) => {
            setallQCCdata(response);
        });
    }, [getallQCCDB]);

    return (
        <>
            <QCCForm
                createQCCModel={createQCCModel}
                createQCC={createQCC}
                setCreateQCCModel={setCreateQCCModel}
            />
            <QCCTable
                setCreateQCCModel={setCreateQCCModel}
                allQCCdata={allQCCdata}
            />
        </>
    );
};

export default qccPage;