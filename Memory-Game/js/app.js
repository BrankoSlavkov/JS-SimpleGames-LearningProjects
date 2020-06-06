document.addEventListener("DOMContentLoaded", () => {

    const cardArray = [
        {
            name: "planet",
            image: "img/img0.png"
        },
        {
            name: "planet",
            image: "img/img0.png"
        },
        {
            name: "head",
            image: "img/img1.png"
        },
        {
            name: "head",
            image: "img/img1.png"
        },
        {
            name: "mouse",
            image: "img/img3.png"
        },
        {
            name: "mouse",
            image: "img/img3.png"
        },
        {
            name: "piano",
            image: "img/img4.png"
        },
        {
            name: "piano",
            image: "img/img4.png"
        },
        {
            name: "wheel",
            image: "img/img5.png"
        },
        {
            name: "wheel",
            image: "img/img5.png"
        },
        {
            name: "bottle",
            image: "img/img6.png"
        },
        {
            name: "bottle",
            image: "img/img6.png"
        },
    ];

    cardArray.sort( () => .5 - Math.random() );

    var grid = document.querySelector(".grid"),
        cardsChosen = [],
        cardsChosenId = [],
        cardsFound = [];

    var result = document.querySelector("#result");


    function CreateBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", "img/Cover.png");
            card.setAttribute("data-id", i);

            card.addEventListener("click", FlipCard);

            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        //check here
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute("src", "img/White.png");
            cards[optionTwoId].setAttribute("src", "img/White.png");
            
            cardsFound.push(cardsChosen);

            cards[optionOneId].removeEventListener("click", FlipCard);
            cards[optionTwoId].removeEventListener("click", FlipCard);
        }
        else {
            cards[optionOneId].setAttribute("src", "img/Cover.png");
            cards[optionTwoId].setAttribute("src", "img/Cover.png");
        }
        cardsChosen = [];
        cardsChosenId = [];

        result.textContent = cardsFound.length;

        if(cardsFound.length === cardArray / 2){
            alert("You won!");
        }
    }

    function FlipCard() {
        var cardId = this.getAttribute("data-id");

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        this.setAttribute("src", cardArray[cardId].image);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 400);
        }
    }

    CreateBoard();
});