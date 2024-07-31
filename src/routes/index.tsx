import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  XIcon,
} from 'react-share';

export const Route = createFileRoute('/')({
  component: Homepage
})

function Homepage() {

  return (
    <>
      <div className='font-corbel mt-10'>
        <div className='flex gap-5 items-center justify-center'>
          <div className='max-w-[175px]'>
            <img src="/main.png" alt="main" />
          </div>
          <div className='text-center flex flex-col gap-4'>
            <div>
              <h1 className='text-4xl font-bold tracking-widest'>ULASAN-LIAR.COM</h1>
              <h1>Ulas apa saja, kritik dan saran terbuka untuk siapapun</h1>
            </div>
            <div className='flex justify-center gap-5'>
              <WhatsappShareButton 
                url='https://ulasan-liar.pages.dev/'
                title='Ulas Apa Saja Disini!'>
                <WhatsappIcon size={32}></WhatsappIcon>
              </WhatsappShareButton>
              <TwitterShareButton 
                url='https://ulasan-liar.pages.dev/'
                title='Ulas Apa Saja disini!'>
                <XIcon size={32}></XIcon>
              </TwitterShareButton>
            </div>
          </div>
          <div className='max-w-[175px]'>
            <img src="/main2.png" alt="main2" />
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-4 font-corbel'>
        <Link to='/main-page' className='px-3 py-1 bg-indigo-500 text-white border-b-4 border-b-black border-l-4 border-l-black'>Halaman Utama</Link>
        <Link to='/main-page' className='px-3 py-1 bg-indigo-500 text-white border-b-4 border-b-black border-l-4 border-l-black'>Konten yang Lagi Rame</Link>
      </div>

      <div className='flex justify-center font-corbel'>
        <div className='bg-indigo-200 h-fit w-[500px] mt-10 p-5 border-b-4 border-b-black border-l-4 border-l-black flex flex-col gap-4'>
          <p className='text-md'><span className='font-bold'>ulasan-liar.com</span> membantu publikasi ulasan terhadap segala sesuatu.</p>
          <div className='flex items-center'>
            <ol className='list-decimal px-5'>
              <li>&nbsp;&nbsp;<Link to='/buat-objek' className='font-bold text-blue-500 underline hover:no-underline' >Buat objek</Link> untuk diulas secara publik</li>
              <li>&nbsp;&nbsp;Menunggu objek ter-verifikasi </li>
              <li>&nbsp;&nbsp;Share untuk mendapatkan ulasan liar</li>
              <li>&nbsp;&nbsp;Lihat ulasanmu di <Link to='/' className='text-blue-500 font-bold underline hover:no-underline'>cari ulasan</Link></li>
            </ol>
            <div className='overflow-hidden max-w-[150px]'>
              <img src="panduan-main-page.png" alt="" />
            </div>
          </div>
          <p className='text-md'>Jadilah <Link to='/buat-objek' className='font-bold text-blue-500 underline hover:no-underline' >kontributor</Link> agar semakin banyak objek yang bisa diulas secara publik. Biarkan publik menilai.</p>
        </div>
      </div>

    </>
  )

}