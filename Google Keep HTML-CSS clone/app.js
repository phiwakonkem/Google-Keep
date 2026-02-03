const smallForm = document.querySelector(".form-container");
const noteTextInput = document.getElementById("noteTextCollapsed");

const expandedForm = document.querySelector(".active-form");
const noteTitleInput = document.getElementById("noteTitleMain");
const noteTextExpanded = document.getElementById("noteTextExpanded");

const modal = document.querySelector(".modal");
const noteTitleModal = document.getElementById("noteTitleModal");
const noteTextModal = document.getElementById("noteTextModal");

const notesContainer = document.getElementById("notesContainer");

const closeButtons = document.querySelectorAll(".close-btn");

const colors = [
  "#fff", "#f28b82", "#fbbc04", "#fff475", "#ccff90",
  "#a7ffeb", "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe8"
];
function createNote(title, text, color = "#fff") {
  if (!title && !text) return; // ignore empty notes

  const note = document.createElement("div");
  note.classList.add("note");
  note.style.backgroundColor = color;

  note.innerHTML = `
    <div class="title">${title}</div>
    <div class="text">${text}</div>
    <div class="note-footer">
      <span class="material-symbols-outlined hover small-icon">palette</span>
      <span class="material-symbols-outlined hover small-icon">add_alert</span>
      <span class="material-symbols-outlined hover small-icon">archive</span>
      <span class="material-symbols-outlined hover small-icon">more_vert</span>
    </div>
  `;

  notesContainer.appendChild(note);

  const paletteIcon = note.querySelector(".note-footer .small-icon");
  paletteIcon.addEventListener("click", () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.backgroundColor = newColor;
  });

  const archiveIcon = note.querySelectorAll(".note-footer .small-icon")[2];
  archiveIcon.addEventListener("click", () => {
    note.remove();
  });
}
noteTextInput.addEventListener("focus", () => {
  smallForm.style.display = "none";
  expandedForm.style.display = "block";
  noteTitleInput.focus();
});
closeButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    let title = "";
    let text = "";

    if (form.contains(noteTitleInput)) {
      title = noteTitleInput.value.trim();
      text = noteTextExpanded.value.trim();
      expandedForm.style.display = "none";
      smallForm.style.display = "block";
      noteTitleInput.value = "";
      noteTextExpanded.value = "";
    } else if (form.contains(noteTitleModal)) {
      title = noteTitleModal.value.trim();
      text = noteTextModal.value.trim();
      modal.classList.remove("open-modal");
      noteTitleModal.value = "";
      noteTextModal.value = "";
    }

    createNote(title, text);
  });
});
[noteTextExpanded, noteTextModal].forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let title = "";
      let text = "";

      if (input === noteTextExpanded) {
        title = noteTitleInput.value.trim();
        text = noteTextExpanded.value.trim();
        expandedForm.style.display = "none";
        smallForm.style.display = "block";
        noteTitleInput.value = "";
        noteTextExpanded.value = "";
      } else if (input === noteTextModal) {
        title = noteTitleModal.value.trim();
        text = noteTextModal.value.trim();
        modal.classList.remove("open-modal");
        noteTitleModal.value = "";
        noteTextModal.value = "";
      }

      createNote(title, text);
    }
  });
});
function openModal() {
  modal.classList.add("open-modal");
  noteTitleModal.focus();
}
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open-modal");
  }
});
const menuBtn = document.querySelector('.logo-area .material-symbols-outlined');
const searchInput = document.querySelector('.search-area input');
const refreshBtn = document.querySelector('.settings-area span:nth-child(1)');
const viewBtn = document.querySelector('.settings-area span:nth-child(2)');
const settingsBtn = document.querySelector('.settings-area span:nth-child(3)');
const appsBtn = document.querySelector('.profile-actions-area span:nth-child(1)');
const accountBtn = document.querySelector('.profile-actions-area span:nth-child(2)');

const sidebarItems = document.querySelectorAll('.sidebar .navigation li');


menuBtn.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('collapsed');
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const notes = notesContainer.querySelectorAll('.note');
    notes.forEach(note => {
        const title = note.querySelector('.title').textContent.toLowerCase();
        const text = note.querySelector('.text').textContent.toLowerCase();
        note.style.display = (title.includes(query) || text.includes(query)) ? 'flex' : 'none';
    });
});

refreshBtn.addEventListener('click', () => {
    searchInput.value = '';
    notesContainer.querySelectorAll('.note').forEach(note => note.style.display = 'flex');
});

let listView = true;
viewBtn.addEventListener('click', () => {
    listView = !listView;
    notesContainer.style.flexDirection = listView ? 'row' : 'column';
});

settingsBtn.addEventListener('click', () => alert("Settings modal would open!"));

appsBtn.addEventListener('click', () => alert("Google Apps modal!"));

accountBtn.addEventListener('click', () => alert("Account modal!"));

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const type = item.querySelector('.sidebar-text').textContent.toLowerCase();
        console.log(`You clicked ${type}`);
    });
});
notesContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('material-symbols-outlined')) return;

    const note = e.target.closest('.note');
    const action = e.target.textContent.trim();

    switch(action){
        case 'palette':
            alert("Open color picker for this note");
            break;
        case 'add_alert':
            alert("Set reminder for this note");
            break;
        case 'archive':
            note.style.display = 'none'; 
            break;
        case 'more_vert':
            alert("More actions for this note");
            break;
    }
});
