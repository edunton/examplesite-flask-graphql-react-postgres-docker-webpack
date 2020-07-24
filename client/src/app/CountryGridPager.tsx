/**
 * Pager component since Paper.css did not come with one
 */

import * as React from "react";

export const CountryGridPager : React.FC<{page:number,count:number,pageSize:number,onNext:()=>void, onPrev:()=>void}> = ({page,count,onNext,onPrev,pageSize})=>{

    const maxPage = Math.floor(count/pageSize) - (count % pageSize === 0 ? 1 : 0)
    return <div className="row">
        <div className="col-4 col">
            <input type="button" className="btn-block btn-secondary" onClick={onPrev} value="< Prev" disabled={page <= 0 }/>
        </div>
        <div className="col-4 col">
            Page {page + 1} of {maxPage + 1}
        </div>
        <div className="col-4 col">
            <input type="button" className="btn-block btn-secondary" onClick={onNext} value="Next >" disabled={page >= maxPage} />
        </div>
    </div>
}