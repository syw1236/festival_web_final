import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../../data/festivalsData';
import Tab from './Tab';
import Tab_Winter from './Tab_Winter';
import NavigationBar from "../CommonComp/navigationBar";

const TabPrint = () => {

  return (
    <div>
        s<NavigationBar backgroundColor={"white"} hoverColor={"yellowgreen"} />
       <Tab festivalsData={festivalsData} />
       <Tab_Winter festivalsData={festivalsData} />
    </div>
  );
}

export default TabPrint;
