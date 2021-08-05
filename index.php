<!doctype html>
<html lang="pl">
  <head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="css/main.css" />
    <title>POMOCNIK</title>
  </head>
  <body>
      <!--górne menu--><div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        	<a class="navbar-brand" id="gora" href="#gora">REZERWACJA SALI NA WIDEOKONFERENCJE</a>
			
			
        	<a class="btn btn-dark nav-link" style="color:rgba(255, 255, 255, 0.5)" href="../#gora" aria-haspopup="true" aria-expanded="false">POMOCNIK</a>
        	<a class="btn btn-dark nav-link" style="color:rgba(255, 255, 255, 0.5)" href="inf.php" aria-haspopup="true" aria-expanded="false">Informatycy</a>
        	<a class="btn btn-dark nav-link" style="color:rgba(255, 255, 255, 0.5)" href="adm.php" aria-haspopup="true" aria-expanded="false">Administracyjny</a>


			
            <!--data--><ul class="navbar-nav ml-md-auto zegar">
				<div class="navbar-nav ml-md-auto text-white">
					<label for="inputEmail3" class="col-sm-5 col-form-label col-form-label-sm py-0 my-0">Wyświetlanie:</label>
					<div class="col-sm-7"> 
						<select id="fieldView" onchange="viewCalendar()" class="form-control form-control-sm">
						  <option selected value="ALL">Wszystkie sale</option>
						  <option value="3">Sala nr. 3</option>
						  <option value="128">Sala nr. 128</option>
						  <option value="129">Sala nr. 129</option>
						</select>
					</div>
				  </div>
                <SCRIPT LANGUAGE="JavaScript"> // not mine
					DayName = new Array(7)
					DayName[0] = "niedziela "
					DayName[1] = "poniedziałek "
					DayName[2] = "wtorek "
					DayName[3] = "środa "
					DayName[4] = "czwartek "
					DayName[5] = "piątek "
					DayName[6] = "sobota "

					MonthName = new Array(12)
					MonthName[0] = "stycznia "
					MonthName[1] = "lutego "
					MonthName[2] = "marca "
					MonthName[3] = "kwietnia "
					MonthName[4] = "maja "
					MonthName[5] = "czerwca "
					MonthName[6] = "lipca "
					MonthName[7] = "sierpnia "
					MonthName[8] = "września "
					MonthName[9] = "pa1dziernika "
					MonthName[10] = "listopada "
					MonthName[11] = "grudnia "

					function getDateStr(){
					var Today = new Date()
					var WeekDay = Today.getDay()
					var Month = Today.getMonth()
					var Day = Today.getDate()
					var Year = Today.getFullYear()

					if(Year <= 99)
					Year += 1900

					return DayName[WeekDay] + " " + Day + " " + MonthName[Month] + Year
					}
					document.write("Dzisiaj jest " + getDateStr())
				</SCRIPT>
            </ul>
        </nav>
      </div>
  
 
	  <!--Aktualności
		<div class="jumbotron">
            <div class="container">
                <h1 class="display-4">Aktualności</h1>


            </div>
	  </div>-->
	  <div class="container-fluid" style="padding:0px 1px 0px 1px;">
		<table class="table p-0 m-0" style="table-layout: fixed;">
		  <thead style="background-color:rgb(233, 236, 239);">
			<tr>
			  <th class="py-0 px-2 m-0" scope="col" colspan="7">
			  <div class="row p-0 m-0">
			  <div class="col-4"><a class="p-0 m-0" onclick="changeMonth(-1)" aria-haspopup="true" aria-expanded="false"><img class="arrows-css" src="./img/arrow-l.png" /></a></div>
			  <div class="col-4 text-center h4" id="nameMonth" >Niedziela</div>
			  <div class="col-4 text-right"><a class="p-0 m-0" onclick="changeMonth(1)" aria-haspopup="true" aria-expanded="false"><img class="arrows-css" src="./img/arrow-r.png" /></a></div>
			  </div>
			  </th>
			</tr>
			<tr>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Niedziela</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Poniedziałek</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Wtorek</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Środa</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Czwartek</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Piątek</th>
			  <th class="py-0 px-2 m-0 text-center" scope="col">Sobota</th>
			</tr>
		  </thead>
		  <tbody id="calendar" class="table-bordered">
		  </tbody>
		</table>
	  </div>

	<div id="smokeFrame" onclick="closeAddWindow()" class="container-fluid"></div>

	<div id="loadingPage" class="container-fluid spinner-border spinner-border-sm"></div>

	<div class="card" id="addFrame">
	  <div class="card-header p-2 m-0" style="background-color:rgb(233, 236, 239);">
		Rezerwacja Sali <div id="fieldAddDate" style="display:inline"></div>
		<input type="button" onclick="closeAddWindow()" class="btn btn-sm btn-danger float-right btn-close-css" value="X" />
	  </div>
	  <div class="card-body p-2">
		<form>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Rezerwujący:</label>
			<div class="col-sm-10">
			  <input type="name" id="fieldUser" onkeydown="charLimit(this, 30);" onkeyup="charLimit(this, 30);" class="form-control form-control-sm" placeholder="Wpisz tutaj swoje imię i nazwisko" >
			</div>
		  </div>
		  <hr class="p-1 m-0">
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Typ:</label>
			  <div class="col-sm-10">
				<select id="fieldType"  onchange="changeType()" class="form-control form-control-sm">
				  <option selected value="0">JITSI</option>
				  <option value="4">SĄD/ZAKŁAD KARNY/INNE</option>
				</select>
			  </div>
			</div>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Sygnatura:</label>
			<div class="col-sm-10">
			  <input type="name" id="fieldSignature" onkeydown="charLimit(this, 50);" onkeyup="charLimit(this, 50);" class="form-control form-control-sm" placeholder="Wpisz tutaj sygnaturę sprawy" >
			</div>
		  </div>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Sędzia:</label>
			<div class="col-sm-10"> 
				<select id="fieldJudge" class="form-control form-control-sm">
					<option hidden selected disabled>Wybierz sędziego</option>
					<option value="Anna Dulska">IC: Anna Dulska</option>
					<option value="Dagmara Gałuszko">IC: Dagmara Gałuszko</option>
					<option value="Dariusz Jastszębski">IC: Dariusz Jastszębski</option>
					<option value="Małgorzata Andrzejkowicz">IC: Małgorzata Andrzejkowicz</option>
					<option value="Zofia Piwowarska">IC: Zofia Piwowarska</option>
					<option value="Anita Wolska">IC: Anita Wolska</option>
					<option value="Julia Ratajska">IC: Julia Ratajska</option>
					<option value="Aneta Mikołajuk">IIC: Aneta Mikołajuk</option>
					<option value="Anna Lisiecka">IIC: Anna Lisiecka</option>
					<option value="Agnieszka Matusiak">IIC: Agnieszka Matusiak</option>
					<option value="Agnieszka Matias-Smolińska">IIC: Agnieszka Matias-Smolińska</option>
					<option value="Katarzyna Mackojć">IIC: Katarzyna Mackojć</option>
					<option value="Lilianna Jędrzejewska">IIC: Lilianna Jędrzejewska</option>
					<option value="Irma Lorenc">IIIC: Irma Lorenc</option>
					<option value="Szymon Stępień">IIIC: Szymon Stępień</option>
					<option value="Marta Sawicka-Grab">IIIC: Marta Sawicka-Grab</option>
					<option value="Grzegorz Orlonek">IIIC: Grzegorz Orlonek</option>
					<option value="Joanna Suchecka">IIIC: Joanna Suchecka</option>
					<option value="Edyta Wilińska">IIIC: Edyta Wilińska</option>
					<option value="Krystian Kwolek">IVK: Krystian Kwolek</option>
					<option value="Katarzyna Grodź - Mużyło">IVK: Katarzyna Grodź - Mużyło</option>
					<option value="Maciej Piotrowski">IVK: Maciej Piotrowski</option>
					<option value="Radosław Lorenc">IVK: Radosław Lorenc</option>
					<option value="Marek Dalidowicz">IVK: Marek Dalidowicz</option>
					<option value="Agnieszka Charyło">VK: Agnieszka Charyło</option>
					<option value="Barbara Rezmer">VK: Barbara Rezmer</option>
					<option value="Beata Szczepańska">VK: Beata Szczepańska</option>
					<option value="Magdalena Ledworowska">VK: Magdalena Ledworowska</option>
					<option value="Agnieszka Poświata">VIK: Agnieszka Poświata</option>
					<option value="Kinga Misiukiewicz">VIK: Kinga Misiukiewicz</option>
					<option value="Michał Karczewski">VIK: Michał Karczewski</option>
					<option value="Monika Orzechowska">VIK: Monika Orzechowska</option>
					
					<option value="Ryszard Rutkowski">VIIK: Ryszard Rutkowski</option>
					<option value="Aleksandra Kurylczyk">VIIK: Aleksandra Kurylczyk</option>
					<option value="Karolina Nowak">VIIK: Karolina Nowak</option>
					<option value="Katarzyna Szynkowska">VIIK: Katarzyna Szynkowska</option>

					<option value="Edyta Grygorowicz">VIIIR: Edyta Grygorowicz</option>
					<option value="Adam Jaworowicz">VIIIR: Adam Jaworowicz</option>
					<option value="Violetta Hanspol-Mikuła">VIIIR: Violetta Hanspol-Mikuła</option>
					<option value="Bożena Matuszewska">VIIIR: Bożena Matuszewska</option>
					<option value="Marcin Jędrzejewski">VIIIR: Marcin Jędrzejewski</option>
					<option value="Marta Ścisłowska">VIIIR: Marta Ścisłowska</option>
					<option value="Jarosław Pyfel">VIIIR: Jarosław Pyfel</option>
					<option value="Magdalena Głogowska">VIIIR: Magdalena Głogowska</option>
					<option value="Katarzyna Słodkowska">VIIIR: Katarzyna Słodkowska</option>
					<option value="Anna Rzęsa">VIIIR: Anna Rzęsa</option>
					<option value="Zofia Zalewska">VIIIR: Zofia Zalewska</option>
					<option value="INNY">Inny sędzia</option>
				</select>
			</div>
		  </div>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Data:</label>
			<div class="col-sm-10">
			  <input id="inputDate" type="date" class="form-control form-control-sm" required>
			</div>
		  </div>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Godzina:</label>
			<label for="inputEmail3" class="col-sm-1 col-form-label col-form-label-sm">od</label>
			<div class="col-sm-4">
				<select id="timeFrom" onchange="timeFromSelect(this)" class="form-control form-control-sm form-inline">
				  <option hidden selected disabled>Wybierz godzine</option>
				  <option value="08:00">8:00</option>
				  <option value="08:15">8:15</option>
				  <option value="08:30">8:30</option>
				  <option value="08:45">8:45</option>
				  <option value="09:00">9:00</option>
				  <option value="09:15">9:15</option>
				  <option value="09:30">9:30</option>
				  <option value="09:45">9:45</option>
				  <option value="10:00">10:00</option>
				  <option value="10:15">10:15</option>
				  <option value="10:30">10:30</option>
				  <option value="10:45">10:45</option>
				  <option value="11:00">11:00</option>
				  <option value="11:15">11:15</option>
				  <option value="11:30">11:30</option>
				  <option value="11:45">11:45</option>
				  <option value="12:00">12:00</option>
				  <option value="12:15">12:15</option>
				  <option value="12:30">12:30</option>
				  <option value="12:45">12:45</option>
				  <option value="13:00">13:00</option>
				  <option value="13:15">13:15</option>
				  <option value="13:30">13:30</option>
				  <option value="13:45">13:45</option>
				  <option value="14:00">14:00</option>
				  <option value="14:15">14:15</option>
				  <option value="14:30">14:30</option>
				  <option value="14:45">14:45</option>
				  <option value="15:00">15:00</option>
				</select>
			</div>
			<label for="inputEmail3" class="col-sm-1 col-form-label col-form-label-sm">do</label>
			<div class="col-sm-4">
				<select id="timeTo" class="form-control form-control-sm">
				  <option hidden selected disabled>Wybierz godzine</option>
				  <option value="08:30">8:30</option>
				  <option value="08:45">8:45</option>
				  <option value="09:00">9:00</option>
				  <option value="09:15">9:15</option>
				  <option value="09:30">9:30</option>
				  <option value="09:45">9:45</option>
				  <option value="10:00">10:00</option>
				  <option value="10:15">10:15</option>
				  <option value="10:30">10:30</option>
				  <option value="10:45">10:45</option>
				  <option value="11:00">11:00</option>
				  <option value="11:15">11:15</option>
				  <option value="11:30">11:30</option>
				  <option value="11:45">11:45</option>
				  <option value="12:00">12:00</option>
				  <option value="12:15">12:15</option>
				  <option value="12:30">12:30</option>
				  <option value="12:45">12:45</option>
				  <option value="13:00">13:00</option>
				  <option value="13:15">13:15</option>
				  <option value="13:30">13:30</option>
				  <option value="13:45">13:45</option>
				  <option value="14:00">14:00</option>
				  <option value="14:15">14:15</option>
				  <option value="14:30">14:30</option>
				  <option value="14:45">14:45</option>
				  <option value="15:00">15:00</option>
				  <option value="15:15">15:15</option>
				  <option value="15:30">15:30</option>
				</select>
			</div>
		  </div>
		  <div class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Sala:</label>
			  <div class="col-sm-10">
				<select id="fieldRoom" class="form-control form-control-sm">
				  <option hidden selected disabled>Wybierz sale</option>
				  <option value="3">Sala nr. 3</option>
				  <option value="128">Sala nr. 128</option>
				  <option value="129">Sala nr. 129</option>
				</select>
			  </div>
			</div>
		  <hr class="p-1 m-0">
		  <div id="blockLink" class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Link:</label>
			<div class="col-sm-10">
				<div class="btn-group d-flex" role="group">
				<input type="name" id="inputLink" class="form-control form-control-sm" placeholder="REZERWACJA NIE ZOSTAŁA JESZCZE POTWIERDZONA">
				<input id="btnGenerator" type="button" onclick="generateLink()" class="btn btn-sm btn-secondary" value="Generuj" />
				<input type="button" onclick="openLink()" class="btn btn-sm btn-dark" value=">" />
				</div>
			</div>
		  </div>
		  <div class="form-group row p-0 m-0">
			<div id="divEmails" class="col-sm-12 p-0 m-0">
				
			</div>
		  </div> 
		  <div id="blockInfo" class="form-group row mb-2" style='display:none'>
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Informacje:</label>
			<div class="col-sm-10">
			<div class="btn-group d-flex" role="group">
			  <input type="name" id="btnPodmiot" class="form-control form-control-sm" placeholder="Wpisz tutaj nazwę sądu, zakładu karnego itp. i kliknij +">
			  <input type="button" onclick="addEmail()" class="btn btn-sm btn-dark" value="+" />
			</div>
			</div>
			<div class="col-sm-2">
			</div>
		  </div>
		  <div id="blockEmail" class="form-group row mb-2">
			<label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Email:</label>
			<div class="col-sm-10">
			<div class="btn-group d-flex" role="group">
			  <input type="name" id="btnEmail" class="form-control form-control-sm" placeholder="Wpisz tutaj adres e-mail uczestnika i kliknij +">
			  <input type="button" onclick="addEmail()" class="btn btn-sm btn-dark" value="+" />
			</div>
			</div>
			<div class="col-sm-2">
			</div>
		  </div>
		  <div id="blockConfirm" class="form-check mb-2">
			<input type="checkbox" class="form-check-input" id="btnConfirm">
			<label class="form-check-label" for="exampleCheck1">Rezerwacja gotowa do potwierdzenia</label>
		  </div>
		  <div class="form-group row">
			<div class="col-sm-3">
			  <button type="button" id="btnSubmit" onclick="addReservation()" class="btn btn-primary">Zarezerwuj <div id="loadingRez" class="spinner-border spinner-border-sm" style="display:none;" role="status"></div></button>
			</div>
			  <div id="validFeedback" class="invalid-feedback col-sm-9" style="display:flex">
			  </div>
			  <div class="col-sm-12">
			  <div id="btnEditBlock" class="btn-group" role="group" style="display:none;">
				<button id="btnAccept" type="button" onclick="acceptReservation()" class="btn btn-primary "><p id="btnAcceptTxt" style="margin:0px">Potwierdź</p> <div id="loading" class="spinner-border spinner-border-sm" style="display:none" role="status"></div></button>
				<button type="button" onclick="editReservation()" class="btn btn-secondary">Zmień <div id="loadingEdit" class="spinner-border spinner-border-sm" style="display:none" role="status"></div></button>
				<button type="button" onclick="deleteReservation()" class="btn btn-danger">Usuń <div id="loadingDel" class="spinner-border spinner-border-sm" style="display:none" role="status"></div></button>
			  </div>
			</div>
		  </div>
		</form>
	  </div>
	</div>
                

	<script src="js/main.js"></script>
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	 
  </body>
</html>
<!------------------------------------------------------------------------>
<!-------------- Projekt i realizacja: Andrzej Mackiewicz ---------------->
<!------------------------------------------------------------------------>