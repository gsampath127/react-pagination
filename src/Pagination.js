import React, {useEffect, useState} from 'react'
import './pagination.css'
const renderData = (data)=>{
    return(
        <ul>
{data.map((d)=> <li key={d.id}>{d.title}</li>)}
        </ul>
    )
}
const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //calculate index of last item in each page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem -itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // page limits
  const [pageNumberLimit, setPagenumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPagenumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPagenumberLimit] = useState(0);


  // build page numbers based on data
 const pages = [];
 for(let i=1 ; i<=Math.ceil(data.length/itemsPerPage); i++){
     pages.push(i);
 }

 const handlePageClick = (e)=>{
  setCurrentPage(Number(e.target.id));
 }
 const pageNumbers = pages.map(page => {

     if(page < maxPageNumberLimit +1  && page > minPageNumberLimit) {
         return(
       <li key={page} id={page} onClick={handlePageClick} 
          className={currentPage===page ? 'active' : null}>
          {page}
     </li>
         );
     }else{
         return null;
     }
 }
   
 );

 const handlePrevClick = ()=>{

    setCurrentPage(currentPage-1);
    if((currentPage-1) % pageNumberLimit === 0){
        setMaxPagenumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPagenumberLimit(minPageNumberLimit - pageNumberLimit);
    }

 }

 const handleNextClick = ()=>{
     setCurrentPage(currentPage+1);

     if(currentPage+1 > maxPageNumberLimit){
         setMaxPagenumberLimit(maxPageNumberLimit + pageNumberLimit);
         setMinPagenumberLimit(minPageNumberLimit + pageNumberLimit);
     }
     
}

const handleLoadMore= ()=>{
    setItemsPerPage((prev)=> prev+5);
}

// page number limit
let pageIncrementBtn = null;
if(pages.length > maxPageNumberLimit){
    pageIncrementBtn = <li onClick={handleNextClick}>&hellip;</li>
}
let pageDecrementBtn = null;
if(minPageNumberLimit >=1){
    pageDecrementBtn = <li onClick={handlePrevClick}>&hellip;</li>
}

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => response.json())
    .then((json) => { setData(json);});
  },[]);
    return (
        <div className="main">
            <h1> ToDO list</h1>
            <div className="mainData">
              {renderData(currentItems)}

            </div>
            <ul className="pageNumbers"> 
               <li>
                   <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
               </li>
               {pageDecrementBtn}
                {pageNumbers}
               {pageIncrementBtn}

                <li>
                   <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
               </li>
            </ul>
            <button className='loadMore' onClick={handleLoadMore}>Load More </button>
        </div>
    )
}

export default Pagination
