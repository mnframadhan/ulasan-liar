export const SubHeader = ({title=""}) => {
    return (
        <div className="mb-2 flex flex-col justify-center">
            <div className='bg-indigo-500 h-[5px] w-10 self-center my-4 rounded-full mb-2'></div>
            <div className='self-center font-bold'>{title}</div>
        </div>
    )
}