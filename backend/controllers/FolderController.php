<?php

/**
 * This class must handle everything that has to do with folders,
 * such as uploading and retrieving
 *
 * @author Acdaling Edusei
 */
class FolderController
{
    private static $conn;

    /**
     * This method will retrieve all the images and
     * return the correct url to that image
     */
    public static function all()
    {
        die(json_encode(["folders" => "wtf"]));
//        $folder_url = 'http://' . $_SERVER["SERVER_NAME"] . "/img"; // url to folder
//        $directory = dirname(__DIR__) . '\img'; // get directory to the image on the server
//        $images_from_directory = glob($directory . "/*.*"); // fetch all the images
//        $images = []; // array to return to user
//
//        foreach ($images_from_directory as $image) {
//            $url_replace = str_replace('\\', '/', $image); // make valid url
//            $image_name = explode('/img/', $url_replace)[1]; // spit image name from url name
//            $link = $folder_url . '/' . $image_name; // create url to image
//
//            array_push($images, $link); // store image in array
//        }
//
//
//        die(json_encode(['all_img' => $images])); // return json representation of array
    }

    /**
     * This method will be used to navigate through directories on the server
     *
     * @param $directoryName name of the directory to navigate to
     * @param $username
     * @param $password
     */
    public static function navigate($directoryName, $username, $password)
    {
        self::$conn = new Net_SFTP('acdaling.nl.transurl.nl'); // fill session with new connection
        if (self::$conn->login($username, $password)) {
            self::$conn->chdir($directoryName); // open directory
            die(json_encode(["folders" => self::$conn->nlist()]));
        }
        die(json_encode(["application_log" => "invalid post request in FolderController"]));
    }

}
