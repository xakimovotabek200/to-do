import HomeCalendar from './Calendar'
import RightSide from './RightSide'

const Wrap = () => {
    return (
        <div className='grid grid-cols-4'>
            <div className="col-span-3">
                <HomeCalendar />
            </div>
            <div>
                <RightSide />
            </div>
        </div>
    )
}

export default Wrap