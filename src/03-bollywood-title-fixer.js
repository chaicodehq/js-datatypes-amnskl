/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {

  //return if title is not a string
  if(typeof title !== "string") return "";

  //trim the title
  title = title.trim();

  //return if title is empty
  if(title === "") return "";

  //take all the strings inside an array
  let listTitleWords = title.split(" ")

  //remove all the empty strings from word's array
  let filteredWords =  listTitleWords.filter(element => element !== "")

  let formatedWords = filteredWords.map(e => {
    //for below words convert it to lowercase
    if(e==="ka"|| e==="ki" ||  e==="ke" || e==="se" ||  e==="aur" || e==="ya" ||  e==="the" || e==="of" || e==="in" || e==="a" || e==="an"){
      return e.toLowerCase()
    }
    //for rest make first letter capital and rest lower
    else{
      return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
    }
  })

  //make a string separated by single space
  formatedWords = formatedWords.join(" ")

  //make first letter capital of whole title and return it
  return formatedWords.charAt(0).toUpperCase() + formatedWords.slice(1);


}
