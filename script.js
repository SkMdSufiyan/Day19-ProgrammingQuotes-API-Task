//  Headings at the top of the page
let page_heading = document.getElementById('page_heading_div');
page_heading.innerHTML = "Welcome to the Programming Quotes page";

document.getElementById("loading-message-div").innerHTML = 'This page may take some time to get the API links, please wait patiently';
document.getElementById('serach-instruction-div').innerHTML = "Type the name of the author (without initial or extra spaces) in the search bar, it will highlight (it can not navigate, so after clicking search button kindly scroll down) that particular author's name in the following list";

let errorMessage_div = document.getElementById('tryCatch_errorMessage_div');
errorMessage_div.style.display='none';
// Search field and search button
let search_and_button = document.getElementById('search_and_button_div');

// Search field
let search_field = document.getElementById('search_bar_input');
search_field.setAttribute('placeholder',"Author's name")

// Reset button
let reset_button = document.getElementById('reset_button');
reset_button.setAttribute('onclick','unmarkingFun()');

// Search button
let search_button = document.getElementById("search_button_id");
search_button.setAttribute('onclick','markingFun()');


//  Selecting the main div (container) which contains all the pages of t he document
let main_div_of_pages = document.getElementById('main-div-containing-pages');
let numOfChildrenOfMainDiv = main_div_of_pages.children.length-1; // Number of children of main div

// Setting the display of the pages (other than first page) to none
for(let h=1; h<=numOfChildrenOfMainDiv; h++){
    main_div_of_pages.children[h].style.display='none';
}

// Unordered list of pagination buttons
let ul_of_pagination = document.querySelector('.pagination');

// Setting the previous button's display to none (as the first page will be displayed by default)
ul_of_pagination.children[0].style.display = 'none';

// Setting the first page button to active (as the first page will be displayed by default)
ul_of_pagination.children[1].classList.add('active');

// Number of children of Unordered list of pagination buttons
let numOfChildrenOfPaginationUl = ul_of_pagination.children.length-1;


// The URL for supplying into the async function is given below (programming quotes)
var suppliedUrl = "https://programming-quotes-api.herokuapp.com/quotes";

var random_digit = 0; // here it is used to change the background color of cells (by updating)

var page_number = 0;   
let cells_per_row = 3;  // Cells per row in the web page
let cells_per_page = 100; // Cells per page
let num_of_cells_available = 0;


let programming_quotes = async (Url)=>{
    // Using try-catch method
    try{
            let url_response = await fetch(Url);
            let dataFromUrl = await url_response.json(); // Data obtained

        for (let cell_count=0;cell_count<dataFromUrl.length;cell_count+=cells_per_page){

            if(dataFromUrl.length - cell_count>=cells_per_page){
                // If the number of quotes still remaining is greater than the number of cells per page
                num_of_cells_available = cell_count+cells_per_page;
            }else{
                 // If the number of quotes still remaining is less than the number of cells per page
                num_of_cells_available = cell_count+(dataFromUrl.length-cell_count);
            }
            for(let i=cell_count;i<num_of_cells_available;i+=cells_per_row){

                var table_rows = document.createElement('tr'); // Creating table row
                for(let j=0; j<cells_per_row; j++){
                    if(i+j<dataFromUrl.length){
                       
                        let ith_data = dataFromUrl[i+j];
                        
                        // Creating table cell
                        var table_cell = document.createElement('td');
                        var quote_content_div = document.createElement('div');
                        var author_name_div = document.createElement('div')
                        var quote_id_div = document.createElement('div');
        
                        quote_content_div.classList.add('quote-content-div');
                        author_name_div.classList.add('author-name-div');
                        quote_id_div.classList.add('quote-id-div')
        
        
                        quote_content_div.classList.add('container')
                        author_name_div.classList.add('container')
                        quote_id_div.classList.add('container')
        
                        
                        quote_content_div.innerHTML = `<strong>${ith_data["en"]}</strong>`;
                        author_name_div.innerHTML = '<span>Author: </span>' + ith_data['author'];
                        quote_id_div.innerHTML = '<span>Quote Id: </span>' + ith_data['id'];
        
                        //  Some random colors taken
                        let some_color = ['#dddd','#AABC23','lightblue','lightgreen','lightpink','lightyellow','rgba(182, 140, 140, 0.867)','rgba(186, 231, 183, 0.867)','rgba(218, 136, 181, 0.867)','rgba(148, 182, 211, 0.867)','rgba(238, 111, 73, 0.867)'];
                        if(random_digit<=some_color.length){
                            random_color = some_color[random_digit];
                            random_digit = random_digit+1;
                        }else{
                            random_digit = 0;
                        }

                        // Appending the quote, author name, quote id to table cell
                        table_cell.append(quote_content_div);
                        table_cell.append(author_name_div);
                        table_cell.append(quote_id_div);
        
                        table_cell.style.backgroundColor= random_color;

                        // Appending tabel cell to table row
                        table_rows.appendChild(table_cell);
                    }else{
                        break
                    }
                }
 
            for(let y=0;y<=numOfChildrenOfMainDiv;y++){
                if(y==page_number){
                    // Appending the table formed to the childran of main div
                    main_div_of_pages.children[y].children[0].append(table_rows)
                }
            }
        }

        page_number =page_number+1;
        }
    
}
catch(err){
    // Displaying error messages
    errorMessage_div.style.display='';
    errorMessage_div.innerHTML = err.message;
}
}
// Calling the main function
programming_quotes(suppliedUrl)




let prev_but = ul_of_pagination.children[0];
let page_1 = ul_of_pagination.children[1].children[0];
let page_2 = ul_of_pagination.children[2].children[0];
let page_3 = ul_of_pagination.children[3].children[0];
let page_4 = ul_of_pagination.children[4].children[0];
let page_5 = ul_of_pagination.children[5].children[0];
let next_but = ul_of_pagination.children[numOfChildrenOfPaginationUl];


var previously_checked_pagination_childran = 1;
var previously_checked_main_div_children = 0;

// Adding events for the pagination buttons
page_1.addEventListener('click',function(){
    pagination_operation(1);
})
page_2.addEventListener('click',function(){
    pagination_operation(2);
})
page_3.addEventListener('click',function(){
    pagination_operation(3);
})
page_4.addEventListener('click',function(){
    pagination_operation(4);
})
page_5.addEventListener('click',function(){
    pagination_operation(5);
})
prev_but.addEventListener('click',function(){
    pagination_operation(0);
})
next_but.addEventListener('click',function(){
    pagination_operation(numOfChildrenOfPaginationUl);
})

function pagination_operation(pagination_childran,required_href){
    if(pagination_childran!=0 && pagination_childran!=numOfChildrenOfPaginationUl){
        // For the pagination buttons other than previous and next
        ul_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
        ul_of_pagination.children[pagination_childran].classList.add('active');

        let main_div_childran = pagination_childran-1;
        main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
        main_div_of_pages.children[main_div_childran].style.display='';
        previously_checked_main_div_children = main_div_childran;

        previously_checked_pagination_childran = pagination_childran;
        if(previously_checked_pagination_childran==1){
            ul_of_pagination.children[0].style.display = 'none';
        }else{
            ul_of_pagination.children[0].style.display = '';
        }
        
        if(previously_checked_pagination_childran==numOfChildrenOfPaginationUl-1){
            ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='none';
        }else{
            ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='';
        }
    }else if(pagination_childran==0){
        // For the pagination previous button
        if(previously_checked_pagination_childran!=1){
            let required_pagination_childran = previously_checked_pagination_childran-1;
            ul_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
            ul_of_pagination.children[required_pagination_childran].classList.add('active');
            

            let required_main_div_childran = previously_checked_main_div_children-1;
            main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
            main_div_of_pages.children[required_main_div_childran].style.display='';
            previously_checked_main_div_children = required_main_div_childran;

            previously_checked_pagination_childran = required_pagination_childran;

            if(previously_checked_pagination_childran==1){
                ul_of_pagination.children[0].style.display = 'none';
            }else{
                ul_of_pagination.children[0].style.display = '';
            }
            
            if(previously_checked_pagination_childran==numOfChildrenOfPaginationUl-1){
                ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='none';
            }else{
                ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='';
            }
        }

    }else if(pagination_childran==numOfChildrenOfPaginationUl){
        // For the pagination next button
        if(pagination_childran!=numOfChildrenOfPaginationUl-1){
            let required_pagination_childran = previously_checked_pagination_childran+1;
            ul_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
            ul_of_pagination.children[required_pagination_childran].classList.add('active');

            let required_main_div_childran = previously_checked_main_div_children+1;
            main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
            main_div_of_pages.children[required_main_div_childran].style.display='';
            previously_checked_main_div_children = required_main_div_childran;


            previously_checked_pagination_childran = required_pagination_childran;

            if(previously_checked_pagination_childran==1){
                ul_of_pagination.children[0].style.display = 'none';
            }else{
                ul_of_pagination.children[0].style.display = '';
            }
            
            if(previously_checked_pagination_childran==numOfChildrenOfPaginationUl-1){
                ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='none';
            }else{
                ul_of_pagination.children[numOfChildrenOfPaginationUl].style.display='';
            }
        }
    }
}


var previous_searched_memory = null; // initialising previous searched memory in the search field
var originalBackColors = null;  // initialising background colors of div (s) containing previous searched memory

//  Calling onclick function (markingFun which will hilight the matches for searched value) for search-button
function markingFun(){   
    search_input = document.getElementById('search_bar_input');
    if(search_input.value!=''){
        let search_value = search_input.value;
        let search_value_lowerCase = search_value.toLowerCase();
        
        let author_names =document.querySelectorAll('.author-name-div'); 
        let previous_backgroundColors = [];
        author_names.forEach((author)=>{
            if(author.innerHTML.toLowerCase().includes(search_value_lowerCase)){
                previous_backgroundColors.push(author.style.backgroundColor);
                author.style.backgroundColor = 'yellow';
            }
        })
        originalBackColors = previous_backgroundColors;
        previous_searched_memory = search_value;

    }   
}

//  Calling onclick function (unmarkingFun which will remove the hilight for the previous searched values)
function unmarkingFun(){ 
    if(previous_searched_memory!=null){

            let prev_search_value_lowerCase = previous_searched_memory.toLowerCase();
            
            let author_names =document.querySelectorAll('.author-name-div'); 
            let original_backcolor_index = 0;
            author_names.forEach((author)=>{
                if(author.innerHTML.toLowerCase().includes(prev_search_value_lowerCase)){
                    author.style.backgroundColor = originalBackColors[original_backcolor_index];
                    original_backcolor_index+=1;
                }
            })
            search_field.value = '';
    }
}

