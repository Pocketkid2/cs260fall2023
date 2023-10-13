// Highlight the tab at the top corresponding to the page we've selected
function highlight_current_page_tab() {
    const path = window.location.pathname;
    const page_name = path.split('/').pop().replace('.html', '');
    const element = document.getElementById(page_name);
    if (element) {
        element.style.backgroundColor = "#AAAAAA"
    }
}
highlight_current_page_tab();