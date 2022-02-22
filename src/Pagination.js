import React from 'react'
import './pagination.css'
const renderData = (data)=>{
    return(
        <ul>
            {data.map((d)=> 
            <li key={d['_id']}> The passenger having id {d['_id'].slice(d['_id'].length-5)} using {d.airline[0].name} airlines</li>)
            }
        </ul>
    )
}
const Pagination = (props) => {
  // init
  const { currentPage, maxPageLimit, minPageLimit} = props;
  const totalPages = props.response.totalPages-1;
  const data = props.response.data;

  
    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
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

    

    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }

    return (
        <div className="main">
            <div className="mainData">
              {renderData(data)}

            </div>
            <ul className="pageNumbers"> 
               <li>
                   <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
               </li>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
                <li>
                   <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
               </li>
            </ul>
        </div>
    )
}

export default Pagination
