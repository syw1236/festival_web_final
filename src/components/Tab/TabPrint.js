import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../../data/festivalsData';
import Tab from './Tab';
import TabSeason from './TabSeason';
import NavigationBar from "../CommonComp/navigationBar";

//Tab.js와 TabSeason.js 컴포넌트를 출력하는 전체 컴포넌트 TabPrint.js
const TabPrint = () => {

  return (
    <div>
       <NavigationBar backgroundColor={"rgb(206, 220, 255)"} hoverColor={"rgb(145, 176, 255)"} />
       <Tab festivalsData={festivalsData} />
       <TabSeason festivalsData={festivalsData} />
    </div>
  );
}

export default TabPrint;
