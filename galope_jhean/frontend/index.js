const commentBtn = document.querySelector(".comment-btn");
const nameBox = document.querySelector("#input_name");
const commentBox = document.querySelector("#input_comment");
const commentContainer = document.querySelector(".comment-container");
const sortSelect = document.querySelector("#sort_select");

const initialComments = [
  {
    name: "Mark Ryan Odrunia",
    comment: "Great goals! hoping you achieve them someday!",
    date: "2023-10-15T08:00:00Z",
  },
  {
    name: "Adrian Naoe",
    comment: "I love your works bro",
    date: "2023-10-16T08:00:00Z",
  },
  {
    name: "Christian Harrel Go",
    comment: "We have similar goals, let's build community together sooner!",
    date: "2023-10-17T08:00:00Z",
  },
  {
    name: "Andronicus Dimasacat",
    comment: "Yo, your goals are awesome.",
    date: "2023-10-18T08:00:00Z",
  }
];

const comments = [...initialComments];

const handleInputChange = () => {
    const nameLength = nameBox.value.trim().length;
    const commentLength = commentBox.value.trim().length;
    commentBtn.disabled = !(commentLength && nameLength);
};

const addComment = () => {
    const name = nameBox.value.trim();
    const comment = commentBox.value.trim();

    if (name && comment) {
        const currentDate = new Date();
        const commentDate = currentDate.toISOString();

        const newComment = {
            name,
            comment,
            date: commentDate,
        };

        comments.push(newComment);
        updateComments();
        nameBox.value = "";
        commentBox.value = "";
        commentBtn.disabled = true;

        window.scrollTo(0, document.body.scrollHeight);
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const updateComments = () => {
    commentContainer.innerHTML = "";
    const allComments = [...comments];
    const sortedComments = sortComments(allComments, sortSelect.value);
    sortedComments.forEach((comment) => {
        const newComment = document.createElement("div");
        newComment.classList.add("main-comment");
        newComment.innerHTML = `
            <div class="icon">
                <img src="assets/avatar.webp" alt="">
            </div>
            <div class="details">
                <h4>${comment.name}</h4>
                <p>${comment.comment}</p>
                <p class="comment-date">${formatDate(comment.date)}</p>
            </div>
        `;
        commentContainer.appendChild(newComment);
    });
};

const sortComments = (comments, order) => {
    return comments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return order === "asc" ? dateA - dateB : dateB - dateA;
    });
};

commentBtn.addEventListener("click", addComment);
commentBox.addEventListener("input", handleInputChange);
nameBox.addEventListener("input", handleInputChange);
sortSelect.addEventListener("change", updateComments);

updateComments();
