<?php


/**
 * This class will handle the initialisation of classes and the use of their methods
 *
 * @author Acdaling Edusei
 */
class Router
{
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
        $method = $_SERVER["REQUEST_METHOD"]; // get the request mehtod used
        foreach ($routes as $route) { // iterate over each route
            $container = explode('@', $route["controller"]); // split the class name and method name
            $controller_class_name = $container[0]; // controller name
            $controller_class_method = $container[1]; // controller method

            // GET METHOD
            if ($route["url"] === $url && $route["method"] === "GET") { // check if url is valid
                $controller = new $controller_class_name(); // new object
                die($controller->$controller_class_method()); // execute method and quits script
            }

            // POST METHOD
            if ($route["url"] === $url && $route["method"] === "POST") { // check if url is valid
                $controller = new $controller_class_name(); // new controller object
                $postedData = file_get_contents("php://input"); // retrieve data from frontend
                $request = json_decode($postedData); // extract the data


//                if ($controller_class_method === "login") {
//                    die($controller->$controller_class_method($request->username, $request->password)); // execute methods
//                } else if ($controller_class_method === "navigate") {
//                    die($controller_class_name->$controller_class_method($request->folderName));
//                }
                switch ($controller_class_method) { // post method got parameters, so have to specify them
                    case "login":
                        die($controller->$controller_class_method($request->username, $request->password)); // execute methods
                        break;
                    case "navigate":
                        die($controller->$controller_class_method($request->foldername));
                        break;
                    default:
                        die(json_encode(["application_log" => "invalid post request"]));
                        break;
                }
            }
        }
    }
}
