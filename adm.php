<!doctype html>
<html lang="pl">
  <head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="shortcut icon" href="img/indeks.png">
    <link rel="stylesheet" href="style.css">
	  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <title>POMOCNIK</title>
  </head>
  <body>
  <script>
	  function login(){
			console.log(document.getElementById("fieldPass"));
		  if(document.getElementById("fieldPass").value == ""){
			sessionStorage.setItem('admin', '1'); 
			window.open('index_adm.php',"_self");
		  }
	  }
	  function login2(){
  		if (event.keyCode === 13) {
			console.log(document.getElementById("fieldPass"));
			if(document.getElementById("fieldPass").value == ""){
				sessionStorage.setItem('admin', '1'); 
				window.open('index_adm.php',"_self");
			}
		}
	  }
  </script>
      <!--górne menu--><div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        	<a class="navbar-brand" id="gora" href="#gora">REZERWACJA SALI NA WIDEOKONFERENCJE</a>
			
			
        	<a class="btn btn-dark nav-link" style="color:rgba(255, 255, 255, 0.5)" href="../#gora" aria-haspopup="true" aria-expanded="false">POMOCNIK</a>


			
            <!--data--><ul class="navbar-nav ml-md-auto zegar">
                <SCRIPT LANGUAGE="JavaScript">
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
				</SCRIPT>
				<SCRIPT>
					document.write("Dzisiaj jest " + getDateStr())
				</SCRIPT>
            </ul>
        </nav>
      </div>
  
 
	  <!--Aktualności-->
	  <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">Logowanie dla Oddziału Administracyjnego</h1>


            </div>
	  </div>

	  <div class="container">
		<div class="row">
			<div class="col-sm">
			</div>
			<div class="col-sm">
				<div class="form-group">
					<label for="exampleInputPassword1">Hasło</label>
					<input id="fieldPass" onkeyup="login2()" type="password" class="form-control" id="exampleInputPassword1" placeholder="Wpisz hasło">
				</div>
				<input type="button" onclick="login()" class="btn btn-primary" value="Zaloguj" />
			</div>
			<div class="col-sm">
			</div>
		</div>
		</div>

   
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	 
  </body>
</html>
<!------------------------------------------------------------------------>
<!-------------- Projekt i realizacja: Andrzej Mackiewicz ---------------->
<!------------------------------------------------------------------------>