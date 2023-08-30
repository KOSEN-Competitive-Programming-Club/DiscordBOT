# DiscordBOT
Discordサーバーの管理をしてるDiscordBOTです

## 実行
IDEA系のIDEを使っていて、且つvoltaを使用している場合に使用できる実行構成が最初から用意されています。
### ts-node使用
```
yarn run dev
```
で、ts-nodeを使って実行することができます。

### javascriptファイル使用
```
yarn run start
```
で、./buildにjavascriptファイルを生成して、それを実行してくれます。  
本番環境の場合はこちらを使用してください。また、
```
yarn build
```
で生成だけ行うこともできます。
