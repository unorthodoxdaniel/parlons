/** Bound Apps Script for the private Parlons Suggestions sheet.
 * Script properties: SUGGESTIONS_SECRET (same secret as Cloudflare).
 * Deploy as web app: execute as yourself; access Anyone.
 * Every write requires the server-only shared secret. No read endpoint exists.
 */
var SPREADSHEET_ID = '1nCc_H587Spm9VM9yCCtfXtf7HjVKjNBedMeuWJWUec4';
function doPost(e) {
  function response(value) {
    return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  }
  var lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 16384) return response({ok:false});
    var input = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SUGGESTIONS_SECRET');
    if (!secret || !input || input.secret !== secret) return response({ok:false});
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.id)
        || ['feature','prompt'].indexOf(input.kind) === -1
        || typeof input.body !== 'string' || Array.from(input.body.trim()).length < 10 || Array.from(input.body.trim()).length > 2000
        || typeof input.language !== 'string' || typeof input.theme !== 'string'
        || (input.kind === 'prompt' && !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(input.language))
        || (input.kind === 'feature' && (input.language || input.theme))
        || !/^[a-z0-9-]{0,80}$/.test(input.theme)) return response({ok:false});
    lock = LockService.getScriptLock(); lock.waitLock(10000);
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Suggestions');
    if (!sheet || sheet.getRange(1,1).getValue() !== 'ID') return response({ok:false});
    var last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2,1,last-1,1).createTextFinder(input.id).matchEntireCell(true).findNext()) {
      return response({ok:true,id:input.id});
    }
    // Prefix formula-like text so a suggestion can never execute as a formula.
    var body = /^[\s]*[=+@-]/.test(input.body) ? "'" + input.body : input.body;
    sheet.getRange(last+1,1,1,8).setValues([[input.id,new Date(),input.kind,body,input.language,input.theme,'Pending','']]);
    sheet.getRange(last+1,2).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(last+1,4).setWrap(true);
    SpreadsheetApp.flush();
    return response({ok:true,id:input.id});
  } catch (error) { return response({ok:false}); }
  finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}
