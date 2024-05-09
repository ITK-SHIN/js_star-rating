const StarRating = $container => {
  $container.innerHTML = '<div class="star-rating-container"></div>';

  const $starRatingContainer = $container.querySelector('.star-rating-container');
  /* const $starRatingContainer = document.querySelector('.star-rating-container');
  이렇게 하면 안된다. 왜냐면 전체 document에서 찾다보니 두번째 돌때도 
  또 첫번째 star-rating클래스에 있는 .star-rating-container요소를 찾게된다. 
  */

  const { maxRating } = $container.dataset;
  let starIcon = '';
  for (let i = 0; i < maxRating; i++) {
    starIcon += `<i class='bx bxs-star' id=${i}></i>`;
    // "${i}" 해도 되지만 안해도 ${}에 의해 string으로 변경된다.
  }

  $starRatingContainer.innerHTML = starIcon;

  const $starLink = document.createElement('link');
  $starLink.setAttribute('href', 'star-rating/theme.css');
  $starLink.setAttribute('rel', 'stylesheet');
  document.head.insertBefore($starLink, document.head.lastElementChild);

  const $starNodes = $container.querySelectorAll('i');
  const starNode = [...$starNodes];

  const onMouseover = e => {
    if (!e.target.matches('i.bxs-star')) return; // 이벤트 핸들러 위임해서 필요.

    // Number(e.target.id)안써도 <= 연산자 때문에 자동형변환 된다.
    for (let i = 0; i <= e.target.id; i++) {
      starNode[i].classList.add('hovered');
    }
  };

  const onMouseout = e => {
    if (!e.target.matches('i.bxs-star')) return; // i요소 사이에 div있으면 retun되서 안좋음.

    for (let i = 0; i < starNode.length; i++) {
      starNode[i].classList.remove('hovered');
    }
  };
  // mouseleave로 바꾸면서 mouseover가 토글하게끔.
  // 지금은 mouseout주석 처리하면 mouseover가 작동안함. 의존적임.  forEach, map, filter

  const onClicked = e => {
    if (!e.target.matches('i.bxs-star')) return;

    for (let i = 0; i < starNode.length; i++) {
      if (i <= e.target.id) {
        starNode[i].classList.add('selected');
      } else {
        starNode[i].classList.remove('selected');
      }
    } // toggle

    const ratingChange = new CustomEvent('rating-change', {
      detail: Number(e.target.id) + 1,
      bubbles: true, // 왜자꾸 콤마를 생성--> 나중에 추가할거 있으면 편하게 하라고 자동으로 생성.
    });

    e.target.dispatchEvent(ratingChange);
  };

  $starRatingContainer.addEventListener('mouseover', onMouseover);
  $starRatingContainer.addEventListener('mouseout', onMouseout);
  $starRatingContainer.addEventListener('click', onClicked);
};

export default StarRating;

/* 커스텀 이벤트 rating-change 생성. 커스텀이벤트 객체는 버블링되지 않는다.
---> 그래서 상위요소에서 이벤트 캐치하는 이벤트 위임 하려면 
bubble프로퍼티 
*/

// const customEvent = new CustomEvent('rating-change', {detail: 'current rating: <span> e.target.id+1 </span>' });
// 근데 이거 어디서 만들지..

/*
커스텀 이벤트의 경우 반드시 addEventListener방식으로 이벤트 핸들러를 등록해야한다. 

CustomEvent 이벤트 생성자 함수에는 두번째 인수로 
detail 프로퍼티를 포함하는 객체안에 
이벤트와 함께 전달하고 싶은 정보를 담은 정보를 전달할 수 있다. 
이 정보는 이벤트 객체의 e.detail에 담겨있다. 



1. data-max-rating을 보고 별의 개수를 정한다. 
const maxRating = $container.dataset.maxRating
-> const { maxRating } = $container.dataset;

*/
