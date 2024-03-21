import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { lusitana } from '@/styles/font';
import { CardSkeleton } from '../ui/skeleton';
import Card from '../ui/cards';
import { Suspense } from 'react';
import Oldunit from '../ui/inventory/oldunit';

export default function Page(computerType: string) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [desktopToCount, setDesktopToCount] = useState<number | null>(null)
  const [laptopToCount, setLaptopToCount] = useState<number | null>(null)

  
  
  const fetchData = async () => {
    try {
      const [desktop, laptop] = await Promise.all([
        fetch(`api/computer_type/desktop`),
        fetch(`api/computer_type/laptop`)
      ]);
      if (!desktop.ok || !laptop.ok) {
        throw new Error('Failed to fetch data');
      }
      const desktopData = await desktop.json();
      const laptopData = await laptop.json();
      
      setDesktopToCount(desktopData.count);
      setLaptopToCount(laptopData.count);
      
    } catch (error) {
      setError('Error fetching data');
      
    }
  }
  useEffect(() => {
    const delayTime = 1000;
    const delayTimer = setTimeout(() => {
      fetchData()
    }, delayTime);
    return () => clearTimeout(delayTimer);
  }, []);
  
  
  
  return (
    <Layout>
      
        <div className="p-3 mb-4 rounded-t-lg dashbord-summary">
          <h1 className={`${lusitana.className} text-xl md:text-2xl custom-font`}>Summary</h1>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<CardSkeleton />} >
              {(desktopToCount === null || laptopToCount === null) && <><CardSkeleton /> <CardSkeleton /></>}
              {desktopToCount !== null && laptopToCount !== null && (
                <>
                  <Card title="Desktop" value={desktopToCount} type="desktop" />
                  <Card title="Laptop" value={laptopToCount} type="laptop" />
                </>
              )}
            </Suspense>
          </div>
        </div>
        <div className="p-2 my-2 rounded-t-lg dashbord-summary">
          <h1 className={`${lusitana.className} text-xl md:text-[15px]`}>Unit/s 5years old and Above</h1>
        </div>
        <div className="p-1 bg-white rounded-lg shadow">
          <div className="grid">
            <Oldunit />
          </div>
        </div>
      
    </Layout>
  );
}
