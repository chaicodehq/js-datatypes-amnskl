/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {

  //check if valid array is passed
  if(!Array.isArray(transactions) || transactions.length == 0) return null

  //filter records with positive amount and valid type
  const filteredTransactions = transactions.filter((record => record.amount > 0 && (record.type === "credit" || record.type === "debit"))).sort((a, b)=> b.amount-a.amount)

  //if filtered array is empty then return null
  if(filteredTransactions.length == 0 ) return null;

  // totalCredit and totalDebit
  const {totalCredit, totalDebit} = filteredTransactions.reduce((detail, record) => {

    //set credit and debit amount
    if(record.type === "credit") detail.totalCredit += record.amount
    else detail.totalDebit += record.amount

    return detail;
  }, { totalCredit: 0, totalDebit: 0})

  // netBalance
  const netBalance = totalCredit - totalDebit

  // transactionCount
  const transactionCount = filteredTransactions.length;

  // avgTransaction
  const avgTransaction = Math.round( (totalCredit + totalDebit )/ transactionCount)

  // highestTransaction
  const highestTransaction = filteredTransactions[0];



  // categoryBreakdown
  const categoryBreakdown = filteredTransactions.reduce((categories, record)=>{
    categories[record.category] = (categories[record.category] || 0) + record.amount;
    return categories
  }, {})
  

  // frequentContact
  const frequentContacts = filteredTransactions.reduce((frequent, record)=>{
    frequent[record.to] = (frequent[record.to] || 0) + 1;
    return frequent;
  }, {})

  const frequentContact = Object.entries(frequentContacts).sort((a, b)=> b[1]-a[1])[0][0]

  // allAbove100
  const allAbove100 = filteredTransactions.every(record => record.amount > 100)

  // hasLargeTransaction  
  const hasLargeTransaction = filteredTransactions.some(record => record.amount >= 5000)

  return {
    totalCredit,
    totalDebit,
    netBalance,
    transactionCount,
    avgTransaction,
    highestTransaction,
    categoryBreakdown,
    frequentContact , 
    allAbove100,
    hasLargeTransaction
  }
}






