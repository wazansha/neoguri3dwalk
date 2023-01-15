(function () {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    const mousePos = { x: 0, y: 0 };
    let maxScrollValue = 0;

    function resizeHandler() {
        // body 전체 height - 스크롤바 height(= 현재 보이는 뷰포트 창의 height)
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function () {
        const scrollPer = pageYOffset / maxScrollValue;
        // Y축 기준 현재 위치 / 최대 스크롤 값(0 ~ 1)
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        // 프로그레스 바
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function (e) {
        // 뷰포트 중앙을 0으로 만드는 코드(왼쪽 끝을 -1로 해서 마우스 위치의 뷰포트 상 가로 비율*2(+1까지 가도록)만큼 더해준 거.)
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerWidth) * 2;
        stageElem.style.transform = 'rotateX(' + mousePos.y * 5 + 'deg) rotateY(' + mousePos.x * 10 + 'deg)'; 
    })

    window.addEventListener('resize', resizeHandler);

    stageElem.addEventListener('click', function (e) {
        new Character({
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.5 + 0.2
        });
    });

    selectCharacterElem.addEventListener('click', function (e) {
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    })

    resizeHandler();

})();