
//default comment
const comments = [
    {
        name: "Connor Walton",
        timestamp: new Date().setFullYear(2022, 2 - 1, 17),
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        avatar: "./assets/images/mohan-muruge.jpg" //url path
    },
    {
        name: "Emilie Beach",
        timestamp: new Date().setFullYear(2021, 1 - 1, 9),
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
        avatar: "#" //url path
    },
    {
        name: "Miles Acosta",
        timestamp: new Date().setFullYear(2020, 12 - 1, 20),
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        avatar: "#" //url path
    }
]

const secDiff = 1;
const minDiff = secDiff * 60;
const hourDiff = minDiff * 60;
const dayDiff = hourDiff * 24;
const monthDiff = dayDiff * 30;
const yearDiff = monthDiff * 12;
const diffs = new Map(
    [[yearDiff, "year"],
    [monthDiff, "month"],
    [dayDiff, "day"],
    [hourDiff, "hour"],
    [minDiff, "min"],
    [secDiff, "sec"]]
)

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
    const timeDiff = calculateTimeElapse(commentObj.timestamp);


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
    time.innerText = timeDiff;
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

function getSubmitDate(commentDate) {
    const submitDate = new Date(commentDate);
    let month = submitDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    let date = submitDate.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    const year = submitDate.getFullYear();
    console.log(submitDate);
    return month + "/" + date + "/" + year;
}


displayComment(comments);

//get submission time
form.addEventListener("submit", (e) => {
    return e.timeStamp;
})

//when submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    //version before diving deep
    // let today = new Date; 
    // today = getSubmitDate(today);
    let now = new Date();

    const newComment = {
        name: event.target.name.value,
        timestamp: now,
        text: event.target.comment.value,
        avatar: "#" //url path for avatar
    };

    //validate form submission and style error state
    if (newComment.name && newComment.text) {
        comments.unshift(newComment);
        form.reset();
    } else {
        if (!newComment.name && !newComment.text) {
            document.querySelector(".comment__form-name").classList.add("comment__form--invalid");
            document.querySelector(".comment__form-text").classList.add("comment__form--invalid");
        } else if (!newComment.text) {
            document.querySelector(".comment__form-text").classList.add("comment__form--invalid");
        } else {
            document.querySelector(".comment__form-name").classList.add("comment__form--invalid");
        }
    }
    commentList.innerText = ""; //remove comments displayed previously)
    displayComment(comments.slice(0, 10)); //limit comments displayed on page to 10
});

function calculateTimeElapse(commentDate) {
    let now = new Date().getTime() / 1000;

    let commentTimestamp = new Date(commentDate).getTime() / 1000;

    let timeDiffInSec = now - commentTimestamp;
    for (const [unit, unitStr] of diffs) {
        let timeElapsed = getTimeDiffInStr(timeDiffInSec, unit, unitStr)
        console.log(timeElapsed)
        if (timeElapsed) {
            return timeElapsed;
        }
    }
    return "Just Now";
}

function getTimeDiffInStr(timeDiffInSec, unit, unitStr) {
    let unitsDiffInSec = timeDiffInSec - unit;
    if (unitsDiffInSec > 0) {
        let units = Math.floor(timeDiffInSec / unit);
        return `${units} ${unitStr}${units > 1 ? 's' : ''} ago`;
    }
}