<?php 
$data = json_decode(file_get_contents("php://input"), true);

class view {
  private $room;
  private $data;
  private $dataSQL = array();
  public function __construct(string $room, $data) {
    if($room == 'ALL'){
      $this->room = 0;
    } else {
      $this->room = (int)$room;
    }
    $this->data = $data;
    $this->dataSQL[] = $data['month'];
  }
  public function generate(){
    include("../db.php");
    $sql = "";
    if($this->room != 0){
      $sql = "SELECT * FROM calendar WHERE date LIKE '{$this->data['year']}-{$this->data['month']}-%' AND room LIKE {$this->room} AND status NOT LIKE 2 ORDER BY date, time_from";
    } else {
      $sql = "SELECT * FROM calendar WHERE date LIKE '{$this->data['year']}-{$this->data['month']}-%' AND status NOT LIKE 2 ORDER BY date, time_from";
    }
    $result = $conn->query($sql);
    if($result){
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $this->dataSQL[] = array("id" => $row["id"], "user" => $row["user"], "judge" => $row["judge"], "signature" => $row["signature"], "date" => $row["date"], 
          "time_from" => $row["time_from"], "time_to" => $row["time_to"], "room" => $row["room"], "emails" => json_decode($row["emails"], true), "status" => $row["status"], "link" => $row["link"], "add_date" => $row["add_date"], "last_accept" => $row["last_accept"], "confirm" => $row["confirm"]);
        }
      }
    }
    $conn->close();
  }
  public function generateCyclical(){
    include("../db.php");
    $sql = "";
    if($this->room != 0){
      $sql = "SELECT * FROM calendar WHERE status LIKE 2 AND room LIKE {$this->room}";
    } else {
      $sql = "SELECT * FROM calendar WHERE status LIKE 2";
    }
    $result = $conn->query($sql);
    if($result){
      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $this->dataSQL[] = array("id" => $row["id"], "user" => $row["user"], "judge" => $row["judge"], "signature" => $row["signature"], "date" => $row["date"], 
          "time_from" => $row["time_from"], "time_to" => $row["time_to"], "room" => $row["room"], "emails" => json_decode($row["emails"], true), "status" => $row["status"], "link" => $row["link"]);
        }
      }
    }
    $conn->close();
  }
  public function getDataSQL(){
    return $this->dataSQL;
  }
}

$test = new view($data['view'], $data);
$test->generate();
$test->generateCyclical();
$dataOut = $test->getDataSQL();

echo json_encode($dataOut, true);

?>