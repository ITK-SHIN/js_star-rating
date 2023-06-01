// do something!

/*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  시작*/
const lastLink = document.querySelector('link[href="style.css"]');
const createNewLink = document.createElement('link');
lastLink.after(createNewLink);

const NewLink = document.querySelectorAll('link');
const lastNewLink = document.querySelectorAll('link')[NewLink.length-1];
lastNewLink.setAttribute('href', 'star-rating/theme.css');
lastNewLink.setAttribute('rel', 'stylesheet');
/*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  끝*/

const StarRating = ($container) => {  

 //요구4 :  star-rating 요소의 data-max-rating 어트리뷰트를 통해 동적으로 생성할 
 //star 요소의 갯수를 지정한다.
 
  if ($container.dataset['maxRating'] === '3') {
          $container.innerHTML = `
          <div class=star-rating-container>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                </div>
                `;
  } else {
          $container.innerHTML = `
                <div class=star-rating-container>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                </div>
                `;
  }
        

};


export default StarRating;