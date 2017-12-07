var MEmail = { };

(function() {

    var Is = { };
    Is.Type = function(x, type) { return typeof(x) === type; }
    Is.String = function(x) { return Is.Type(x, "string"); }
    Is.Undefined = function(x) { return Is.Type(x, "undefined"); }
    Is.Null = function(x) { return x == null; }
    Is.Node = function(x) { return !Is.Undefined(x) && !Is.Undefined(x.nodeType); }

    var Obfuscator = function() {

        var args = arguments[0];

        this.target = args.target;
        this.wait = args.wait || 0;
        this.encoding = args.encoding || "base64";
        
        if(Is.String(this.target)) {

            this.target = document.querySelector(this.target);
            
        } else if(!Is.Node(this.target)) {

            throw "Illegal argument target";

        }

    }

    Obfuscator.prototype.show = function() {

        setTimeout(function() {

            if(Is.Null(this.target) || Is.Undefined(this.target)) {

                return;

            }

            var text = this.target.innerText;
            var decoded = this._decode(text);
            var id = this.target.id;

            var split = decoded.split("@");
            var before;
            var content;
            var after;

            if(split.length == 2) {

                before = split[0];
                content = "@";
                after = split[1];
                
            } else if(split.length == 1) {

                var del = Math.floor(decoded.length / 2);
                content = decoded.charAt(del);
                before = decoded.substring(0, del);
                after = decoded.substring(del + 1, decoded.length);
                
            }

            var beforeStyle = "" +
                "#" + id + "::before { content: '" + before + "' } ";
            
            var afterStyle = "" +
                "#" + id + "::after { content: '" + after + "' } ";

            var style = document.createElement("style");
            style.id = "obfuscated-" + id;
            style.innerText = afterStyle + beforeStyle;

            document.body.appendChild(style);

            this.target.innerText = content;

        }.bind(this), this.wait);

    }

    Obfuscator.prototype._decode = function(text) {

        if(this.encoding == "base64") {

            return atob(text);

        }

        return null;

    }

    Obfuscator.prototype._encode = function(text) {

        if(this.encoding == "base64") {

            return btoa(text);

        }

        return null;

    }

    Obfuscator.prototype._log = function(msg) {

        if(console && console.log) {

            console.log(msg);

        }

    }

    MEmail.Obfuscator = Obfuscator;

})();
