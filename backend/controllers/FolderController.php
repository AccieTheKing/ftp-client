<?php

/**
 * This class must handle everything that has to do with folders,
 * such as uploading and retrieving
 *
 * @author Acdaling Edusei
 */
class FolderController
{
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
     */
    public static function navigate($directoryName)
    {
        die(json_encode(["folders" => $_SESSION['SFTP_CONNECTION']->chdir($directoryName)]));
    }

}
