import Swal from 'sweetalert2';

export class utils {

    static formatDate(date: any): string { //format date to 'yyyy-mm-dd'
        if(!date || !(new Date(date) instanceof Date)){date = new Date()}else{date=new Date(date)}

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero to month
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero to day
        return `${year}-${month}-${day}`;
    }

    static logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.setItem('photo', 'profile.jpg');
        Swal.fire({title:"Connectez Vous S.V.P. !", animation:false, icon:"error"})
        .then(()=>{
        window.location.href = 'http://localhost:4200/#/login';
        });
    }

    static paginate(selctedRowsCount, currentPage = 1, pageSize = 5, maxPages = 5):any{
    // calculate total pages
    let totalPages = Math.ceil(selctedRowsCount / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, selctedRowsCount - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        selctedRowsCount: selctedRowsCount,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

}