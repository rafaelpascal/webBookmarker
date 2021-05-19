//listen for form Submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    /*
    //local Storage Test
    localStorage.setItem('test', 'Hello world');
    //console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    //console.log(localStorage.getItem('test'));
    */

    //test if boomark is null
    if (localStorage.getItem('bookmarks') === null){
        //initialize array
        var bookmarks = [];
        //add to the array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();
    //prevents form from submitting
    e.preventDefault();
}

//deleteBookmark
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }   
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output ID
    var bookmarksResults = document.getElementById('bookMarksResults');

    //Build OutPut
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class = "well">'+
                                      '<h3>'+name+
                                      '<a class = "btn btn-primary" target="_blank" href="'+url+'">Visit</a>' +
                                      '<a onClick="deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a>' +
                                      '</h3>'+
                                      '</div>';
    }
}