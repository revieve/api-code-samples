<?php
  $url = "https://partner-test.revieve.com/api/3/analyzeImage/?skintone=4&gender=male";
  $image = curl_file_create('selfie.jpg','image/jpeg','selfie.jpg');
  $data = array("image" => $image, "partner_id" => "jmlv6b2qtS");
  $curl = curl_init();
  $options = array(
    CURLOPT_URL => $url,
    CURLOPT_POST => 1,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_RETURNTRANSFER => true
  );
  curl_setopt_array($curl, $options);
  echo curl_exec($curl);
  curl_close($curl);
?>