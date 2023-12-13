const definedComments = [
    {
      name: "Mark Ryan Odrunia",
      comment: `Great goals! hoping you achieve them all someday!`,
      date: "2023-11-04 10:59:42",
    },
    {
      name: "Christian Harrel Go",
      comment: `I look forward to the possibility of meeting you during 
                our master's degree journey. May I ask which school you 
                are considering for enrollment?`,
      date: "2023-11-04 17:31:27",
    },
    {
      name: "Jhean Khendrick",
      comment: `Hey this is a comment! nice!`,
      date: "2023-11-03 06:15:58",
    },
    {
      name: "Adrian B. Naoe",
      comment: `I love how you use blue color theme on your website`,
      date: "2023-11-03 23:05:13",
    },
];
  
function displayDefinedComment() {
    const commentSection = document.querySelector(".guide-comment");
    definedComments.forEach((arrayObject) => {
      const commentElement = Object.assign(document.createElement("div"), {
        className: "comment-style",
        innerHTML: `
          <p class="comment-name">${arrayObject.name} - 
          ${new Date(arrayObject.date).toLocaleString()}</p>
          <p class="comments">${arrayObject.comment}</p>`,
      });
      commentSection.appendChild(commentElement);
    });
}
  
displayDefinedComment();
  
function validate() {
    let name = document.querySelector("#input_name").value.trim();
    let comment = document.querySelector("#input_comment").value.trim();
    let commentButton = document.querySelector("#btn");
    commentButton.disabled = !(name.length && comment.length);
}
  
function addComment() {
    let name = document.querySelector("#input_name").value; 
    let comment = document.querySelector("#input_comment").value;
    
    if (!name || !comment) return;
    let dateOutput = new Date().toLocaleString();
    const commentSection = document.querySelector(".guide-comment");
    commentSection.appendChild(Object.assign(document.createElement("div"), {
      className: "comment-style",
      innerHTML: `
        <p class="comment-name">${name} - ${dateOutput}</p>
        <p class="comments">${comment}</p>`
    }));
    
    document.querySelector("#input_name").value = "";
    document.querySelector("#input_comment").value = "";
    document.querySelector("#btn").disabled = true;
}
  
let sorting = 'desc';
  
function sortComments() {
    const commentSection = document.querySelector(".guide-comment");
    const comments = Array.from(commentSection
      .getElementsByClassName('comment-style'));
  
    comments.sort((first, second) => {
        let dateA = new Date(first.querySelector('.comment-name')
            .textContent.split(' - ')[1]);
        let dateB = new Date(second.querySelector('.comment-name')
            .textContent.split(' - ')[1]);
        return sorting === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
    comments.forEach(comment => comment.remove());
    comments.forEach(comment => commentSection.appendChild(comment));
}
  
function sortOrder() {
    sorting = sorting === 'asc' ? 'desc' : 'asc';
    sortComments();
}