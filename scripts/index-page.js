const comments = [
    {
        name: "Connor Walton",
        timestamp: new Date().setFullYear(2021, 2 - 1, 17),
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

//declare unit diff variables for comment timestamp
const secDiff = 1;
const minDiff = secDiff * 60;
const hourDiff = minDiff * 60;
const dayDiff = hourDiff * 24;
const monthDiff = dayDiff * 30;
const yearDiff = monthDiff * 12;

//iterate unit diff over an array
const diffs = [
    {
        unit: yearDiff,
        unitString: "year"
    },
    {
        unit: monthDiff,
        unitString: "month"
    },
    {
        unit: dayDiff,
        unitString: "day"
    },
    {
        unit: hourDiff,
        unitString: "hour"
    },
    {
        unit: minDiff,
        unitString: "min"
    },
    {
        unit: secDiff,
        unitString: "sec"
    }
];

/* to iterate over a map
const diffs = new Map(
    [[yearDiff, "year"],
    [monthDiff, "month"],
    [dayDiff, "day"],
    [hourDiff, "hour"],
    [minDiff, "min"],
    [secDiff, "sec"]]
)
*/

function displayComments(commentsArr) {
    for (let i = 0; i < commentsArr.length; i++) {
        createCommentBox(commentsArr[i]);
    }
};

//grab the parent <ul> element
const commentList = document.querySelector(".comment__list");

//create element and give it a class
function createCommentElement(tag, className, text = "") {
    const item = document.createElement(tag);
    item.classList.add(className);
    item.innerText = text;
    return item;
}

function createCommentBox(commentObj) {
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

    const name = createCommentElement("p", "comment__name", commentObj.name);
    info.appendChild(name);

    const timeDiff = calculateTimeElapse(commentObj.timestamp);
    const time = createCommentElement("p", "comment__time", timeDiff);
    info.appendChild(time);

    const text = createCommentElement("p", "comment__text", commentObj.text);
    context.appendChild(text);
}

//display default comments when page first loads
displayComments(comments);


//form submission

//grab the <form>
const form = document.querySelector(".comment__form");

//grab the submit button
const submit = document.querySelector(".comment__submit");

//used for displaying comment timestamp in mm/dd/yyyy format
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

//grab input boxes in the form
const nameInput = document.querySelector(".comment__form-name");
const textInput = document.querySelector(".comment__form-text");


//when submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    nameInput.classList.remove("comment__form--invalid");
    textInput.classList.remove("comment__form--invalid");

    let submitTime = new Date(); //grab the timestamp of submission

    const newComment = {
        name: event.target.name.value,
        timestamp: submitTime,
        text: event.target.comment.value,
        avatar: "#" //url path for avatar
    };

    //validate form submission and style error state
    if (newComment.name && newComment.text) {
        comments.unshift(newComment);
        form.reset();
    } else if (!newComment.name && newComment.text) {
        nameInput.classList.add("comment__form--invalid");
    } else if (!newComment.text && newComment.name) {
        textInput.classList.add("comment__form--invalid");
    } else {
        nameInput.classList.add("comment__form--invalid");
        textInput.classList.add("comment__form--invalid");
    }

    commentList.innerText = ""; //remove comments displayed previously
    displayComments(comments.slice(0, 10)); //limit comments displayed on page to 10
});


//functions use for diving deep timestamp format for comments

//calculate time elapsed between comment and now
function calculateTimeElapse(commentDate) {
    let now = new Date().getTime() / 1000; //timestamp now in secs
    let commentTimestamp = new Date(commentDate).getTime() / 1000; //timestamp of comment in secs
    let timeDiffInSec = now - commentTimestamp;

    for (let i = 0; i < diffs.length; i++) {
        let timeElapsed = getTimeDiffInStr(timeDiffInSec, diffs[i].unit, diffs[i].unitString);
        if (timeElapsed) {
            return timeElapsed;
        }
    }
    return "Just Now";

    /* iterate over a map
    for (const [unit, unitStr] of diffs) {
        let timeElapsed = getTimeDiffInStr(timeDiffInSec, unit, unitStr);
        if (timeElapsed) {
            return timeElapsed;
        }
    }
    */
}

//to get time diff based on units
function getTimeDiffInStr(timeDiffInSec, unit, unitStr) {
    let unitsDiffInSec = timeDiffInSec - unit;
    if (unitsDiffInSec > 0) {
        let units = Math.floor(timeDiffInSec / unit);
        return `${units} ${unitStr}${units > 1 ? "s" : ""} ago`;
    }
}