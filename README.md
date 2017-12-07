# E-Mail-Obfuscator
JS Snippet in order to hide your E-Mail from pesky bots

Steps to success:
1. Get the js file and reference it in your html site
2. Encode your target email to base64, Example: marvin_test@ok.de -> bWFydmluX3Rlc3RAb2suZGUNCg==
3. Write this base64 string in the tag where your email should appear
4. Instantiate a new MEmail.Obfuscator instance with parameter target (target is the tag you've chosen to have the base64 string in it)
5. Call method show() and its encoded in a way 98% of bots won't notice (Maybe with time a bit more because of this github repo)

Example code:
```JS

window.addEventListener("load", function() {

    var o = new MEmail.Obfuscator({
        target: "#test-email"
    });
    o.show();

});


```
