import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"



export const ObjekCards = ({ judul = "", description = "", gambar = "", jenis = "", id=0 , jumlah_review=undefined}) => {

    
    
    return (

        <>
            <div className="bg-slate-50 flex gap-4 p-4 border-b-4 border-b-indigo-500 border-l-4 border-l-indigo-500 mb-4 shadow-lg items-center">
                <Link to={`/objek/${id}`}>
                    <div className="overflow-hidden max-w-24">
                        <img src={`https://pub-13068c32d5cb4eed8687217b9e9e2153.r2.dev/images/${gambar}`} alt="gambar-objek" loading="lazy" />
                    </div>
                </Link>
                <div className="flex flex-col justify-evenly">
                    <div className="flex gap-2">
                        <p className="hidden">{id}</p>
                        <h1 className="font-bold text-md">{judul}</h1>
                        <Badge className="w-fit text-[8px]" variant="outline">{jenis}</Badge>
                    </div>
                    <p className="truncate ... font-light text-xs">{description}</p>
                    <p className="text-sm font-bold">{jumlah_review} Ulasan</p>
                    <div>
                        <Link to={`/objek/${id}`} className="text-sm font-bold text-blue-500 underline hover:no-underline">Lihat Ulasan</Link>
                    </div>
                </div>
            </div>
        </>

    )
}