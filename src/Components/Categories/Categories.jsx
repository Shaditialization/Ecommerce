// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import Style from './Categories.module.css';



// export default function Categories() {
    
//     const [counter1, setCounter1] = useState(0);
//     const [counter2, setCounter2] = useState(0);

    

//     function increment1()
//     {
//         setCounter1(counter1 + 1);
//     }
//     function increment2()
//     {
//         setCounter2(counter2 + 1);
//     }
//     let checkCount2Even = useMemo(() => {
//         console.log('check even function');
//         return counter2 % 2 === 0;
//     } , [counter2]);

//     return <>
//         <div className="container text-center">
//             <div className="row">
//                 <div className="col-md-6">
//                     <h1>Counter1</h1>
//                     <h6>{counter1}</h6>
//                     <button onClick={increment1} className='btn btn-info'>+</button>
//                 </div>
//                 <div className="col-md-6">
//                     <h1>Counter2</h1>
//                     <h6>{counter2}</h6>
//                     <h5>{checkCount2Even ? 'Even':'Odd'}</h5>
//                     <button onClick={increment2} className='btn btn-info'>+</button>
//                 </div>
//             </div>
//         </div>
//     </>
// }



import React from 'react';
// import Style from './Brands.module.css';
import Loading from 'react-loading';
import useApi from '../../Hooks/useApi';



export default function Categories() {
    let { data, isLoading } = useApi('categories', 'categories')
    if (isLoading)
        return <Loading></Loading>
    return (
        <div className="container">
            <div className="row my-2">
                {data?.data.data.map((category) => <div key={category._id} className='card my-2 text-center col-md-4'>
                    <img src={category.image} className='w-100' alt="brand" />
                    <p className='fw-bolder'>{category.name}</p>
                </div>)}
            </div>
        </div>
    )

}