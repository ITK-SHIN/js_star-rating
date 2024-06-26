// do something!   23.12.2(토) 리팩토링 -> 이벤트 위임 적용하기

/*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  시작*/
const lastLink = document.querySelector('link[href="style.css"]');
const newLink = document.createElement('link');
lastLink.after(newLink);

newLink.setAttribute('href', 'star-rating/theme.css');
newLink.setAttribute('rel', 'stylesheet');
lastLink.after(newLink);
/*  star-rating 요소 내부의 css를 JavaScript로 자동 추가하기  끝*/

const StarRating = ($container) => {
    const maxNumberOfStars = $container.dataset.maxRating;
    const starContainer = document.createElement('div');

    starContainer.classList.add('star-rating-container');
    $container.appendChild(starContainer);

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < maxNumberOfStars; i++) {
        const star = document.createElement('i');
        star.classList.add('bx', 'bxs-star');
        fragment.appendChild(star);
    }
    starContainer.appendChild(fragment);

    /****************************  기능 5, 6, 7, 8 구현 시작 ********************** */
    const $starIcons = [
        ...$container.querySelectorAll('.star-rating-container > i'),
    ];

    starContainer.addEventListener('mouseover', (e) => {
        e.stopPropagation();
        //이벤트를 발생시킨 target이 star-rating-container의 자식요소가 아니면 무시한다.
        if (!e.target.matches('.star-rating-container > i')) return;

        const targetIndex = $starIcons.indexOf(e.target);
        $starIcons.forEach(($starIcon, i) => {
            i <= targetIndex ? $starIcon.classList.add('hovered') : null;
        });
    });

    starContainer.addEventListener('mouseout', () => {
        $starIcons.forEach(($starIcon) => {
            console.log($starIcon)
            $starIcon.classList.remove('hovered');
        });
    });

    starContainer.addEventListener('click', (e) => {
        if (!e.target.matches('.star-rating-container > i')) return;

        const targetIndex = $starIcons.indexOf(e.target);

        $starIcons.forEach(($starIcon, i) => {
            i <= targetIndex
                ? $starIcon.classList.toggle('selected', true)
                : $starIcon.classList.toggle('selected', false);
        });

        const ratingChangeEvent = new CustomEvent('rating-change', {
            detail: { message: targetIndex + 1 },
        });

        $container.dispatchEvent(ratingChangeEvent);
    });
};

export default StarRating;
