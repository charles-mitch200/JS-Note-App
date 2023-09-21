const buttonElem = document.querySelector(".js-btn");
const notesContainer = document.querySelector(".notes-container");
let notes = document.querySelectorAll(".input-box");

// Display the notes stored in local storage
const displayNotes = () => {
  notesContainer.innerHTML = localStorage.getItem("notes");
};

displayNotes();

// Store the notes in local storage
const storeNotesPermanently = () => {
  localStorage.setItem("notes", notesContainer.innerHTML);
};

// generate an input box
buttonElem.addEventListener("click", () => {
  let note = document.createElement("p");
  let image = document.createElement("img");
  note.className = "input-box";
  note.setAttribute("contenteditable", "true");
  image.src = "images/delete.png";
  notesContainer.appendChild(note).appendChild(image);
});

// delete a note
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    storeNotesPermanently();
    // Update notes in local storage every time you type
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.addEventListener("keyup", () => {
        storeNotesPermanently();
      });
    });
  }
});

// prevent the default property of enter key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
