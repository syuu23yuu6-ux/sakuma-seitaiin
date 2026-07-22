/**
 * Google Apps Script - お問い合わせフォーム連携テンプレート (さくま整体院用)
 * 
 * 1. 新しいスプレッドシートを作成し、このスクリプトを「拡張機能」>「Apps Script」に貼り付けます。
 * 2. `adminEmail` に通知先のメールアドレスを設定します（本番時はクライアントのアドレスへ）。
 * 3. スプレッドシートの1行目に以下のカラム名を設定します。
 *    A: タイムスタンプ
 *    B: お名前
 *    C: フリガナ
 *    D: メールアドレス
 *    E: 電話番号
 *    F: お悩みの症状
 *    G: ご希望のメニュー
 *    H: ご希望の日時
 *    I: ご質問・ご要望など
 * 4. スクリプトを「デプロイ」>「新しいデプロイ」から「ウェブアプリ」としてデプロイします。
 *    - 次のユーザーとして実行: 「自分」
 *    - アクセスできるユーザー: 「全員」
 * 5. 発行されたウェブアプリのURLを、環境変数 `VITE_GAS_URL` に設定します。
 */

function doPost(e) {
  // CORSプリフライトや他のオリジンからの通信を許可するためのヘッダー
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const jsonString = e.postData.contents;
    const data = JSON.parse(jsonString);

    const name = data.name || '';
    const kana = data.kana || '';
    const email = data.email || '';
    const tel = data.tel || '';
    const symptom = data.symptom || '';
    const menu = data.menu || '';
    const preferredDate = data.preferredDate || '';
    const message = data.message || '';
    const timestamp = new Date();

    // アクティブなスプレッドシートに書き込み
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      timestamp,
      name,
      kana,
      email,
      tel,
      symptom,
      menu,
      preferredDate,
      message
    ]);

    // 管理者へのメール通知
    const adminEmail = 'syuu23yuu6@gmail.com'; // 管理者宛通知メールアドレス
    const subject = `【予約・問合せ】${name}様より`;
    const body = `
お問い合わせフォームから新しい送信がありました。

【送信日時】 ${timestamp.toLocaleString('ja-JP')}
【お名前】 ${name}
【フリガナ】 ${kana}
【メールアドレス】 ${email}
【電話番号】 ${tel}
【お悩みの症状】 ${symptom}
【ご希望のメニュー】 ${menu}
【ご希望の日時】 ${preferredDate}

【ご質問・ご要望など】
${message}

---
※このメールはシステムより自動送信されています。
    `;

    if (adminEmail && adminEmail !== 'YOUR_EMAIL@example.com' && adminEmail !== 'test-reservation@example.com') {
      MailApp.sendEmail(adminEmail, subject, body);
    }

    const response = {
      result: 'success',
      message: 'Data successfully recorded.'
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);

  } catch (error) {
    const response = {
      result: 'error',
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// CORSプリフライト (OPTIONSリクエスト) への対応
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
}
