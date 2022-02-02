const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", addForm);

//addForm function
function addForm(e) {
  var bookName = document.getElementById("bookName").value;
  var bookAuthor = document.getElementById("bookAuthor").value;

  // booksytrat bookend and time
  var bookStart = document.getElementById("bookStart").value;
  var bookEnd = document.getElementById("bookEnd").value;
  var time = document.getElementById("time");

  var bookInfo = {
    name: bookName,
    bookAuthor: bookAuthor,
    bookStart: bookStart,
    bookEnd: bookEnd,
    time: time,
  };

  //validate form

  if (!validateForm(bookName, bookAuthor)) {
    return false;
  }

  //localStorage saveBookInfo
  if (localStorage.getItem("booksInfo") === null) {
    var booksInfo = [];
    //booksInfo push elemnt
    booksInfo.push(bookInfo);

    //set to localStorage
    localStorage.setItem("booksInfo", JSON.stringify(booksInfo));
  } else {
    var booksInfo = JSON.parse(localStorage.getItem("booksInfo"));

    //add to array of book
    booksInfo.push(bookInfo);

    //set to localStorage
    localStorage.setItem("booksInfo", JSON.stringify(booksInfo));
  }

  saveResult();

  //clear form
  document.getElementById("bookName").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookStart").value = "";
  document.getElementById("bookEnd").value = "";
  document.getElementById("time").value = "";

  //prevent for from submiting
  e.preventDefault();
}

//booksInfo elements for get result

function saveResult() {
  //get booksInfo from localStorage
  var booksInfo = JSON.parse(localStorage.getItem("booksInfo"));

  //get output id
  var result = document.getElementById("result");

  //output
  result.innerHTML = null;

  //loops throug
  for (var i = 0; i < booksInfo.length; i++) {
    var bookName = booksInfo[i].name;
    var bookAuthor = booksInfo[i].bookAuthor;
    var bookStart = booksInfo[i].bookStart;
    var bookEnd = booksInfo[i].bookEnd;

    result.innerHTML += `
    <table class="table table-success">
    <tr class="table-dark"><td>Book Name : </td><td>Author : </td><td>Visit</td><td>Delete</td><td>Boshlangan kun</td><td>Muddat</td></tr>
    <tr><td>${bookName}</td><td>${bookAuthor}</td><td><a onclick="visitBook()" class="btn btn-primary">Visit</a></td><td><a onclick="deleteBook()" class="btn btn-danger">Delete</a></td><td>${bookStart}</td><td>${bookEnd}</td></tr></table>
    
    `;
  }
}

//function deleteBook
function deleteBook() {
  //get booksInfo from localStorage
  var booksInfo = JSON.parse(localStorage.getItem("booksInfo"));

  for (var i = 0; i < booksInfo.length; i++) {
    var bookName = booksInfo[i].name;
  }

  for (var i = 0; i < booksInfo.length; i++) {
    if (booksInfo[i].name === bookName) {
      //remove from array
      booksInfo.splice(i, 1);
    }
  }

  localStorage.setItem("booksInfo", JSON.stringify(booksInfo));
  saveResult();
}

//validate form function

function validateForm(bookName, bookAuthor) {
  if (!bookName || !bookAuthor) {
    alert("Please enter in the form");
    return false;
  }
  return true;
}
