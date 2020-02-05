<?php

/**
 * This class will handle the authentication of the application, only users with the correct password can
 * upload files(Pictures for now) to the webserver
 *
 * @author Acdaling Edusei
 */
class AuthenticationController
{
    private static $conn;

    /**
     * This method will take the username and password, check them and store the username
     * if the password is correct
     *
     * @param username
     * @param password
     */
    public function login($username, $password)
    {
        self::$conn = new Net_SFTP('acdaling.nl.transurl.nl');
        if (!self::$conn->login($username, $password)) {
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
        if (isset(self::$conn) && !empty(self::$conn)) {
            die(json_encode(["folders" => self::$conn->nlist()]));
        }
        die(json_encode(["folders" => null]));
    }
}