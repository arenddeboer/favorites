<?php namespace SimpleFavorites\Entities\User;

use SimpleFavorites\Config\SettingsRepository;

class UserRepository {

	/**
	* Settings Repository
	*/
	private $settings_repo;

	public function __construct()
	{
		$this->settings_repo = new SettingsRepository;
	}

	/**
	* Display button for current user
	* @return boolean
	*/
	public function getsButton()
	{
		if ( is_user_logged_in() ) return true;
		if ( $this->settings_repo->anonymous('display') ) return true;
		return false;
	}

	/**
	* Get User's Favorites
	* @return array
	*/
	public function getFavorites()
	{
		$saveType = $this->settings_repo->saveType();
		$favorites = ( $saveType == 'cookie' ) ? $this->getCookieFavorites() : $this->getSessionFavorites();
		return $favorites;
	}

	/**
	* Get Session Favorites
	*/
	private function getSessionFavorites()
	{
		if ( !isset($_SESSION['simplefavorites']) ) $_SESSION['simplefavorites'] = array();
		return $_SESSION['simplefavorites'];
	}


	/**
	* Get Cookie Favorites
	*/
	private function getCookieFavorites()
	{
		if ( !isset($_COOKIE['simplefavorites']) ) $_COOKIE['simplefavorites'] = json_encode(array());
		$cookie = stripslashes($_COOKIE['simplefavorites']);
		return json_decode($cookie, true);
	}


	/**
	* Has the user favorited a specified post?
	* @param int - post id
	*/
	public function isFavorite($post_id)
	{
		$all_favorites = $this->getFavorites();
		return ( in_array($post_id, $all_favorites) ) ? true : false;
	}

}