<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita40aef5f9dd268fb7b3dcd2dff660319
{
    public static $files = array (
        '3917c79c5052b270641b5a200963dbc2' => __DIR__ . '/..' . '/kint-php/kint/init.php',
    );

    public static $prefixLengthsPsr4 = array (
        'K' => 
        array (
            'Kint\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Kint\\' => 
        array (
            0 => __DIR__ . '/..' . '/kint-php/kint/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita40aef5f9dd268fb7b3dcd2dff660319::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita40aef5f9dd268fb7b3dcd2dff660319::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
