var cl = console.log;

const addbtn = document.getElementById("addbtn");
const backdrop = document.getElementById("backdrop");
const moviemodal = document.getElementById("moviemodal");
const subbtn = document.getElementById("subbtn");
const updbtn = document.getElementById("updbtn");
const moviecon = document.getElementById("moviecon");
const movieform = document.getElementById("movieform");
const titleM = document.getElementById("titleM");
const imgurl = document.getElementById("img-url");
const overviewM = document.getElementById("overviewM");
const ratingM = document.getElementById("ratingM");
const closemodal = [...document.querySelectorAll(".closemodal")]

let movieArr = [];

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onEdit = (ele) =>{
    let editId = ele.closest(".moviecard").id;
    cl(editId)
    let editObj = movieArr.find(movie => movie.movieId === editId);
    cl(editObj);
    localStorage.setItem("editId", editId);
    showmovieform();
    titleM.value = editObj.title;
    imgurl.value = editObj.image;
    overviewM.value = editObj.overview;
    ratingM.value = editObj.rating;
    updbtn.classList.remove("d-none");
    subbtn.classList.add("d-none");
}

const onDelete = (ele) =>{
    Swal.fire({
        title: "Do you want to Remove Movie?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let delId = ele.closest(".moviecard").id;
          cl(delId)
          let delIndex = movieArr.findIndex(movie => movie.movieId === delId);
          movieArr.splice(delIndex, 1);
          localStorage.setItem("movieArr", JSON.stringify(movieArr));
          let card = ele.closest(".col-md-4").remove();
          Swal.fire("Removed Successfully!", "", "success");
        } 
      });
}

const addCard = (obj) =>{
    let card = document.createElement("div");
    card.id = obj.movieId;
    card.className = "col-md-4";
    card.innerHTML = `<div class="card mt-5">
                            <figure class="moviecard" id="${obj.movieId}">
                                <img src="${obj.image}" alt="${obj.title}" title="${obj.title}">
                                <figcaption>
                                    <div class="ratsec">
                                        <div class="row">
                                            <div class="col-10">
                                                <h4>${obj.title}</h4>
                                            </div>
                                            <div class="col-2">
                                                <div class="reting text-center">
                                                    ${obj.rating >= 5 ? `<p class="bg-success">${obj.rating}</p>` : 
                                                    obj.rating <= 4 && obj.rating >= 3 ? `<p class="bg-warning">${obj.rating}</p>` :
                                                    obj.rating < 3 ?  `<p class="bg-danger">${obj.rating}</p>` :  `<p class="bg-warning">${obj.rating}</p>`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overview">
                                        <h4>${obj.title}</h4>
                                        <em>overview</em>
                                        <p>${obj.overview}
                                        </p>
                                        <div class="action">
                                            <button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
                                            <button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>`
    moviecon.prepend(card);
}

const moviearrTemplating = (arr) =>{
    let result = ``;
    arr.forEach(obj => {
        result += `<div class="col-md-4">
                        <div class="card mt-5">
                            <figure class="moviecard" id="${obj.movieId}">
                                <img src="${obj.image}" alt="${obj.title}" title="${obj.title}">
                                <figcaption>
                                    <div class="ratsec">
                                        <div class="row">
                                            <div class="col-10">
                                                <h4>${obj.title}</h4>
                                            </div>
                                            <div class="col-2">
                                                <div class="reting text-center">
                                                    ${obj.rating >= 5 ? `<p class="bg-success">${obj.rating}</p>` : 
                                                    obj.rating <= 4 && obj.rating >= 3 ? `<p class="bg-warning">${obj.rating}</p>` :
                                                    obj.rating < 3 ?  `<p class="bg-danger">${obj.rating}</p>` :  `<p class="bg-warning">${obj.rating}</p>`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overview">
                                        <h4>${obj.title}</h4>
                                        <em>overview</em>
                                        <p>${obj.overview}
                                        </p>
                                        <div class="action">
											<button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
											<button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
										</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>`
    });
    moviecon.innerHTML = result;
}



if(localStorage.getItem("movieArr")){
    movieArr = JSON.parse(localStorage.getItem("movieArr"));
    moviearrTemplating(movieArr);
}

const showmovieform = () =>{
    backdrop.classList.toggle('active');
    moviemodal.classList.toggle('active');
}

const addmovieform = (e) =>{
    e.preventDefault();
    let movieobj = {
        title : titleM.value,
        image : imgurl.value,
        overview : overviewM.value,
        rating : ratingM.value,
        movieId : generateUuid()
    }
    cl(movieobj);
    movieArr.push(movieobj);
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    //moviearrTemplating(movieArr);
    addCard(movieobj);
    e.target.reset();
    showmovieform();
    Swal.fire({
        icon : "success",
        title : `The Movie ${movieobj.title} is added Successfully !!!!`,
        timer : 2500
    });
}

const updatemovie = () =>{
    let updId = localStorage.getItem("editId");
    cl(updId);
    let updObj = {
        title : titleM.value,
        image : imgurl.value,
        overview : overviewM.value,
        rating : ratingM.value,
        movieId : updId
    }
    cl(updObj);
    let getIndex = movieArr.findIndex(movie => movie.movieId === updId);
    movieArr[getIndex] = updObj;
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    let getCard = document.getElementById(updId);
    getCard.innerHTML = `<img src="${updObj.image}" alt="${updObj.title}" title="${updObj.title}">
                            <figcaption>
                                <div class="ratsec">
                                    <div class="row">
                                        <div class="col-10">
                                            <h4>${updObj.title}</h4>
                                        </div>
                                        <div class="col-2">
                                            <div class="reting text-center">
                                                ${updObj.rating >= 5 ? `<p class="bg-success">${updObj.rating}</p>` : 
                                                updObj.rating <= 4 && updObj.rating >= 3 ? `<p class="bg-warning">${updObj.rating}</p>` :
                                                updObj.rating < 3 ?  `<p class="bg-danger">${updObj.rating}</p>` :  `<p class="bg-warning">${updObj.rating}</p>`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overview">
                                    <h4>${updObj.title}</h4>
                                    <em>overview</em>
                                    <p>${updObj.overview}
                                    </p>
                                    <div class="action">
                                        <button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
                                        <button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
                                    </div>
                                </div>
                            </figcaption>`
    movieform.reset();
    updbtn.classList.add("d-none");
    subbtn.classList.remove("d-none");
    showmovieform();
    Swal.fire({
        icon : "success",
        title : `The Movie ${updObj.title} is updated Successfully !!!!`,
        timer : 2500
    });
}


addbtn.addEventListener("click", showmovieform);

closemodal.forEach(c =>{
    c.addEventListener("click", showmovieform)
})

movieform.addEventListener("submit", addmovieform);

updbtn.addEventListener("click", updatemovie);