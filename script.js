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
const bookmarkCount = document.getElementById("bookmark-count");
const newsDetailsModal = document.getElementById("news-details-modal");
const modalContainer = document.getElementById("modal-container");
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
showLoading();
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

    showError()
})
}

const showNewsByCategory =(articles)=>{
    if(articles.length === 0){
        showEmptyMessage();
        return;
    }
    newsContainer.innerHTML=""
articles.forEach(article => {
    // console.log(article.id);
    newsContainer.innerHTML += `
    <div class="border border-gray-300 rounded-lg">
     <div>
        <img src="${article.image.srcset[5].url}" >
    </div>
   <div id= "${article.id}" class="p-2">

    <h1 class="font-extrabold">${article.title}</h1>
    <p class="text-sm">${article.time}</p>
   <div class="flex flex-col items-center gap-2 ">
    <button class="btn mt-2">Bookmark</button>
    <button class="btn">View Details</button>
   </div>

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
if(e.target.innerText === "View Details"){
  handleViewDetails(e)
}
})

const handleBookmarks =(e)=>{

     const card = e.target.closest("div[id]"); // যেই div এ id আছে
  const title = card.querySelector("h1").innerText; // title নাও
  const id = card.id;
    // console.log(id)
    bookmarks.push({
        title: title,
        id: id,
    })
    showBookmarks(bookmarks)
   
};
const handleViewDetails =(e)=>{
      const card = e.target.closest("div[id]");  
   const id = card.id;  
   fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
   .then(res => res.json())
   .then(data => {
    console.log(data)
    showDetailsNews(data.article)
   })
   .catch(err=>{
    console.log(err)
   })
}
const showDetailsNews =(article)=>{
newsDetailsModal.showModal();
modalContainer.innerHTML=`
<h1 class="font-bold">${article.title}</h1>
<img src="${article.images[0].url}"/>
<p>${article.content.join("")}</p>
`
}
const showBookmarks = (bookmarks)=>{
    // console.log(bookmarks);
    bookmarkContainer.innerHTML=""
     bookmarks.forEach(bookmark =>{
bookmarkContainer.innerHTML +=`
<div class="border my-2 p-1 rounded-sm">
<h1>${bookmark.title}</h1>
    <button onclick ="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
</div>
`
// console.log(bookmark.id)
     })
      bookmarkCount.innerText = bookmarks.length;
};

const handleDeleteBookmark =(bookmarkId) =>{
//    console.log(bookmarkId)
const filteredBookmarks =bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
// console.log(filteredBookmarks)
bookmarks =filteredBookmarks
showBookmarks(bookmarks)
}

const showLoading =()=>{
    newsContainer.innerHTML =`
      <div class="bg-green-500 p-3 rounded-sm">Loading...</div>
    `
}

const showError =()=>{
 newsContainer.innerHTML =`
      <div class="bg-red-500 p-3 rounded-sm">Something went wrong</div>
    `
}
 const showEmptyMessage = () =>{
     newsContainer.innerHTML =`
      <div class="bg-orange-500 p-3 rounded-sm">No news found for this category</div>
    `
 }

loadCategoryAsync();
loadNewsCategory("main");
