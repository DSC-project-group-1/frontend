
export function button() {
    return (
        <>
        <div className='flex justify-content'>
        <button className='w-16 h-16 flex items-center border-2 bg-slate-500 justify-center'>Click me!
        {/* inverted triangle */}
            <div className='w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-r-[12px] border-t-slate-200'></div>
        </button>
        </div>
        </>
    );
};
