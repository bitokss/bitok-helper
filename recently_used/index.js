const BUTTON_TEXT = "درس‌های اخیر";
const NOT_FOUND = "درسی یافت نشد!";
const MODAL_SIGNATURE = 'بیتوک - انجمن علمی مهندسی کامپیوتر';

let modalContainer;
let modalBackground;

function showModal() {
    modalBackground.style.display = 'flex';
    modalContainer.style.display = 'block';
    modalBackground.style.opacity = '1';
    setTimeout(() => {
        modalContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        modalContainer.style.opacity = '1';
    }, 300);
}

function hideModal() {
    modalBackground.style.opacity = '0';
    modalContainer.style.top = 'translate(-50%, -50%) scale(0.5)';
    modalContainer.style.opacity = '0';
    setTimeout(() => {
        modalBackground.style.display = 'none';
        modalContainer.style.display = 'none';
    }, 300);
}

function renderButton() {
    const button = document.createElement('div');
    button.innerText = BUTTON_TEXT;
    button.className = "bitokRecentCourses";
    button.addEventListener('click', showModal);
    document.body.appendChild(button);
}

function renderModal() {
    modalBackground = document.createElement('div');
    modalBackground.style.display = 'none';
    modalBackground.addEventListener('click', hideModal);
    modalContainer = document.createElement('div');
    modalContainer.style.display = 'none';
    modalContainer.className = 'bitokModalContainer';
    modalBackground.className = 'bitokModalBackground';
    document.body.appendChild(modalBackground);
    document.body.appendChild(modalContainer);
}

function createCourseElement({ name, link, code }) {
    const course = document.createElement('a');
    course.setAttribute('href', link);
    course.setAttribute('target', '_blank');

    // update course list
    course.addEventListener('click', () => {
        const courses_str = window.localStorage.getItem('bitok_courses');
        let courses = courses_str !== null ? JSON.parse(courses_str) : [];
        courses.unshift({name, code, link});
        courses = courses.slice(0,KEEP_RECENT_COUNT);
        window.localStorage.setItem('bitok_courses', JSON.stringify(courses));
    });


    course.className = 'bitokCourse';
    course.innerText = `${name}`;
    return course;
}

function renderModalContent() {
    const courses_str = window.localStorage.getItem('bitok_courses');
    const courses = courses_str !== null ? JSON.parse(courses_str) : [];
    courses.forEach((course) => {
        modalContainer.appendChild(createCourseElement(course));
    });

    if (courses.length === 0) {
        const notFound = document.createElement('div');
        notFound.className = "bitokNotFound";
        notFound.innerText  = NOT_FOUND;
        modalContainer.appendChild(notFound);
    }

    const modalSignature = document.createElement('div');
    modalSignature.className = 'bitokSignature';
    modalSignature.innerText = MODAL_SIGNATURE;
    modalContainer.appendChild(modalSignature);
}



renderButton();
renderModal();
renderModalContent();

// handle storage changes
document.addEventListener('storage', () => {
    console.log('run');
    setTimeout(renderModalContent, 300);
});
