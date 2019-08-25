<?php

/**
 * Plugin Name: Custom Gutenberg Block - Blog Header Bar
 * Plugin URI: https://github.com/melmai/
 * Description: This is a plugin to add a styled title bar to blog posts
 * Version: 0.1
 * Author: Melissa Wong
 *
 * @package blog-header-bar
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'blog_header_bar_load_textdomain' );

function blog_header_bar_load_textdomain() {
	load_plugin_textdomain( 'blog-header-bar', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function blog_header_bar_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'blog-header-bar-script',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	wp_register_style(
		'blog-header-bar-style',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	wp_register_style(
		'blog-header-bar-editor-style',
		plugins_url('editor.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'editor.css')
	);

	register_block_type( 'blog-header-bar/blog-header-bar', array(
		'style' => 'blog-header-bar-style',
		'editor_script' => 'blog-header-bar-script',
		'editor_style' => 'blog-header-bar-editor-style',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'blog-header-bar-script', 'blog-header-bar' );
  }

}
add_action( 'init', 'blog_header_bar_register_block' );
