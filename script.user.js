// ==UserScript==
// @name         Derpibooru - AI Returns to the Trending List
// @namespace    https://github.com/Shark-vil/
// @version      1.0
// @description  Removes exceptions for -ai generated and -ai composition filters from Trending Images on Derpibooru homepage
// @author       Shark_vil
// @icon         https://github.com/Shark-vil/derpibooru-ai-returns-to-the-trending-list/raw/refs/heads/master/icon.png
// @match        https://derpibooru.org/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const interval = setInterval(() => {
        const link = document.querySelector('a.block__header--single-item.center[href*="/search?q="]');
        if (link && link.textContent.trim().toLowerCase() === 'trending images') {
            let href = link.getAttribute('href');
            const originalHref = href;

            href = href.replace(/(?:, *|^)-ai generated/g, '');
            href = href.replace(/(?:, *|^)-ai composition/g, '');
            href = href.replace(/,+/g, ',')
                       .replace(/^,+/, '')
                       .replace(/,+$/, '')
                       .replace(/q=,+/, 'q=');

            if (href !== originalHref) {
                link.setAttribute('href', href);
            }

            clearInterval(interval);
        }
    }, 500);
})();
