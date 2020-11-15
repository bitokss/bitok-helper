const TABLE_ID = 'courseTable';
const CE_REGEX = '_2224';
const CE_BACK_COLOR = '#4CAF50';
const DELAY = 3000;
const LINK_TEXT = 'برای ورود کلیک کنید';
const LOADING_MESSAGE = 'لطفا صبر کنید ...';
const KEEP_RECENT_COUNT = 10;

let loadingMessageRef;


// show pop up loading message
function showLoader() {
    loadingMessageRef = document.createElement('div');
    const loadingCycle = document.createElement('div');
    loadingCycle.className = "loaderAnimation";
    loadingMessageRef.id = "loadingMessageContainer";
    loadingMessageRef.innerHTML = LOADING_MESSAGE;
    loadingMessageRef.style.top = '-10%';
    loadingMessageRef.appendChild(loadingCycle);
    document.body.appendChild(loadingMessageRef);
    setTimeout(() => {
        loadingMessageRef.style.top = '10%';
    }, 200);
}

function hideLoader() {
    loadingMessageRef.style.top = '-10%';
}

// add to recent course array
function onOpenLinkClickHandler(name, code, link) {
    const courses_str = window.localStorage.getItem('bitok_courses');
    let courses = courses_str !== null ? JSON.parse(courses_str) : [];
    courses.unshift({name, code, link});
    courses = courses.slice(0,KEEP_RECENT_COUNT);
    window.localStorage.setItem('bitok_courses', JSON.stringify(courses));
}

function modifier() {
    let table = document.getElementById(TABLE_ID);
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let button = row.cells[0].firstChild;
        let onclickStr = button.getAttribute("onclick");
        let dest = onclickStr.slice(onclickStr.indexOf('(') + 2,
            onclickStr.indexOf(')') - 1);

        const courseName = row.cells[2].innerText;
        const courseCode = row.cells[1].innerText;
        const acLink = `http://${dest}`;

        let a = document.createElement("a");
        a.setAttribute("href", acLink);
        a.setAttribute("target", '_blank');
        a.className = 'bitokLinkStyle';
        a.innerHTML = LINK_TEXT;

        // update recent courses
        a.addEventListener('click', () => {
            console.log("clicked");
            onOpenLinkClickHandler(courseName, courseCode, acLink);
        });

        let newCell = row.insertCell(0);
        newCell.appendChild(a);

        if (dest.search(CE_REGEX) >= 0) {
            row.style.backgroundColor = CE_BACK_COLOR;
        }
    }
    hideLoader();
}

showLoader();
setTimeout(modifier, DELAY);
