<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 4/15/2018
 * Time: 4:55 PM
 */

namespace Linhnt\Crawler;

use Linhnt\Crawler\TraitCrawler\BaseTrait;
use Linhnt\Crawler\TraitCrawler\GetCrawlerType;

class Test
{
    protected $baseCralwer;

    public function __construct()
    {
//        $this->baseCralwer = $crawlerBase;
    }

    public function index()
    {
        $trait = new GetCrawlerType();
        var_dump($trait->getString('fdafas'));
    }
}