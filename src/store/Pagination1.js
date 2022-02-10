import React from "react";

class Pagination1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      initialPage: 1
    };
  }

  componentDidMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.state.initialPage);
      this.setState({
        pageSize: this.props.pageSize
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.state.initialPage);
    }
  }

  setPage = page => {
    let { items, pageSize } = this.props;
    let pager = this.state.pager;

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize);

    // get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  };

  getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };

  render() {
    let pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <div className="row pro-result">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 pagination-style">
          <div className="pagination">
            <ul>
              <li>
                <button
                  disabled={pager.currentPage === 1}
                  onClick={() => this.setPage(pager.currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pager.pages.map((page, index) => (
                <li key={index}>
                  <button
                    className={pager.currentPage === page ? "active" : ""}
                    onClick={() => this.setPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  disabled={pager.currentPage === pager.totalPages}
                  onClick={() => this.setPage(pager.currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination1;
