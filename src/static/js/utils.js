function setLocalItem(key, value){
	localStorage.setItem(key, value);
}

function getLocalToken (name){
	return localStorage.getItem(name);
}

function clearLocalToken(){
	localStorage.removeItem('token');
}

function getLocalKey(name){
	return localStorage.getItem(name);
}

function getLocalItem (name){
	return localStorage.getItem(name);
}

export { getLocalToken,clearLocalToken, getLocalKey, getLocalItem, setLocalItem }
