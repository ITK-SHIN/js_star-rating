// do something!

/*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  시작*/
      const lastLink = document.querySelector('link[href="style.css"]');
      const newLink = document.createElement('link');
      lastLink.after(newLink);

      newLink.setAttribute('href', 'star-rating/theme.css');
      newLink.setAttribute('rel', 'stylesheet');
      lastLink.after(newLink);
      /*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  끝*/

      //$container은  div.star-rating 요소이다
      const StarRating = ($container) => {

    //요구4 :  star-rating 요소의 data-max-rating 어트리뷰트를 통해 동적으로 생성할
    //star 요소의 갯수를 지정한다.
    const maxNumberOfStars = $container.dataset.maxRating;
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-rating-container');
    $container.appendChild(starContainer);

      let fragment = document.createDocumentFragment(); 
        
      for (let i = 0; i < maxNumberOfStars; i++){
        const star = document.createElement('i');
        star.classList.add('bx', 'bxs-star');
        fragment.appendChild(star);
      }
      starContainer.appendChild(fragment)

      /****************************  기능 5, 6 구현 시작 ********************** */
        /****************************  기능 7,8 구현시작 *********************** */
      const starIcon = $container.querySelectorAll('i');
      let selectStar;

      /* 마우스 올라갈시 */
      for (let i = 0; i < starIcon.length; i++) {
        starIcon[i].addEventListener('mouseenter', () => {
          let cnt = i;

          while (cnt >= 0) {
            starIcon[cnt].classList.add('hovered');
            cnt--;
          }
        });
              
        /* 마우스 벗어날시 */
        starIcon[i].addEventListener('mouseleave', () => {
          starIcon[i].classList.remove('hovered');
        });

        /* 마우스 클릭시 */
        starIcon[i].addEventListener('click', () => {
          let j = i;
          selectStar = j + 1;
        

          while (j >= 0) {
            starIcon[j].classList.add('selected');
            j--;
          }

          for (let k = i + 1; k < starIcon.length; k++) {
            starIcon[k].classList.remove('selected');
          }
          /* 커스템 이벤트 만들기 
            ratingChangeEvent는 detail프로퍼티 값으로 선택된 star개수를 받는다.  */
          const ratingChangeEvent = new CustomEvent('rating-change', {
            detail: { message: selectStar },
          });

          $container.dispatchEvent(ratingChangeEvent);
        });
      }

      /*$container 에서 마우스 벗어날때 starIcon 전체 hovered 제거*/
      $container.addEventListener('mouseleave', () => {
        for (let i = 0; i < starIcon.length; i++) {
          starIcon[i].classList.remove('hovered');
        }
      });
      /****************************  기능 7,8 구현끝 *********************** */
    };

    export default StarRating;
