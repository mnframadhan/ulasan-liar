import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/donasi')({
  component: Donasi
})


function Donasi() {
  return (
    <>
      <div className='m-8'>
        <Link to='/main-page' className='w-fit font-semibold tracking-wide bg-amber-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'>Kembali ke Halaman Utama</Link>
      </div>
      <div className='px-8 mt-10 font-corbel flex flex-col items-center'>
        <div className='flex flex-col gap-5 items-center'>
          <h1 className='font-bold text-2xl'>Bantu Kami Mengembangkan Aplikasi Ini</h1>
          <div className='overflow-hidden max-w-[350px] border-b-black border-l-4 border-l-black'>
            <img src="myqr.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )

}