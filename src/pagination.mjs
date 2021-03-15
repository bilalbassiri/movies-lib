let barBar = document.getElementById('slid__Bar__Bar');

let setPages = arr => {
    let leng = arr.length-1;
    barBar.style.opacity = arr.length<=9? '.7': '.9';
    if(arr.length<=9){
        for(let i= leng; i>=0 ; i--) resetItem(arr[i].movieID, 'block');
    }
    else{
        for(let i =leng; i>=0; i--) {
            if(i>leng-9) { resetItem(arr[i].movieID, 'block') }
            else resetItem(arr[i].movieID, 'none');
        }
    }
}

let  setTabBars = function(arr){
    let len = arr.length/9,
        g,
        innerBars = '<div id="current__Bar" class="current-bar"></div>';

    if( Math.floor(len) === len ) { len }
    else if( Math.floor(len) <= len) { len = (Math.floor(len) + 1) }
    g = function() {
        for(let k =1; k<=len; k++) { innerBars += `<div data-id='${k}' style="animation-delay:${k*45}ms" class="inner-bars"></div>` }
        return innerBars
    }
    barBar.innerHTML = g()
}

let displayPage = (arr, pageID)=> {
    let page__Id = parseInt(pageID.dataset.id),
        l = arr.length -1,
        current__Bar = document.getElementById('current__Bar'),
        lastPage = parseInt(pageID.parentElement.lastChild.dataset.id),
        trans = (page__Id-1)*42;

    if(page__Id){
        current__Bar.style.transform= `translateX(${trans}px)`;
        switch(page__Id){
            case 1: 
                        {
                            if(l+1 <= 9){
                                for(let i= l; i >= 0 ; i--) resetItem(arr[i].movieID, 'block');
                            }
                            else{
                                for(let i = l; i>=0; i--) {
                                    if(i>l-9) { resetItem(arr[i].movieID, 'block') }
                                    else resetItem(arr[i].movieID, 'none');
                                }
                            }
                            break;
                        }
            case lastPage: 
                        {
                            for(let r = l; r>l-(lastPage-1)*9; r--){
                                resetItem(arr[r].movieID, 'none')
                            }
                            for(let r = l-(lastPage-1)*9; r>=0; r--){
                                resetItem(arr[r].movieID, 'block')
                            }
                            break;
                        }
            default: 
                        {
                            for(let q = l; q > l-(page__Id-1)*9; q--){
                                resetItem(arr[q].movieID, 'none')
                            }
                            for(let q = l-(page__Id-1)*9; q  > (l-(page__Id-1)*9-9); q--){
                                resetItem(arr[q].movieID, 'block')
                            }
                            for(let q = (l-(page__Id-1)*9-9); q >= 0; q--){
                                resetItem(arr[q].movieID, 'none')
                            }
                            break;
                        }
        }

    }
}

let resetItem = (i, display) =>   document.querySelector(`[data-movie-id='${i}']`).parentElement.style.display = display;


export {barBar, displayPage, setTabBars, resetItem};
export default setPages;