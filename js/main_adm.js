	var month = 0;
	var year = 0;
	var day = 0;
	var daysName = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
	var dayNumber = 0;
	var nameMonth = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
	var actualMonth = 0;
	var weeksCount = 0;
	var emails = [];
	var daysInMonth = 0;
	var reservations = {};
	var admin = 0;
	var tempReservIndex = 0;
	var viewMode = 'ALL';
	var localsession = [];
  	window.onload = function(){
		if(sessionStorage.getItem('admin')) {
			admin = sessionStorage.getItem('admin');
		} else {
			console.log(admin);
			window.open('administracyjny.php',"_self");
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
			view: '3',
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
	function initCalendar(tempClear, tempCloseWindow, tempLoading){ // wypełnianie kalendarza
		if(tempLoading == 1){
		document.getElementById("smokeFrame").style.display = "block";
		document.getElementById("loadingPage").style.display = "block";
		}
		axios.post('php/aFilingCalendar.php', { 
			view: '3',
			month: ('0' + month).slice(-2),
			year: year,
		})
		.then((response) => {
			if(tempClear == 1) clearCalendar();
			reservations = response.data;
			if(Array.isArray(reservations)){
				for(var i=1;i<reservations.length;i++){
					if(reservations[i].status != 3){
					var splitData = reservations[i].date.split("-");
						if(parseInt(reservations[0]) == month){
							if(reservations[i].status == 2){
								var splitData2 = new Date(parseInt(splitData[0]), parseInt(splitData[1])-1, parseInt(splitData[2])).getDay();
								for(var j=1;j<=daysInMonth; j++){
									if(splitData2 == new Date(year, month-1, j).getDay()){
										var newSpan = document.createElement("span");
										newSpan.className += "badge d-flex border border-secondary";
										switch(reservations[i].status){
											case '5': 
												newSpan.className += " badge-danger";
												break;
											case '4': 
												newSpan.className += " badge-warning";
												break;
											default: 
												newSpan.className += " badge-secondary";
										}
										newSpan.style.overflow = "hidden";
										newSpan.style.margin = "0px 2px 2px 2px";
										newSpan.style.padding = "4px 3px 4px 3px";
										newSpan.innerHTML = reservations[i].time_from + "-" + reservations[i].time_to + " " + reservations[i].signature + " " + reservations[i].judge + " (p." + reservations[i].room + ")";

										document.getElementById("day" + j).appendChild(newSpan);
										reservations.push({'date': year+'-'+('0' + month).slice(-2)+'-'+('0' + j).slice(-2),'time_from': reservations[i].time_from,'time_to': reservations[i].time_to,'room': reservations[i].room,'status': 3})

									}
								}
							} else { 
								var newSpan = document.createElement("span");
								newSpan.className += "badge d-flex border border-secondary";
									switch(reservations[i].status){
											case '5': 
												newSpan.className += " badge-danger";
												break;
											case '4': 
												newSpan.className += " badge-warning";
												break;
											default: 
												newSpan.className += " badge-secondary";
									}
								newSpan.style.overflow = "hidden";
								newSpan.style.margin = "0px 2px 2px 2px";
								newSpan.style.padding = "4px 3px 4px 3px";
								newSpan.setAttribute("onclick", "initReservation(event, this, \'" + i + "\');");
								newSpan.innerHTML = reservations[i].time_from + "-" + reservations[i].time_to + " " + reservations[i].signature + " " + reservations[i].judge + " (p." + reservations[i].room + ")";
								document.getElementById("day" + parseInt(splitData[2])).appendChild(newSpan);
							}
						}
					}
				}

			}
			document.getElementById('loadingRez').style.display = "none";
			document.getElementById('loadingEdit').style.display = "none";
			document.getElementById('loadingDel').style.display = "none";
			if(tempLoading == 1){
			document.getElementById("smokeFrame").style.display = "none";
			document.getElementById("loadingPage").style.display = "none";
			}
			if(tempCloseWindow == 1) closeAddWindow();
		});
	}
	function viewCalendar(){ // tryb widoku
		viewMode = document.getElementById('fieldView').value;
		initCalendar(1,0,0);
	}
	function initReservation(e, element, temp) {
		e = e || event;
		var target = e.target || e.srcElement;
		
		if(element.tagName == 'SPAN' || target.tagName == 'DIV'){// ustawienia startowe ---------------------------------------
			//ustawianie zmiennych
			emails = [];
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
			document.getElementById("divEmails").innerHTML = "";

			//ustawianie wyświetlania
			document.getElementById("smokeFrame").style.display = "block";
			document.getElementById("addFrame").style.display = "block";
			document.getElementById("btnEditBlock").style.display = "none";
			document.getElementById("blockEmail").style.display = "flex";
		}
		if(element.tagName != 'SPAN' && target.tagName != "SPAN") { // dodawanie -------------------------------------------------
			takeData();

			//ustawianie wyświetlania
			document.getElementById("addFrame").style.height = "385px";
			document.getElementById("addFrame").style.maxHeight = "499px";
			document.getElementById("btnSubmit").style.display = "flex";

			//blokowanie pól
			document.getElementById("fieldUser").disabled = false;
			document.getElementById("fieldJudge").disabled = false;
			document.getElementById("fieldSignature").disabled = false;
			document.getElementById("inputDate").disabled = false;
			document.getElementById("timeFrom").disabled = false;
			document.getElementById("timeTo").disabled = false;
			document.getElementById("fieldRoom").disabled = false;

			//wypełnianie pól
			document.getElementById("validFeedback").innerHTML = "Pomiędzy rozprawami musi być 30minut przerwy";
			if(localsession[0]) {
				document.getElementById("fieldUser").value = localsession[0];
			} else {
				document.getElementById("fieldUser").value = '';
			}
			document.getElementById("fieldJudge").selectedIndex = 0;
			document.getElementById("fieldSignature").value = '';
			document.getElementById("inputDate").value = '';
			document.getElementById("timeFrom").selectedIndex = 0;
			document.getElementById("timeTo").selectedIndex = 0;
			document.getElementById("fieldRoom").selectedIndex = 0;
			document.getElementById("fieldAddDate").innerHTML = '';
			document.getElementById("inputDate").value = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + temp).slice(-2);
			

		} else if(element.tagName == 'SPAN' && target.tagName == "SPAN"){ // podgląd -------------------------------------------------
			//ustawianie zmiennych
			emails = reservations[temp].emails;

			//ustawianie wyświetlania
			document.getElementById("btnSubmit").style.display = "none";

			//wypełnianie pól
			document.getElementById("validFeedback").innerHTML = "";
			document.getElementById("fieldUser").value = reservations[temp].user;
			document.getElementById("fieldSignature").value = reservations[temp].signature;
			document.getElementById("inputDate").value = reservations[temp].date;
			document.getElementById("timeFrom").value = reservations[temp].time_from;
			document.getElementById("timeTo").value = reservations[temp].time_to;
			document.getElementById("fieldAddDate").innerHTML = '(' + reservations[temp].add_date + ')';
			document.getElementById("fieldRoom").value = reservations[temp].room;
			for(var i=0; i<document.getElementById("fieldJudge").options.length; i++){
				if(document.getElementById("fieldJudge").options[i].value == reservations[temp].judge) {
					document.getElementById("fieldJudge").selectedIndex = i;
				}
			}

			//tryby
			if(admin == 1 && (reservations[temp].status == '4' || reservations[temp].status == '5')){
				tempReservIndex = temp;
				document.getElementById("addFrame").style.height = "390px";
				document.getElementById("addFrame").style.maxHeight = "504px";
				document.getElementById("btnEditBlock").style.display = "flex";
			} else {
				document.getElementById("addFrame").style.height = "309px";
				document.getElementById("addFrame").style.maxHeight = "424px";
				document.getElementById("blockEmail").style.display = "none";

				document.getElementById("fieldUser").disabled = "disabled";
				document.getElementById("fieldJudge").disabled = "disabled";
				document.getElementById("fieldSignature").disabled = "disabled";
				document.getElementById("inputDate").disabled = "disabled";
				document.getElementById("timeFrom").disabled = "disabled";
				document.getElementById("timeTo").disabled = "disabled";
				document.getElementById("fieldRoom").disabled = "disabled";
			}
			
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

				if(admin == 1 && (reservations[temp].status == '4' || reservations[temp].status == '5')){
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
	function addEmail(){ //dodawanie informacji
		if((document.getElementById("btnEmail").value).replace( /\s/g, '') != ''){
			emails.push(document.getElementById("btnEmail").value);
			var newDiv = document.createElement("div");
			newDiv.className += "border bg-light p-1 mb-1";
			var newText = document.createTextNode(document.getElementById("btnEmail").value);
			newDiv.appendChild(newText);
			
			var newButton = document.createElement("input");
			newButton.type = "button";
			newButton.className = "btn btn-sm btn-light float-right p-0 m-0";
			newButton.style.height = "25px";
			newButton.style.width = "25px";
			newButton.value = "X";
			newButton.setAttribute("onclick", "deleteEmail(\'" + document.getElementById("btnEmail").value + "\', this);");
			newDiv.appendChild(newButton);
			
			document.getElementById("divEmails").appendChild(newDiv);
			document.getElementById("addFrame").style.height = (parseInt(document.getElementById("addFrame").style.height, 10) + 38) + 'px';
			document.getElementById("btnEmail").value = '';
		}
	}
	function deleteEmail(tempId, tempObj){ // usuwanie podmiotu
			for(var i=0;i<emails.length;i++){
				if(emails[i] === tempId){
					emails.splice(i, 1);
				}
			}
			tempObj.parentElement.remove();
			document.getElementById("addFrame").style.height = (parseInt(document.getElementById("addFrame").style.height, 10) - 38) + 'px';
	}
	function addReservation(){
		if(validReservation() == 0){ 
			document.getElementById('loadingRez').style.display = "inline-block";
			document.getElementById("validFeedback").innerHTML = "PROSZĘ CZEKAĆ TRWA REZERWOWANIE WIZYTY";
			if(!Array.isArray(localsession) || !localsession.length){
				localsession[0] = document.getElementById("fieldUser").value;
				localStorage.setItem("user_session", JSON.stringify(localsession));
			}
			axios.post('php/aReservation_adm.php', { 
				post_type : "add",
				user: document.getElementById("fieldUser").value, 
				judge: document.getElementById("fieldJudge").value,
				signature: document.getElementById("fieldSignature").value,
				date: document.getElementById("inputDate").value,
				time_from: document.getElementById("timeFrom").value,
				time_to: document.getElementById("timeTo").value,
				room: document.getElementById("fieldRoom").value,
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
		if(validReservation() == 0){ 
			document.getElementById('loadingEdit').style.display = "inline-block";
			axios.post('php/aReservation_adm.php', {
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
				axios.post('php/aReservation_adm.php', {
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
	function acceptReservation(){ // niedostepne dla administracji
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
			link: '',
			emails: emails
		}).then(function (response) {
			document.getElementById('loading').style.display = "none";
			initCalendar(1,1,0);
		})
	}
	function validReservation(){
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
		if(emails.length == 0) {
			document.getElementById("btnEmail").classList.add('is-invalid');
			document.getElementById("validFeedback").innerHTML = "Dodaj przesłuchiwanego lub inne informacje";
			valid++;
		}
		if(valid == 0){
			for(var i=1;i<reservations.length;i++){
				if(reservations[i].room == document.getElementById("fieldRoom").value) {
					if(document.getElementById("inputDate").value == reservations[i].date && reservations[tempReservIndex]['id'] != reservations[i].id){
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
	function charLimit(element, maxChars){
		if(element.value.length > maxChars) {
			element.value = element.value.substr(0, maxChars);
		}
	}
	function printMonth(){
                var childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
                childWindow.document.open();
				childWindow.document.write('<html><head><style>table, th, tr { border: 1px solid black;}</style></head><body style="width:620px">');
				for(var i=1;i<reservations.length;i++){
					if(reservations[i].status == '5'){
						childWindow.document.write('<table style="border: 1px solid black;border-collapse: collapse;width:100%">');
						childWindow.document.write('<tr><th colspan="2"><h3 style="text-align:center;">' + reservations[i].date + ' (' + daysName[new Date(reservations[i].date).getDay()] + ') od ' + reservations[i].time_from + ' do ' + reservations[i].time_to + '</h3></th></tr>');
						childWindow.document.write('<tr><td style="width:30%">Sygnatura: </td><td><b>' + reservations[i].signature + '</b></td></tr>');
						childWindow.document.write('<tr><td>Sala: </td><td><b>' + reservations[i].room + '</b></td></tr>');
						childWindow.document.write('<tr><td>Informacje: </td><td><b>');
						for(var j=0;j<reservations[i].emails.length;j++){
							childWindow.document.write(reservations[i].emails[j] + '<br/>');
						}
						childWindow.document.write('</b></td></tr></table><br/><br/>');
					}
				}
				childWindow.document.write('</body></html>');
				childWindow.document.print();
                childWindow.document.close();
	}