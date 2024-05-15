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
	return `<div class="progress-bar">
                 <div class="progress" >${percentage.toFixed(0)}</div>
                </div>
                <span class="subject-name">${subject}</span>
                <span class="Attendance"> <input type="text" class="present" value="${present}" readonly />/<input type ="text" class="total" value="${total}" readonly /> </span>
                <button id="present">&#x2713;</button>
                <button id="absent">&#x2717;</button>
                <button id="edit">&#9998;</button>
                <button id="del">-</button>
                <div class="quote">You're right on track.</div>`;
}

(function getItemsFromLocal(){
	for(let i=0;i<noOfList;i++){
		const item = document.createElement('li');
		item.className='card';
		const data=localStorage.getItem(localStorage.key(i));
    	const subinfo =JSON.parse(data);
    	item.innerHTML=createHtml(subinfo.present,subinfo.total,subinfo.subject);
		item.id=localStorage.key(i);
		const progressbar = item.querySelector('.progress-bar');
		const quote = item.querySelector('.quote');
		percentage=item.querySelector('.progress').textContent;
		if(percentage >= 75.0){
    		progressbar.style.setProperty('--bgcolor','limegreen');
    	}
    	else{
    		progressbar.style.setProperty('--bgcolor','red');
    	}
    	quote.textContent=getquote(data,percentage);
		addDeleteListener(item);
		addPresentListener(item);
		addEditListener(item);
		addAbsentListener(item);
		list.appendChild(item);
	}
})();
function additem(){
	if(textbox.value==="") {
		textbox.setAttribute('style', 'box-shadow: 0 0 4px red;') ;
		return;
	}
	const item = document.createElement('li');
	item.className='card';
    item.innerHTML =createHtml(0,0,textbox.value) ;
	item.id=btoa(textbox.value);
	if(localStorage.getItem(item.id)!=null){
		textbox.setAttribute('style', 'box-shadow: 0 0 4px red;') ;
			textbox.value="";
		return;
	}
	let progressbar=item.querySelector('progress-bar');
	addDeleteListener(item);
	addPresentListener(item);
	addAbsentListener(item);
	addEditListener(item);
	list.appendChild(item);
	const data={
		present:0,
		total:0,
		subject:textbox.value
	}
	textbox.value="";
	textbox.style.background = '#444';
	textbox.setAttribute('style', 'box-shadow: 0 0 4px limegreen;') ;
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
    const presentfield = item.querySelector('.present');
    const totalfield = item.querySelector('.total');
    const quote=item.querySelector('.quote');
    presentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	data.present++;
    	percentage=data.present/data.total*100;
    	presentfield.value=data.present;
    	totalfield.value=data.total;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage >= 75.0){
    		progressbar.style.setProperty('--bgcolor','limegreen');
    	}
    	quote.textContent=getquote(data,percentage);
    	localStorage.setItem(item.id, JSON.stringify(data));
    });
}

function addAbsentListener(item) {
    const absentBtn = item.querySelector('#absent');
    const progress = item.querySelector('.progress');
    const progressbar = item.querySelector('.progress-bar');
    const totalfield = item.querySelector('.total');
     const quote=item.querySelector('.quote');
    absentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	percentage=data.present/data.total*100;
    	totalfield.value=data.total;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage < 75.0){
    		progressbar.style.setProperty('--bgcolor','red');
    	}
    	quote.textContent=getquote(data,percentage);
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

function addEditListener(item){
	const presentfield = item.querySelectorAll('.Attendance input');
	const editbtn=item.querySelector('#edit');
	const progress = item.querySelector('.progress');
	const progressbar = item.querySelector('.progress-bar');
	const quote=item.querySelector('.quote');
	editbtn.addEventListener('click',()=>{
		if(presentfield[0].readOnly){
			presentfield.forEach(field=>{
				field.readOnly=false;
			})
			editbtn.style.background="green";
		}
		else{
			presentfield.forEach(field=>{
				field.readOnly=true;
		})
		let data=JSON.parse(localStorage.getItem(item.id));
    	data.total=parseInt(presentfield[1].value);
    	data.present=parseInt(presentfield[0].value);
    	if(data.total>0){
    		percentage=data.present/data.total*100;
    	}
    	else{
    		percentage=100;
    		data.present=0;
    	}
    	progress.textContent=percentage.toFixed(0);
    	if(percentage >= 75.0){
    		progressbar.style.setProperty('--bgcolor','limegreen');
    	}
    	else{
    		progressbar.style.setProperty('--bgcolor','red');
    	}
    	quote.textContent=getquote(data,percentage);
    	editbtn.style.background="orange";
    	localStorage.setItem(item.id, JSON.stringify(data));
		}
	})
}
const help=document.querySelector(".help");
help.querySelector('button').addEventListener('click',()=>{
	help.setAttribute('style','transform: scale(0.0);transition: 0.2s;')
})
const helpbtn=document.getElementById('help');
helpbtn.addEventListener('click',()=>{
	help.setAttribute('style','transform: scale(1.0) ;transition: 0.2s;');
})

function getquote(data,datapercentage){
	const percentage=75.0
	if(datapercentage >= percentage){
    		const noOfLeaves=Math.floor((100*data.present-percentage*data.total)/percentage);
    		if(noOfLeaves == 1){
    			return `You may Leave next class.`;
    		}
    		else if(noOfLeaves > 0){
    			return `You may Leave next ${noOfLeaves} classes.`;
    		}
    		else{
    			return`You're right on track.`;
    		}
    	}
    	else{
    		const noOfAttend=Math.floor((percentage*data.total-100*data.present)/(100-percentage));
    		if(noOfAttend <= 1){
    			return `You have to attend next class.`;
    		}
    		else{
    			return `You have to attend next ${noOfAttend} classes.`;
    		}
    	}
}