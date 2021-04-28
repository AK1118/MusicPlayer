export  function saveTodos(account,psw){
	localStorage.setItem(account,psw);
}
//export const getTodos=(account)=>JSON.parse(localStorage.getItem(account)||[]);
export const getTodos=(account)=>localStorage.getItem(account);