
//default comment
const comments = [
    {
        name: "Connor Walton",
        timestamp: "02/17/2021",
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        avatar: "./assets/images/mohan-muruge.jpg" //url path
    },
    {
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
        avatar: "#" //url path
    },
    {
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        avatar: "#" //url path
    }
]


function displayComment(commentsArr) {
    for (let i = 0; i < commentsArr.length; i++) {
        createComment(commentsArr[i]);
    }
};

//grab the parent <ul> element
const commentList = document.querySelector(".comment__list");

//create element and give it a class
function createCommentElement(tag, className) {
    const item = document.createElement(tag);
    item.classList.add(className);
    return item;
}

function createComment(commentObj) {
    const commentBox = createCommentElement("li", "comment__box");
    commentList.appendChild(commentBox);

    const avatar = createCommentElement("div", "comment__avatar");
    avatar.classList.add("avatar");
    avatar.style.backgroundImage = `url(${commentObj.avatar})`;
    commentBox.appendChild(avatar);

    const context = createCommentElement("div", "comment__context");
    commentBox.appendChild(context);

    const info = createCommentElement("div", "comment__info");
    context.appendChild(info);

    const name = createCommentElement("p", "comment__name");
    name.innerText = commentObj.name;
    info.appendChild(name);

    const time = createCommentElement("p", "comment__time");
    time.innerText = commentObj.timestamp;
    info.appendChild(time);

    const text = createCommentElement("p", "comment__text");
    text.innerText = commentObj.text;
    context.appendChild(text);
}


//form submission

//grab the <form>
const form = document.querySelector(".comment__form");

//grab the submit button
const submit = document.querySelector(".comment__submit");

//get submission date
function getTimestamp() {
    const today = new Date();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    const date = today.getDate();
    const year = today.getFullYear();
    return month + "/" + date + "/" + year;
}

displayComment(comments);

//when submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const today = getTimestamp();
    const newComment = {
        name: event.target.name.value,
        timestamp: today,
        text: event.target.comment.value,
        avatar: "#" //url path
    };
    form.reset();
    comments.unshift(newComment); //remove the previous comments
    commentList.innerText = "";
    displayComment(comments.slice(0, 10));
    console.log(comments);
});




