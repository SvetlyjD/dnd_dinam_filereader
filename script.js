const button = document.querySelector(".btn");
const input = document.querySelector(".fileInput");
const preview = document.querySelector(".preview");

const triggerInput = () => input.click();
const changeHandler = (e) => {

    const files = e.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onprogress = event => {

        }

        reader.onload = event => {
            preview.insertAdjacentHTML("afterbegin", `
            <div class = "preview-image">
            <img src="${event.target.result}" alt  ="${event.target.result}" draggable="true"/>
            </div>
            `);
        }
        reader.readAsDataURL(file);
    })
}

function dnd() {
    let c = document.getElementsByTagName("img");
    console.log(c);
    Array.from(c).forEach(item => {
        // console.log(this);
        item.draggable = true;
        item.ondragstart = e => {
            console.log(this);
            e.dataTransfer.setData("id", e.target.id);
            e.target.classList.add("dragging");
        }
        item.ondragover = e => {
            let old = document.querySelector('.over');
            old && old.classList.remove('over')
            e.target.classList.add('over');
            e.preventDefault();

        }
        item.ondrop = e => {
            let old = document.querySelector(".dragging");
            old && old.classList.remove('dragging');
            old = document.querySelector('.over');
            old && old.classList.remove('over');
            let v = e.target.src;
            let beginElem = document.getElementById(e.dataTransfer.getData("id"));
            e.target.src = beginElem.src;
            beginElem.src = v;
        }

    })
}
dnd();
button.addEventListener("click", triggerInput);
input.addEventListener("change", changeHandler);


