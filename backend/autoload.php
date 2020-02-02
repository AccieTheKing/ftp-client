<?php
/**
 * This file will load the files that i'm going to need using this application
 * 
 * @author Acdaling Edusei
 */
set_include_path(get_include_path() . PATH_SEPARATOR . 'lib/phpseclib');
include('Net/SFTP.php');
require_once './controllers/AuthenticationController.php';
require_once './controllers/FolderController.php';
require_once './utils/router.php';
