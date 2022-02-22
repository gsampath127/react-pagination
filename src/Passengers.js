import React, {useEffect, useState} from 'react'
import Pagination from './Pagination';

const PassengersList = ()=>{
  const pageNumberLimit = 5;
  const [passengersData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
    
  useEffect(()=>{
    setLoading(true);
    fetch(`https://api.instantwebtools.net/v1/passenger?currentPage=${currentPage}&size=5`)
    .then((response) => response.json())
    .then((json) => { setData(json); setLoading(false);});
    
  },[currentPage]);
    
  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }

  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }
  
  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: passengersData,
  };

  return(
    <div>
        <h2>Passenger List</h2>
        {!loading ? <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}/>
        : <div> Loading... </div>
        }
    </div>
)
      
 }
export default PassengersList;