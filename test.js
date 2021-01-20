function setPagerBtn(currentPage, lastPage) {
  $('.c-pagination__list').empty();

  var pagerBtns = createAllPagerBtn(currentPage, lastPage);
  pagerBtns.forEach(function (pagerBtn) {
    $('.c-pagination__list').append(pagerBtn);
  });
}

$(document).on('click', $('.c-pagination__link'), function (event) {
  var clickedPageNum = Number(event.target.dataset.pageNum);
  if (isNaN(clickedPageNum)) return;
  setPagerBtn(clickedPageNum, lastPage);
});

// ページャーボタンを作る関数
function createPagerBtn(pageNum, arrow) {

  if (arrow === "current") {
    var pagerbtn = document.createElement('li');
    pagerbtn.classList.add('c-pagination__item', '-current');
    pagerbtn.setAttribute('aria-current', 'page');
  } else {
    var pagerbtn = document.createElement('li');
    pagerbtn.classList.add('c-pagination__item');
  }
  
  var anchor = document.createElement('a');
  anchor.classList.add('c-pagination__link');
  anchor.dataset.pageNum = pageNum; // データ属性付与

  if (arrow === "prev") {
    var arrowSpan = document.createElement('span');
    arrowSpan.classList.add('c-pagination-prev');
    anchor.appendChild(arrowSpan);
  } else if (arrow === "next") {
    var arrowSpan = document.createElement('span');
    arrowSpan.classList.add('c-pagination-next');
    anchor.appendChild(arrowSpan);
  } else { // 番号ボタンの時
    anchor.innerText = pageNum;
  }
  pagerbtn.appendChild(anchor);
  
  return pagerbtn;
}

// 何番 ~ 何番のページャーボタンを作るか
function createBtnNum (currentPage, lastPage, maxPagerBtnNum) {
  var start;
  var end;
  if (lastPage <= maxPagerBtnNum) { // 最後ページ数がボタンの数以下の場合
    return {start: 1, end: lastPage}
  }
  if (currentPage <= Math.ceil(maxPagerBtnNum / 2)) { // 現在ページが１ページ付近の場合
    start = 1;
    end = maxPagerBtnNum
  } else if (currentPage >= lastPage - Math.floor(maxPagerBtnNum / 2)) {// 現在ページがラストページ付近の場合
    start = lastPage - maxPagerBtnNum + 1;
    end = lastPage
  } else {
    start = currentPage - Math.floor(maxPagerBtnNum / 2);
    end = currentPage + Math.floor(maxPagerBtnNum / 2);
  }
  return { start: start, end: end }
}

// 全部のページャーボタンを作る関数
function createAllPagerBtn (currentPage, lastPage) {
  // 1ページの時はページャーボタンを作らない
  if (lastPage === 1) return;
  // 作るボタンの要素（li要素）を入れていく配列
  var btnArray = [];

  if (currentPage !== 1) {
    var firstArrowPagerBtn = createPagerBtn(1, 'prev');
    btnArray.push(firstArrowPagerBtn);
  }
  var btnNum = createBtnNum(currentPage, lastPage, maxPagerBtnNum);
  var start = btnNum.start;
  var end = btnNum.end;
  for (var i = start; i <= end; i++) {
    var pagerNumBtn = createPagerBtn(i);
    if (i === currentPage) {
      var currentPageBtn = createPagerBtn(i, 'current')
    }
    btnArray.push(pagerNumBtn);
  }
  if (currentPage !== lastPage)  {
    var lastArrowPagerBtn = createPagerBtn(lastPage, 'next');
    btnArray.push(lastArrowPagerBtn);
  }
  return btnArray;
}