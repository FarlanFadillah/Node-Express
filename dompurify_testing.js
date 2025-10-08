const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');
const {readFileSync} = require('fs');

const DOMPurify = dompurify(new JSDOM('').window);

const md = readFileSync('./main.md', 'utf-8');

function renderHtml(markdown) {
    const rawHtml = marked.parse(markdown);

    const safeHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        FORBID_ATTR : ['style', 'class']
    });
    const dom = new JSDOM(safeHtml);
    const document = dom.window.document;
    // converting image with certain element-wrapper and custom attribute
    imageParse(document);
    return document.body.innerHTML;
}

function imageParse(document){
  document.querySelectorAll("img").forEach((img) => {
        const wrapper = document.createElement("p");
        wrapper.classList.add("article-image-wrapper");
        img.classList.add("article-image");
        img.replaceWith(wrapper);
        wrapper.appendChild(img);
  });
}

console.log(renderHtml(md))