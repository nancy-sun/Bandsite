let comments = []; //empty array to store new comments

/* declare unit diff variables for comment timestamp */
const SEC_DIFF = 1;
const MIN_DIFF = SEC_DIFF * 60;
const HOUR_DIFF = MIN_DIFF * 60;
const DAY_DIFF = HOUR_DIFF * 24;
const MONTH_DIFF = DAY_DIFF * 30;
const YEAR_DIFF = MONTH_DIFF * 12;

const UNIT_DIFF_MAP = new Map(
    [[YEAR_DIFF, "year"],
    [MONTH_DIFF, "month"],
    [DAY_DIFF, "day"],
    [HOUR_DIFF, "hour"],
    [MIN_DIFF, "min"],
    [SEC_DIFF, "sec"]]
)

const CommentUlElem = document.querySelector(".comment__list");
const formElem = document.querySelector(".comment__form");
const nameInputElem = document.querySelector(".comment__form-name");
const textInputElem = document.querySelector(".comment__form-text");

const API_KEY = "a480e6ce-b8d3-4bfe-ba77-02654651ef59";
const API_KEY_PARAM = "?api_key=" + API_KEY;
const API_URL = "https://project-1-api.herokuapp.com/comments";
const COMMENTS_URL = API_URL + API_KEY_PARAM;

run();

function run() {
    getAllComments();
    createFormListener();
}

function displayComments() {
    for (let i = 0; i < comments.length; i++) {
        createCommentDom(i);
    }
};

function createCommentElement(tag, className, text = "") {
    const item = document.createElement(tag);
    item.classList.add(className);
    item.innerText = text;
    return item;
}

function createCommentDom(index) {
    let commentObj = comments[index];
    const commentBox = createCommentElement("li", "comment__box");
    CommentUlElem.appendChild(commentBox);

    const avatar = createCommentElement("div", "comment__avatar");
    avatar.classList.add("avatar");
    if (commentObj.avatar) {
        avatar.style.backgroundImage = `url(${commentObj.avatar})`;
    }
    commentBox.appendChild(avatar);

    const context = createCommentElement("div", "comment__context");
    commentBox.appendChild(context);

    const info = createCommentElement("div", "comment__info");
    context.appendChild(info);

    const name = createCommentElement("p", "comment__name", commentObj.name);
    info.appendChild(name);

    const infoRight = createCommentElement("div", "comment__info--right");
    info.appendChild(infoRight);

    const timeDiff = calculateTimeElapse(commentObj.timestamp);
    const time = createCommentElement("p", "comment__time", timeDiff);
    infoRight.appendChild(time);

    const deleteButton = createCommentElement("button", "comment__delete");
    infoRight.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        const deleteUrl = API_URL + "/" + commentObj.id + API_KEY_PARAM;
        axios.delete(deleteUrl).then(() => {
            commentBox.remove();
            comments.splice(index, 1);
        }).catch(() => {
            alert("delete failed");
        })
    })

    const like = createCommentElement("div", "comment__like");
    infoRight.appendChild(like);

    const likeButton = createCommentElement("button", "comment__like-button");
    like.appendChild(likeButton);

    const likeCount = createCommentElement("p", "comment__like-count", commentObj.likes);
    like.appendChild(likeCount)

    likeButton.addEventListener("click", () => {
        const likeUrl = API_URL + "/" + commentObj.id + "/like" + API_KEY_PARAM;
        axios.put(likeUrl).then(() => {
            commentObj.likes += 1;
            likeCount.innerText = commentObj.likes;
        }).catch(() => {
            alert("like comment failed");
        })
    })

    const text = createCommentElement("p", "comment__text", commentObj.comment);
    context.appendChild(text);
}

//get comments from api, store in comments arr and display
function getAllComments() {
    axios.get(COMMENTS_URL).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
            comments.unshift(response.data[i]);
        }
        comments.sort((a, b) => {
            return a.timestamp > b.timestamp;
        });
        displayComments(comments);
    }).catch((error) => {
        alert(error);
    })
}

//create a form listener for new comment and post a comment
function createFormListener() {
    formElem.addEventListener("submit", function (event) {
        event.preventDefault();

        nameInputElem.classList.remove("comment__form--invalid");
        textInputElem.classList.remove("comment__form--invalid");

        const newComment = {
            name: event.target.name.value,
            comment: event.target.comment.value,
        };
        postComment(newComment);
    })
}

//this function validates and posts comment
function postComment(newComment) {
    if (newComment.name && newComment.comment) {
        axios.post(COMMENTS_URL, newComment).then(result => {
            comments.unshift(result.data);
            formElem.reset();
            CommentUlElem.innerText = ""; //remove comments displayed previously
            displayComments(comments.slice(0, 10)); //limit comments displayed on page to 10
        }).catch(error => {
            alert(error);
        })
    } else if (!newComment.name && newComment.comment) {
        nameInputElem.classList.add("comment__form--invalid");
    } else if (!newComment.comment && newComment.name) {
        textInputElem.classList.add("comment__form--invalid");
    } else {
        nameInputElem.classList.add("comment__form--invalid");
        textInputElem.classList.add("comment__form--invalid");
    }
}

//calculate time elapsed between comment posted and now
function calculateTimeElapse(commentDate) {
    let now = new Date().getTime() / 1000; //timestamp now in secs
    let commentTimestamp = new Date(commentDate).getTime() / 1000; //timestamp of comment in secs
    let timeDiffInSec = now - commentTimestamp;

    for (const [unit, unitStr] of UNIT_DIFF_MAP) {
        let timeElapsed = getTimeDiffInStr(timeDiffInSec, unit, unitStr);
        if (timeElapsed) {
            return timeElapsed;
        }
    }
    return "Just Now";
}

//to get time diff based on time intervals
function getTimeDiffInStr(timeDiffInSec, unit, unitStr) {
    let unitsDiffInSec = timeDiffInSec - unit;
    if (unitsDiffInSec > 0) {
        let units = Math.floor(timeDiffInSec / unit);
        return `${units} ${unitStr}${units > 1 ? "s" : ""} ago`;
    }
}

