import React from 'react'
import Trial1 from '../../assets/images/Trial1.png'
import Trial2 from '../../assets/images/Trial2.png'
import Trial3 from '../../assets/images/Trial3.png'
import Trial4 from '../../assets/images/Trial4.png'
import './Trial.scss'
const Trial:React.FC = () => {
    return (<div className='trial-component'>
    <div className='grid-Trial'>
        <img src={Trial1} alt='trial'/>
        <img src={Trial2} alt='trial'/>
        <img src={Trial3} alt='trial'/>
        <img src={Trial4} alt='trial'/>
    </div>
    <div className='gradinet-Trial'>
        <div>
        <p className='title'>Start your free trial today!</p>
        <p className='description'>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
        </div>
        <button>Start a Free Trail</button>
    </div>

</div>
);
}

export default Trial;