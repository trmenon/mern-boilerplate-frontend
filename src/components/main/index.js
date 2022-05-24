import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { GateComponent, UserComponent} from '../pages';
import {
    FeatureOne,
    FeatureTwo,
    FeatureThree,
    FeatureFour
} from '../widgets';

function Template(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GateComponent/> }/>
                <Route path="/user" element={<UserComponent/>}>
                    <Route path="feature1" element={<FeatureOne/>}/>
                    <Route path="feature2" element={<FeatureTwo/>}/>
                    <Route path="feature3" element={<FeatureThree/>}/>
                    <Route path="feature4" element={<FeatureFour/>}/>
                </Route>
            </Routes>        
        </BrowserRouter>
    );
}


export default Template;