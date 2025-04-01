// Fetches the content of a template file
async function loadTemplate(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.statusText}`);
        }
        return await response.text(); // Return the content of the file as a string
    } catch (error) {
        console.error(error);
    }
}

export async function renderWithTemplate(templateString, parentElement, data, callback, position = "afterbegin", clear = true) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    //const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, templateString);
    if (callback) {
      callback(data);
    }
}

export async function loadHeaderFooter() {
    const headerEl = document.querySelector("#main-header");
    const footerEl = document.querySelector("#main-footer");

    if (headerEl) {
        const headerTemplate = await loadTemplate("/partials/header.html");
        await renderWithTemplate(headerTemplate, headerEl);
    }

    if (footerEl) {
        const footerTemplate = await loadTemplate("/partials/footer.html");
        await renderWithTemplate(footerTemplate, footerEl);
    }
}
  
  