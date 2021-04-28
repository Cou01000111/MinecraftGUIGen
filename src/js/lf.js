'use strict';
/**
 * textから改行コードを推測し返す関数
 */
function getLFCode(text) {
    if (text.indexOf("\r\n") > -1) {
        return "\r\n";
    } else if (text.indexOf("\n") > -1) {
        return "\n";
    } else if (text.indexOf("\r") > -1) {
        return "\r";
    }
}
