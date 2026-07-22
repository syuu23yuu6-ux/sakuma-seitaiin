import fs from 'fs';

const filePath = 'scripts/fetchSiteContent.js';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. fallbackContent内のmenusを置換
const menuRegex = /menus:\s*\[\s*\{\s*id:\s*"balance-general"[\s\S]*?\}\s*\]\s*,/g;
const replacementMenus = `menus: [
    {
      id: "balance-general",
      title: "さくま式バランス整体（一般）",
      price: "¥5,000",
      desc: "頭痛、肩こり、腰痛、手足のしびれなど、慢性的な身体の不調を全身のバランスを整えながら根本改善する当院一番人気のコースです。",
      isAccent: true,
      pricing: [
        { item: "施術料（一般）", price: "¥5,000", note: "目安時間: 約50分（初回は説明等含め約70分）" }
      ]
    },
    {
      id: "balance-student",
      title: "さくま式バランス整体（学生）",
      price: "¥4,500",
      desc: "学生向けのバランス整体コースです。勉強やスポーツによる身体の不調、姿勢の乱れを全身のバランスを整えて改善します。",
      isAccent: false,
      pricing: [
        { item: "施術料（学生）", price: "¥4,500", note: "目安時間: 約50分（初回は説明等含め約70分）" }
      ]
    },
    {
      id: "balance-maternity",
      title: "マタニティ・産後骨盤矯正整体",
      price: "¥6,000",
      desc: "妊娠中の腰痛や股関節痛、産後の骨盤のゆがみ・開きを、お腹や赤ちゃんに負担のない極めてソフトな技法で整えます。",
      isAccent: false,
      pricing: [
        { item: "施術料（マタニティ・産後）", price: "¥6,000", note: "目安時間: 約45分。産後は1ヶ月後から受講可能" }
      ]
    }
  ],`;

// fallbackContent の最初のマッチと、後の finalContent テンプレートの2番目のマッチの両方を置換
content = content.replace(menuRegex, replacementMenus);

// 2. campaign価格と詳細を置換 (¥3,980 -> ¥3,000)
// fallbackContent内
content = content.replace(/campaignPrice:\s*"¥3,980"/g, 'campaignPrice: "¥3,000"');
content = content.replace(/通常 8,700円（カウンセリング料 2,200円 \+ 施術料 6,500円）が【初回限定特別価格 3,980円】に！/g, '通常 5,000円が【初回限定特別価格 3,000円】（学生は 2,500円）に！');
content = content.replace(/特別価格3,980円！ご予約はこちら/g, '特別価格3,000円！ご予約はこちら');

// finalContent内
content = content.replace(/campaignPrice:\s*\$\{JSON.stringify\(settings.campaignPrice\s*\|\|\s*"¥3,980"\)\}/g, 'campaignPrice: ${JSON.stringify(settings.campaignPrice || "¥3,000")}');
content = content.replace(/通常 8,700円（カウンセリング料 2,200円 \+ 施術料 6,500円）が【初回限定特別価格 3,980円】に！/g, '通常 5,000円が【初回限定特別価格 3,000円】（学生は 2,500円）に！');
content = content.replace(/特別価格3,980円！ご予約はこちら/g, '特別価格3,000円！ご予約はこちら');

// 3. contactsの住所と駐車場を置換
// fallbackContent内
content = content.replace(/address:\s*"〒567-0803 大阪府茨木市東奈良1丁目 \(南茨木駅近く\)"/g, 'address: "〒567-0876 大阪府茨木市天王2-9-12 スミエール21 1階"');
content = content.replace(/parkingInfo:\s*"無料専用駐車場あり。お車でも安心してお越しください。"/g, 'parkingInfo: "無料駐車場1台あり（店舗から北東に約50m先、「グッドバイク」西側にある駐車場の2番）"');

// finalContent内
content = content.replace(/address:\s*\$\{JSON.stringify\(settings.address\s*\|\|\s*"〒567-0803 大阪府茨木市東奈良1丁目 \(南茨木駅近く\)"\)\}/g, 'address: ${JSON.stringify(settings.address || "〒567-0876 大阪府茨木市天王2-9-12 スミエール21 1階")}');
content = content.replace(/parkingInfo:\s*\$\{JSON.stringify\(settings.parkingInfo\s*\|\|\s*"無料専用駐車場あり。お車でも安心してお越しください。"\)\}/g, 'parkingInfo: ${JSON.stringify(settings.parkingInfo || "無料駐車場1台あり（店舗から北東に約50m先、「グッドバイク」西側にある駐車場の2番）")}');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated fetchSiteContent.js!');
