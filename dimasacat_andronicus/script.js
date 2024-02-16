function toggleCurrent() {
  var currentDiv = document.querySelector("#current");
  currentDiv.style.display = (currentDiv.style.display === 'none' || 
    currentDiv.style.display === '') ? 'block' : 'none';
}

function toggleWebDeveloper() {
  var currentDiv = document.querySelector("#web_developer");
  currentDiv.style.display = (currentDiv.style.display === 'none' || 
    currentDiv.style.display === '') ? 'block' : 'none';
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}