<?php


/**
 * This class will handle the initialisation of classes and the use of their methods
 *
 * @author Acdaling Edusei
 */
class Router
{
    public static $hashMap = array();

    /**
     * This method will take a route specified in the routes file and check if given
     * url is valid, then the correct class will be initialized and the method provided in the route array will be
     * loaded
     *
     * @param $routes array of routes form routes.php
     * @param $url link request from frontend
     */
    public static function route($routes, $url)
    {
        $method = $_SERVER["REQUEST_METHOD"]; // get the request method used
        foreach ($routes as $route) { // iterate over each route
            $container = explode('@', $route["controller"]); // split the class name and method name
            $controller_class_name = $container[0]; // controller name
            $controller_class_method = $container[1]; // controller method

            // GET METHOD
            if ($route["url"] === $url && $route["method"] === "GET") { // check if url is valid
                if ($route["method"] === $method) { // check method
                    self::checkObjectInMap($controller_class_name);
                    die(self::$hashMap[$controller_class_name]->$controller_class_method());
                }
            }

            // POST METHOD
            if ($route["url"] === $url && $route["method"] === "POST") { // check if url is valid
                if ($route["method"] === $method) { // check method
                    $postedData = file_get_contents("php://input"); // retrieve data from frontend
                    $request = json_decode($postedData); // extract the data

                    self::checkObjectInMap($controller_class_name);
                    $controller = self::$hashMap[$controller_class_name]; // placeholder
                    switch ($controller_class_method) { // post method got parameters, so have to specify them
                        case "login":
                            die($controller->$controller_class_method($request->username, $request->password));
                            break;
                        case "navigate":
                            die($controller->$controller_class_method($request->foldername, $request->username, $request->password));
                            break;
                        default:
                            die(json_encode(["application_log" => "invalid post request"]));
                            break;
                    }
                }
            }
        }
    }


    /**
     * This method method will add the object of a class in an array when not already created
     *
     * @param $className class
     */
    private static function checkObjectInMap($className)
    {
        if (!in_array($className, self::$hashMap)) {
            // execute method and quits script
            self::$hashMap[$className] = new $className();
        }
    }
}
