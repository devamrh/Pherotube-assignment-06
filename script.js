const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    
    // console.log(data);

    // console.log(data.category)

    const tabContainer = document.getElementById("tab-container");

    data.data.forEach((category) => {
        
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab hover:bg-[#ff1f3de3] bg-[#2525254e] text-[#252525B2] mx-1 rounded-sm text-[#fff]">${category.category}</a>
        `;

        tabContainer.appendChild(div);

    });
      
};



const handleLoadNews = async (categoryId) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );

    const data = await response.json();

    const cardContainer = document.getElementById("card-container");

    
    cardContainer.innerHTML = '';

    
    if (data.data.length === 0) {
        
        const placeholderDiv = document.createElement('div');
        placeholderDiv.innerHTML = `
        <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <img src="images/Icon.png" alt="Centered Image" class="max-w-full max-h-full mx-auto" />
            <p class="font-bold text-xl mt-4">Oops!! Sorry, There is no content here</p>
        </div>
    </div>
    
        `;
        cardContainer.appendChild(placeholderDiv);
        return; 
    }

    
    const sortedData = sortDataByViews(data.data);

    sortedData.forEach((item) => {
        const div = document.createElement('div');

        div.innerHTML = `
            
            <div class="card w-96 bg-base-100 shadow-xl">
           
            <figure><img src="${item.thumbnail}" alt="${item.title} class="w-full h-[200px]" /></figure>
                <div class="card-body grid grid-cols-2">
                    <div class="avatar">
                        <div class="w-[40px] h-[40px]">
                            <img src="${item.authors[0].profile_picture}" alt="${item.authors[0].profile_name}" class="w-full" />
                        </div>
                    </div>
                    <h2 class="text-xl font-[700]">${item.title}</h2>
                    <div class="card-details">
                        <p>${item.authors[0].profile_name}</p>
                        <p>${item.others.views} views</p>
                    </div>
                </div>
            </div>
        `;

        cardContainer.appendChild(div);
    });
};




handleCategory();


const sortDataByViews = (data) => {
    return data.sort((a, b) => {
        const viewsA = parseInt(a.others.views.replace('K', '')) * 1000;
        const viewsB = parseInt(b.others.views.replace('K', '')) * 1000;
        return viewsB - viewsA;
    });
};
