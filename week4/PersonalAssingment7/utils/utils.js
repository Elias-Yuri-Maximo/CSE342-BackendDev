function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function checkEmptyFields(body){
//Checks for empty fields and returns True or False depending on the result
    console.log('body'+body)
    let checkArray = []
    for (let item in body){
        console.log(body[item])
        if (body[item] == ''){
            checkArray.push('')
        }else{
            checkArray.push(true)
        }
    }
    console.log('checkArray'+ checkArray)
    if (!(checkArray.includes(''))){
        return true
    }else{
        return false
    }
}
 
const books = ['1nephi', '2nephi', 'jacob', 'enos', 'jarom','omni', 'wordsofmormon','mosiah','alma','helaman','3nephi','4nephi','mormon','ether','moroni']

module.exports = {
    formatDate,
    checkEmptyFields,
    books
  };