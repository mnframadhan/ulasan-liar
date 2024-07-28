export const MainHeader = ({title=""}) => {
    return (
        <div className="mb-2 flex flex-col">
            <div className='bg-indigo-500 h-[5px] w-10 self-center my-4 rounded-full mb-2'></div>
            <div className='self-center text-2xl font-bold uppercase'>{title}</div>
        </div>
    )
}