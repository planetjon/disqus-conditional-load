/**
 * Disqus variables.
 */
var disqus_url = embedVars.disqusUrl;
var disqus_identifier = embedVars.disqusIdentifier;
var disqus_container_id = 'disqus_thread';
var disqus_shortname = embedVars.disqusShortname;
var disqus_title = embedVars.disqusTitle;
var disqus_config_custom = window.disqus_config;
var disqusLoaded = false;
var current_url = window.location.href;
var disqusDiv = document.getElementById( disqus_container_id );
var disqus_config = function () {
    /**
     * All currently supported events:
     * onReady: fires when everything is ready,
     * onNewComment: fires when a new comment is posted,
     * onIdentify: fires when user is authenticated
     */
    var dsqConfig = embedVars.disqusConfig;
    this.page.integration = dsqConfig.integration;
    this.page.remote_auth_s3 = dsqConfig.remote_auth_s3;
    this.page.api_key = dsqConfig.api_key;
    this.sso = dsqConfig.sso;
    this.language = dsqConfig.language;

    if ( disqus_config_custom ) {
        disqus_config_custom.call( this );
    }
};

/**
 * Get and set the Disqus comments embed.
 *
 * Get the Disqus comments iframe through ajax
 * and append it to the comments section.
 *
 * @since 11.0.0
 */
var disqus_comments = function () {

    if ( !disqusLoaded ) {
        disqusLoaded = true;
        var dsq = document.createElement( 'script' );
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName( 'head' )[0] || document.getElementsByTagName( 'body' )[0]).appendChild( dsq );
    }
};

/**
 * Load Disqus comments on page scroll.
 *
 * Load Disqus comments when visitor scrolls down to the comments
 * area of the page/post.
 *
 * @since 11.0.0
 */
if ( current_url.indexOf( '#comment' ) != -1 ) {
    // Load directly if trying to scroll to a comment.
    disqus_comments();
} else if ( document.body.scrollHeight < window.innerHeight ) {
    // If no scroll bar found, load comments.
    disqus_comments();
} else if ( disqusDiv !== null ) {
    // Start loading the comments when user scroll down.
    window.onscroll = function () {
        if ( ( window.scrollY + window.innerHeight ) >= disqusDiv.offsetTop ) {
            disqus_comments();
        }
    };
}
