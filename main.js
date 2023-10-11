const count = 140;

function backHome() {
  window.location.href = "index.html"
}

const addBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    data.push({ id: 3, title: 'Third Blog' });
    console.log(data);
  });
}

const showBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    const StoryBoard = document.getElementById("StoryBoard");
    data.forEach((blog, index) => {

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