/*
  Author:      Elliott Judd
  Website:     https://juddus.com/
  Email:       e@juddus.com
  License:     MIT
  License URL: http://opensource.org/licenses/MIT
*/

var nav = function() {
	/*this.init = function() {
	    this.pasteResize();
	},
	this.ajax = function(name, data, url, method) {
		var ajax = new XMLHttpRequest();
		ajax.open(method, url, false);
		if(method == 'POST') {
			data = encodeURIComponent(data);
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(name+'='+data);
		} else ajax.send();
		return ajax.responseText;
	},
	this.pasteResize = function() {
		var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	    	width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	    	pastew = width-500,
	    	paste = document.getElementById('paste');
		paste.style.width = pastew + 'px';
		paste.style.height = height + 'px';
	},
	this.switchForm = function(el) {
		var parent = el.parentNode,
			id = parent.id;
	    if(id == 'login-form') {
	        parent.style.display = 'none';
	        document.getElementById('register-form').style.display= 'block';
	    } else {
	    	parent.style.display = 'none';
	        document.getElementById('login-form').style.display= 'block';
	    }
	},
	this.checkLength = function(el) {
		var max = 20000,
			len = el.value.length,
			c = document.getElementById('char');
		if(len >= max) {
			c.textContent = max+'/'+max;
			el.value = el.value.substring(0, len);
		} else c.textContent = len+'/'+max;
	},
	this.addTab = function() {
		var tarea = document.getElementsByTagName('textarea')[0],
			start = tarea.selectionStart,
        	end = tarea.selectionEnd;
        tarea.value = tarea.value.substring(0, start) + "    " + tarea.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
	},
	this.addPaste = function() {
		var button = document.getElementById('submit-paste'),
			loading = document.getElementById('loading-paste'),
			paste_contents = JSON.stringify({
				name: document.getElementById('paste-name').value,
				paste: document.getElementById('paste').value,
				listed: document.getElementById('paste-listed').value,
				syntax: document.getElementById('paste-syntax').value,
				lang: document.getElementById('paste-syntax').options[document.getElementById('paste-syntax').selectedIndex].textContent
			});
		button.disabled = true;
		button.style.display = 'none';
		loading.style.display = 'block';
		var response = JSON.parse(this.ajax('paste', paste_contents, './index.php', 'POST'));
		console.log(response.msg);
		if(response.success === false) {
            document.getElementById('response-paste').innerHTML = '<div class="warning">'+ response.msg +'</div>';
            loading.style.display = 'none';
            button.disabled = false;
            button.style.display = 'block';
        } else location.replace("./?"+response.id);
	},
	this.dropMenu = function(el) {
		var dropsect = el.parentNode.nextElementSibling;
		if(el.classList.contains('down')) {
			$(dropsect).show('blind', {easing: 'easeOutQuad'}, 500);
			el.classList.remove('down');
			el.classList.add('up');
		} else {
			$(dropsect).hide('blind', {easing: 'easeInQuad'}, 500);
			el.classList.remove('up');
			el.classList.add('down');
		}
	},
	this.login = function() {
		var button = document.getElementById('submit-login'),
			loading = document.getElementById('loading-login'),
			login_data = JSON.stringify({
				username: document.getElementById('username-login').value,
				password: document.getElementById('password-login').value
			});
		button.disabled = true;
		button.style.display = 'none';
		loading.style.display = 'block';
		var response = JSON.parse(this.ajax('login', login_data, './index.php', 'POST'));
		console.log(response.msg);
		if(response.success === false) {
            document.getElementById('response-logreg').innerHTML = '<div class="warning">'+ response.msg +'</div>';
            loading.style.display = 'none';
            button.disabled = false;
            button.style.display = 'block';
            if(response.type == 'user') document.getElementById('username-login').classList.add('errorb');
            if(response.type == 'pass') document.getElementById('password-login').classList.add('errorb');
        } else location.reload();
	},
	this.register = function() {
		var button = document.getElementById('submit-register'),
			loading = document.getElementById('loading-register'),
			reg_data = JSON.stringify({
				username: document.getElementById('username-reg').value,
				email: document.getElementById('email').value,
				password: document.getElementById('password-reg').value,
				cpassword: document.getElementById('cpassword').value
			});
		button.disabled = true;
		button.style.display = 'none';
		loading.style.display = 'block';
		var response = JSON.parse(this.ajax('register', reg_data, './index.php', 'POST'));
		console.log(response.msg);
		if(response.success === false) {
            document.getElementById('response-logreg').innerHTML = '<div class="warning">'+ response.msg +'</div>';
            loading.style.display = 'none';
            button.disabled = false;
            button.style.display = 'block';
            if(response.type == 'user') document.getElementById('username-reg').classList.add('errorb');
            if(response.type == 'pass') document.getElementById('password-reg').classList.add('errorb');
            if(response.type == 'cpass') document.getElementById('cpassword').classList.add('errorb');
            if(response.type == 'email') document.getElementById('email').classList.add('errorb');
        } else {
        	document.getElementById('response-logreg').innerHTML = '<div class="success">'+ response.msg +'</div>';
        	document.getElementById('register-form').reset();
        	loading.style.display = 'none';
            button.disabled = false;
            button.style.display = 'block';
            var logreg = document.getElementsByClassName('logreg')[1];
            if(logreg.fireEvent) logreg.fireEvent('onclick');
            else {
            	var e = document.createEvent('Events');
    			e.initEvent('click', true, false);
    			logreg.dispatchEvent(e);
            }
        }
	},
	this.logout = function() {
		var response = JSON.parse(this.ajax(null, null, './logout.php', 'GET'));
		console.log(response.msg);
		location.reload();
	},
	this.deletePaste = function(el) {
		var random = el.getAttribute('paste-id'),
			parent = el.parentNode,
			data = JSON.stringify({
				rand: random
			}),
			response = JSON.parse(this.ajax('delete', data, './index.php', 'POST'));
		console.log(response.msg);
		if(response.success === true) parent.remove();
	},
	this.editPaste = function() {
		var button = document.getElementById('edit-paste'),
			random = button.getAttribute('paste-id'),
			loading = document.getElementById('loading-edit'),
			edit_contents = JSON.stringify({
				paste: {
					name: document.getElementById('paste-name').value,
					paste: document.getElementById('paste').value,
					listed: document.getElementById('paste-listed').value
				},
				rand: random
			});
		button.disabled = true;
		button.style.display = 'none';
		loading.style.display = 'block';
		var response = JSON.parse(this.ajax('edit', edit_contents, './index.php', 'POST'));
		console.log(response.msg);
		if(response.success === false) {
            document.getElementById('response-edit').innerHTML = '<div class="warning">'+ response.msg +'</div>';
            loading.style.display = 'none';
            button.disabled = false;
            button.style.display = 'block';
        } else location.replace("./?"+random);
	},
	this.handleEvent = function(event) {
		var el = event.srcElement || event.target;
			elid = el.id;
		switch(event.type) {
			case 'click':
				event.preventDefault();
				if(el.classList.contains('logreg')) this.switchForm(el);
				else if(elid == 'submit-paste') this.addPaste();
				else if(elid == 'edit-paste') this.editPaste();
				else if(el.classList.contains('drop-button')) this.dropMenu(el);
				else if(elid == 'logout') this.logout();
				else if(el.classList.contains('pdelete')) this.deletePaste(el);
				break;
			case 'resize':
				this.pasteResize();
				break;
			case 'keyup':
				this.checkLength(el);
			    break;
			case 'keydown':
				var key = event.keyCode || event.which;
				if(key == 9) {
					event.preventDefault();
					this.addTab();
				}
				break;
			case 'submit':
				event.preventDefault();
				if(elid == 'login-form') this.login();
				else if(elid == 'register-form') this.register();
				break;
		}
	}
	var dButtons = document.getElementsByClassName('drop-button'),
		logregs = document.getElementsByClassName('logreg'),
		pdel = document.getElementsByClassName('pdelete');
	for(i=0; i < dButtons.length; i++) dButtons[i].addEventListener('click', this);
	if(logregs) for(i=0; i < logregs.length; i++) logregs[i].addEventListener('click', this);
	if(pdel) for(i=0; i < pdel.length; i++) pdel[i].addEventListener('click', this);
	if(document.getElementById('logout')) document.getElementById('logout').addEventListener('click', this);
	if(document.getElementById('submit-paste')) document.getElementById('submit-paste').addEventListener('click', this);
	if(document.getElementById('edit-paste')) document.getElementById('edit-paste').addEventListener('click', this);
	window.addEventListener('resize', this, true);
	if(document.getElementsByTagName('textarea')[0]) document.getElementsByTagName('textarea')[0].addEventListener('keyup', this);
	if(document.getElementsByTagName('textarea')[0]) document.getElementsByTagName('textarea')[0].addEventListener('keydown', this);
	if(document.getElementById('login-form')) document.getElementById('login-form').addEventListener('submit', this);
	if(document.getElementById('register-form')) document.getElementById('register-form').addEventListener('submit', this);
  */
};

var pageNav = new nav();
pageNav.init();
