import { createFileRoute } from '@tanstack/react-router'

import { ScrollArea } from '@/components/ui/scroll-area'

import { MenuCards } from '../components/MenuCards'
import { SubHeader } from '@/components/SubHeader'
import { MainHeader } from '@/components/MainHeader'

import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'

import { SpaceIklan } from '@/components/SpaceIklan'

import { useEffect, useState } from 'react'

interface ObjectItem {
  id: number;
  name: string;
  jenis: string;
  description: string;
  gambar1: string;
  nreview: number;
}


export const Route = createFileRoute('/main-page')({
  component: Mainpage
})




export function Mainpage() {

  const [data, setData] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchReviewsData = async () => {
    await fetch('https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchReviewsData()
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>

      <div className='flex flex-row justify-between px-8 gap-8 mt-10'>

        {/* left */}
        <div className='w-1/4'>
          <div className='flex flex-col items-center'>
            <div className='overflow-hidden max-w-[100px]'>
              <img src="menu.png" alt="" />
            </div>
            <SubHeader title="Pilihan"></SubHeader>
          </div>
          <div className='flex flex-row gap-8'>
            <MenuCards />
          </div>
        </div>


        {/* center */}
        <div className='w-1/2'>
          <div className='flex flex-col items-center'>
            <div className='overflow-hidden max-w-[100px]'>
              <img src="ulasan-paling-ramai.png" alt="" />
            </div>
            <MainHeader title="Ulasan Paling Ramai"></MainHeader>
          </div>
          <div>
            <ScrollArea className='h-screen'>
              {data.map(objek => {
                return (
                  <div key={objek.id} className="bg-slate-50 flex gap-4 p-4 border-b-4 border-b-indigo-500 border-l-4 border-l-indigo-500 mb-4 shadow-lg items-center">
                    <Link to={`/objek/${objek.id}`}>
                      <div className="overflow-hidden max-w-24">
                        <img src={`https://pub-13068c32d5cb4eed8687217b9e9e2153.r2.dev/images/${objek.gambar1}`} alt="gambar-objek" loading="lazy" />
                      </div>
                    </Link>
                    <div className="flex flex-col justify-evenly">
                      <div className="flex gap-2">
                        <h1 className="font-bold text-md">{objek.name}</h1>
                        <Badge className="w-fit text-[8px]" variant="outline">{objek.jenis}</Badge>
                      </div>
                      <p className="truncate ... font-light text-xs">{objek.description}</p>
                      <p className="text-xs ">{objek.nreview} Ulasan</p>
                      <div>
                        <Link to={`/objek/${objek.id}`} className="text-sm font-bold text-blue-500 underline hover:no-underline">Lihat Ulasan</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ScrollArea>
          </div>
        </div>

        {/* right */}
        <div className='w-1/4'>
          <div className='flex flex-col items-center'>
            <div className='overflow-hidden max-w-[100px]'>
              <img src="space-iklan.png" alt="" />
            </div>
            <SubHeader title="Penawaran Menarik"></SubHeader>
          </div>
          <div className='flex flex-row gap-8 w-full'>
            <SpaceIklan />
          </div>
        </div>
      </div>

    </>
  )
}