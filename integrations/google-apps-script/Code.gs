/** Devkansh Interior CMS Bridge
 * Required Script Properties:
 * API_SECRET       - same value as GOOGLE_APPS_SCRIPT_SECRET in .env.local/Vercel
 * SPREADSHEET_ID   - ID of "Devkansh Interior Website CMS" spreadsheet
 * MEDIA_FOLDER_ID  - ID of "Devkansh Website Media" Drive folder
 * Sheet tab: CMS; columns: key | payload_json | status | updated_at
 */
function doGet() {
  return json_({ ok: true, service: 'Devkansh CMS Bridge', status: 'online' });
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var expected = PropertiesService.getScriptProperties().getProperty('API_SECRET');
    if (!expected || !body.secret || body.secret !== expected) return json_({ ok: false, error: 'Unauthorized bridge request' });
    var action = String(body.action || '');
    if (action === 'health') return json_({ ok: true, service: 'Devkansh CMS Bridge', status: 'online' });
    if (action === 'list') return list_();
    if (action === 'save') return save_(body.record || {});
    if (action === 'upload') return upload_(body.file || {});
    return json_({ ok: false, error: 'Unsupported action' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function spreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('SPREADSHEET_ID Script Property missing');
  var ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheetByName('CMS');
  if (!sheet) throw new Error('CMS sheet tab not found; tab name must be CMS');
  return sheet;
}

function list_() {
  var sheet = spreadsheet_();
  var values = sheet.getDataRange().getValues();
  if (!values.length) return json_({ ok: true, items: [] });
  var headers = values[0].map(function (v) { return String(v).trim(); });
  var ki = headers.indexOf('key'), pi = headers.indexOf('payload_json'), si = headers.indexOf('status');
  if (ki < 0 || pi < 0 || si < 0) throw new Error('CMS headers must include key, payload_json, status, updated_at');
  var items = [];
  for (var r = 1; r < values.length; r++) {
    var key = String(values[r][ki] || '');
    if (!key) continue;
    var payload = {};
    try { payload = JSON.parse(String(values[r][pi] || '{}')); } catch (_) {}
    items.push({ key: key, payload: payload, status: String(values[r][si] || 'draft') });
  }
  return json_({ ok: true, items: items });
}

function save_(record) {
  var key = String(record.key || '').trim();
  if (!key) throw new Error('Record key is required');
  var status = String(record.status || 'draft');
  if (['draft', 'published', 'deleted'].indexOf(status) < 0) throw new Error('Invalid record status');
  var sheet = spreadsheet_();
  var values = sheet.getDataRange().getValues();
  var headers = values.length ? values[0].map(function (v) { return String(v).trim(); }) : [];
  if (!headers.length) {
    headers = ['key', 'payload_json', 'status', 'updated_at'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  var ki = headers.indexOf('key'), pi = headers.indexOf('payload_json'), si = headers.indexOf('status'), ui = headers.indexOf('updated_at');
  if (ki < 0 || pi < 0 || si < 0 || ui < 0) throw new Error('CMS headers must be key, payload_json, status, updated_at');
  var row = -1;
  for (var i = 1; i < values.length; i++) if (String(values[i][ki]) === key) { row = i + 1; break; }
  if (row < 0) row = sheet.getLastRow() + 1;
  var output = new Array(headers.length).fill('');
  output[ki] = key; output[pi] = JSON.stringify(record.payload || {}); output[si] = status; output[ui] = new Date();
  sheet.getRange(row, 1, 1, headers.length).setValues([output]);
  return json_({ ok: true, item: { key: key, payload: record.payload || {}, status: status } });
}

function upload_(file) {
  var name = String(file.name || 'upload');
  var mime = String(file.mimeType || '');
  var kind = String(file.kind || 'image');
  var allowed = kind === 'video' ? ['video/mp4', 'video/webm', 'video/quicktime'] : ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.indexOf(mime) < 0) throw new Error('Unsupported media type');
  if (!file.base64) throw new Error('No file data received');
  var bytes = Utilities.base64Decode(file.base64);
  if (!bytes.length || bytes.length > 3 * 1024 * 1024) throw new Error('File must be 3 MB or smaller');
  var props = PropertiesService.getScriptProperties();
  var rootId = props.getProperty('MEDIA_FOLDER_ID');
  if (!rootId) throw new Error('MEDIA_FOLDER_ID Script Property missing');
  var root = DriveApp.getFolderById(rootId);
  var folderName = kind === 'video' ? 'Videos' : 'Images';
  var folders = root.getFoldersByName(folderName);
  var folder = folders.hasNext() ? folders.next() : root.createFolder(folderName);
  var safeName = name.replace(/[\\/:*?"<>|#%{}~&]/g, '_').slice(0, 120);
  var blob = Utilities.newBlob(bytes, mime, new Date().getTime() + '_' + safeName);
  var created = folder.createFile(blob);
  created.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var id = created.getId();
  var url = kind === 'video'
    ? 'https://drive.google.com/file/d/' + id + '/preview'
    : 'https://drive.google.com/uc?export=view&id=' + id;
  return json_({ ok: true, fileId: id, url: url, name: created.getName(), mimeType: mime });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
