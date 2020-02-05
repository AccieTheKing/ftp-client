<?php

/**
 * These are the routes that my application is going to use.
 * 
 * @author Acdaling Edusei
 */
return [
    [
        "url" => "/",
        "method" => "POST",
        "controller" => "AuthenticationController@login"
    ],
    [
        "url" => "/",
        "method" => "GET",
        "controller" => "AuthenticationController@isLoggedIn"
    ],
    [
        "url" => "/navigate",
        "method" => "GET",
        "controller" => "FolderController@all"
    ],
    [
        "url" => "/navigate",
        "method" => "POST",
        "controller" => "FolderController@navigate"
    ],
    [
        "url" => "/upload",
        "method" => "POST",
        "controller" => "FolderController@add"
    ]
];
