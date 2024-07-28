import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verification-pending')({
  component: Verification
})

export function Verification() {
  return (
    <div className='p-5'>
      <h1 className='font-bold text-2xl'>Verification Pending</h1>
      <p className='font-semibold text-xl'>Verifikasi sedang diproses, mohon tunggu beberapa saat.</p>
      <div>
      </div>
    </div>
  )
  
}