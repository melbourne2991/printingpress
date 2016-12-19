function each(obj, fn) {
  for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
      fn(obj[i], i);
    }
  }
}

function toArray(obj) {
  const arr = []

  // return 
  each(obj, (item, i) => {
    arr.push(item)
  })

  return arr;
}

function paginate(items, itemsPerPage, fn) {
  let pageItems = []
  let pageNumber = 0;

  for(let i = 1; i <= items.length; i++) {
    pageItems.push(items[i-1])

    if(i % itemsPerPage === 0) {
      fn(++pageNumber, pageItems)
      pageItems = []
    }

  }
}

module.exports = {
  each,
  toArray,
  paginate
}