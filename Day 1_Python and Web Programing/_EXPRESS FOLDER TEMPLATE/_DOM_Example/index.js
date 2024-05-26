//need these names to be displayed in an unordered list without hardcoding
const names = [
  'Liam',
  'Emma',
  'Noah',
  'Olivia',
  'William',
]

//first get the UL with eitehr getbyclass name or query selector"
//same it to a variable. Console log to confirm you have it. Should be an "Html collection" empty array

const nameList = document.querySelector('.name-list') //if it was an id, we would use '#name-list' instead of the period
console.log(nameList)

//now that we have the UL saved in a variable, we can add to it

for (let i = 0; i < names.length; i++) {
  //first we need to create the element. Then we can add info to it
  const listItem = document.createElement('li')
  //now we can add characteristics to the listItem using "textContent"
  listItem.textContent = names[i] //with the loop, we are now adding each name from the names array. i represents the index number at each place in names array

  //finally we need to append the list item to the nameList which we have access to:
  nameList.appendChild(listItem) //append child is used because li are children of uls. You can do this for most things. Another example is a <p> is a child of <div>
}
