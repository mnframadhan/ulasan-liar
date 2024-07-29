import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useState } from 'react'

import { useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'


export const BuatObjek: React.FC = () => {

  const [name, setName] = useState('');
  const [jenis, setJenis] = useState('');
  const [description, setDescription] = useState('');
  const [gambar1, setGambar1] = useState<File | null>(null);
  const [gambar2, setGambar2] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate({ from: "/buat-objek" })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)

    if (!name || !jenis || !description || !gambar1 || !gambar2) {
      alert('Please fill all fields and select both images.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('jenis', jenis);
    formData.append('description', description);
    formData.append('gambar1', gambar1);
    formData.append('gambar2', gambar2);

    try {
      const response = await fetch('https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      navigate({
        to: "/verification-pending"
      })
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='m-8'>
        <Link to='/main-page' className='w-fit font-semibold tracking-wide bg-amber-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'>Kembali ke Halaman Utama</Link>
      </div>
      <div className='mx-8 px-4 py-8 bg-slate-50 my-8 border-b-4 border-b-indigo-500 hover:border-b-black border-l-4 border-l-indigo-500 hover:border-l-black'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="flex flex-col gap-2">
            <p className='font-bold'>Judul Objek <span className='text-red-500'> *</span></p>
            <Input
              className='border-0 border-b-2 rounded-none border-b-indigo-500'
              placeholder='( cth: Warung Bu Nani )'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-bold'>Jenis Objek <span className='text-red-500'> *</span></p>
            <select
              className='border-0 border-b-2 border-b-indigo-500 py-1 px-3 w-fit'
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              required
            >
              <option value="" disabled>---</option>
              <option className='font-bold' value="Manusia">Manusia</option>
              <option value="Artis/Selebriti">&nbsp;&nbsp;Artis/Selebriti</option>
              <option value="Penyanyi">&nbsp;&nbsp;Penyanyi</option>
              <option value="Tiktokers">&nbsp;&nbsp;Tiktokers</option>
              <option value="Selebgram">&nbsp;&nbsp;Selebgram</option>
              <option className='font-bold' value="Hewan">Hewan</option>
              <option value="Tumbuhan">&nbsp;&nbsp;Tumbuhan</option>
              <option className='font-bold'  value="Tempat">Tempat</option>
              <option value="Fasilitas Umum">&nbsp;&nbsp;Fasilitas Umum</option>
              <option className='font-bold'  value="Bangunan">Bangunan</option>
              <option value="Rumah">&nbsp;&nbsp;Rumah</option>
              <option value="Mall">&nbsp;&nbsp;Mall</option>
              <option value="Pasar">&nbsp;&nbsp;Pasar</option>
              <option className='font-bold' value="Makanan">Makanan</option>
              <option className='font-bold' value="Barang Pribadi">Barang Pribadi</option>
              <option className='font-bold' value="Brand">Brand</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-bold'>Deskripsi <span className='text-red-500'> *</span></p>
            <Textarea
              placeholder='( cth: Warung legendaris yang ada di Kota Surabaya )'
              className='border-0 border-b-2 rounded-none border-b-indigo-500'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-fit">
            <p className='font-bold'>Gambar Objek <span className='text-red-500'> *</span></p>
            <p className='text-sm font-light'>Minimal 2 Gambar</p>
            <Input
              className='border-0 border-b-2 rounded-none border-b-indigo-500'
              type="file"
              accept="image/*"
              onChange={(e) => setGambar1(e.target.files ? e.target.files[0] : null)}
              required
            />
            <Input
              className='border-0 border-b-2 rounded-none border-b-indigo-500'
              type="file"
              accept="image/*"
              onChange={(e) => setGambar2(e.target.files ? e.target.files[0] : null)}
              required
            />
          </div>

          <button
            className='w-fit font-semibold tracking-wide bg-indigo-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'
            type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
      </div>
    </>
  );

}


export const Route = createFileRoute('/buat-objek')({
  component: BuatObjek
})