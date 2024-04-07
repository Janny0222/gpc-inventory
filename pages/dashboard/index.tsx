import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { lusitana } from '@/styles/font';
import { rubik } from '@/styles/font';
import TableSkeleton, { CardSkeleton } from '../ui/skeleton';
import Card from '../ui/cards';
import { Suspense } from 'react';
import Oldunit from '../ui/tables/oldunit';
import OldMobile from '../ui/tables/oldunit-mobile';
import DoughnutChart from '../components/DougnutChart';
import ToggleButton from '../components/ToggleButton';


export default function Page() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [desktopToCount, setDesktopToCount] = useState<number | null>(null)
  const [laptopToCount, setLaptopToCount] = useState<number | null>(null)
  const [mobileCount, setMobileCount] = useState<number | null>(null)
  const [triggerValue, setTriggerValue] = useState<string>("detail")
  
  
  
  const fetchData = async () => {
    try {
      const [desktop, mac, laptop, cellphone] = await Promise.all([
        fetch(`api/computer_type/desktop`),
        fetch(`api/computer_type/mac`),
        fetch(`api/computer_type/laptop`),
        fetch(`api/countMobile`)
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
      setError('Error fetching data');
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const delayTime = 1000;
    const delayTimer = setTimeout(() => {
      fetchData()
    }, delayTime);
    return () => clearTimeout(delayTimer);
  }, []);
  
  const handleTrigger = () =>{
   setTriggerValue(triggerValue === 'detail' ? 'graph' : 'detail')
  }
  console.log(triggerValue);
  
  return (
    <Layout>
      
        <div className="p-3 mb-4 rounded-t-lg dashbord-summary">
          <h1 className={`${rubik.className} text-xl md:text-xl custom-font`}>Summary</h1>
        </div>
        <div className="px-4 bg-white rounded-lg shadow">
            <div className='flex flex-col pb-2'>
                <h3 className='text-2xl'>Inventory</h3>
                <ToggleButton loading={loading} onChange={handleTrigger}/>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:w-auto md:w-auto sm:w-96 gap-4'>
              {triggerValue === 'detail' ? (
                <>
                {(desktopToCount === null || laptopToCount === null) && <><CardSkeleton /> <CardSkeleton /> <CardSkeleton /></>}
                {desktopToCount !== null && laptopToCount !== null && (
                  <>
                    <Card title="Desktop" value={desktopToCount} type="desktop" />
                    <Card title="Laptop" value={laptopToCount} type="laptop" />
                    <Card title="Cellphone" value={mobileCount} type="cellphone" />
                  </>
                )}
                </>
              ): null}
            </div>
            <div className="grid py-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:w-auto md:w-auto sm:w-96 gap-4">
            
              {triggerValue === 'graph' ? (
              <>
                <div className=''>
                  <h6 className='border-b-2 border-x-2 border-b-current text-center'>GPC</h6>
                  <DoughnutChart tableName='gpc_inventory' mobileTable='gpc_mobile_inventory'/>
                </div>
                <div className=''>
                  <h6 className='border-b-2 border-x-2 border-b-current text-center'>LSI</h6>
                  <DoughnutChart tableName='lsi_inventory' mobileTable='lsi_mobile_inventory'/>
                </div>
                <div className=''>
                  <h6 className='border-b-2 border-x-2 border-b-current text-center'>GKC</h6>
                  <DoughnutChart tableName='gkc_inventory' mobileTable='gkc_mobile_inventory'/>
                </div>
                <div className=''>
                  <h6 className='border-b-2 border-x-2 border-b-current text-center'>GSRC</h6>
                  <DoughnutChart tableName='gsrc_inventory' mobileTable='gsrc_mobile_inventory'/>
                </div>
              </>
              ): null}
          </div>
        </div>
        <div className="p-2 my-2 rounded-t-lg dashbord-summary">
          <h1 className={`${lusitana.className} text-white text-xl md:text-[15px]`}>Unit/s 5years old and Above</h1>
        </div>
        <div className="p-1 bg-white rounded-lg shadow">
          <div className="grid">
            <Suspense fallback={<TableSkeleton />}>
            {(desktopToCount === null || laptopToCount === null) && <TableSkeleton />}
            {desktopToCount !== null && laptopToCount !== null && (
              <Oldunit />
            )}
            </Suspense>
          </div>
        </div>
        <div className="p-2 my-2 rounded-t-lg dashbord-summary">
          <h1 className={`${lusitana.className} text-white text-xl md:text-[15px]`}>Mobile Issued 5 years old and above </h1>
        </div>
        <div className='p-1 bg-white rounded-t-lg shadow'>
          <div className='grid'>
            <OldMobile />
          </div>
          
        </div>
      
    </Layout>
  );
}
