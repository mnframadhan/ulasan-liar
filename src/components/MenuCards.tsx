import { Link } from "@tanstack/react-router"

export const MenuCards = () => {
    return (
        <div className='flex flex-col font-corbel'>

            {/* cards container */}
            
            <div className='flex flex-col gap-2 md:gap-4'>
                {/* cards */}
                <div className='border-b-4 border-b-indigo-500 hover:border-b-black border-l-4 border-l-indigo-500 hover:border-l-black p-4 bg-amber-300 shadow-xl'>
                    <div className='flex flex-col gap-1 md:gap-2 '>
                        <Link to="/" className='underline hover:no-underline text-indigo-500 text-sm md:text-md'><h1 className='font-bold text-md'>Ulas: Cari Objek!</h1></Link>
                        <p className='text-[10px] md:text-xs'>Ulas objek apa saja! Bisa orang, tempat umum, makanan, kedai, idol korea atau lainnya..</p>
                    </div>
                </div>

                <div className='border-b-4 border-b-indigo-500 hover:border-b-black border-l-4 border-l-indigo-500 hover:border-l-black p-4 bg-emerald-300 shadow-xl'>
                    <div className='flex flex-col gap-1 md:gap-2 '>
                        <Link to="/buat-objek" className='underline hover:no-underline text-indigo-500 text-sm md:text-md'><h1 className='font-bold text-md'>Buat Objek untuk Diulas</h1></Link>
                        <p className='text-xs'>Siapapun bisa mengulas objek yang kamu buat! Terbukalah untuk setiap kritik dan saran yang masuk!</p>
                    </div>
                </div>

                <div className='border-b-4 border-b-indigo-500 hover:border-b-black border-l-4 border-l-indigo-500 hover:border-l-black p-4 bg-rose-300 shadow-xl'>
                    <div className='flex flex-col gap-1 md:gap-2 '>
                        <Link to="/donasi" className='underline hover:no-underline text-indigo-500 text-sm md:text-md'><h1 className='font-bold text-md'>Bantu Donasi</h1></Link>
                        <p className='text-xs'>Wahai para dermawan! Bantu kami membangun website ini :) Terimakasih :) :) </p>
                    </div>
                </div>
                {/* end cards */}
            </div>
            {/* end cards container */}
        </div>
    )
}