	var month = 0;
	var year = 0;
	var day = 0;
	var dayNumber = 0;
	var nameMonth = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
	var actualMonth = 0;
	var weeksCount = 0;
	var emails = [];
	var daysInMonth = 0;
	var reservations = {};
	var admin = 0;
	var tempReservIndex = 0;
	var tempGenerateLink = '';
	var viewMode = 'ALL';
	var localsession = [];
	var type = 0;
  	window.onload = function(){
		if(sessionStorage.getItem('admin')) { 
			admin = sessionStorage.getItem('admin');
			var option = document.createElement("option");
			option.text = "Inna";
			option.value = "0";
			document.getElementById('fieldRoom').add(option);
		}
		if(localStorage.getItem('user_session')) localsession = JSON.parse(localStorage.getItem("user_session"));
		var dt = new Date();
		month = dt.getMonth()+1;
		actualMonth = month;
		year = dt.getFullYear();
		day = dt.getDate();
		calendar();
		setInterval(refresh, 50000);
  	}
	  function refresh(){
		initCalendar(1,0,0);
	  }
	function calendar(){ // tworzenie kalendarza
		document.getElementById("calendar").innerHTML = "";
		document.getElementById("nameMonth").innerHTML = nameMonth[month-1] + ", " + year+ "r.";
		daysInMonth = new Date(year, month, 0).getDate();
		dayNumber = new Date(year, month-1, 1).getDay();
		weeksCount = (7 - (dayNumber + daysInMonth - 1) % 7); // dopełnianie do końca tygodnia
		weeksCount = (weeksCount + dayNumber + daysInMonth - 1) / 7
		var startDay = 1;
		var dayCounter = 1;
		for(var i=0;i< weeksCount ;i++){
			var newTr = document.createElement("tr");
			document.getElementById("calendar").appendChild(newTr);
			for(var j=0;j<7;j++){
				var newTd = document.createElement("td");
				newTd.style.height = "calc(calc((100vh / " + weeksCount + ") - calc(125px / " + weeksCount + "))";
				newTd.style.fontSize = "14px";
				newTd.className += "p-0 m-0";
				if(startDay > dayNumber && startDay <= (dayNumber+daysInMonth)) {
					if(startDay == (dayNumber + day) && month == actualMonth) newTd.className += "border border-primary";
					newTd.setAttribute("onclick", "initReservation(event, this, \'" + dayCounter + "\');");
					newTd.setAttribute("onmouseover", "calendarEffectOver(this);");
					newTd.setAttribute("onmouseout", "calendarEffectOut(this);");
					
					var test = document.createTextNode(dayCounter);

					var newDiv = document.createElement("div");
					newDiv.id = "day" + dayCounter; 
					newDiv.style.height = 'calc(100% - 25px)';
					newDiv.style.width = '100%';
					newDiv.style.overflow = "auto";
					newTd.appendChild(test);
					newTd.appendChild(newDiv);
					dayCounter++;
				}
				document.getElementById("calendar").lastChild.appendChild(newTd);
				startDay++;
			}
		}
		initCalendar(0,0,1);
	}
	function takeData(){
		axios.post('php/aFilingCalendar.php', { 
			view: viewMode,
			month: ('0' + month).slice(-2),
			year: year,
		})
		.then((response) => {
			reservations = response.data;
			if(Array.isArray(reservations)){
				for(var i=1;i<reservations.length;i++){
					if(reservations[i].status != 3){
					var splitData = reservations[i].date.split("-");
						if(reservations[i].status == 2){
							var splitData2 = new Date(parseInt(splitData[0]), parseInt(splitData[1])-1, parseInt(splitData[2])).getDay();
							for(var j=1;j<=daysInMonth; j++){
								if(splitData2 == new Date(year, month-1, j).getDay()){
									reservations.push({'date': year+'-'+('0' + month).slice(-2)+'-'+('0' + j).slice(-2),'time_from': reservations[i].time_from,'time_to': reservations[i].time_to,'room': reservations[i].room,'status': 3})
								}
							}
						} 
					}
				}

			}

		});
	}
	function initCalendar(tempClear, tempCloseWindow, tempLoading){ // pobranie rezerwacji z bazy
		
		if(tempLoading == 1){
		document.getElementById("smokeFrame").style.display = "block";
		document.getElementById("loadingPage").style.display = "block";
		}
		axios.post('php/aFilingCalendar.php', { 
			view: viewMode,
			month: ('0' + month).slice(-2),
			year: year,
		})
		.then((response) => {
			reservations = response.data;
			buildCalendar(tempClear, tempCloseWindow);
			if(tempLoading == 1){
			document.getElementById("smokeFrame").style.display = "none";
			document.getElementById("loadingPage").style.display = "none";
			}
		});
	}
	function buildCalendar(tempClear, tempCloseWindow){ // wypełnianie kalendarza
		if(tempClear == 1) clearCalendar();
		if(Array.isArray(reservations)){
			for(var i=1;i<reservations.length;i++){
				if(reservations[i].room == viewMode || viewMode == 'ALL'){
				if(reservations[i].status != 3){
				var splitData = reservations[i].date.split("-");
					if(parseInt(reservations[0]) == month){
						if(reservations[i].status == 2){
							var splitData2 = new Date(parseInt(splitData[0]), parseInt(splitData[1])-1, parseInt(splitData[2])).getDay();
							for(var j=1;j<=daysInMonth; j++){
								if(splitData2 == new Date(year, month-1, j).getDay()){
									var newSpan = document.createElement("span");
									newSpan.className += "badge d-flex border border-secondary";
									switch(reservations[i].room){
										case '3':
											newSpan.className += " badge-warning";
											break;
										case '128':
											newSpan.className += " badge-primary";
											break;
										case '129':
											newSpan.className += " badge-danger";
											break;
										case '0':
											newSpan.className += " badge-secondary";
											break;
									}
									newSpan.style.overflow = "hidden";
									newSpan.style.margin = "0px 2px 2px 2px";
									newSpan.style.padding = "4px 3px 4px 3px";
									if(reservations[i].status == '0') newSpan.style.opacity = "0.25";
									newSpan.innerHTML = reservations[i].time_from + "-" + reservations[i].time_to + " " + reservations[i].signature + " " + reservations[i].judge + " (p." + reservations[i].room + ")";

									document.getElementById("day" + j).appendChild(newSpan);
									reservations.push({'date': year+'-'+('0' + month).slice(-2)+'-'+('0' + j).slice(-2),'time_from': reservations[i].time_from,'time_to': reservations[i].time_to,'room': reservations[i].room,'status': 3})

								}
							}
						} else { 
							var newSpan = document.createElement("span");
							newSpan.className += "badge d-flex border border-secondary";
							switch(reservations[i].room){
								case '3': 
									newSpan.className += " badge-warning";
									break;
								case '128': 
									newSpan.className += " badge-primary";
									break;
								case '129':
									newSpan.className += " badge-danger";
									break;
								case '0':
									newSpan.className += " badge-secondary";
									break;
							}
							if(admin == 1 && (reservations[i].status == '5' || reservations[i].status == '4') && reservations[i].room == '3'){ /// tutaj pracuje
								newSpan.classList.remove("badge-warning");
								newSpan.style = 'background-image: repeating-linear-gradient(rgb(255, 193, 7), white, rgb(255, 193, 7));';
								
							}
							newSpan.style.overflow = "hidden";
							newSpan.style.margin = "0px 2px 2px 2px";
							newSpan.style.padding = "4px 3px 4px 3px";
							newSpan.setAttribute("onclick", "initReservation(event, this, \'" + i + "\');");
							if(reservations[i].status == '0') newSpan.style.opacity = "0.25";
							newSpan.innerHTML = reservations[i].time_from + "-" + reservations[i].time_to + " " + reservations[i].signature + " " + reservations[i].judge + " (p." + reservations[i].room + ")";
							document.getElementById("day" + parseInt(splitData[2])).appendChild(newSpan);
						}
					}
				}
			}
			}

		}
		
		document.getElementById('loadingRez').style.display = "none";
		document.getElementById('loadingEdit').style.display = "none";
		document.getElementById('loadingDel').style.display = "none";
		if(tempCloseWindow == 1) closeAddWindow();
	}

	function viewCalendar(){ // tryb widoku
		viewMode = document.getElementById('fieldView').value;
		buildCalendar(1,0);
	}
	function initReservation(e, element, temp) {
		e = e || event;
		var target = e.target || e.srcElement;

		if(element.tagName == 'SPAN' || target.tagName == 'DIV'){ // ustawienia startowe ---------------------------------------
			//ustawianie zmiennych
			emails = [];
			type = 0;
			tempReservIndex = 0;

			// usuwanie czerwonych ramek
			document.getElementById("fieldJudge").classList.remove('is-invalid');
			document.getElementById("fieldSignature").classList.remove('is-invalid');
			document.getElementById("fieldUser").classList.remove('is-invalid');
			document.getElementById("inputDate").classList.remove('is-invalid');
			document.getElementById("timeFrom").classList.remove('is-invalid');
			document.getElementById("timeTo").classList.remove('is-invalid');
			document.getElementById("fieldRoom").classList.remove('is-invalid');
			document.getElementById("btnEmail").classList.remove('is-invalid');
			
			//czyszczenie pól
			document.getElementById("divEmails").innerHTML ="";

			//ustawianie wyświetlania
			document.getElementById('blockInfo').style.display = 'none';
			document.getElementById("smokeFrame").style.display = "block";
			document.getElementById("addFrame").style.display = "block";
			document.getElementById("btnEditBlock").style.display = "none";
			document.getElementById("blockEmail").style.display = "flex";
			document.getElementById("blockConfirm").style.display = "flex";
			document.getElementById("blockLink").style.display = "none";
		
		}
		if(element.tagName != 'SPAN' && target.tagName != "SPAN") { // dodawanie -------------------------------------------------
			takeData();
			//ustawianie wyświetlania
			document.getElementById("addFrame").style.height = "458px";
			document.getElementById("addFrame").style.maxHeight = "575px";
			document.getElementById("btnSubmit").style.display = "flex";

			//blokowanie pól
			document.getElementById("fieldUser").disabled = false;
			document.getElementById("fieldJudge").disabled = false;
			document.getElementById("fieldSignature").disabled = false;
			document.getElementById("inputDate").disabled = false;
			document.getElementById("timeFrom").disabled = false;
			document.getElementById("timeTo").disabled = false;
			document.getElementById("fieldRoom").disabled = false;
			document.getElementById("fieldType").disabled = false;

			//wypełnianie pól
			document.getElementById("validFeedback").innerHTML = "Pomiędzy rozprawami musi być 30minut przerwy";
			if(localsession[0]) {
			document.getElementById("fieldUser").value = localsession[0];
			} else {
			document.getElementById("fieldUser").value = '';
			}
			document.getElementById("fieldType").selectedIndex = 0;
			document.getElementById("fieldJudge").selectedIndex = 0;
			document.getElementById("fieldSignature").value = '';
			document.getElementById("inputDate").value = '';
			document.getElementById("timeFrom").selectedIndex = 0;
			document.getElementById("timeTo").selectedIndex = 0;
			document.getElementById("fieldRoom").selectedIndex = 0;
			document.getElementById("btnConfirm").checked = false;
			document.getElementById("fieldAddDate").innerHTML = '';
			document.getElementById("inputDate").value = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + temp).slice(-2);

		} else if(element.tagName == 'SPAN' && target.tagName == "SPAN"){ // podgląd -------------------------------------------------
			//ustawianie zmiennych
			emails = reservations[temp].emails;

			//ustawianie wyświetlania
			document.getElementById("addFrame").style.height = "460px";
			document.getElementById("addFrame").style.maxHeight = "499px";
			document.getElementById("btnSubmit").style.display = "none";
			document.getElementById("btnAccept").style.display = 'none';
			document.getElementById("fieldType").disabled = "disabled";
			document.getElementById("btnGenerator").style.display = 'none';

			//wypełnianie pól
			document.getElementById("validFeedback").innerHTML = "";
			document.getElementById("fieldUser").value = reservations[temp].user;
			document.getElementById("fieldSignature").value = reservations[temp].signature;
			document.getElementById("inputDate").value = reservations[temp].date;
			document.getElementById("timeFrom").value = reservations[temp].time_from;
			document.getElementById("timeTo").value = reservations[temp].time_to;
			document.getElementById("fieldRoom").value = reservations[temp].room;
			document.getElementById("fieldAddDate").innerHTML = '(' + reservations[temp].add_date + ')';
			document.getElementById("btnConfirm").checked = reservations[temp].confirm;
			for(var i=0; i<document.getElementById("fieldJudge").options.length; i++){
				if(document.getElementById("fieldJudge").options[i].value == reservations[temp].judge) {
					document.getElementById("fieldJudge").selectedIndex = i;
				}
			}
			if(reservations[temp].status == 4 || reservations[temp].status == 5){
				document.getElementById("fieldType").selectedIndex = 1;
			} else {
				document.getElementById("fieldType").selectedIndex = 0;
			}
			

			//tryby
			if(reservations[temp].status == '0' || admin == 1){
				tempReservIndex = temp;
				document.getElementById("addFrame").style.maxHeight = "574px";
				document.getElementById("btnEditBlock").style.display = "flex";
				document.getElementById("btnAccept").style.display = 'none';
				document.getElementById("fieldUser").disabled = false;
				document.getElementById("fieldJudge").disabled = false;
				document.getElementById("fieldSignature").disabled = false;
				document.getElementById("inputDate").disabled = false;
				document.getElementById("timeFrom").disabled = false;
				document.getElementById("timeTo").disabled = false;
				document.getElementById("fieldRoom").disabled = false;
				if(admin == 1){
					document.getElementById("addFrame").style.height = "500px";
					document.getElementById("addFrame").style.maxHeight = "614px";
					document.getElementById("btnAccept").style.display = 'flex';
					document.getElementById("btnGenerator").style.display = 'flex';
					if(reservations[temp].status == 0){
						document.getElementById("btnAcceptTxt").innerHTML = "Potwierdź"
						document.getElementById("blockLink").style.display = "flex";
						document.getElementById("btnAccept").style.display = 'flex';
						generateLink();
					} else if(reservations[temp].status == 1) {
						document.getElementById("btnAcceptTxt").innerHTML = "Potwierdzone " + (new Date(new Date().toJSON().slice(0,10)).getTime() - new Date(reservations[temp].last_accept).getTime())  / (1000 * 3600 * 24) + ' dni temu.';
						document.getElementById("btnAccept").style.display = 'flex';
						document.getElementById("blockLink").style.display = "flex";
						document.getElementById("inputLink").value = reservations[temp].link;
					} else {
						type = 4;
						document.getElementById('blockEmail').style.display = 'none';
						document.getElementById('blockInfo').style.display = 'flex';
						document.getElementById("addFrame").style.height = "460px";
						document.getElementById("addFrame").style.maxHeight = "574px";
					}
				}
			} else {
				document.getElementById("blockEmail").style.display = "none";
				document.getElementById("blockConfirm").style.display = "none";

				document.getElementById("fieldUser").disabled = "disabled";
				document.getElementById("fieldJudge").disabled = "disabled";
				document.getElementById("fieldSignature").disabled = "disabled";
				document.getElementById("inputDate").disabled = "disabled";
				document.getElementById("timeFrom").disabled = "disabled";
				document.getElementById("timeTo").disabled = "disabled";
				document.getElementById("fieldRoom").disabled = "disabled";
				if(reservations[temp].status == 1){
					document.getElementById("blockLink").style.display = "flex";
					document.getElementById("addFrame").style.height = "385px";
					document.getElementById("inputLink").value = reservations[temp].link;
				} else {
					document.getElementById("addFrame").style.height = "345px";
					document.getElementById("addFrame").style.maxHeight = "459px";
					document.getElementById("inputLink").value = '';
				}
			}

			//wypełnianie maili
			for(var j=0;j<reservations[temp].emails.length;j++){
				document.getElementById("addFrame").style.height = (parseInt(document.getElementById("addFrame").style.height, 10) + 38) + 'px';
				var newDiv = document.createElement("div");
				newDiv.className += "border bg-light p-1 mb-1";
				var newText = document.createTextNode(reservations[temp].emails[j]);
				
				var newSpan = document.createElement("span");
				newSpan.style.display = 'inline-block';
				newSpan.style.overflow = 'hidden';
				newSpan.style.whiteSpace = 'nowrap';
				newSpan.style.verticalAlign = 'top';
				newSpan.style.width = '95%';
				
				newSpan.appendChild(newText);
				newDiv.appendChild(newSpan);
				document.getElementById("divEmails").appendChild(newDiv);

				if(admin == 1 || reservations[temp].status == 0){
					var newButton = document.createElement("input");
					newButton.type = "button";
					newButton.className = "btn btn-sm btn-light float-right p-0 m-0";
					newButton.style.height = "25px";
					newButton.style.width = "25px";
					newButton.value = "X";
					newButton.setAttribute("onclick", "deleteEmail(\'" + reservations[temp].emails[j] + "\', this);");
					newDiv.appendChild(newButton);
				}
			}


		}
	}
	function addEmail(){
		var typeSRC = 'btnEmail';
		if(type == 0){
			typeSRC = 'btnEmail';
		} else {
			typeSRC = 'btnPodmiot';
		}
		if((document.getElementById(typeSRC).value).replace( /\s/g, '') != ''){
			emails.push(document.getElementById(typeSRC).value);
			var newDiv = document.createElement("div");
			newDiv.className += "border bg-light p-1 mb-1";
			var newText = document.createTextNode(document.getElementById(typeSRC).value);
			newDiv.appendChild(newText);
			
			var newButton = document.createElement("input");
			newButton.type = "button";
			newButton.className = "btn btn-sm btn-light float-right p-0 m-0";
			newButton.style.height = "25px";
			newButton.style.width = "25px";
			newButton.value = "X";
			newButton.setAttribute("onclick", "deleteEmail(\'" + document.getElementById(typeSRC).value + "\', this);");
			newDiv.appendChild(newButton);
			
			document.getElementById("divEmails").appendChild(newDiv);
			document.getElementById("addFrame").style.height = (parseInt(document.getElementById("addFrame").style.height, 10) + 38) + 'px';
			document.getElementById(typeSRC).value = '';
		}
	}
	function deleteEmail(tempId, tempObj){
		for(var i=0;i<emails.length;i++){
			if(emails[i] === tempId){
				emails.splice(i, 1);
			}
		}
		tempObj.parentElement.remove();
		document.getElementById("addFrame").style.height = (parseInt(document.getElementById("addFrame").style.height, 10) - 38) + 'px';
		
	}
	function addReservation(){
		if(validReservation(1) == 0){ 
			document.getElementById('loadingRez').style.display = "inline-block";
			document.getElementById("validFeedback").innerHTML = "PROSZĘ CZEKAĆ TRWA REZERWOWANIE WIZYTY";
			if(!Array.isArray(localsession) || !localsession.length){
				localsession[0] = document.getElementById("fieldUser").value;
				localStorage.setItem("user_session", JSON.stringify(localsession));
			}
			axios.post('php/aReservation.php', {
				post_type : "add",
				user: document.getElementById("fieldUser").value, 
				judge: document.getElementById("fieldJudge").value,
				signature: document.getElementById("fieldSignature").value,
				date: document.getElementById("inputDate").value,
				time_from: document.getElementById("timeFrom").value,
				time_to: document.getElementById("timeTo").value,
				room: document.getElementById("fieldRoom").value,
				confirm: document.getElementById("btnConfirm").checked,
				status: type,
				emails: emails,
				add_date: new Date().toJSON().slice(0,10),
			}).then(function (response) {
				initCalendar(1,1,0);
				
			})
		}
	}
	function timeInt(tempStr){
		return parseInt(tempStr.split(":")[0])*60 + parseInt(tempStr.split(":")[1]);
	}
	function editReservation(){
		if(validReservation(0) == 0){
			document.getElementById('loadingEdit').style.display = "inline-block";
			axios.post('php/aReservation.php', {
				post_type : "edit",
				admin: admin,
				id: reservations[tempReservIndex]['id'],
				user: document.getElementById("fieldUser").value, 
				judge: document.getElementById("fieldJudge").value,
				signature: document.getElementById("fieldSignature").value,
				date: document.getElementById("inputDate").value,
				time_from: document.getElementById("timeFrom").value,
				time_to: document.getElementById("timeTo").value,
				room: document.getElementById("fieldRoom").value,
				confirm: document.getElementById("btnConfirm").checked,
				emails: emails
			}).then(function (response) {
				initCalendar(1,1,0);
			})
		}
	}
	function deleteReservation(){
		if (confirm('Czy na pewno chcesz usunąć rezerwacje?')) {
			if(admin == 1 || status == 0){
			document.getElementById('loadingDel').style.display = "inline-block";
				axios.post('php/aReservation.php', {
					post_type : "delete",
					id: reservations[tempReservIndex]['id']
				}).then(function (response) {
					initCalendar(1,1,0);
				})
			}
		} else {
			// Do nothing!
		}
	}
	function acceptReservation(){
		document.getElementById('loading').style.display = "inline-block";
		axios.post('php/aReservation.php', {
			post_type : "accept",
			id: reservations[tempReservIndex]['id'],
			user: document.getElementById("fieldUser").value, 
			judge: document.getElementById("fieldJudge").value,
			signature: document.getElementById("fieldSignature").value,
			date: document.getElementById("inputDate").value,
			time_from: document.getElementById("timeFrom").value,
			time_to: document.getElementById("timeTo").value,
			room: document.getElementById("fieldRoom").value,
			link: document.getElementById("inputLink").value,
			emails: emails,
			last_accept: new Date().toJSON().slice(0,10),
		}).then(function (response) {
			document.getElementById('loading').style.display = "none";
			initCalendar(1,1,0);
		})
	}
	function validReservation(actionType){
		var actionId = 0;
		document.getElementById("fieldJudge").classList.remove('is-invalid');
		document.getElementById("fieldSignature").classList.remove('is-invalid');
		document.getElementById("fieldUser").classList.remove('is-invalid');
		document.getElementById("inputDate").classList.remove('is-invalid');
		document.getElementById("timeFrom").classList.remove('is-invalid');
		document.getElementById("timeTo").classList.remove('is-invalid');
		document.getElementById("fieldRoom").classList.remove('is-invalid');
		document.getElementById("btnEmail").classList.remove('is-invalid');
		document.getElementById("validFeedback").innerHTML = "Pomiędzy rozprawami musi być 30minut przerwy.";

		var valid = 0;
		if((document.getElementById("fieldUser").value).replace( /\s/g, '') == '') {
			document.getElementById("fieldUser").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if((document.getElementById("fieldSignature").value).replace( /\s/g, '') == '') {
			document.getElementById("fieldSignature").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if(document.getElementById("fieldJudge").selectedIndex == 0) {
			document.getElementById("fieldJudge").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if((document.getElementById("inputDate").value).replace( /\s/g, '') == '' || parseInt(document.getElementById("inputDate").value.split("-")[0]) < (year-1) || parseInt(document.getElementById("inputDate").value.split("-")[0]) > (year+1)) {
			document.getElementById("inputDate").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if(document.getElementById("timeTo").selectedIndex == 0){
			document.getElementById("timeTo").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if(document.getElementById("timeFrom").selectedIndex == 0){
			document.getElementById("timeFrom").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if(valid == 0){
			if(timeInt(document.getElementById("timeFrom").value) > timeInt(document.getElementById("timeTo").value)) {
				document.getElementById("timeFrom").classList.add('is-invalid');
				document.getElementById("validFeedback").innerHTML = "Czas rozpoczęcia jest większy od czasu zakończenia";
				valid++;
			}
		}
		if(document.getElementById("fieldRoom").selectedIndex == 0) {
			document.getElementById("fieldRoom").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "";
			valid++;
		}
		if(emails.length == 0) {
			document.getElementById("btnEmail").classList.add('is-invalid');
			if(type == 4){
			document.getElementById("validFeedback").innerHTML = "Dodaj instytucje(np. sąd, zakład karny)";
			} else {
			document.getElementById("validFeedback").innerHTML = "Dodaj adres e-mail";
			}
			valid++;
		}
		if(valid == 0) {
			if(parseInt(document.getElementById("inputDate").value.split("-")[1]) > 8 && document.getElementById("fieldType").value == '0') {
			document.getElementById("validFeedback").innerHTML = "Z DNIEM 01.09 ROZPRAWY ZA POŚREDNICTWEM JITSI ORGANIZOWANE SĄ BEZ UDZIAŁU KALENDARZA";
				valid++;
			}
		}
		if(valid == 0){
			if(actionType == 1) {
				actionId = -1;
			} else { 
				actionId = reservations[tempReservIndex].id;
			}
			for(var i=1;i<reservations.length;i++){
				if(reservations[i].room == document.getElementById("fieldRoom").value && actionId != reservations[i].id && reservations[i].room != '0') {
					if(document.getElementById("inputDate").value == reservations[i].date){
						console.log(actionId + ' ' + reservations[i].id)
						console.log(valid)
						console.log(reservations)
						if(timeInt(document.getElementById("timeFrom").value) > (timeInt(reservations[i].time_from)-30) && timeInt(document.getElementById("timeFrom").value) < (timeInt(reservations[i].time_to)+30)){
							document.getElementById("timeFrom").classList.add('is-invalid');
							document.getElementById("validFeedback").innerHTML = "W tym czasie sala jest już zajęta.";
							valid++
						} else if(timeInt(document.getElementById("timeTo").value) > (timeInt(reservations[i].time_from)-30) && timeInt(document.getElementById("timeTo").value) < (timeInt(reservations[i].time_to)+30)){
							document.getElementById("timeTo").classList.add('is-invalid');
							document.getElementById("validFeedback").innerHTML = "W tym czasie sala jest już zajęta.";
							valid++
						}
					}
				}
			}
		}
		return valid;
	}
	function generateLink(){
		tempGenerateLink = "https://e-konf.wroclaw.sa.gov.pl/4235-ZZZZZ-" + (Math.floor(Math.random() * (99999 - 10000)) + 10000) + '-'
		+ (Math.floor(Math.random() * (99999 - 10000)) + 10000) + '-' + (Math.floor(Math.random() * (99999 - 10000)) + 10000);
		document.getElementById("inputLink").value = tempGenerateLink;
	}
	function openLink(){
		window.open(document.getElementById('inputLink').value, '_blank');
		
	}
	function clearCalendar(){
		for(var i=1;i<=daysInMonth;i++){
			document.getElementById("day" + i).innerHTML = "";
		}
	}
	function closeAddWindow(){
		document.getElementById("smokeFrame").style.display = 'none';
		document.getElementById("addFrame").style.display = 'none';
	}
	function calendarEffectOver(temp){
		temp.classList.add("bg-light");
	}
	function calendarEffectOut(temp){
		temp.classList.remove("bg-light");
	}
	function timeFromSelect(temp){
		var splitTime = temp.value.split(":");
		var splitTime2 = document.getElementById("timeTo").value.split(":");
		if(document.getElementById("timeTo").selectedIndex == 0 || (parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]) >= (parseInt(splitTime2[0]) * 60) + parseInt(splitTime2[1])){
			if(((parseInt(splitTime[0]) + 1) * 60) + parseInt(splitTime[1]) > 930){
				document.getElementById("timeTo").value = '15:30';
			} else {
				document.getElementById("timeTo").value = ('0' + (parseInt(splitTime[0]) + 1)).slice(-2) + ":" + ('0' + splitTime[1]).slice(-2);
			}
		};
	}
	function timeToSelect(temp){ // wyłączam do czasu poprawienia błędu(musi sie wlaczac dopiero po wyjsciu z edycji pola)
		var splitTime = temp.value.split(":");
		var splitTime2 = document.getElementById("timeFrom").value.split(":");
		if(!document.getElementById("timeFrom").value || (parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]) <= (parseInt(splitTime2[0]) * 60) + parseInt(splitTime2[1])){
			document.getElementById("timeFrom").value = ('0' + (parseInt(splitTime[0]) - 1)).slice(-2) + ":" + ('0' + splitTime[1]).slice(-2);
		};
	}
	function changeMonth(side) {
		if((month + side) < 1) {
			year = year - 1;
			month = 12;
		} else if((month + side) > 12) {
			year = year + 1;
			month = 1;
		} else {
			month = month + side
		}
		calendar()
	}
	function changeType(){
		if(document.getElementById('fieldType').value == '0'){
			document.getElementById('blockInfo').style.display = 'none';
			document.getElementById('blockEmail').style.display = 'flex';
			document.getElementById("blockConfirm").style.display = 'flex';
			document.getElementById("addFrame").style.height = "458px";
			document.getElementById("addFrame").style.maxHeight = "575px";
			document.getElementById("fieldRoom").selectedIndex = 0;
			document.getElementById("fieldRoom").disabled = false;
			type = 0;
		} else { 
			document.getElementById('blockInfo').style.display = 'flex';
			document.getElementById('blockEmail').style.display = 'none';
			document.getElementById("blockConfirm").style.display = 'none';
			document.getElementById("addFrame").style.height = "430px";
			document.getElementById("addFrame").style.maxHeight = "545px";
			document.getElementById("fieldRoom").selectedIndex = 1;
			document.getElementById("fieldRoom").disabled = "disabled";
			type = 4;
		}
	}
	function charLimit(element, maxChars){
		if(element.value.length > maxChars) {
			element.value = element.value.substr(0, maxChars);
		}
	}
