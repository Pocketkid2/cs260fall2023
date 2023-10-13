// Highlight the tab at the top corresponding to the page we've selected
const path = window.location.pathname;
const page_name = path.split('/').pop().replace('.html', '');
const element = document.getElementById(page_name);
if (element) {
    element.style.backgroundColor = "#AAAAAA"
}