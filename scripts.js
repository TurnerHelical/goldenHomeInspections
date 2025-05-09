function dom() {
    const findElement = (selector) => document.querySelector(selector);
    const findAllElements = (selector) => document.querySelectorAll(selector);
    const createAndAppend = (parent, child) => {
        document.createElement(child);
        parent.appendChild(child);
    }
    const toggleClass = function (selector, className) {
        const element = findElement(selector);
        element.classList.toggle(className);
    }
    const toggleClassForAll = (selector, className) => {
        const elements = findAllElements(selector);
        elements.forEach(element => {
            element.classList.toggle(className);
        })
    }
    return { findElement, createAndAppend, toggleClass, findAllElements, toggleClassForAll };
}

const utils = dom();
const page = pageScripts();

function pageScripts() {

    const mobileOrDesktop = () => {
        if ((window.innerWidth) < 1000) {
            (utils.findElement('#mobileButton')).addEventListener('click', openModalMobile);
        } else {
            (utils.findElement('#desktopButton')).addEventListener('click', openModalDesktop);
            (utils.findElement('#scheduleBtnCtrDesktop')).addEventListener('click', openModalDesktop);
        }
    }

    const openModalMobile = () => {
        utils.toggleClass('#scheduleModalCtr', 'disable');
        (utils.findElement('#mobileButton')).removeEventListener('click', openModalMobile);
        (utils.findElement('#modalClose')).addEventListener('click', closeModal)
    }

    const openModalDesktop = () => {
        utils.toggleClass('#scheduleModalCtr', 'disable');
        (utils.findElement('#modalClose')).addEventListener('click', closeModal)
        (utils.findElement('#desktopButton')).removeEventListener('click', openModalDesktop);
        (utils.findElement('#scheduleBtnCtrDesktop')).removeEventListener('click', openModalDesktop);
    }

    const closeModal = () => {
        utils.toggleClass('#scheduleModalCtr', 'disable');
        mobileOrDesktop();
    }
    return {mobileOrDesktop, }

}

page.mobileOrDesktop();

