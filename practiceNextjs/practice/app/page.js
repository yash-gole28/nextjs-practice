
import Link from "next/link"


export default function Home() {
  return (
    <>
     <div className='home border-2 flex items-center justify-around bg-emerald-200' >
      <Link href='/invoice'>

      <div className=' border-2 flex justify-center items-center mt-10 h-96 w-96 bg-amber-200 shadow-lg shadow-stone-400'>
        <h1 className='text-lg italic bg-red-300 w-40 h-40 p-5'>To Invoice Page Click here</h1>

      </div>
      </Link>
      
    </div>
   
    </>
   
  )
}
