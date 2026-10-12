// Splash gate for the main site (same pattern as the Hunter Flynn and Greylan
// James sites). Versioned so a new campaign re-shows the splash to everyone:
// bump the suffix when the release changes. sessionStorage, not localStorage,
// so it comes back on a new session rather than being dismissed forever.
export const SPLASH_KEY = "cj_splash_your_wife_is_dead";

// Runs in <head> before first paint so returning visitors never see a flash of
// the overlay. Legal pages are exempt (hidden overlay) but NOT entered, so
// reading the Terms is never treated as agreeing to them.
export const splashScript = `try{var e=document.documentElement;if(sessionStorage.getItem('${SPLASH_KEY}')){e.classList.add('splash-entered')}else if(location.pathname.indexOf('/legal')===0){e.classList.add('splash-exempt')}}catch(err){}`;
