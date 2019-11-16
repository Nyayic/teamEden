var ajaxRevslider;
var INVETEX_STORAGE = '';

jQuery(document).ready(function() {
    "use strict";
    invetesxStorageVar();
    sliderInit();
    essGridInit();
    emptySpaceInit();
});

function invetesxStorageVar() {
    "use strict";
    INVETEX_STORAGE = {
        "system_message": {
            "message": "",
            "status": "",
            "header": ""
        },
        "theme_font": "Poppins",
        "theme_color": "#28262b",
        "theme_bg_color": "#fafafa",
        "strings": {
            "ajax_error": "Invalid server answer",
            "bookmark_add": "Add the bookmark",
            "bookmark_added": "Current page has been successfully added to the bookmarks. You can see it in the right panel on the tab &#039;Bookmarks&#039;",
            "bookmark_del": "Delete this bookmark",
            "bookmark_title": "Enter bookmark title",
            "bookmark_exists": "Current page already exists in the bookmarks list",
            "search_error": "Error occurs in AJAX search! Please, type your query and press search icon for the traditional search way.",
            "email_confirm": "On the e-mail address &quot;%s&quot; we sent a confirmation email. Please, open it and click on the link.",
            "reviews_vote": "Thanks for your vote! New average rating is:",
            "reviews_error": "Error saving your vote! Please, try again later.",
            "error_like": "Error saving your like! Please, try again later.",
            "error_global": "Global error text",
            "name_empty": "The name can&#039;t be empty",
            "name_long": "Too long name",
            "email_empty": "Too short (or empty) email address",
            "email_long": "Too long email address",
            "email_not_valid": "Invalid email address",
            "subject_empty": "The subject can&#039;t be empty",
            "subject_long": "Too long subject",
            "phone_empty": "The phone can&#039;t be empty",
            "phone_long": "Too long phone",
            "text_empty": "The message text can&#039;t be empty",
            "text_long": "Too long message text",
            "send_complete": "Send message complete!",
            "send_error": "Transmit failed!",
            "not_agree": "Please, check &#039;I agree with Terms and Conditions&#039;",
            "login_empty": "The Login field can&#039;t be empty",
            "login_long": "Too long login field",
            "login_success": "Login success! The page will be reloaded in 3 sec.",
            "login_failed": "Login failed!",
            "password_empty": "The password can&#039;t be empty and shorter then 4 characters",
            "password_long": "Too long password",
            "password_not_equal": "The passwords in both fields are not equal",
            "registration_success": "Registration success! Please log in!",
            "registration_failed": "Registration failed!",
            "geocode_error": "Geocode was not successful for the following reason:",
            "googlemap_not_avail": "Google map API not available!",
            "editor_save_success": "Post content saved!",
            "editor_save_error": "Error saving post data!",
            "editor_delete_post": "You really want to delete the current post?",
            "editor_delete_post_header": "Delete post",
            "editor_delete_success": "Post deleted!",
            "editor_delete_error": "Error deleting post!",
            "editor_caption_cancel": "Cancel",
            "editor_caption_close": "Close"
        },
        "ajax_url": "",
        "ajax_nonce": "d8c60af452",
        "site_url": "http:\/\/invetex-html.themerex.net",
        "site_protocol": "http",
        "vc_edit_mode": "",
        "accent1_color": "#28262b",
        "accent1_hover": "#54be73",
        "slider_height": "100",
        "user_logged_in": "",
        "toc_menu": "float",
        "toc_menu_home": "1",
        "toc_menu_top": "1",
        "menu_fixed": "1",
        "menu_mobile": "1024",
        "menu_hover": "fade",
        "menu_cache": "",
        "button_hover": "default",
        "input_hover": "default",
        "demo_time": "0",
        "media_elements_enabled": "1",
        "ajax_search_enabled": "1",
        "ajax_search_min_length": "3",
        "ajax_search_delay": "200",
        "css_animation": "1",
        "menu_animation_in": "fadeIn",
        "menu_animation_out": "fadeOut",
        "popup_engine": "magnific",
        "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
        "contacts_maxlength": "1000",
        "comments_maxlength": "1000",
        "remember_visitors_settings": "",
        "admin_mode": "",
        "isotope_resize_delta": "0.3",
        "error_message_box": null,
        "viewmore_busy": "",
        "video_resize_inited": "",
        "top_panel_height": "0"
    };
}

function emptySpaceInit() {
    "use strict";
    jQuery(".sc_empty_space").each(function() {
		"use strict";
        var x = jQuery(this).data("height");
        jQuery(this).height(x);
    });

}
// Revolution slider initialization
function sliderInit() {
    "use strict";

    if (jQuery('.slider_wrap').length > 0) {
        // CUSTOM AJAX CONTENT LOADING FUNCTION
        ajaxRevslider = function(obj) {
            "use strict";
            // obj.type : Post Type
            // obj.id : ID of Content to Load
            // obj.aspectratio : The Aspect Ratio of the Container / Media
            // obj.selector : The Container Selector where the Content of Ajax will be injected. It is done via the Essential Grid on Return of Content

            var content = "";

            data = {};
            data.action = 'revslider_ajax_call_front';
            data.client_action = 'get_slider_html';
            data.token = 'a18ccc26b7';
            data.type = obj.type;
            data.id = obj.id;
            data.aspectratio = obj.aspectratio;

            // SYNC AJAX REQUEST
            jQuery.ajax({
                type: "post",
                url: "",
                dataType: 'json',
                data: data,
                async: false,
                success: function(ret, textStatus, XMLHttpRequest) {
                    if (ret.success == true)
                        content = ret.data;
                },
                error: function(e) {
                    console.log(e);
                }
            });

            // FIRST RETURN THE CONTENT WHEN IT IS LOADED !!
            return content;
        };

        // CUSTOM AJAX FUNCTION TO REMOVE THE SLIDER
        var ajaxRemoveRevslider = function(obj) {
			"use strict";
            return jQuery(obj.selector + " .rev_slider").revkill();
        };

        // EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION
        var extendessential = setInterval(function() {
            "use strict";
            if (jQuery.fn.tpessential != undefined) {
                clearInterval(extendessential);
                if (typeof(jQuery.fn.tpessential.defaults) !== 'undefined') {
                    jQuery.fn.tpessential.defaults.ajaxTypes.push({
                        type: "revslider",
                        func: ajaxRevslider,
                        killfunc: ajaxRemoveRevslider,
                        openAnimationSpeed: 0.3
                    });
                }
            }
        }, 30);

        "use strict";

        /* Home 1 */
        var setREVStartSize = function() {
            "use strict";
            try {
                var e = new Object,
                    i = jQuery(window).width(),
                    t = 9999,
                    r = 0,
                    n = 0,
                    l = 0,
                    f = 0,
                    s = 0,
                    h = 0;
                e.c = jQuery('#rev_slider_1_1');
                e.gridwidth = [1240];
                e.gridheight = [868];

                e.sliderLayout = "fullscreen";
                e.fullScreenAutoWidth = 'off';
                e.fullScreenAlignForce = 'off';
                e.fullScreenOffsetContainer = '';
                e.fullScreenOffset = '';
                if (e.responsiveLevels && (jQuery.each(e.responsiveLevels, function(e, f) {
						"use strict";
                        f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e)
                    }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) {
                    var u = (e.c.width(), jQuery(window).height());
                    if (void 0 != e.fullScreenOffsetContainer) {
                        var c = e.fullScreenOffsetContainer.split(",");
                        if (c) jQuery.each(c, function(e, i) {
                            u = jQuery(i).length > 0 ? u - jQuery(i).outerHeight(!0) : u
                        }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0))
                    }
                    f = u
                } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight);
                e.c.closest(".rev_slider_wrapper").css({
                    height: f
                })

            } catch (d) {
                console.log("Failure at Presize of Slider:" + d)
            }
        };
        setREVStartSize();

        var tpj = jQuery;
        var revapi1;
        tpj(document).ready(function() {
            "use strict";
            if (tpj("#rev_slider_1_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_1_1");
            } else {
                revapi1 = tpj("#rev_slider_1_1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "//invetex.themerex.net/wp-content/plugins/revslider/public/assets/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        },
                        arrows: {
                            style: "custom",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 780,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 50,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 50,
                                v_offset: 0
                            }
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: false,
                            style: "custom",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 43,
                            space: 8,
                            tmp: ''
                        }
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 1240,
                    gridheight: 868,
                    lazyType: "none",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAutoWidth: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        }); /*ready*/

        /* Home 2 */
        var setREVStartSize = function() {
            "use strict";
            try {
                var e = new Object,
                    i = jQuery(window).width(),
                    t = 9999,
                    r = 0,
                    n = 0,
                    l = 0,
                    f = 0,
                    s = 0,
                    h = 0;
                e.c = jQuery('#rev_slider_3_1');
                e.gridwidth = [1240];
                e.gridheight = [868];

                e.sliderLayout = "fullscreen";
                e.fullScreenAutoWidth = 'off';
                e.fullScreenAlignForce = 'off';
                e.fullScreenOffsetContainer = '';
                e.fullScreenOffset = '';
                if (e.responsiveLevels && (jQuery.each(e.responsiveLevels, function(e, f) {
						"use strict";
                        f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e)
                    }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) {
                    var u = (e.c.width(), jQuery(window).height());
                    if (void 0 != e.fullScreenOffsetContainer) {
                        var c = e.fullScreenOffsetContainer.split(",");
                        if (c) jQuery.each(c, function(e, i) {
                            u = jQuery(i).length > 0 ? u - jQuery(i).outerHeight(!0) : u
                        }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0))
                    }
                    f = u
                } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight);
                e.c.closest(".rev_slider_wrapper").css({
                    height: f
                })

            } catch (d) {
                console.log("Failure at Presize of Slider:" + d)
            }
        };
        setREVStartSize();

        var revapi3;
        tpj(document).ready(function() {
            "use strict";
            if (tpj("#rev_slider_3_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_3_1");
            } else {
                revapi3 = tpj("#rev_slider_3_1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        },
                        arrows: {
                            style: "hesperiden",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 780,
                            hide_onleave: true,
                            hide_delay: 200,
                            hide_delay_mobile: 1200,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 18
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 18
                            }
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: false,
                            style: "hesperiden",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 43,
                            space: 8,
                            tmp: ''
                        }
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 1240,
                    gridheight: 868,
                    lazyType: "none",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAutoWidth: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        }); /*ready*/

        /* Home 3 */
        var revapi2;
        tpj(document).ready(function() {
            "use strict";
            if (tpj("#rev_slider_2_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_2_1");
            } else {
                revapi2 = tpj("#rev_slider_2_1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        },
                        arrows: {
                            style: "hesperiden",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 780,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            }
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: false,
                            style: "custom",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 43,
                            space: 8,
                            tmp: ''
                        }
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 1240,
                    gridheight: 868,
                    lazyType: "none",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAutoWidth: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        }); /*ready*/

        var htmlDivCss = ".tp-caption.trx-big,.trx-big{color:rgba(255,255,255,1.00);font-size:70px;line-height:80px;font-weight:500;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:left;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}.tp-caption.trx-norm,.trx-norm{color:rgba(255,255,255,1.00);font-size:19px;line-height:34px;font-weight:400;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:center;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}.tp-caption.trx-no-css,.trx-no-css{color:rgba(255,255,255,1.00);font-size:14px;line-height:22px;font-weight:400;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:left;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}.tp-caption.trx-no-css,.trx-no-css{color:rgba(255,255,255,1.00);font-size:14px;line-height:22px;font-weight:400;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:left;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}.tp-caption.trx-big-dark,.trx-big-dark{color:rgba(40,38,43,1.00);font-size:58px;line-height:70px;font-weight:400;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:left;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}.tp-caption.trx-norm-dark,.trx-norm-dark{color:rgba(56,56,56,1.00);font-size:19px;line-height:34px;font-weight:400;font-style:normal;font-family:Poppins;padding:0px 0px 0px 0px;text-decoration:none;text-align:left;background-color:transparent;border-color:transparent;border-style:none;border-width:0px;border-radius:0px 0px 0px 0px}";
        var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
        if (htmlDiv) {
            htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
        } else {
            var htmlDiv = document.createElement('div');
            htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
            document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
        }
    }
}

function revslider_showDoubleJqueryError(sliderID) {
    "use strict";
    var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
    errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
    errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
    errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
    errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>";
    jQuery(sliderID).show().html(errorMessage);
}

// Essential Grid initialization
function essGridInit() {
    "use strict";
    if (jQuery('.esg-grid').length > 0) {
        var lamount = 0,
            aratio = 0;

        if ("even" == "even") {
            var coh = 0,
                container = jQuery("#esg-grid-1-1");
            var cwidth = container.width(),
                ar = "4:4",
                gbfc = eggbfc(jQuery(window).width(), "id"),
                row = 1;
            ar = ar.split(":");
            aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
            coh = cwidth / aratio;
            coh = coh / gbfc.column * row;
            var ul = container.find("ul").first();
            ul.css({
                display: "block",
                height: coh + "px"
            });
        }
        // Grid 1
        var essapi_1;
        jQuery(document).ready(function() {
			"use strict";
            essapi_1 = jQuery("#esg-grid-1-1").tpessential({
                gridID: 1,
                layout: "even",
                forceFullWidth: "off",
                lazyLoad: "off",
                row: 1,
                loadMoreAjaxToken: "ff6d6d0a3a",
                loadMoreAjaxUrl: "#",
                loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
                ajaxContentTarget: "ess-grid-ajax-container-",
                ajaxScrollToOffset: "0",
                ajaxCloseButton: "off",
                ajaxContentSliding: "on",
                ajaxScrollToOnLoad: "on",
                ajaxNavButton: "off",
                ajaxCloseType: "type1",
                ajaxCloseInner: "false",
                ajaxCloseStyle: "light",
                ajaxClosePosition: "tr",
                space: 0,
                pageAnimation: "fade",
                paginationScrollToTop: "off",
                spinner: "spinner-1",
                spinnerColor: "#FFFFFF",
                evenGridMasonrySkinPusher: "off",
                lightBoxMode: "single",
                animSpeed: 1000,
                delayBasic: 1,
                mainhoverdelay: 1,
                filterType: "single",
                showDropFilter: "hover",
                filterGroupClass: "esg-fgc-1",
                googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
                aspectratio: "4:4",
                responsiveEntries: [{
                    width: 1400,
                    amount: 3
                }, {
                    width: 1170,
                    amount: 3
                }, {
                    width: 1024,
                    amount: 2
                }, {
                    width: 960,
                    amount: 2
                }, {
                    width: 778,
                    amount: 2
                }, {
                    width: 640,
                    amount: 1
                }, {
                    width: 480,
                    amount: 1
                }]
            });

        });

        if ("even" == "even") {
            var coh = 0,
                container = jQuery("#esg-grid-6-1");
            var cwidth = container.width(),
                ar = "4:4",
                gbfc = eggbfc(jQuery(window).width(), "id"),
                row = 1;
            ar = ar.split(":");
            aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
            coh = cwidth / aratio;
            coh = coh / gbfc.column * row;
            var ul = container.find("ul").first();
            ul.css({
                display: "block",
                height: coh + "px"
            });
        }
        // Grid 2
        var essapi_6;
        jQuery(document).ready(function() {
			"use strict";
            essapi_6 = jQuery("#esg-grid-6-1").tpessential({
                gridID: 6,
                layout: "even",
                forceFullWidth: "off",
                lazyLoad: "off",
                row: 1,
                loadMoreAjaxToken: "539b638d5b",
                loadMoreAjaxUrl: "#",
                loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
                ajaxContentTarget: "ess-grid-ajax-container-",
                ajaxScrollToOffset: "0",
                ajaxCloseButton: "off",
                ajaxContentSliding: "on",
                ajaxScrollToOnLoad: "on",
                ajaxNavButton: "off",
                ajaxCloseType: "type1",
                ajaxCloseInner: "false",
                ajaxCloseStyle: "light",
                ajaxClosePosition: "tr",
                space: 0,
                pageAnimation: "horizontal-flip",
                paginationScrollToTop: "off",
                spinner: "spinner-1",
                spinnerColor: "#FFFFFF",
                evenGridMasonrySkinPusher: "off",
                lightBoxMode: "single",
                animSpeed: 1000,
                delayBasic: 1,
                mainhoverdelay: 1,
                filterType: "single",
                showDropFilter: "hover",
                filterGroupClass: "esg-fgc-6",
                googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
                aspectratio: "4:4",
                responsiveEntries: [{
                    width: 1400,
                    amount: 4
                }, {
                    width: 1170,
                    amount: 4
                }, {
                    width: 1024,
                    amount: 4
                }, {
                    width: 960,
                    amount: 3
                }, {
                    width: 778,
                    amount: 2
                }, {
                    width: 640,
                    amount: 2
                }, {
                    width: 480,
                    amount: 1
                }]
            });

        });

        if ("even" == "even") {
            var coh = 0,
                container = jQuery("#esg-grid-2-1");
            var cwidth = container.width(),
                ar = "4:4",
                gbfc = eggbfc(jQuery(window).width(), "id"),
                row = 3;
            ar = ar.split(":");
            aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
            coh = cwidth / aratio;
            coh = coh / gbfc.column * row;
            var ul = container.find("ul").first();
            ul.css({
                display: "block",
                height: coh + "px"
            });
        }
        // Grid 3
        var essapi_2;
        jQuery(document).ready(function() {
			"use strict";
            essapi_2 = jQuery("#esg-grid-2-1").tpessential({
                gridID: 2,
                layout: "even",
                forceFullWidth: "off",
                lazyLoad: "off",
                row: 3,
                loadMoreAjaxToken: "5926a9c34c",
                loadMoreAjaxUrl: "#",
                loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
                ajaxContentTarget: "ess-grid-ajax-container-",
                ajaxScrollToOffset: "0",
                ajaxCloseButton: "off",
                ajaxContentSliding: "on",
                ajaxScrollToOnLoad: "on",
                ajaxNavButton: "off",
                ajaxCloseType: "type1",
                ajaxCloseInner: "false",
                ajaxCloseStyle: "light",
                ajaxClosePosition: "tr",
                space: 20,
                pageAnimation: "fade",
                paginationScrollToTop: "off",
                spinner: "spinner0",
                evenGridMasonrySkinPusher: "off",
                lightBoxMode: "single",
                animSpeed: 1000,
                delayBasic: 1,
                mainhoverdelay: 1,
                filterType: "single",
                showDropFilter: "hover",
                filterGroupClass: "esg-fgc-2",
                googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
                aspectratio: "4:4",
                responsiveEntries: [{
                    width: 1400,
                    amount: 3
                }, {
                    width: 1170,
                    amount: 3
                }, {
                    width: 1024,
                    amount: 3
                }, {
                    width: 960,
                    amount: 3
                }, {
                    width: 778,
                    amount: 3
                }, {
                    width: 640,
                    amount: 3
                }, {
                    width: 480,
                    amount: 1
                }]
            });

        });

        if ("masonry" == "even") {
            var coh = 0,
                container = jQuery("#esg-grid-3-1");
            var cwidth = container.width(),
                ar = "4:3",
                gbfc = eggbfc(jQuery(window).width(), "id"),
                row = 3;
            ar = ar.split(":");
            aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
            coh = cwidth / aratio;
            coh = coh / gbfc.column * row;
            var ul = container.find("ul").first();
            ul.css({
                display: "block",
                height: coh + "px"
            });
        }
        // Grid 4
        var essapi_3;
        jQuery(document).ready(function() {
			"use strict";
            essapi_3 = jQuery("#esg-grid-3-1").tpessential({
                gridID: 3,
                layout: "masonry",
                forceFullWidth: "off",
                lazyLoad: "off",
                row: 3,
                loadMoreAjaxToken: "5926a9c34c",
                loadMoreAjaxUrl: "#",
                loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
                ajaxContentTarget: "ess-grid-ajax-container-",
                ajaxScrollToOffset: "0",
                ajaxCloseButton: "off",
                ajaxContentSliding: "on",
                ajaxScrollToOnLoad: "on",
                ajaxNavButton: "off",
                ajaxCloseType: "type1",
                ajaxCloseInner: "false",
                ajaxCloseStyle: "light",
                ajaxClosePosition: "tr",
                space: 20,
                pageAnimation: "fade",
                paginationScrollToTop: "off",
                spinner: "spinner0",
                lightBoxMode: "single",
                animSpeed: 1000,
                delayBasic: 1,
                mainhoverdelay: 1,
                filterType: "single",
                showDropFilter: "hover",
                filterGroupClass: "esg-fgc-3",
                googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
                responsiveEntries: [{
                    width: 1400,
                    amount: 3
                }, {
                    width: 1170,
                    amount: 3
                }, {
                    width: 1024,
                    amount: 3
                }, {
                    width: 960,
                    amount: 3
                }, {
                    width: 778,
                    amount: 3
                }, {
                    width: 640,
                    amount: 3
                }, {
                    width: 480,
                    amount: 1
                }]
            });

        });

        if ("cobbles" == "even") {
            var coh = 0,
                container = jQuery("#esg-grid-4-1");
            var cwidth = container.width(),
                ar = "4:4",
                gbfc = eggbfc(jQuery(window).width(), "id"),
                row = 3;
            ar = ar.split(":");
            aratio = parseInt(ar[0], 0) / parseInt(ar[1], 0);
            coh = cwidth / aratio;
            coh = coh / gbfc.column * row;
            var ul = container.find("ul").first();
            ul.css({
                display: "block",
                height: coh + "px"
            });
        }
        // Grid 5
        var essapi_4;
        jQuery(document).ready(function() {
			"use strict";
            essapi_4 = jQuery("#esg-grid-4-1").tpessential({
                gridID: 4,
                layout: "cobbles",
                forceFullWidth: "off",
                lazyLoad: "off",
                row: 3,
                loadMoreAjaxToken: "5926a9c34c",
                loadMoreAjaxUrl: "#",
                loadMoreAjaxAction: "Essential_Grid_Front_request_ajax",
                ajaxContentTarget: "ess-grid-ajax-container-",
                ajaxScrollToOffset: "0",
                ajaxCloseButton: "off",
                ajaxContentSliding: "on",
                ajaxScrollToOnLoad: "on",
                ajaxNavButton: "off",
                ajaxCloseType: "type1",
                ajaxCloseInner: "false",
                ajaxCloseStyle: "light",
                ajaxClosePosition: "tr",
                space: 20,
                pageAnimation: "fade",
                paginationScrollToTop: "off",
                spinner: "spinner0",
                lightBoxMode: "single",
                animSpeed: 1000,
                delayBasic: 1,
                mainhoverdelay: 1,
                filterType: "single",
                showDropFilter: "hover",
                filterGroupClass: "esg-fgc-4",
                googleFonts: ['Open+Sans:300,400,600,700,800', 'Raleway:100,200,300,400,500,600,700,800,900', 'Droid+Serif:400,700'],
                aspectratio: "4:4",
                responsiveEntries: [{
                    width: 1400,
                    amount: 3
                }, {
                    width: 1170,
                    amount: 3
                }, {
                    width: 1024,
                    amount: 3
                }, {
                    width: 960,
                    amount: 3
                }, {
                    width: 778,
                    amount: 3
                }, {
                    width: 640,
                    amount: 3
                }, {
                    width: 480,
                    amount: 1
                }]
            });

        });
    }
}

function eggbfc(winw, resultoption) {
	"use strict";
    var lasttop = winw,
        lastbottom = 0,
        smallest = 9999,
        largest = 0,
        samount = 0,
        lamoung = 0,
        lamount = 0,
        lastamount = 0,
        resultid = 0,
        resultidb = 0,
        responsiveEntries = [{
            width: 1400,
            amount: 3
        }, {
            width: 1170,
            amount: 3
        }, {
            width: 1024,
            amount: 2
        }, {
            width: 960,
            amount: 2
        }, {
            width: 778,
            amount: 2
        }, {
            width: 640,
            amount: 1
        }, {
            width: 480,
            amount: 1
        }];
    if (responsiveEntries != undefined && responsiveEntries.length > 0)
        jQuery.each(responsiveEntries, function(index, obj) {
			"use strict";
            var curw = obj.width != undefined ? obj.width : 0,
                cura = obj.amount != undefined ? obj.amount : 0;
            if (smallest > curw) {
                smallest = curw;
                samount = cura;
                resultidb = index;
            }
            if (largest < curw) {
                largest = curw;
                lamount = cura;
            }
            if (curw > lastbottom && curw <= lasttop) {
                lastbottom = curw;
                lastamount = cura;
                resultid = index;
            }
        })
    if (smallest > winw) {
        lastamount = samount;
        resultid = resultidb;
    }
    var obj = new Object;
    obj.index = resultid;
    obj.column = lastamount;
    if (resultoption == "id")
        return obj;
    else
        return lastamount;
}


var sb_instagram_js_options = {
    "sb_instagram_at": "3273597493.3a81a9f.084695f48e1e4b2ba0e258a9935743d8"
};
var woocommerce_price_slider_params = {
    "currency_symbol": "$",
    "currency_pos": "left",
    "min_price": "",
    "max_price": ""
};
var wc_single_product_params = {
    "i18n_required_rating_text": "Please select a rating",
    "review_rating_required": "yes"
};
var wc_checkout_params = {
    "ajax_url": "",
    "wc_ajax_url": "",
    "update_order_review_nonce": "55456ea40e",
    "apply_coupon_nonce": "148820ad75",
    "remove_coupon_nonce": "1ba16659bd",
    "option_guest_checkout": "yes",
    "checkout_url": "\/checkout\/?wc-ajax=checkout",
    "is_checkout": "1",
    "debug_mode": "",
    "i18n_checkout_error": "Error processing checkout. Please try again."
};
var booked_js_vars = {
    "ajax_url": "",
    "profilePage": "",
    "publicAppointments": "",
    "i18n_confirm_appt_delete": "Are you sure you want to cancel this appointment?",
    "i18n_please_wait": "Please wait ...",
    "i18n_wrong_username_pass": "Wrong username\/password combination.",
    "i18n_fill_out_required_fields": "Please fill out all required fields.",
    "i18n_guest_appt_required_fields": "Please enter your name to book an appointment.",
    "i18n_appt_required_fields": "Please enter your name, your email address and choose a password to book an appointment."
};
