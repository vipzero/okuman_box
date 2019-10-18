import hasha from 'hasha'
import firebase from '../utils/firebase'

const db = firebase.firestore()

const list = [
  '陰キャ「350億円分の装備まだ来てない」　アメリカ「あー今度払うから🤗」',
  'ビッパー十人くらい雇ってまとめブログの記事毎日書かせたら簡単に十億円くらい手に入りそうな気がする',
  '死ぬまで白飯味噌汁たくあん食べ放題oa現金3億円',
  '10%の確率で1億円貰えるボタンVS70%の確率で1000万円貰えるボタン',
  '北陸新幹線ゴミクズに変えるなら一両一億円で買いたい',
  '1億円あったら人生上がりだよな',
  '好きなJCと毎日添い寝できるor 1億円貰える どっち？',
  '社長「お前らくん！1億円渡すから1年休んでくれんかね？」',
  '１億円貰えるけど今後射精するたび精液が350ml出るようになるボタン',
  '1億円もらえるが身長2mのゼットンと生活を共にしなければならないボタン',
  '三億円事件の犯人も飯塚ってまじ？',
  'もし今だけ自分の指一本１億円で売れるなら売る？',
  '日本国民「台風でめちゃくちゃだ……」政府「税金数百億円で天皇のお祭りやるよんｗ」',
  '1億円あったらしたいこと',
  '2億円貰えて梅毒に感染するが抗生物質を接種してはいけない',
  '100億円貰えるけど毎日亀頭のカリ裏の部分を紙でスッとされるようになるボタン',
  '25年後もらえる25億円or明日もらえる1000万円',
  '1億円もらえる代わりに自分の存在が岩間好一になる←やる？',
  'お会計100億円ですwwwwwwwwwwwwこのときお前らならどうする??',
  '平均年収って役員報酬1億円(不労所得100億円)の孫正義は1億円で計算されてるんでしょ？',
  '俺が1年本気で勉強して作ってスカイダイビング用のパラシュートを使ってスカイダイビングしたら1億円',
  '五億円ボタン押す香具師アホ',
  '孫正義って年収100億円もあるのに20億円しか税金納めてないのずるくね？',
  'ターミネーター3から一日逃げ切ったら一億円',
  '8000万から2億円の武蔵小杉のマンションが買える富裕層への妬みだろ',
  '漫画村、星野ロミ再逮捕。漫画界被害総額3200億円←何をもとに計算してんのこれ',
  'ジョンウィックの懸賞金15億円って少なすぎないか？',
  '坂口良子「遺産の5億円あげるから真っ当に生きるんだよ」坂口杏里「うん涙」',
  '5億円手に入る変わりに味覚を失うボタン',
  '一億円貰えるけど一年間丸亀製麺の野菜かき揚げしか食べれないボタン',
  'ランチパックだけで1年間過ごしたら3億円',
  '5億円貰えるが今後くしゃみ1回につき100万円払わないといけない',
  '1億円貰える代わりに女のことをマンコとしか呼べなくなってしまうボタン',
  '2億円貰えるけど死ぬまで毎朝、蝶野の本気ビンタで起こされるボタン',
  '日本人が書いた絵が27億円で落札されたけど、なんで？',
  '今回の台風の経済損失が7兆2000億円',
  '岩盤浴の中で3年間生活したら3億円←やる？',
  '使えば使うほど10億円当たる確率が上がるクレジットカード作れよ',
  'オオミツバチの巣を防具服なしで棍棒で叩いたら一億円やるって言われたら？',
  'ファミコンのドラクエ2を一人も死なせずに12時間以内にクリアしたら3億円もらえる',
  '五億円貰える VS ダムを決壊させることが出来る能力（能力名：決壊！）',
  '大型バス一台2000万円、新幹線1両3億円←新幹線ぼったくり過ぎだろｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ',
  '1億円or死ぬと1ヶ月前からやり直せるボタン',
  '40%の確率で3億円がもらえるが残り60%の確率で貯水率150%のダムが全部放流されるボタン',
]

list.forEach((title, id) => {
  const key = hasha(title)

  db.collection('stories')
    .doc(key)
    .set({ title, id: id + 1 })
})
db.collection('all')
  .doc('info')
  .set({ count: list.length })
