import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  Title,
  Tooltip,
  Filler,
  Legend,
  
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



export default function AreaChartView({tableName, mobileTable}: {tableName: string, mobileTable: string}) {
    const [gpcDataToCount, setGpcDataToCount] = useState(null)
    const [gpcLaptopToCount, setGpcLaptopToCount] = useState(null)
    const [gpcMobileToCount, setGpcMobileToCount] = useState(null)
    
    const [lsiDataToCount, setLsiDataToCount] = useState(null)
    const [lsiLaptopToCount, setLsiLaptopToCount] = useState(null)
    const [lsiMobileToCount, setLsiMobileToCount] = useState(null)
    
    const [gkcDataToCount, setGkcDataToCount] = useState(null)
    const [gkcLaptopToCount, setGkcLaptopToCount] = useState(null)
    const [gkcMobileToCount, setGkcMobileToCount] = useState(null)
    
    const [gsrcDataToCount, setGsrcDataToCount] = useState(null)
    const [gsrcLaptopToCount, setGsrcLaptopToCount] = useState(null)
    const [gsrcMobileToCount, setGsrcMobileToCount] = useState(null)

    const [dataCounts, setDataCounts] = useState({
      GPC: { desktop: 0, laptop: 0, mac: 0, mobile: 0, totalCPU: 0},
      LSI: { desktop: 0, laptop: 0, mac: 0, mobile: 0, totalCPU: 0},
      GKC: { desktop: 0, laptop: 0, mac: 0, mobile: 0, totalCPU: 0},
      GSRC: { desktop: 0, laptop: 0, mac: 0, mobile: 0, totalCPU: 0},
    })

    useEffect(() => {
      const fetchData = async (url: string, category: string) => {
        try {
          const response = await fetch(url);
          if(!response.ok) throw new Error('Failed to fetch data');
          const json = await response.json()
          return json.count
        } catch(error){
          console.error('Error fetching data:', error)
        }
      }
      const fetchAllData = async () => {
        const urls = [
          `api/gpc_inventory/computer_type/desktop`,
          `api/gpc_inventory/computer_type/laptop`,
          `api/gpc_inventory/computer_type/mac`,
          `api/gpc_mobile_inventory/countMobile`,
          `api/lsi_inventory/computer_type/desktop`,
          `api/lsi_inventory/computer_type/laptop`,
          `api/lsi_inventory/computer_type/mac`,
          `api/lsi_mobile_inventory/countMobile`,
          `api/gkc_inventory/computer_type/desktop`,
          `api/gkc_inventory/computer_type/laptop`,
          `api/gkc_inventory/computer_type/mac`,
          `api/gkc_mobile_inventory/countMobile`,
          `api/gsrc_inventory/computer_type/desktop`,
          `api/gsrc_inventory/computer_type/laptop`,
          `api/gsrc_inventory/computer_type/mac`,
          `api/gsrc_mobile_inventory/countMobile`,
        ];

        const categories = ['GPC', 'GPC', 'GPC', 'GPC', 'LSI', 'LSI', 'LSI', 'LSI', 'GKC', 'GKC', 'GKC', 'GKC', 'GSRC', 'GSRC', 'GSRC', 'GSRC'];

        const counts = await Promise.all(
          urls.map(async (url, index)=> {
            const count = await fetchData(url, categories[index])
            return count;
          })
        );
        setDataCounts({
          GPC: { desktop: counts[0], laptop: counts[1], mac: counts[2], mobile: counts[3], totalCPU: counts[0] + counts[2]},
          LSI: { desktop: counts[4], laptop: counts[5], mac: counts[6], mobile: counts[7], totalCPU: counts[0] + counts[2]},
          GKC: { desktop: counts[8], laptop: counts[9], mac: counts[10], mobile: counts[11], totalCPU: counts[0] + counts[2]},
          GSRC: { desktop: counts[12], laptop: counts[13], mac: counts[14], mobile: counts[15], totalCPU: counts[0] + counts[2]},
        })
      };
      fetchAllData()
    }, [])


// console.log(" Area Chart GPC Data to count", gpcDataToCount)
// const fetchData = async () => {
//     try {
//         const [gpcDesktop, gpcLaptop, gpcMac, gpcMobile, lsiDesktop, lsiLaptop, lsiMac, lsiMobile, gkcDesktop, gkcLaptop, gkcMac, gkcMobile, gsrcDesktop, gsrcLaptop, gsrcMac, gsrcMobile] = await Promise.all([
//           fetch(`/api/gpc_inventory/computer_type/desktop`),
//           fetch(`/api/gpc_inventory/computer_type/laptop`),
//           fetch(`/api/gpc_inventory/computer_type/mac`),
//           fetch(`/api/gpc_mobile_inventory/countMobile`),
  
//           fetch(`/api/lsi_inventory/computer_type/desktop`),
//           fetch(`/api/lsi_inventory/computer_type/laptop`),
//           fetch(`/api/lsi_inventory/computer_type/mac`),
//           fetch(`/api/lsi_mobile_inventory/countMobile`),
  
//           fetch(`/api/gkc_inventory/computer_type/desktop`),
//           fetch(`/api/gkc_inventory/computer_type/laptop`),
//           fetch(`/api/gkc_inventory/computer_type/mac`),
//           fetch(`/api/gkc_mobile_inventory/countMobile`),
  
//           fetch(`/api/gsrc_inventory/computer_type/desktop`),
//           fetch(`/api/gsrc_inventory/computer_type/laptop`),
//           fetch(`/api/gsrc_inventory/computer_type/mac`),
//           fetch(`/api/gsrc_mobile_inventory/countMobile`),
//         ]);
//         if (!gpcDesktop.ok || !lsiDesktop.ok || !gkcDesktop.ok || !gsrcDesktop.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const gpcdesktopData = await gpcDesktop.json();
//         const gpclaptopData = await gpcLaptop.json();
//         const gpcmacData = await gpcMac.json();
//         const gpcMobileData = await gpcMobile.json();
        
//         const lsidesktopData = await lsiDesktop.json();
//         const lsilaptopData = await lsiLaptop.json();
//         const lsimacData = await lsiMac.json();
//         const lsiMobileData = await lsiMobile.json();
  
//         const gkcdesktopData = await gkcDesktop.json();
//         const gkclaptopData = await gkcLaptop.json();
//         const gkcmacData = await gkcMac.json();
//         const gkcMobileData = await gkcMobile.json();
  
//         const gsrcdesktopData = await gsrcDesktop.json();
//         const gsrclaptopData = await gsrcLaptop.json();
//         const gsrcmacpData = await gsrcMac.json();
//         const gsrcMobileData = await gsrcMobile.json();
        
        
//         setGpcDataToCount(gpcdesktopData.count + gpcmacData.count);
//         setGpcLaptopToCount(gpclaptopData.count)
//         setGpcMobileToCount(gpcMobileData.count)
  
//         setLsiDataToCount(lsidesktopData.count + lsimacData.count);
//         setLsiLaptopToCount(lsilaptopData.count)
//         setLsiMobileToCount(lsiMobileData.count)
  
//         setGkcDataToCount(gkcdesktopData.count + gkcmacData.count);
//         setGkcLaptopToCount(gkclaptopData.count)
//         setGkcMobileToCount(gkcMobileData.count)
  
//         setGsrcDataToCount(gsrcdesktopData.count + gsrcmacpData.count);
//         setGsrcLaptopToCount(gsrclaptopData.count)
//         setGsrcMobileToCount(gsrcMobileData.count)
        
//         console.log("counter for mac", gpcmacData)
//       } catch (error) {
//         console.error('Error fetching data', error);
        
//       }
// }
// useEffect(() => {
//   fetchData();
// })



const options = {
    animations : {
        tension: {
            duration: 1500,
            loop: true,
            from: 1,
            to: 0,
        },
    },
   
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Inventory',
        },
        filler: {
            propagate: true,
        },
    },
    
};



const data = {
  labels: ['DESKTOP', 'LAPTOP', 'MOBILE'],
  datasets: [
    {
        fill: false,
        label: 'GPC',
        data: [(dataCounts.GPC.totalCPU + dataCounts.GPC.mac), dataCounts.GPC.laptop, dataCounts.GPC.mobile],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        fill: false,
        label: 'LSI',
        data: [dataCounts.LSI.totalCPU, dataCounts.LSI.laptop, dataCounts.LSI.mobile],
        borderColor: 'rgb(0, 240, 15)',
        backgroundColor: 'rgba(0, 240, 15, 0.5)',
    },
    {
        fill: false,
        label: 'GKC',
        data: [dataCounts.GKC.totalCPU, dataCounts.GKC.laptop, dataCounts.GKC.mobile],
        borderColor: 'rgb(224, 0, 123)',
        backgroundColor: 'rgba(224, 0, 123, 0.5)',
    },
    {
        fill: false,
        label: 'GSRC',
        data: [dataCounts.GSRC.totalCPU, dataCounts.GSRC.laptop, dataCounts.GSRC.mobile],
        borderColor: 'rgb(224, 224, 0)',
        backgroundColor: 'rgba(225, 225, 0, 0.5)',
    },
  ],
};
  return ( 
    <div className='h-[100%] w-[100%] shadow-lg '>
        <Line options={options} data={data}  />
    </div>
  
)
}
