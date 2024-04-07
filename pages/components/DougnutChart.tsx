import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function DoughnutChart ({tableName, mobileTable}: {tableName: string, mobileTable: string}) {
const [desktopToCount, setDesktopToCount] = useState(null)
const [macToCount, setMacToCount] = useState(null)
const [laptopToCount, setLaptopToCount] = useState(null)
const [mobileCount, setMobileCount] = useState(null)

const fetchData = async () => {
    try {
      const [desktop, mac, laptop, cellphone] = await Promise.all([
        fetch(`api/${tableName}/computer_type/desktop`),
        fetch(`api/${tableName}/computer_type/mac`),
        fetch(`api/${tableName}/computer_type/laptop`),
        fetch(`api/${mobileTable}/countMobile`)
      ]);
      if (!desktop.ok || !laptop.ok) {
        throw new Error('Failed to fetch data');
      }
      const desktopData = await desktop.json();
      const macData = await mac.json();
      const laptopData = await laptop.json();
      const mobileData = await cellphone.json()
      
      setDesktopToCount(desktopData.count + macData.count);
      setLaptopToCount(laptopData.count);
      setMobileCount(mobileData.count);
    } catch (error) {
      console.error('Error fetching data', error);
      
    }
}
fetchData()
const data = {
    labels: ['Desktop', 'Laptop', 'Mobile'],
    datasets: [
        {
            label: 'No. of Unit/s',
            data: [desktopToCount, laptopToCount, mobileCount],
            backgroundColor: [
                'rgba(255, 0, 0, 0.3)',
                'rgba(255, 147, 0, 0.5)',
                'rgba(0, 157, 0, 1)',
            ],
            borderColor: [
                'rgba(255, 0, 0, 0.3)',
                'rgba(255, 147, 0, 0.5)',
                'rgba(0, 140, 0, 1)',
            ],
            borderWidth: 2,
        },
    ],
};
    return (
    <>
       
            
         
             <Doughnut data = {data} height={311} width={311} className='w-96' />  
        
    </>
    )
}
