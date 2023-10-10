function backHome() {
  window.location.href = "index.html"
}

let val;

const addBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    data.push({ id: 3, title: 'Third Blog' });
    console.log(data);
  });
}

const showBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    console.log(data);
  });
}


showBlogs();