const count = 140;
const tag = window.location.search.slice(5)

function filterSearch(val) {
  if(val)
    window.location.href = `?tag=${val}`;
  else
    window.location.href = `/`;
}

function backHome() {
  window.location.href = "index.html"
}

const addBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    data.push({ id: 3, title: 'Third Blog' });
    console.log(data);
  });
}

if(tag) {
  const tagLi = document.getElementById(tag);
  tagLi.style.color = "#CC0000";
} else {
  const tagLi = document.getElementById("All");
  tagLi.style.color = "#CC0000";
}

const showBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    const StoryBoard = document.getElementById("StoryBoard");
    data.forEach((blog, index) => {
      if(tag && blog.category.includes(tag) != 1) return;
      console.log(blog.category.includes(tag), tag);

      const whiteBoard = document.createElement("div");
      whiteBoard.className = "white-bg";

      const aTag = document.createElement("a");
      aTag.href = `/blog.html?id=${index +1}`;
      aTag.className = "card";

      const img = document.createElement("img");
      img.src = blog.content[0][1];
      img.loading = "lazy";
      img.className = "card-img";

      const header = document.createElement("div");
      header.className = "card-header";
      header.innerHTML = blog.title;

      const content = document.createElement("div");
      content.className = "card-detail";
      content.innerHTML = blog.content[1][1].slice(0, count) + (blog.content[1][1].length > count ? "..." : "") + ` <a href="/blog.html?id=${index +1}" class="read-more">Read more</a>`;
      

      aTag.appendChild(img);
      whiteBoard.appendChild(aTag);
      whiteBoard.appendChild(header);
      whiteBoard.appendChild(content);

      StoryBoard.appendChild(whiteBoard);
    });
  });
}

showBlogs();

