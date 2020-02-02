<?php
session_start();
$_SESSION["SFTP_CONNECTION"] = null;
require_once './autoload.php';
$routes = require './routes.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

Router::route($routes, $_SERVER["REQUEST_URI"]);
