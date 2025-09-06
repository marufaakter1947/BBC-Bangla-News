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
          <li id="${category.id}" class="hover:border-b-4 hover:border-red-700 cursor-pointer">${category.title}</li>
        `
    });
}
loadCategoryAsync();