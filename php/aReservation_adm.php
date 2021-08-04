<?php 
include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if($data['post_type'] == 'add'){
  $emails_encode = json_encode($data['emails'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  $sql = "INSERT INTO calendar (user, judge, signature, date, time_from, time_to, room, emails, status, add_date, confirm) 
  VALUES ('{$data['user']}', '{$data['judge']}', '{$data['signature']}', '{$data['date']}', '{$data['time_from']}', '{$data['time_to']}', '{$data['room']}', '{$emails_encode}', '5', '{$data['add_date']}', '1')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

if($data['post_type'] == 'edit'){
  if($data['admin'] == 0){
    $sql = "SELECT * FROM calendar WHERE id LIKE '{$data['id']}'";
    $result = $conn->query($sql);
    if($result){
      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          if($row["status"] == 0){
            $data['admin'] = 1;
          }
        }
      }
    }
  }
  if($data['admin'] == 1) {
    $emails_encode = json_encode($data['emails'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $sql = "UPDATE calendar 
    SET user='{$data['user']}', judge='{$data['judge']}', signature='{$data['signature']}', date='{$data['date']}', time_from='{$data['time_from']}', time_to='{$data['time_to']}', room='{$data['room']}', emails='{$emails_encode}'
    WHERE id='{$data['id']}'";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

if($data['post_type'] == 'delete'){
  $sql = "DELETE FROM calendar 
  WHERE id='{$data['id']}'";

  if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

if($data['post_type'] == 'accept'){
  echo $data['link'];
  require realpath(dirname(__FILE__) . '/../php/aSend.php');

  $sql = "UPDATE calendar 
  SET status='1', link='{$data['link']}'
  WHERE id='{$data['id']}'";

  if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>