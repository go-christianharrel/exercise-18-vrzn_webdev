const commentBtn = document.querySelector(".comment-btn");
const nameBox = document.querySelector("#input_name");
const commentBox = document.querySelector("#input_comment");
const commentContainer = document.querySelector(".comment-container");
const sortSelect = document.querySelector("#sort_select");
const api = "https://comments-jhean-default-rtdb.asia-southeast1.firebasedatabase.app/comment.json"
const initialComments = [];

fetch(api)
    .then(response => response.json())
    .then(data => {
        if(data)
            Object.keys(data).forEach(key => {
                initialComments.push(data[key]);
            })
        
        updateComments();
    })
    
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
        
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data)
                    Object.keys(data).forEach((key) => {
                        initialComments.push(data[key]);
                    });
            });

        initialComments.push(newComment);
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
    const allComments = [...initialComments];
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

const experiences = document.querySelectorAll(".experience");

experiences.forEach(experience => {

  const experienceContainer = experience.nextElementSibling;
  const symbol = experience.querySelector(".symbol");

  experience.addEventListener("click", () => {
    if (experienceContainer.classList.contains("journey-container-show")) {
      experienceContainer.classList.remove("journey-container-show");
      symbol.classList.remove("rotate");
    } else {
      experienceContainer.classList.add("journey-container-show");
      symbol.classList.add("rotate");
    }
  });
});

commentBtn.addEventListener("click", addComment);
commentBox.addEventListener("input", handleInputChange);
nameBox.addEventListener("input", handleInputChange);
sortSelect.addEventListener("change", updateComments);

updateComments();