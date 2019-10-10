cleanLinks();

var forceNoReferrer = true;
if (typeof chrome == 'object' && chrome.storage) {
    (chrome.storage.sync || chrome.storage.local).get({
        forceNoReferrer: true,
        referrerPolicy: 'no-referrer',
    }, function(items) {
        if (items) {
            // Migration code (to be removed in the future).
            if (items.referrerPolicy === '') {
                // User explicitly allowed referrers to be sent, respect that.
                items.forceNoReferrer = false;
            }
            forceNoReferrer = items.forceNoReferrer;
        }
    });
    chrome.storage.onChanged.addListener(function(changes) {
        if (changes.forceNoReferrer) {
            forceNoReferrer = changes.forceNoReferrer.newValue;
        }
    });
}

function getReferrerPolicy() {
    return forceNoReferrer ? 'origin' : '';
}

/**
 * @param {URL|HTMLHyperlinkElementUtils} a
 * @returns {String} the real URL if the given link is a YouTube redirect URL.
 */
function getRealLinkFromYouTubeUrl(a) {
    if (a.protocol !== 'https:' && a.protocol !== 'http:') {
        return;
    }
    if ((a.hostname === location.hostname || a.hostname === 'www.youtube.com') && a.pathname === '/redirect') {
        var url = /[?&](?:q|url)=((?:https?|ftp)[%:][^&]+)/.exec(a.search);
        if (url) {
            return decodeURIComponent(url[1]);
        }
    }
}

function cleanLinks() {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('mouseover', handleMouseOver);
        var as = document.querySelectorAll('a[href]');
        for (var i = 0; i < as.length; ++i) {
            var href = getRealLinkFromYouTubeUrl(as[i]);
            if (href) {
                as[i].href = href;
            }
        }
    }, {once: true});

    function handleMouseOver(e) {
        var a = e.target;
        var href = a.href && getRealLinkFromYouTubeUrl(a);
        if (href) {
            a.href = href;
        }
    }
}
