<?php
header('Content-type: image/png');
header('Content-Disposition: attachment; filename="graph.png"');
$data = explode(',',$_POST['imgdata']);
echo base64_decode($data[1]);
?>
