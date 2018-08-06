const url = "https://randomuser.me/api/?results=50";
let data;

const radios = document.getElementsByName( "filter" );
const filterButton = document.getElementById( "filter_button" );
const resultDiv = document.getElementById( "result_content" );

//get data
fetch( url )
    .then( function( response )
            {
                return response.json();
            }  
    )
    .then( function( myJson )
            {
                //store data
                data = myJson.results;
                console.log( data ); //**testing */

                //sort by last name by default
                data.sort( lastNameSort );

                //make initial page content
                let d, img, p;
                for ( let i = 0; i < data.length; i++ )
                {
                    d = document.createElement( "div" );
                    d.classList.add( "result" );

                    img = document.createElement( "img" );
                    img.src = data[i].picture.thumbnail;
                    d.appendChild( img );

                    p = document.createElement( "p" );
                    p.innerHTML = data[i].name.first + " " + data[i].name.last + "<br>" + data[i].gender;
                    d.appendChild( p );

                    resultDiv.appendChild( d );

                    //store in result object for easy reordering
                    data[i].div = d;
                }
            }

    )

// pass into array sort for first name filter
function firstNameSort( a, b )
{
    return a.name.first.localeCompare( b.name.first );
}

// pass into array sort for last name filter
function lastNameSort( a, b )
{
    return a.name.last.localeCompare( b.name.last );
}

// pass into array sort for gender filter
function genderSort( a, b )
{
    return a.gender.localeCompare( b.gender );
}

//handler for filter input, attached to filter button
function filterHandler()
{
    event.preventDefault();
    
    //remove existing divs
    const divs = document.getElementsByClassName( "result" );
    for ( let div of divs )
    {
        div.remove();
    }

    //get new filter
    let filter;
    for ( let option of radios )
    {
        if ( option.checked )
        {
            filter = option.value;
        }
    }

    //sort by new filter
    if ( filter === "last_name" )
    {
        data.sort( lastNameSort );
    }
    else if ( filter === "first_name" )
    {
        data.sort( firstNameSort );
    }
    else
    {
        data.sort( genderSort );
    }

    //reinsert divs
    for ( let result of data )
    {
        resultDiv.appendChild( result.div );
    }
}

//attach handler to button
filterButton.addEventListener( "click", filterHandler );

//styling for results
//w/in container, flex, row-wrap, 2 things per row
//model from overwatch project