// const loadCategory =()=>{
// fetch("https://news-api-fs.vercel.app/api/categories")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })
// }
// loadCategory();

const categoryContainer= document.getElementById("category-container");
const newsContainer =document.getElementById("news-container");
const bookmarkContainer =document.getElementById("bookmark-container");
let bookmarks =[];

// async aWAI way 
const loadCategoryAsync = async()=>{
   try {
     const res = await fetch("https://news-api-fs.vercel.app/api/categories")
    const data = await res.json();
    const categories =data.categories;
    showCategory(categories)
   
   } catch (error) {
    console.log(error);
   }
}

const showCategory = (categories) =>{
 categories.forEach( category => {
        categoryContainer.innerHTML += `
          <li id="${category.id}" class="hover:border-b-4 hover:border-red-700 border-red-700 cursor-pointer">${category.title}</li>
        `
    });
    categoryContainer.addEventListener("click",(e)=>{
        const allLi =document.querySelectorAll("li");
        allLi.forEach(li => {
            li.classList.remove("border-b-4")
        });
        
if(e.target.localName ==="li"){
//  console.log(e.target.id)

e.target.classList.add("border-b-4")
loadNewsCategory(e.target.id)
}
    })
}


const loadNewsCategory = (categoryId) =>{
// console.log(categoryId)
fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
.then((res)=>res.json())
.then((data) => {
    showNewsByCategory(data.articles)

})

.catch(err =>{
    console.log(err);
})
}

const showNewsByCategory =(articles)=>{
    console.log(articles);
    newsContainer.innerHTML=""
articles.forEach(article => {
    newsContainer.innerHTML += `
    <div class="border border-gray-300 rounded-lg">
     <div>
        <img src="${article.image.srcset[5].url}" >
    </div>
   <div ${article.id} class="p-2">

    <h1 class="font-extrabold">${article.title}</h1>
    <p class="text-sm">${article.time}</p>
    <button class="btn">Bookmark</button>

   </div>
    </div>
    `
});
}
newsContainer.addEventListener("click",(e)=>{
// console.log(e)
if(e.target.innerText === "Bookmark"){
  handleBookmarks(e)
}
})

const handleBookmarks =(e)=>{
      const title=e.target.parentNode.children[0].innerText;
    const id = e.target.parentNode.id
    bookmarks.push({
        title: title,
        id: id,
    })
    showBookmarks(bookmarks);
}

const showBookmarks = (bookmarks)=>{
    bookmarkContainer.innerHTML=""
     bookmarks.forEach(bookmark =>{
bookmarkContainer.innerHTML +=`
<div class="border my-2 p-1 rounded-sm">
<h1>${bookmark.title}</h1>
<button class="btn btn-xs">Delete</button>
</div>
`
     })
}
loadCategoryAsync();
loadNewsCategory("main");
