# 概要
みなさん、JavaScript書いてますか？動的型付け言語であるJavaScriptは、柔軟で好きなように書きやすい反面、型情報が無いので、エディタの支援を受けづらかったり、実行時*undefined*に悩まされたり、つまらないtypoをしてしまうことがあると思います。
なので頭の良い方々は、*TypeScript* を導入するのでしょうが、学習コスト、導入コスト、移行コストをポンと出せる現場ばかりではないと思います。(学習コストに関してはチームの意識次第でなんとかなるかもしれませんが)
今回は神が作りし **神器 WebStorm** 、及び *WebStorm* が含まれている製品( *PhpStorm* 等)でオブジェクトプロパティの補完を効かせる方法をご紹介します。

# つらみがあるケース
バックエンドの設計にもよりますが、以下のようにネストしたモデルをそのまま返されると、つらいですね。

```sampleResponse.json
{
  "user": {
    "id": 1,
    "name": "suguri",
    "createdAt": "2019-10-04 16:09:46",
    "updatedAt": "2019-10-04 16:09:46",
    "profile": {
      "profileImageUrl": "https://orengi.com/img/10000.png",
      "company": {
        "id": 1,
        "name": "orange company",
        "createdAt": "2019-10-04 16:09:46",
        "updatedAt": "2019-10-04 16:09:46",
        "companyInfo": {
          "capital": 1000000000,
          "contact": {
            "tel": "○○○○-××××-○○○○",
            "email": "example@gmail.com"
          }
        }
      }
    }
  }
}
```
少々正規化のやりすぎな気もしますが、~~他にいい例が思い浮かばなかったので、~~これでいきます。

このレスポンスから、 **ユーザー** の**プロフィール**から、**所属会社情報**を取得し、その会社の**メールアドレス**を取得する処理を考えてみます

```sample.js
import axios from 'axios'

async function getUser() {
  const res = await axios.get('/api/user/1')

  return res.data
}

getUser().then(user => {
  const email = user.profile.company.companyInfo.contact.email
  console.log(email)
})
```

この状態だと、`.profile.company.companyInfo.contact.email`の部分を、入力補完の支援を受けずにタイプすることになります。
僕みたいなポンコツだと、盛大にtypoし、実行時*undefined*と向き合う羽目になります。
*WebStorm*先生も、『型情報がねーからそんなプロパティあるかどうか分かんねーよ』とカンカンです。

