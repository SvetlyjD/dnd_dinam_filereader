const button = document.querySelector(".btn");
const input = document.querySelector(".fileInput");
const preview = document.querySelector(".preview");

const triggerInput = () => input.click();
const changeHandler = (e) => {

    const files = e.target.files;
    Array.from(files).forEach((file, i) => {
        const reader = new FileReader();

        reader.onloadstart = event => {
            let div = document.createElement("div");
            let preview_image = document.createElement("div");
            preview_image.classList.add("preview-image")
            div.classList.add("loader");
            preview_image.appendChild(div);
            preview.appendChild(preview_image);
        }

        reader.onprogress = e => {
            const loader = document.querySelectorAll(".loader");
            let downloadPr = parseInt(e.loaded / e.total * 100);
            console.log("onprogress-", i, "loaded-", downloadPr);
            loader[i].style.width = downloadPr + "%";
        }

        reader.onload = event => {
            console.log("onload-", i);
            const loader = document.querySelector(".loader");
            loader.remove();
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

    Array.from(c).forEach(item => {
        item.draggable = true;
        item.ondragstart = e => {
            console.log("dragstart");
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

button.addEventListener("click", triggerInput);
input.addEventListener("change", changeHandler);

let beginElem;

preview.addEventListener('dragstart', handleDragStart);
function handleDragStart(e) {
    if (e.target.tagName == "IMG") {
        e.dataTransfer.setData("src1", e.target.src);
        e.target.classList.add("dragging");
        beginElem = e.target;
    } else return
}

preview.addEventListener('dragover', handleDragOver);
function handleDragOver(e) {
    if (e.target.tagName == "IMG") {
        let old = document.querySelector('.dragoverelem');
        old && old.classList.remove('dragoverelem')
        e.target.classList.add('dragoverelem');
        e.preventDefault();
    }
    else return;
}

preview.addEventListener("drop", handleDrop);
function handleDrop(e) {
    if (e.target.tagName == "IMG") {
        let old = document.querySelector(".dragging");
        old && old.classList.remove('dragging');
        old = document.querySelector('.dragoverelem');
        old && old.classList.remove('dragoverelem');
        let v = e.target.src;
        let sr = e.dataTransfer.getData("src1");
        e.target.src = sr;
        beginElem.src = v;
    }
    else return
}
