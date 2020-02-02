<?php

/**
 * This class will handle the authentication of the application, only users with the correct password can
 * upload files(Pictures for now) to the webserver
 * 
 * @author Acdaling Edusei
 */
class AuthenticationController
{

    /**
     * This method will take the username and password, check them and store the username
     * if the password is correct
     * 
     * @param username
     * @param password
     */
    public function login($username, $password)
    {
        $_SESSION['SFTP_CONNECTION'] = new Net_SFTP('acdaling.nl.transurl.nl');
        if (!$_SESSION['SFTP_CONNECTION']->login($username, $password)) {
            exit($this->isLoggedIn());
        } else {
            die($this->isLoggedIn());
        }
    }


    /**
     * The user is logged in when the username variable is not empty,
     * the variable can only be filled when the password is correct
     */
    public function isLoggedIn()
    {
        if (isset($_SESSION['SFTP_CONNECTION']) && !empty($_SESSION['SFTP_CONNECTION'])) {
            die(json_encode(["folders" => $_SESSION['SFTP_CONNECTION']->nlist()]));
        }
        die(json_encode(["folders" => null]));
    }
}
