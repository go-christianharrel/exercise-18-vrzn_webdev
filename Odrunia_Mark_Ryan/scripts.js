let commentsArray = [
  {
      user: "Jhean Khendrick C. Galope",
      text: `Hello Mark! this is my comment and my comment is 
      composed of words in english. This is awesome 
      and I hope you find love in web development. 
      Let's go go go!`,
      timestamp: "11/10/2023, 1:32:58 PM",
  },
  {
      user: "Adrian B. Naoe",
      text: `I just wanna say you're the real deal hardware 
      enthusiast person. I've learn a lot from you 
      thanks for upgrading advice when I need to
      repair or modify my pc or laptops.`,
      timestamp: "11/11/2023, 4:25:51 PM",
  },
  {
      user: "Andronicus R. Dimasacat",
      text: `But she wears short skirts I wear T-shirts
      She's Cheer Captain, and I'm on the bleachers
      Dreaming about the day when you wake up and find
      That what you're looking for has been here the whole time`,
      timestamp: "11/12/2023, 5:30:57 AM",
  },
  {
      user: "Christian Harrel Y. Go",
      text: `Hope to ride with you soon. Always rember, 
      The most important thing in life will always 
      be family brother. Ride safe!`,
      timestamp: "11/13/2023, 4:32:58 PM",
  },
];

function commentButton() {
  let name = document.querySelector("#full_name");
  let txtarea = document.querySelector("#story");
  let commentButton = document.querySelector("#comment_button");

  if (name.value.trim().length && txtarea.value.trim().length) {
    commentButton.disabled = false;
  } else {
    commentButton.disabled = true;
  }
}

function createCommentElement(comment) {
  let commentElement = document.createElement("p");
  commentElement.innerHTML = `
    <b>${comment.user}</b> (${comment.timestamp})
    <p><em>${comment.text}</em></p>`;
  return commentElement;
}

function updateComments() {
  let content = document.querySelector(".comments");

  content.innerHTML = "";
  commentsArray.forEach((comment) => {
    content.appendChild(createCommentElement(comment));
  });

  let sortButton = document.createElement("button");
  sortButton.id = "sort_button";
  sortButton.textContent = "Sort by dates";
  sortButton.addEventListener("click", () => {
    commentsArray.reverse();
    updateComments(); 
  });

  content.appendChild(sortButton);
}
  
function commentForm() {
  let author = document.querySelector("#full_name");
  let text = document.querySelector("#story");
  let submit = document.querySelector("#comment_button");

  let user = author.value;
  let newtext = text.value;

  if (user && newtext) {
    let timestamp = new Date().toLocaleString();

    commentsArray.push({
      user: user,
      text: newtext,
      timestamp: timestamp,
    });

    commentsArray.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    updateComments();

    author.value = "";
    text.value = "";
    submit.disabled = true;
  }
}
  
document.querySelector("#comment_button")
  .addEventListener("click", commentForm);

document.querySelector("#sort_button")
  .addEventListener("click", () => {
  commentsArray.reverse();
  
  updateComments(); 
});
  
updateComments();
  