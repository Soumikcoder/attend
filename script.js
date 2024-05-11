const textbox = document.querySelector('input');
const btn = document.getElementById('btn');
let list = document.querySelector('.list');
let noOfList=localStorage.length;
// add reset button next
function createHtml(present,total,subject){
	let percentage=0;
	if(total===0){
		percentage=100;
	}
	else{
		percentage=present/total*100;
	}
	return `<li class="card" id="0">
                <div class="progress-bar">
                    <div class="progress" >${percentage.toFixed(0)}</div>
                </div>
                <span class="subject-name">${textbox.value}</span>
                <button id="present">&#x2713;</button>
                <button id="absent">&#x2717;</button>
                <button id="del">-</button>
            </li>`;
}

(function getItemsFromLocal(){
	for(let i=0;i<noOfList;i++){
		const item = document.createElement('li');
    	const subinfo =JSON.parse(localStorage.getItem(localStorage.key(i)));
    	item.innerHTML=createHtml(subinfo.present,subinfo.total,subinfo.subject);
		item.id=localStorage.key(i);
		const progressbar = item.querySelector('.progress-bar');
		percentage=item.querySelector('.progress').textContent;
		if(percentage >= 75.0){
    		progressbar.style.background = 'limegreen';
    	}
    	else{
    		progressbar.style.background = 'red';
    	}
		addDeleteListener(item);
		addPresentListener(item);
		addAbsentListener(item);
		list.appendChild(item);
	}
})();
function additem(){
	const item = document.createElement('li');
    item.innerHTML =createHtml(0,0,textbox.value) ;
	item.id=noOfList++;
	let progressbar=item.querySelector('progress-bar');
	addDeleteListener(item);
	addPresentListener(item);
	addAbsentListener(item);
	list.appendChild(item);
	const data={
		present:0,
		total:0,
		subject:textbox.value
	}
    localStorage.setItem(item.id,JSON.stringify(data));
}
textbox.addEventListener("keypress",(e)=>{
	if(e.key==='Enter'){
		e.preventDefault();
		btn.click();
	}
})
btn.addEventListener('click',additem );

function addPresentListener(item) {
    const presentBtn = item.querySelector('#present');
    const progress = item.querySelector('.progress');
    const progressbar = item.querySelector('.progress-bar');
    presentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	data.present++;
    	percentage=data.present/data.total*100;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage >= 75.0){
    		progressbar.style.background = 'limegreen';
    	}
    	localStorage.setItem(item.id, JSON.stringify(data));
    });
}

function addAbsentListener(item) {
    const absentBtn = item.querySelector('#absent');
    const progress = item.querySelector('.progress');
    const progressbar = item.querySelector('.progress-bar');
    absentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	percentage=data.present/data.total*100;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage < 75.0){
    		progressbar.style.background = 'red';
    	}
    	localStorage.setItem(item.id, JSON.stringify(data));
    });
}

function addDeleteListener(item) {
    const deleteBtn = item.querySelector('#del');
    deleteBtn.addEventListener('click', () => {
        localStorage.removeItem(item.id);
        list.removeChild(item);
    });
}
