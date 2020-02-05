<?php
session_start();
require_once './autoload.php';
$routes = require './routes.php'; // get routes
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

Router::route($routes, $_SERVER["REQUEST_URI"]);


