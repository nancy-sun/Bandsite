const defaultComment = [
    {
        name: "Connor Walton",
        timestamp: "02/17/2021",
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        avatar: "../assets/Images/Mohan-muruge.jpg" //url path
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
        createCommentContent(commentsArr[i]);
    }
}

const commentList = document.querySelector(".comment__list");

//original function with everything
// function createCommentContent(commentObj) {
//     const commentBox = document.createElement("li");
//     commentList.appendChild(commentBox);
//     commentBox.classList.add("comment__box");

//     const avatar = document.createElement("div");
//     avatar.classList.add("comment__avatar");
//     commentBox.appendChild(avatar);

//     const avatarImg = document.createElement("img");
//     avatarImg.src = commentObj.avatar;
//     avatarImg.alt = "avatar";
//     avatar.appendChild(avatarImg);

//     const context = document.createElement("div");
//     context.classList.add("comment__context");
//     commentBox.appendChild(context);

//     const name = document.createElement("p")
//     name.classList.add("comment__name");
//     name.innerText = commentObj.name;
//     context.appendChild(name);

//     const time = document.createElement("p");
//     time.classList.add("comment__time");
//     time.innerText = commentObj.timestamp;
//     context.appendChild(time);

//     const text = document.createElement("p");
//     text.classList.add("comment__text");
//     text.innerText = commentObj.text;
//     commentBox.appendChild(text);
// }


displayComment(defaultComment);